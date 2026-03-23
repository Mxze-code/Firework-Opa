/**
 * Offizielle Marcatis-Fotos aus /public/photos/marcatis (Quelle: Projektordner Photos).
 * Zuordnung nach Verfahren — nicht gegen Mischpult austauschen.
 *
 * `imageObjectClass` / `objectPositionMobile`: vollständige Tailwind-Klassen (inkl. `object-cover`
 * und `md:`), damit JIT die Utilities zuverlässig erzeugt. Optional `mobileSrc` am Hero: eigenes Phone-Asset.
 */
const p = (name: string) => `/photos/marcatis/${name}`;

export const marcatisPhotos = {
  hero: {
    src: p("image-laser.png"),
    alt: "Laserbearbeitung bei Marcatis — industrieller Schneidprozess mit hohem Kontrast",
    /**
     * Eine Zeile für Tailwind-JIT: Mobile-Fokus (Laserkopf / Funken rechts-oben),
     * Desktop-Zentrierung leicht nach links unten für Panorama-Komposition.
     * Optional: `mobileSrc` ergänzen für eigenes Mobile-Asset.
     */
    imageObjectClass: "object-cover object-[82%_26%] md:object-[52%_42%]",
    /** Nur wenn `mobileSrc` gesetzt: reines Desktop-Bild (ohne Mobile-Focal in derselben URL). */
    imageObjectClassDesktopOnly: "object-cover object-[52%_42%]",
  },
  procedures: {
    laserbeschriftung: {
      src: p("Laserbeschriftung-marcatis-1.jpg"),
      alt: "Laserbeschriftung — industrielle Kennzeichnung auf Metall",
      imageObjectClass: "object-cover object-[48%_40%] md:object-center",
    },
    laserfeinschneiden: {
      src: p("Laserfeinschneiden-marcatis-1.jpg"),
      alt: "Laserfeinschneiden — filigrane Kontur und Kantenqualität",
      imageObjectClass: "object-cover object-[58%_38%] md:object-center",
    },
    gravur: {
      src: p("Lasergravur-marcatis-1.jpg"),
      alt: "Lasergravur — Gravur und Strukturierung auf Werkstückoberfläche",
      imageObjectClass: "object-cover object-[50%_36%] md:object-center",
    },
  },
  capabilitiesCuttingWide: {
    src: p("Laserfeinschneiden-marcatis-4.jpg"),
    alt: "Laserfeinschneiden — Wabengeometrie und präzise Schnittführung",
  },
  capabilitiesReliefAndLogo: {
    relief: {
      src: p("Lasergravur-marcatis-3.jpg"),
      alt: "3D-Lasergravur — reliefartige Oberflächenstruktur",
    },
    logo: {
      src: p("Lasergravur-marcatis-4.jpg"),
      alt: "Lasergravur — präzise Logo- und Symbolgravur auf Metall",
    },
  },
  trustPrecisionPair: {
    micro: {
      src: p("Lasergravur-marcatis-5.jpg"),
      alt: "Feinstgravur — Mikrostruktur und höchste Detailauflösung",
    },
    detailCut: {
      src: p("Laserfeinschneiden-marcatis-5.jpg"),
      alt: "Laserfeinschneiden — Detailaufnahme filigrane Geometrie",
    },
  },
  contactAmbient: {
    src: p("Lasergravur-marcatis-2.jpg"),
    alt: "Lasergravur auf zylindrischem Präzisionsteil",
  },
} as const;

/** Capabilities-Galerie — ein Karussell statt mehrerer großer Bildblöcke. */
export const capabilitiesGallerySlides = [
  {
    src: marcatisPhotos.capabilitiesCuttingWide.src,
    alt: marcatisPhotos.capabilitiesCuttingWide.alt,
    caption: "Feinschnitt — Wabengeometrie",
    imageObjectClass: "object-cover object-[56%_48%] md:object-center",
  },
  {
    src: marcatisPhotos.capabilitiesReliefAndLogo.relief.src,
    alt: marcatisPhotos.capabilitiesReliefAndLogo.relief.alt,
    caption: "3D-Gravur — Relief",
    imageObjectClass: "object-cover object-[52%_42%] md:object-center",
  },
  {
    src: marcatisPhotos.capabilitiesReliefAndLogo.logo.src,
    alt: marcatisPhotos.capabilitiesReliefAndLogo.logo.alt,
    caption: "Logo- & Symbolgravur",
    imageObjectClass: "object-cover object-[48%_44%] md:object-center",
  },
  {
    src: marcatisPhotos.trustPrecisionPair.micro.src,
    alt: marcatisPhotos.trustPrecisionPair.micro.alt,
    caption: "Feinstgravur — Mikrostruktur",
    imageObjectClass: "object-cover object-[50%_40%] md:object-center",
  },
  {
    src: marcatisPhotos.trustPrecisionPair.detailCut.src,
    alt: marcatisPhotos.trustPrecisionPair.detailCut.alt,
    caption: "Feinschnitt — Kantendetail",
    imageObjectClass: "object-cover object-[62%_36%] md:object-center",
  },
] as const;
