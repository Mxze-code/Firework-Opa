# Asset-Einbindung — Marcatis Industrial Homepage

## 1. Laser-Hero-Bild (bereits eingebunden)

| Feld | Wert |
|------|------|
| **Datei im Repo** | `public/images/makatis-hero-laser.png` |
| **Verwendung** | `HeroUnified` (Hintergrundfläche + Video-Poster) |
| **Ersetzen** | Datei ersetzen, Dateiname beibehalten **oder** Pfad in `HeroUnified.tsx` anpassen |

## 2. Laser-Wordmark-Video (bereits eingebunden)

| Feld | Wert |
|------|------|
| **Datei im Repo** | `public/videos/makatis-laser-wordmark.mov` |
| **Verwendung** | `HeroUnified.tsx` — `<video>` mit `<source>` |
| **Produktion** | Zusätzlich **`makatis-laser-wordmark.mp4`** (H.264) nach `public/videos/` legen — zweite `<source>`-Zeile ist vorbereitet |

## 3. Texte / Inhalte

| Quelle | Datei |
|--------|-------|
| Alle strukturierten Texte | `src/content/site.ts` |

Keine separaten Marketing-Texte außerhalb dieser Datei für die Homepage-Sections.

## 4. Kurz: Wo suchen

- **Hero (Laser + statisches Wordmark aus `src/assets/marcatis-logo.png`):** `HeroUnified.tsx`
- **Leistungen (Position + Verfahren + Material):** `src/components/industrial/SectionLeistungen.tsx`
- **Warum (Kennzahlen + Säulen):** `src/components/industrial/SectionWarum.tsx`
- **PRD:** `docs/PRD-MARCATIS-INDUSTRIAL.md`
