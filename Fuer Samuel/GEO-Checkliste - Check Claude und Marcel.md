# GEO-Checkliste: Selbst-Audit deiner Marketing-Seiten

**Ziel:** Deine Marketing-Seiten sollen von Google **und** von KI-Suchsystemen (ChatGPT, Gemini, Perplexity) gefunden, verstanden und **zitiert** werden. Diese Checkliste ist dein Audit, geh sie nach dem Webinar für jede deiner Seiten durch.

---

## A. Fundament (klassisches SEO, ohne das läuft nichts)

- [x] Jede Seite hat einen eindeutigen 'title'-Tag (max. ~60 Zeichen, enthält Produktname + Nutzen)
- [x] Jede Seite hat eine Meta-Description (max. ~155 Zeichen, formuliert als Antwort auf «Was bringt mir das?»)
- [x] Genau eine H1 pro Seite; Überschriften-Hierarchie ist logisch (H1 → H2 → H3, keine Sprünge)
- [x] Seite lädt schnell (Test: pagespeed.web.dev, Richtwert: grüner Bereich bei Performance)
- [x] Mobile-Darstellung geprüft
- [x] Crawling erlaubt: keine blockierende robots.txt, kein 'noindex', und KI-Crawler (GPTBot, OAI-SearchBot, PerplexityBot) sind nicht ausgesperrt. Manche Hosting-Defaults blocken sie, also aktiv nachschauen
- [x] 'Google-Extended' nicht vorsorglich sperren: das steuert Gemini-Training, nicht die AI Overviews

## B. Content-Struktur (GEO-Kern: zitierfähig schreiben)

- [(x)] **Direkte Antworten:** Die wichtigste Frage jeder Seite wird in den ersten 2–3 Sätzen beantwortet, nicht erst nach drei Absätzen Storytelling
- [x] **Dinge beim Namen nennen:** Produktname, Kategorie und Zweck stehen ausgeschrieben im Text («TrailBuddy ist eine Wander-App für …»), nicht nur im Logo
- [x] **Konkrete Fakten statt Floskeln:** Zahlen, Features, Preise («kostenlos», «3 Klicks») statt «innovativ» und «einzigartig»
- [x] **FAQ-Sektion** vorhanden: 4–6 echte Nutzerfragen in natürlicher Sprache, jede in 2–3 Sätzen eigenständig beantwortet (jede Antwort muss auch ohne den Rest der Seite verständlich sein, das ist Zitierfähigkeit)
- [x] **Struktur-Elemente:** Listen und/oder Tabellen, wo sie Inhalte klarer machen
- [x] Jede Seite hat einen klaren Call-to-Action zur App

## C. Technik (strukturierte Daten)

- [x] **Schema.org-Markup auf mindestens einer Seite** (JSON-LD im 'head'), passend zum Inhalt, z.B. 'SoftwareApplication' oder 'WebApplication' für die App, 'FAQPage' für die FAQ
- [x] Markup validiert: validator.schema.org (keine Fehler)
- [x] Semantisches HTML: 'header', 'nav', 'main', 'section', 'footer' statt Div-Wüste
- [x] Open-Graph-Tags (og:title, og:description, og:image), damit Links in Chats und Social sauber aussehen
- [x] Realistisch bleiben: Schema verstärkt gute Inhalte, es rettet keine schwachen. Ohne Abschnitt B bringt C wenig

## D. Der Praxistest (die ehrlichste Prüfung)

- [x] **KI-Test:** Frag ChatGPT/Perplexity: «Was ist [deine URL]? Was bietet dieses Produkt?» Wird die Seite korrekt verstanden und zusammengefasst? Falls die Antwort schwammig ist: Deine Texte sind es auch.
- [(x)] **Snippet-Test:** Lies nur H1 + ersten Absatz jeder Seite. Versteht man Produkt und Nutzen? Das ist alles, was eine KI oft zitiert.
- [x] **Zweimal fragen**, am besten in getrennten Chats. KI-Antworten sind nicht deterministisch. Es gibt kein Ranking zum Tracken, nur eine Tendenz über mehrere Versuche.

## Off-Site (nicht Teil der Bewertung, aber der grössere Hebel)

Rund 85% der Marken-Nennungen in KI-Antworten stehen auf fremden Seiten, nicht auf der eigenen: Reddit, YouTube, Wikipedia, Vergleichslisten. In drei Wochen baust du das nicht auf, bei einem echten Produkt ist es die halbe Arbeit. Was du trotzdem prüfen kannst:

- [ ] Produktname und Kurzbeschreibung sind überall identisch (Seite, README, Profile, Store-Eintrag)
- [ ] Mindestens ein Ort ausserhalb deiner Domain beschreibt das Produkt korrekt
- [ ] Keine widersprüchlichen Angaben zwischen diesen Orten. Widersprüche machen dich für ein Modell unzuverlässig
