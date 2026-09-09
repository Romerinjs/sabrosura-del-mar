export interface NavLink {
  label: string;
  href: string;
}

export interface SiteSocial {
  whatsapp: string;
  phone: string;
  phoneFormatted: string;
  landlineFormatted: string;
}

export interface SiteHorarios {
  general: string;
  apertura: string;
  cierre: string;
  dias: string;
}

export interface SiteFrontmatter {
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  themeColor: string;
  canonicalUrl: string;
  ogImage: string;
  locale: string;
  social: SiteSocial;
  nav: NavLink[];
  horarios: SiteHorarios;
  politicaReservas: string;
}
