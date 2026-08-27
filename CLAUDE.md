# CLAUDE.md

Diese Datei liefert Claude Code Kontext für die Arbeit in diesem Repository.

## Projekt

"Klassik entdecken" – eine Single-Page-App, die per Zufallsprinzip ein Werk aus
400 klassischen Musikstücken (1600–2000) anzeigt. Gebaut mit Next.js (App Router)
und Tailwind CSS, Deployment-Ziel ist Vercel.

Spezifikation: siehe `PRD_App.md` (ausserhalb des Repos). Der PRD schreibt Struktur,
Features und Design bewusst eng vor – **keine Features, Inhaltsbereiche oder
Gestaltungselemente ergänzen, die dort nicht genannt sind**. Bei Unsicherheit oder
Verbesserungsideen zuerst nachfragen, nicht eigenmächtig umsetzen.

## Tech-Stack

- Next.js 15 (App Router, TypeScript)
- React 19
- Tailwind CSS 3
- Deployment: Vercel

## Struktur

- `app/layout.tsx` – Root-Layout, Google Font Cormorant Garamond, Metadaten
- `app/page.tsx` – einzige Seite: Button, Zufallsauswahl-Logik, Anzeige des Werks
  (Client Component wegen `sessionStorage` und Click-State)
- `app/globals.css` – Tailwind-Direktiven, CSS-Variablen für Hintergrund-/Schriftfarbe
- `app/data/werke.json` – alle 400 Werke (Felder: `werk`, `komponist`, `jahr`,
  `kommentar`, `spotify`), einmalig aus `400_Werke_der_Klassik.xlsx` exportiert.
  Bei Änderungen an der Excel-Quelle muss diese Datei neu generiert werden.
- `public/App_Startseite.webp` – Hintergrundbild der Startseite

## Kernlogik (app/page.tsx)

- Klick auf den Button wählt ein zufälliges, in der laufenden Session noch nicht
  gezeigtes Werk aus `werke.json`.
- Bereits gezeigte Indizes werden unter dem Key `klassik-entdecken-shown` in
  `sessionStorage` gespeichert (nicht `localStorage` – Session endet mit dem Tab).
  Beim Schliessen des Tabs geht der Verlauf verloren.
- Sind alle 400 Werke in der Session gezeigt worden, wird der Pool zurückgesetzt
  (Wiederholungen sind danach wieder möglich).
- Reihenfolge der Anzeige ist fix vorgegeben: Werk, Komponist, Entstehungsjahr,
  Kommentar, Spotify-Link (öffnet über `target="_blank"` in neuem Tab).

## Design-Tokens (tailwind.config.ts)

- Farben: `bg-nachtblau` (#0B1F33, Hintergrund), `text-creme` (#F5E9DE, Standard-
  Schriftfarbe), `text-gold` (#C89B3C, Schmuckfarbe für Button, Links, Zierlinien)
- Schrift: `font-serif` = Cormorant Garamond (Werk, Komponist), `font-sans` =
  Helvetica Neue (Kommentar, UI-Text)
- Über dem Hintergrundfoto liegt ein dezentes Overlay (`bg-nachtblau/60`) für
  Lesbarkeit – kein zusätzliches Gestaltungselement, sondern reine Kontrastkorrektur.
- Look bewusst reduziert: keine Cards, keine Schatten, keine auffälligen
  Animationen, keine abgerundeten/futuristischen Formen.

## Befehle

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # Dev-Server auf http://localhost:3000
npm run build    # Produktions-Build
npm run start    # Produktions-Server lokal starten
npm run lint     # next lint
```

## Konventionen

- Komponenten als React Server Components schreiben, sofern kein Client-State
  benötigt wird; erst dann `"use client"` ergänzen.
- Styling ausschliesslich über Tailwind-Utility-Klassen, keine separaten CSS-Dateien
  pro Komponente.
- Keine zusätzlichen Komponenten/Dateien aufsplitten, solange der PRD das nicht
  vorsieht – die App bleibt bewusst als eine Seite (`app/page.tsx`) umgesetzt.

## Deployment

Das Projekt wird auf Vercel deployed. Ein Push auf den Main-Branch löst automatisch
ein Deployment aus, sofern das Repo mit Vercel verknüpft ist.

## Commit & Push

Sobald eine angeforderte Änderung fertig umgesetzt und geprüft ist, wird sie
**automatisch committed und auf den Main-Branch gepusht** – ohne separate
Rückfrage. Dadurch löst jede fertige Änderung direkt ein neues Vercel-Deployment
aus und ist online verfügbar. Ausnahme: Wenn eine Änderung erkennbar unfertig,
fehlerhaft oder rückfragebedürftig ist, wird sie nicht gepusht, sondern der
offene Punkt zuerst angesprochen.
