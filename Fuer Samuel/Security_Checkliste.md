# Security-Checkliste für Vibe-coded Apps

Stack: Claude Code, GitHub, Vercel (plus Supabase o.ä. als Datenbank)

Diese Checkliste geht davon aus, dass dir keine Plattform Auth, Zugriffsregeln oder Deployment-Schutz abnimmt. Alles, was hier nicht abgehakt ist, macht niemand für dich.

> **Bearbeitet für das Projekt "Klassik entdecken":** Eine reine Next.js-Single-Page-App ohne Login, Datenbank, API-Routen oder Formulare (nur ein Button, statisches JSON als Datenquelle). Viele Punkte sind dadurch nicht anwendbar (N/A) statt klassisch "erfüllt" – als [x] markiert mit Begründung. Nicht abgehakt sind Punkte, die nur über GitHub-/Vercel-Dashboard prüfbar sind und hier nicht verifiziert werden konnten.

---

## Kritische Punkte (müssen erfüllt sein)

### 1. Keine Secrets im Code oder Repo

- [x] Repo-Suche nach `key`, `secret`, `token`, `password`, `api` durchgeführt, keine echten Schlüssel gefunden
- [x] Keine `.env`-Datei im Repo, auch nicht in der Commit-History (einmal gepusht = kompromittiert, Schlüssel rotieren)
- [x] `.env`, `.env.local` und `.env*.local` stehen in `.gitignore`
- [x] API-Keys liegen in den Vercel Environment Variables, nicht im Code *(N/A – die App verwendet keine API-Keys/Secrets)*
- [ ] GitHub: Secret Scanning und Push Protection sind aktiviert (verhindert das Problem, statt es hinterher zu finden)

**Wichtig:** Ein privates Repo ist kein Schutz. Datei löschen reicht nicht, die History muss bereinigt werden (`git filter-repo`) und der Schlüssel muss trotzdem rotiert werden.

### 2. Keine Secrets im Client-Bundle

Der häufigste Fehler bei diesem Stack: Der Key liegt korrekt in Vercel, hat aber ein Prefix, das ihn in den Browser kompiliert.

- [x] Keine Environment-Variable mit `NEXT_PUBLIC_`, `VITE_` oder `REACT_APP_` enthält ein echtes Geheimnis *(N/A – keine Env-Variablen im Einsatz)*
- [x] Supabase: Im Client steckt nur der `anon key`. Der `service_role key` gehört ausschliesslich auf den Server, er hängt die Zugriffsregeln komplett aus. *(N/A – keine Datenbank/Supabase)*
- [x] Test nach dem Build:
  ```bash
  npm run build
  grep -ri "sk-\|service_role\|secret" .next/static/ dist/ 2>/dev/null
  ```
  Ein Treffer ("mask-type" enthält zufällig "sk-") geprüft und als Fehlalarm bestätigt, kein echtes Secret gefunden.
- [x] Zusatzprüfung im Browser: publizierte Seite öffnen, Rechtsquelltext anzeigen, nach `key` suchen – keine Treffer

### 3. Login und Accounts nur über etablierte Mechanismen

- [x] Falls die App Logins hat: Sie nutzt eine fertige Auth-Lösung (Supabase Auth, Auth.js, Clerk), nie ein selbst zusammengepromptetes Login-System *(N/A – App hat keine Logins/Accounts)*
- [x] Passwörter werden nirgends im Klartext gespeichert oder geloggt *(N/A – keine Passwörter vorhanden)*
- [x] Session-Cookies sind `httpOnly`, `secure` und `sameSite` *(N/A – keine Session-Cookies)*
- [x] Kein Auth-Check ausschliesslich in der Middleware. Die Next.js-Lücke CVE-2025-29927 war genau der Fall: Login funktioniert, trotzdem ist alles offen. Framework auf aktueller Patch-Version halten. *(N/A – keine Auth; Next.js aktuell auf 16.3.3)*

### 4. Datenbank-Zugriffsregeln aktiv

- [x] Row Level Security ist auf jeder Tabelle aktiviert, die Nutzerdaten enthält *(N/A – keine Datenbank, statisches JSON)*
- [x] RLS ist nicht nur aktiviert, sondern hat auch Policies. Aktiviert ohne Policy heisst: niemand kommt rein, und der Fix per Service-Key ist genau der falsche Reflex. *(N/A)*
- [x] **Der Test:** Zwei Test-Accounts anlegen, mit Account B versuchen, an die Daten von Account A zu kommen (URLs und IDs durchprobieren) *(N/A – keine Accounts/Nutzerdaten)*

### 5. Jede API-Route prüft selbst

Jede Datei in `/api` und jede Server Action ist ein öffentlicher Endpunkt. Dass das UI den Button ausblendet, schützt gar nichts.

- [x] Jede Route prüft die Session serverseitig *(N/A – keine `/api`-Routen oder Server Actions vorhanden)*
- [x] Autorisierung, nicht nur Authentifizierung: Darf *dieser* User *diese* Ressource sehen? (Klassiker: `/api/orders/[id]` liefert jede beliebige ID aus) *(N/A)*
- [x] Eingaben werden serverseitig validiert (z.B. mit Zod), nicht nur im Formular *(N/A – App hat keine Eingabefelder)*
- [x] CORS steht nicht auf `*` *(N/A – kein eigener API-Endpunkt, der CORS-Header setzt)*
- [x] File-Uploads: Typ- und Grössenlimit, Dateien landen nicht ausführbar im Public-Ordner *(N/A – keine File-Uploads)*

### 6. Deployment-Schutz auf Vercel

- [ ] **Deployment Protection aktiviert.** Sonst ist jeder Preview-Branch öffentlich erreichbar und indexierbar, inklusive halbfertigem Admin-Bereich und Testdaten.
- [ ] Environment-Variablen sind pro Umgebung getrennt (Production, Preview, Development). Preview zeigt nicht auf die Produktionsdatenbank.
- [x] Publizierte URL im Inkognito-Fenster geöffnet: Es ist nur sichtbar, was öffentlich sein soll *(verifiziert per Live-Abfrage: Startseite liefert 200 OK, nur der vorgesehene Inhalt)*
- [x] Admin-Bereiche und Testseiten sind nicht ohne Login erreichbar *(N/A – App hat keine Admin-/Testseiten)*

---

## Empfohlene Punkte

### 7. Claude Code selbst absichern

- [x] `.claude/settings.json`, `.mcp.json` und Hooks vor dem Commit lesen. Hooks führen Shell-Befehle aus und laufen auch bei allen anderen, die das Repo klonen. *(geprüft: nur unkritische `settings.local.json`, kein `.mcp.json`, keine Hooks konfiguriert)*
- [x] `--dangerously-skip-permissions` nicht in einem Repo mit Produktions-Credentials verwenden
- [x] Wenn Claude Code Webinhalte, Issues oder Logs liest, können darin Anweisungen versteckt sein. Diffs vor dem Merge anschauen, besonders bei Änderungen an Auth-, Env- und Config-Dateien.
- [ ] MCP-Server durchgehen: Welche sind verbunden, mit welchen Rechten? Ein Server mit Schreibrechten auf der DB hängt an derselben Session wie die Webrecherche.

### 8. Abhängigkeiten

- [x] **Jedes Paket im `package.json` existiert wirklich und ist das gemeinte.** Sprachmodelle erfinden Paketnamen, und diese Namen werden von Angreifern gezielt registriert (Slopsquatting). Bei unbekannten Namen: npm-Seite prüfen, sind Downloadzahlen und Repo-Link plausibel? *(nur etablierte Standardpakete: next, react, react-dom, tailwindcss, typescript, eslint, autoprefixer, postcss)*
- [x] Lockfile ist committed
- [x] `npm audit` läuft ohne High oder Critical *(0 Schwachstellen nach Next.js-16-Upgrade)*
- [ ] Dependabot Alerts und Security Updates im Repo aktiviert

### 9. GitHub und Repo-Hygiene

- [ ] Force-Push auf `main` blockiert (auch im Soloprojekt, das schützt vor dem Agenten)
- [ ] Falls GitHub Actions genutzt werden: Third-Party-Actions auf Commit-SHA gepinnt, `GITHUB_TOKEN` standardmässig read-only, kein `pull_request_target` mit Checkout von Fork-Code
- [ ] Vercel-Integration geprüft: Auf welche Repos hat sie Zugriff?

### 10. Umgang mit fremden Eingaben

- [x] Formulare und Eingabefelder getestet: Was passiert bei leerer, sehr langer oder HTML-haltiger Eingabe? Die App stürzt nicht ab und zeigt eine saubere Fehlermeldung. *(N/A – App hat keine Formulare/Eingabefelder, nur einen Button ohne Nutzereingabe)*
- [x] Kein `dangerouslySetInnerHTML` mit ungefilterten Nutzerdaten *(im Code nicht vorhanden)*
- [x] Datenbankzugriffe laufen über Query Builder oder Prepared Statements, nicht über zusammengebaute SQL-Strings *(N/A – keine Datenbank)*

### 11. Kosten- und Missbrauchsschutz

- [x] Rate Limiting auf allem, was schreibt, Mails verschickt oder ein LLM aufruft *(N/A – App hat keine schreibenden Endpunkte, Mail- oder LLM-Aufrufe)*
- [ ] **Vercel Spend Management und Usage Alerts konfiguriert.** Nicht nur die API-Rechnung, auch Vercel selbst kann bei einem Traffic-Spike schnell vierstellig werden.
- [x] Bei den externen API-Anbietern ein hartes Ausgabenlimit gesetzt *(N/A – keine kostenpflichtigen externen APIs im Einsatz)*
- [ ] Optional bei erhöhtem Risiko: Vercel Firewall bzw. Attack Challenge Mode

### 12. Security Headers

- [x] In `next.config.js` oder `vercel.json` gesetzt: Content-Security-Policy, `X-Frame-Options` bzw. `frame-ancestors`, `X-Content-Type-Options`, HSTS, `Referrer-Policy` *(alle gesetzt, live verifiziert)*
- [ ] Gegengeprüft auf securityheaders.com

### 13. Betrieb

- [ ] Logs enthalten keine Tokens, Passwörter oder Personendaten (die Vercel-Logs sieht das ganze Team)
- [ ] Datenbank-Backup existiert und wurde einmal testweise zurückgespielt *(N/A – keine Datenbank vorhanden, daher kein Backup nötig)*
- [ ] Notfallablauf steht fest: Key rotieren, Deployment zurückrollen, betroffene Daten identifizieren
- [x] Falls Personendaten verarbeitet werden: Serverstandort und Auftragsverarbeitung sind geklärt *(N/A – App verarbeitet keine Personendaten)*

---

## Wenn die Zeit knapp ist

Diese drei gehen bei diesem Stack am häufigsten schief und führen am direktesten zu einem echten Leak:

1. Deployment Protection auf Vercel aktivieren
2. Prüfen, dass kein Secret hinter einem `NEXT_PUBLIC_`-Prefix steckt
3. Autorisierung in jeder einzelnen API-Route, nicht nur im UI
