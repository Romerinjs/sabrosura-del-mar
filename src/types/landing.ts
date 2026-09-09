export interface CtaButton {
  label: string;
  href: string;
  icon?: string;
}

export interface HeroBadge {
  icon: string;
  text: string;
  href?: string;
}

export interface HeroFrontmatter {
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  lead: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  ctas: {
    primary: CtaButton;
    secondary: CtaButton;
  };
  badges: HeroBadge[];
}

export interface IntroFrontmatter {
  eyebrow: string;
  title: string;
  figure: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
  ctas: {
    primary: CtaButton;
    secondary: CtaButton;
  };
}

export interface DiferencialItem {
  id: string;
  icono: string;
  titulo: string;
  descripcion: string;
}

export interface DiferencialesFrontmatter {
  eyebrow: string;
  title: string;
  diferenciales: DiferencialItem[];
}

export interface TimelineMilestone {
  hito: string;
  descripcion: string;
}

export interface HistoriaFrontmatter {
  eyebrow: string;
  title: string;
  lead: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  timeline: TimelineMilestone[];
  conclusion: string;
}

export interface PlatoDestacado {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioAlt?: number;
  notaPrecio?: string;
  imagen?: string | null;
  alt?: string;
  wide?: boolean;
  destacado?: boolean;
}

export interface PlatosDestacadosFrontmatter {
  eyebrow: string;
  title: string;
  lead: string;
  cta: CtaButton;
  platos: PlatoDestacado[];
}

export interface ContactoCanal {
  id: string;
  icono: string;
  titulo: string;
  subtitulo: string;
  textoPrincipal?: string;
  enlaces?: Array<{
    texto: string;
    href: string;
    destacado?: boolean;
  }>;
}

export interface ContactoFrontmatter {
  eyebrow: string;
  title: string;
  lead: string;
  canales: ContactoCanal[];
  avisoReservas: string;
}
