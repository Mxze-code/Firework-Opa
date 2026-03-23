/** Inhalte aus dem Website-Inventar — strukturiert für die Marcatis Industrial Homepage. */

/** Root-relative hash only — Next.js `Link` wendet `basePath` selbst an (kein doppeltes /Repo/Repo/). */
const homeHash = (id: string) => `/#${id}`;

export const company = {
  legalName: "Marcatis Laserbearbeitung GmbH",
  brand: "Marcatis",
  tagline: "Leidenschaft, die sichtbar bleibt.",
  street: "Zeppelinstraße 6",
  zip: "63741",
  city: "Aschaffenburg",
  country: "Deutschland",
  phone: "+49 6021 438 235 6",
  phoneTel: "+4960214382356",
  mobile: "+49 160 977 332 70",
  mobileTel: "+4916097733270",
  email: "info@marcatis.de",
  managingDirector: "Thomas Kimmel",
  taxNumber: "204/132/50855",
  vatId: "DE 314 552 175",
  registerCourt: "Amtsgericht Aschaffenburg",
  registerNumber: "HRB 14376",
} as const;

/** Google Maps: einheitliche Zieladresse für Embed + Routenplaner (Marker über Adresssuche). */
const MAP_DESTINATION = "Zeppelinstraße 6, 63741 Aschaffenburg, Deutschland";

export const companyMap = {
  embedSrc:
    "https://www.google.com/maps?q=" +
    encodeURIComponent(MAP_DESTINATION) +
    "&hl=de&z=17&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(MAP_DESTINATION),
} as const;

/** Top-Navigation — Anker entsprechen Section-IDs auf der Startseite. */
export const nav = [
  { href: homeHash("solutions"), label: "Solutions" },
  { href: homeHash("capabilities"), label: "Capabilities" },
  { href: homeHash("contact"), label: "Kontakt" },
] as const;

/** Capabilities — kompakte Kennzahlen (ohne lange Fließtexte). */
export const capabilitiesKpis = [
  { value: "10+", label: "Jahre Lasertechnik" },
  { value: "3", label: "Kernverfahren" },
  { value: "µm", label: "Feinschnitt-Toleranzen" },
] as const;

export const homeHero = {
  kicker: "Industrielle Laserbearbeitung",
  location: "Aschaffenburg",
  subline:
    "Präzision für Metall, Kunststoff und Spezialwerkstoffe — mit moderner Technik und über zehn Jahren Erfahrung.",
  ctaSecondary: "Profil & Kontakt",
} as const;

export const coreServices = [
  {
    id: "laserbeschriftung",
    name: "Laserbeschriftung",
    lead: "Dauerhaft, präzise, rückverfolgbar.",
    body: "Kennzeichnung auf Metallen und Kunststoffen — von Serienfertigung bis Medizintechnik.",
    points: ["Typenschilder · Codes · UDI", "Lackabtrag & Schichten", "Reproduzierbare Parameter"],
  },
  {
    id: "laserfeinschneiden",
    name: "Laserfeinschneiden",
    lead: "Gratfrei. Eng toleriert.",
    body: "Materialscho­nende Schnitte in dünnen Materialien — dort, wo Kanten und Mikrometer zählen.",
    points: ["Mikrometer-Toleranzen", "Federn · Dichtungen · Mikroteile", "Kleinserien mit kurzer Rüstzeit"],
  },
  {
    id: "gravur",
    name: "3D-Lasergravur",
    lead: "Tiefenführung auf komplexen Konturen.",
    body: "Gravuren auf gewölbten oder unregelmäßigen Oberflächen — Alternative zu Schleifen/Erodieren ohne Gefügeverlust.",
    points: ["Werkzeuge & Formeinsätze", "Mikrostrukturen", "Seriennummern auf Krümmungen"],
  },
] as const;

/** Kopfzeilen — Solutions-Section beginnt direkt mit den drei Verfahren. */
export const coreServicesSection = {
  kicker: "[00] — SOLUTIONS",
  title: "Drei Kernverfahren",
  subtitle:
    "Beschriftung, Feinschneiden und 3D-Gravur auf einen Blick — mit einem gemeinsamen Qualitätsmaßstab für Prototyp, Kleinserie und Integration.",
  pointsLabel: "MERKMALE & EINSATZ",
} as const;

export const whyMarcatis = {
  headline: "Prozesssicherheit von Muster bis Serie",
  intro:
    "Wir übersetzen Anforderungen in wiederholbare Laserprozesse — mit klaren Schnittstellen, messbarer Qualität und belastbarer Kommunikation.",
  highlights: [
    "Präzision & Verlässlichkeit — Mikrometer-Toleranzen, feste Termine, transparente Abstimmung.",
    "Industrie & Wirtschaftlichkeit — MES/ERP, Medizintechnik & Automotive; ACSYS-Anlagen und stabile Parameter.",
  ],
} as const;

/** Sektion „Kundenstimmen“ — Überschrift; optionaler Kurztext (nicht die Zitate selbst). */
export const trustSection = {
  headline: "Kundenstimmen",
  intro: "",
} as const;

/**
 * Kundenstimmen 1:1 wie auf https://www.marcatis.de/ (Absätze über \n\n).
 * Inhalt nicht kürzen oder umschreiben — nur Darstellung im UI anpassbar.
 */
export const testimonials = [
  {
    quote: `Wir haben einen professionellen und lokalen Partner für die Laserbeschriftung gesucht, unsere örtlichen Gruppenleiter sollten alle mit i-Pads ausgestattet werden. So kamen wir mit der Firma Marcatis in Kontakt. Die Beschriftung ist perfekt geworden. Auch in diesem Jahr haben wir wieder auf Marcatis zurückgegriffen.

Für unseren Kreiswettbewerb wollten wir nicht die üblichen Preise an die Teilnehmer verteilen, wir wollten etwas Neues.

Auch hier, super Beratung, super Ideen und eine perfekte Lasergravur. Danke für diese gute Zusammenarbeit. Wir kommen immer wieder auf Sie zurück.`,
    name: "Peter Kern",
    role: "Kreisleiter, Rotkreuz Jugendarbeit",
  },
  {
    quote: `Seit dem wir die Firma Beeftec gegründet haben ist die Marcatis GmbH unser Partner für Laserbeschriftungen und Lasergravuren. In der bereits mehrjährigen Zusammenarbeit erfreuen wir uns stets an einer herausragenden Qualität und Liefertreue. Darüber hinaus lassen uns

Know-How, Flexibilität sowie eine kundenorientierte Ausrichtung dieses Unternehmen jederzeit weiterempfehlen.`,
    name: "Fritz Kiener",
    role: "Geschäftsführer, Beeftec Grillgeräte",
  },
  {
    quote: `Seit Beginn unserer Geschäftsbeziehungen können wir guten Gewissens behaupten das die Zusammenarbeit mit Ihnen und Ihrem Team der Marcatis Laserbearbeitung GmbH sich zu einem eng vernetzen Arbeitsumfeld mit kurzen Kommunikationswegen und absoluter Transparenz entwickelt hat.

Die von Ihnen gebotene Qualität in Bezug auf Material/Preis/Logistik/Kundenbetreuung/Reklamationen wird nicht nur angeboten sondern auch 100% geliefert.

Diese Parameter sind ausschlaggebend für eine gute Zusammenarbeit. Deshalb werden Sie für uns auch in Zukunft weiterhin der Ansprechpartner für diese Fertigungstechniken sein. Vielen Dank für die bisherige Zusammenarbeit und auf weitere Projekte.`,
    name: "Martin Lehr",
    role: "Fertigungsleitung, VaW GmbH",
  },
  {
    quote: `Von Anfang an war die Zusammenarbeit von Vertrauen, Klarheit und einem echten Miteinander geprägt. Sehr zuverlässiges Team, fachlich top, menschlich mit viel Herz dabei.

Ob bei Material, Preisgestaltung, Logistik oder im persönlichen Austausch: Wir spüren immer wieder bei jedem Projekt, dass Qualität hier nicht nur ein Anspruch, sondern zu 100% gelebter Alltag ist.

Ganz klare Weiterempfehlung.`,
    name: "Alexander Klotz",
    role: "Inhaber, Orange Production",
  },
] as const;

export const contactTeaser = {
  headline: "Nächster Schritt",
  body: "Anforderungen senden — wir prüfen Machbarkeit, nennen Optionen und liefern ein verständliches Angebot. Von Prototyp bis Integration in Ihre Linie.",
} as const;

/** Vollständiges FAQ — inhaltlich an marcatis.de angelehnt. */
export const faqCompact = [
  {
    q: "Welche Materialien können mit Ihren Laserverfahren bearbeitet werden?",
    a: "Wir bearbeiten eine Vielzahl von Materialien — darunter Edelstahl, Aluminium, Messing, Kupfer, Kunststoffe (z. B. ABS, POM, PA), Keramik, Glas, Graphit und Verbundstoffe. Die Auswahl des passenden Lasertyps erfolgt je nach Anwendung und Materialeigenschaft.",
  },
  {
    q: "Wie tief kann mit einem Laser graviert werden?",
    a: "Bei der 3D-Lasergravur sind Gravurtiefen von bis zu mehreren Millimetern möglich — abhängig vom Material und der gewünschten Geometrie. Für Werkzeuggravuren oder Funktionsstrukturen setzen wir leistungsstarke Systeme mit hochpräziser Tiefensteuerung ein.",
  },
  {
    q: "Ist Laserbeschriftung dauerhaft und beständig?",
    a: "Ja. Unsere Laserbeschriftungen sind abriebfest, temperatur- und chemikalienbeständig. Sie eignen sich für industrielle Anwendungen mit hohen Anforderungen an Langlebigkeit, etwa im Maschinenbau, in der Medizintechnik oder der Automobilindustrie.",
  },
  {
    q: "Warum 3-D-Gravur und 3-D-Abtrag?",
    a: "Sie können damit Spannuten oder Elektroden wirtschaftlicher und technisch genauer herstellen — als Alternative zu Schleifen oder Erodieren, ohne Gefügeveränderungen.",
  },
  {
    q: "Welche Dateiformate benötigen Sie?",
    a: "Wir arbeiten mit den gängigen CAD-Formaten wie STEP, DXF, IGES, STL oder PDF. Für Gravuren oder Logos können auch Vektorformate wie AI, EPS oder SVG verwendet werden. Gerne unterstützen wir Sie bei der Datenaufbereitung.",
  },
  {
    q: "Wie genau ist das Laserfeinschneiden?",
    a: "Wir erreichen Schnittspalte und Toleranzen im Bereich von wenigen Mikrometern — je nach Material und Bauteildicke. Die Kanten sind gratfrei und müssen in der Regel nicht nachbearbeitet werden.",
  },
  {
    q: "Warum entlasten wir Sie und Ihr Unternehmen?",
    a: "Weil Sie keine Maschinen, Ressourcen und Mitarbeiter mehr vorhalten müssen.",
  },
  {
    q: "Wie läuft die Zusammenarbeit ab?",
    a: "Sie senden uns Ihre Anforderungen (CAD-Daten, Zeichnungen, Materialangaben), und wir prüfen die technische Machbarkeit. Nach Freigabe erhalten Sie ein individuelles Angebot. Wir fertigen nach Ihren Vorgaben — ob Prototyp, Kleinserie oder Serienproduktion.",
  },
  {
    q: "Können Ihre Laserprozesse in bestehende Produktionslinien integriert werden?",
    a: "Ja. Wir bieten sowohl eigenständige Fertigungsdienstleistungen als auch Beratung und Umsetzung für die Integration von Lasersystemen in automatisierte Fertigungslinien — inklusive Schnittstellen zu MES- und ERP-Systemen.",
  },
  {
    q: "Wie schnell sind Lieferzeiten?",
    a: "Für Standardmaterialien und etablierte Prozesse sind Muster und Kleinserien oft kurzfristig lieferbar. Bei Serienfertigung oder komplexen Anwendungen legen wir Wert auf eine zuverlässige und termintreue Planung — abgestimmt auf Ihren Bedarf.",
  },
] as const;

/** FAQ-Block — Überschriften (an klassischer Startseite). */
export const faqSection = {
  kicker: "PRAXIS",
  title: "FAQ",
} as const;
