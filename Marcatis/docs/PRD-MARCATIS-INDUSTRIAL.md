# Product Requirements Document (PRD)
## Marcatis — Premium Industrial Web Experience (Marcatis Laserbearbeitung GmbH)

**Version:** 1.0  
**Datum:** 2026-03-22  
**Status:** Implementierung Phase 1 (Homepage)  
**Stack-Ziel:** Next.js (App Router), React, Tailwind CSS, Framer Motion (punktuell)

---

## 1. Executive Summary

### 1.1 Ziel
Eine **eindeutig nicht-generische**, **industriell-premium** Website für **Marcatis** (Marken- und UI-Schreibweise durchgängig **Marcatis**), die sich bewusst an der **visuellen Disziplin** von Referenzprojekten im Stil **Auronix** orientiert — **ohne** Layout, Texte oder Markenelemente von Auronix zu kopieren.

### 1.2 Was erhalten bleibt (Marken- & Content-Regeln)
| Element | Quelle | Regel |
|--------|--------|--------|
| **Marcatis-Rot** | Bestehende Markenfarbe | Primär `#dc2626` / `#e11d48`-Familie; kein neues Farbsystem |
| **Logo-Typ-Feeling** | Bestehendes Logo / Schriftzug | Headlines technisch, kondensiert, hohes Gewicht; keine verspielten Display-Fonts |
| **Inhalt** | Inventar-PDF / bisherige Site | Sinn und Substanz erhalten; Darstellung editorial neu |

### 1.3 Was neu gedacht wird
Layout, Rhythmus, Bildführung, Typo-Skala, Motion, Navigation, Section-Logik — vollständig **Marcatis-eigen**, aber mit der **Referenz-Qualität**: mutig, bildstark, reduziert.

---

## 2. Referenz-Analyse (Auronix) — Nur Stil, keine Assets

### 2.1 Was von der Referenz **gelernt** wird (abstrakt)
- **Typografie als Bild:** extreme Skala zwischen Riesenheadline und kleinem Funktionaltext.
- **Bilddominanz:** mindestens ein **cinematisches** Key-Visual pro Landing, nicht dekorativ.
- **Farbe:** striktes **Schwarz / Weiß / Rot** — Rot als Signal, nicht als Flächenfüller.
- **Kanten:** harte Kanten, klare Raster, **kein** Soft-UI-Default.
- **Side-Rail:** rechts fixierte **Sektions-Navigation** als technisches Ordnungsmerkmal (Desktop).
- **Zahlen:** große KPI-Typo, wenig Text drumherum.
- **Motion:** wenig, aber **autoritativ** (Scroll-Kopplung, harte Easing-Kurven).

### 2.2 Was **nicht** passiert
- Keine 1:1-Section-Übernahme von Auronix.
- Keine fremden Texte, keine fremde Marken-Struktur.
- Keine Übernahme von Auronix-Bildern oder -Marken.

---

## 3. Marcatis-eigene Assets (First-Class)

### 3.1 Laser-Hero-Bild (`/images/makatis-hero-laser.png`)
**Beschreibung (Referenz aus User-Brief):** Makro-Laserprozess, Funken/Oxidation, dunkles Blech, hoher Kontrast — **cinematisch**, industriell.

**Rolle im Produkt:**
- **Hauptanker** der ersten visuellen Story nach der Markenanimation.
- Vollflächig oder fast vollflächig, mit **Text-Overlay** (Lesbarkeit über Verlauf).
- **Nicht** als kleine Content-Kachel.

### 3.2 Laser-Wordmark-Video (`/videos/makatis-laser-wordmark.mov`)
**Rolle:** **Signature-Moment** — Laser schreibt / enthüllt **Marcatis**.

**Platzierung:** Im **Opening** der Seite (oberer Bereich), nicht unten vergraben.

**Technik-Hinweis:** ProRes `.mov` ist für **Entwicklung** ok; für Produktion zusätzlich **H.264/HEVC `.mp4`** bereitstellen (Browser-Kompatibilität). Fallback: Standbild aus Video oder Hero-Bild.

### 3.3 Textinhalte
Quelle: bestehendes **Content-Inventar** (`src/content/site.ts` + PDF-Brief). Keine erfundenen Leistungsversprechen.

---

## 4. Informationsarchitektur — Homepage (Section Order)

| # | Section-ID | Zweck |
|---|--------------|--------|
| 1 | `hero` | **Laser-Hero-Bild** als Fläche + **Wordmark-Video** daneben/untereinander, Headline, Claim, CTA |
| 2 | `leistungen` | Positionierung (helle Fläche) + drei Kernverfahren + Werkstoffe & Branchen |
| 3 | `warum` | Kennzahlen (rote Fläche) + „Warum Marcatis“-Säulen |
| 4 | `trust` | Kundenstimmen + kompakte Praxis-QAs |
| 5 | `contact` | Finaler CTA, Kontakt |

**Side-Rail (Desktop):** Kurzlabels: Start, Leistungen, Warum, Vertrauen, Kontakt.

---

## 5. UX & Verhalten

### 5.1 Desktop (Priorität)
- Große Typo, große Bilder, Side-Rail sichtbar.
- Key-Visual im Hero gebündelt (Bild + Video), ohne separate Scroll-Zoom-Sektion.

### 5.2 Mobile
- Side-Rail: **kollabiert** zu schmaler Progress-Leiste oder ausgeblendet; Inhalt linear.
- Typo-Skala bleibt **mutig**, nicht auf „Standard-Mobile“ zusammengestaucht.

### 5.3 Barrierefreiheit
- Video: nicht die einzige Info — Text immer parallel.
- `prefers-reduced-motion`: Rail-Animation und ggf. dekorative Motion reduzieren/abschalten.

---

## 6. Visuelle Sprache

### 6.1 Farbe
- **Basis:** `#000` / `#0a0a0a` (nicht bunte Grauverläufe).
- **Flächenwechsel:** reines **Off-White** `#f4f4f5` für Editorial-Abschnitte.
- **Rot:** nur für Labels, Linien, aktive Rail, CTAs, Akzentwörter.

### 6.2 Typografie
- **UI/Body:** Inter (lesbar, technisch).
- **Display:** Space Grotesk (geometrisch, industriell, kompatibel mit „Logo-Feeling“ ohne Logo zu imitieren).
- **Mono:** Geist Mono für Section-Indizes `[01]`.

### 6.3 Form
- **Keine** durchgehenden `rounded-3xl`-Karten.
- Wo nötig: `rounded-none` oder max. `rounded-sm` — **scharf**.

### 6.4 Bild
- `object-cover`, starke **Vignette/Gradient-Overlays** für Lesbarkeit.

---

## 7. Motion-Spezifikation

| Effekt | Wo | Regel |
|--------|-----|--------|
| Video autoplay | Signature | `muted`, `playsInline`, optional `play()` |
| Scroll-Zoom | `power` | `scale` 0.88 → 1.0 über Scroll-Fortschritt |
| Section-Reveal | alle | opacity + kleine Y-Verschiebung, **einmalig** |
| Rail | aktiv | Farbwechsel Rot, kein Springen |

**Verboten:** schwebende Blobs, generische Glow-Orgien, AI-Gradient-Hintergründe.

---

## 8. Technische Implementierung

### 8.1 Dateien (Zielstruktur)
- `docs/PRD-MARCATIS-INDUSTRIAL.md` — dieses Dokument
- `public/images/makatis-hero-laser.png` — Key-Visual
- `public/videos/makatis-laser-wordmark.mov` — Signature-Video
- `src/components/industrial/*` — modulare Sections
- `src/app/globals.css` — industrielle Tokens
- `src/app/page.tsx` — Komposition

### 8.2 Asset-Einbindung (Code)
- Bild: `next/image` mit `priority` für Hero.
- Video: `<video src="/videos/makatis-laser-wordmark.mov" />` + Hinweis auf MP4 für Prod.

---

## 9. No-Gos (Checkliste)

- [ ] Generische AI-Landing-Ästhetik (bunte Mesh-Gradienten, 3D-Blobs)
- [ ] Glassmorphism als Haupt-UI
- [ ] Icon-SaaS-Grids ohne Konzept
- [ ] Zufällige Micro-Animations-Flut
- [ ] Timide Typografie
- [ ] Schwache oder fehlende Key-Visuals

---

## 10. Erfolgskriterien

Die Seite wirkt wie: **„Hochwertiger Industriefilm als Website“** — Marcatis ist klar erkennbar, Laser ist **inhaltlich und visuell** im Zentrum, Referenz-Stil ist **Spannung und Disziplin**, nicht Kopiervorlage.

---

## 11. Nächste Schritte (nach Homepage)

- Kontakt-/Rechtstexte optisch angleichen
- MP4-Encoding Pipeline
- Optional: zweite Bildvariante für Story-Section
- Performance: Video preload strategy, LCP-Optimierung

---

## Appendix A — Hero-Sequenz (detailliert)

**Phase A — Signature (Viewport 1):** Vollschwarz, minimale Meta-Zeile (Ort / Leistungsklasse), zentriertes **Wordmark-Video**. Kein überladener Rahmen; Video ist der „Punch“. Darunter eine knappe Zeile „Lasergravur · Serienfestigkeit“ oder äquivalent aus Content.

**Phase B — Cinematic (Viewport 2):** Key-Visual **Vollbreite**, Headline in **2–4 Zeilen** wie Editorial (Auronix-Prinzip: Typo dominiert). Overlay: vertikaler Verlauf unten/oben für Lesbarkeit. Primär-CTA + sekundärer Link (Kontakt).

**Warum getrennt:** Die Referenz trennt oft „Markenmoment“ und „Bildwucht“. Technisch: zwei Sections für klare LCP-Strategie (Video kleiner, Bild groß mit `priority`).

---

## Appendix B — Side-Rail Interaktion

- **Position:** `fixed`, `right`, vertikal zentriert oder `top: 30vh`.
- **Zustand:** Aktive Section = **Rot** + evtl. kurze horizontale Linie.
- **Scroll-Spy:** `IntersectionObserver`, `rootMargin` ca. `-40% 0px -40% 0px` für stabile Aktivierung.
- **Mobile:** Rail ausblenden oder zu **horizontal progress dots** (unten fix) reduzieren.

---

## Appendix C — Scroll-Zoom (Power-Section)

- **Trigger:** Section mit `min-h-[120vh]` oder `200vh` scroll height, inneres Bild in `sticky` Container.
- **Transform:** `scale` von ~0.88 auf 1.0, `opacity` optional 0.95→1.
- **Reduced motion:** statisches Bild, `scale(1)`.

---

## Appendix D — Content-Mapping (PDF → Sections)

| PDF-Thema | Section |
|-----------|---------|
| Drei Kernverfahren | `capabilities` |
| Materialkompetenz | `position` + `facts` (Kurzlabels) |
| FAQ-Kern | `trust` (kompakt) |
| Kundenstimmen | `trust` |
| Kontakt / Lead | `contact` |

---

## Appendix E — Bildbeschreibung (User-Asset Laser-Foto)

Das bereitgestellte Key-Visual zeigt **Laserbearbeitung mit Funken**: dunkles Blech, hoher Kontrast, **energetisches** Licht — ideal für **schwarzen** Hintergrund-Overlay und **weiße** Typo. Übersetzung ins Design: **kein** zusätzlicher Farbverlauf außer Schwarz/Rot; das Bild liefert die **Energie**.
