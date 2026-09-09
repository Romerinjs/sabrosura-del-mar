export interface SedeTelefono {
  numero: string;
  tipo: string;
  href: string;
}

export interface SedeBadge {
  texto: string;
  tipo: 'gold' | 'teal';
}

export interface SedeHorario {
  texto: string;
  detalle: string;
}

export interface SedeWhatsApp {
  phone: string;
  mensaje: string;
}

export interface SedeFrontmatter {
  id: string;
  nombre: string;
  badge: SedeBadge;
  descripcion: string;
  direccion: string;
  sector?: string;
  ciudad: string;
  horario: SedeHorario;
  telefonos: SedeTelefono[];
  domicilios: boolean;
  parqueadero: boolean;
  detalleParqueadero?: string;
  mapsUrl: string;
  whatsapp: SedeWhatsApp;
}
