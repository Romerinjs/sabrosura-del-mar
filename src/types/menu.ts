export interface MenuItem {
  nombre: string;
  precio?: number;
  media?: number;
  precioAlt?: number;
  notaPrecio?: string;
  precioTexto?: string;
  descripcion?: string;
  destacado?: boolean;
}

export interface Subgrupo {
  nombre: string;
  items: MenuItem[];
}

export interface DestacadoCategoria {
  nombre: string;
  descripcion: string;
  precio: number;
  precioNota?: string;
  imagen?: string | null;
  pendienteFoto?: boolean;
  alt?: string;
}

export interface CategoriaMenu {
  id: string;
  nombre: string;
  resumen?: string;
  destacado?: DestacadoCategoria;
  items?: MenuItem[];
  subgrupos?: Subgrupo[];
  notaFinal?: string;
}

export interface MenuData {
  moneda: string;
  actualizado: string;
  nota: string;
  categorias: CategoriaMenu[];
}
