# PRD-Template App "Klassik entdecken"



## 1. Produkt in Kurzform

Die App "Klassik entdecken" hilft musikinteressierten und neugierigen Usern, neue Musikstücke kennenzulernen. Die App wählt per Zufallsprinzip aus 400 Werken der Klassik zwischen 1600 und 2000 jeweils ein Werk aus.


## 2. Zielgruppe & Nutzungskontext

- Zielgruppe sind musikinteressierte und neugierige User. Das sind sowohl User, die kaum klassische Musik kennen, als auch User, die schon einige Werke der klassischen Musik kennen, aber noch mehr Werke kennenlernen und ihren Horizont erweitern möchten.
- Die App wird sowohl unterwegs als auch zuhause genutzt.


## 3. Kernfeatures

Feature 1: Der User drückt auf den Button «Jetzt ein Klassik-Werk entdecken». Aus der Excel-Liste «400_Werke_der_Klassik.xlsx» wird einer der 400 Einträge per Zufallsprinzip ausgewählt.
Feature 2: Auf der Web-App werden die Informationen zum ausgewählten Werk in folgender Reihenfolge untereinander angezeigt: Werk, Komponist, Entstehungsjahr, Kommentar, Spotify. Der Spotify-Link ist ein klickbarer Text. Diese Informationen stehen unterhalb des Buttons «Jetzt ein Klassik-Werk entdecken».
Feature 3: Wird "Spotify" angeklickt, geht der Spotify-Link in einem neuen Tab auf.
Feature 4: Drückt der User wieder auf den Button, muss ein anderer Eintrag angezeigt werden.
Feature 5: Die App merkt sich in der laufenden Session, welche Werke bereits angezeigt wurden. Ein Werk wird in einer Session nicht zweimal gezeigt. Session = solange der Browser-Tab geöffnet ist. sessionStorage

## 4. Out of Scope

- Kein Login, keine Suchfunktion
- Implementier die Struktur genau wie beschrieben, nicht anders.
- Verwende keine zusätzlichen Listen, Komponenten oder Strukturierungen, die in Prompts nicht vorgesehen sind.
- Füg keine neuen Features, Inhaltsbereiche oder grundlegenden Gestaltungselemente hinzu
- Wenn du denkst, dass etwas verbessert werden könnte oder du einen Vorschlag hast, frag nach – implementiere es nicht einfach.

## 5. Design

### Farben

* Hintergrundfarbe der Website: Nachtblau #0B1F33
* Schriftfarbe: Creme #F5E9DE
* Schmuckfarbe: Warmgold #C89B3C


### Typografie

* Serifenschrift: Cormorant Garamond, sonst andere Serifenschrift verwenden
* serifenlose Schrift: Helvetica Neue, sonst andere serifenlose Schrift verwenden
* Werk dominant, Komponist prominent, Kommentar lesbar, aber untergeordnet.


### Design

* Responsive Design: ja. Die Website muss auf Desktop, Tablet und Smartphone funktionieren.
* Design: klassisch-reduziert, elegant und hochwertig; an Konzertprogramme, Kulturmagazine und klassische Musiklabels angelehnt. Grosszügige Flächen, klare Typografie, feine goldene Zierlinien. Keine verspielten Elemente, keine auffälligen Animationen, keine Card-lastige App-Optik und keine futuristische Gestaltung.
* Hintergrundbild ist die Datei App_Startseite.webp
* Zentriertes Layout, vertikal gestapelte Informationen
* Button ist horizontal in der Mitte der Website.


## 6. Technische Vorgaben & Constraints

- Für die Auswahl der Stücke greift die Datei auf die Excel-Datei 400_Werke_der_Klassik.xlsx zu.

## 7. Erster Prompt (aus dem PRD abgeleitet)

Formuliere aus den Abschnitten 1–6 deinen Start-Prompt. Faustregel: Abschnitt 1, 3 und 5 hineinkopieren, Abschnitt 4 als «Baue NICHT: …» anhängen.
