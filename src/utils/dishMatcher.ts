import galleryDataRaw from '../data/dishes-gallery.json';

export interface DishGalleryItem {
  slug: string;
  name: string;
  cover: string;
  coverThumb: string;
  photos: string[];
  thumbs: string[];
  totalPhotos: number;
}

const galleryMap = new Map<string, DishGalleryItem>();
(galleryDataRaw as DishGalleryItem[]).forEach((item) => {
  galleryMap.set(item.slug, item);
});

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quita tildes
    .trim();
}

/**
 * MAPEO ESTRICTO 1 A 1:
 * Cada plato tiene ÚNICA Y EXCLUSIVAMENTE sus fotos reales tomadas en sesión.
 * Si un plato de la carta no fue fotografiado, retorna null para mostrar
 * el placeholder elegante de cámara ("Foto en preparación") y NUNCA
 * reutilizar fotos de otro plato diferente.
 */
const STRICT_DISH_MAP: Record<string, string> = {
  // 1. Viudo de Sierra (Fotos 1 a 5)
  'viudo de sierra': 'viudo-de-sierra',

  // 2. Cazuela de Camarones (Fotos 6 a 9)
  'cazuela de camarones': 'cazuela-de-camarones',
  'casuela de camarones': 'cazuela-de-camarones',

  // 3. Salmón Gratinado (Fotos 10 a 14) - ÚNICAMENTE Salmón Gratinado
  'salmon gratinado': 'salmon-gratinado',

  // 4. Pasta a la Marinera (Fotos 15 a 20) - ÚNICAMENTE Pasta a la Marinera
  'pasta a la marinera': 'pasta-a-la-marinera',

  // 5. Arroz de Camarón con Ostras (Fotos 21 a 25)
  'arroz de camaron con ostras': 'arroz-de-camaron-con-ostras',
  'arroz con camarones y ostras': 'arroz-de-camaron-con-ostras',

  // 6. Arroz de Camarón (Fotos 26 a 30)
  'arroz de camaron': 'arroz-de-camaron',
  'arroz con camarones': 'arroz-de-camaron',

  // 7. Ejecutivo de Sierra Sudada (Fotos 31 a 35)
  'ejecutivo de sierra sudada': 'ejecutivo-de-sierra-sudada',

  // 8. Soda Italiana Frutos Rojos (Fotos 36 a 39)
  'soda italiana frutos rojos': 'soda-italiana-frutos-rojos',
  'soda italiana': 'soda-italiana-frutos-rojos',

  // 9. Ejecutivo de Trucha Frita (Fotos 40 a 44)
  'ejecutivo de trucha frita': 'ejecutivo-de-trucha-frita',

  // 10. Limonada Cerezada (Fotos 45 a 48)
  'limonada cerezada': 'limonada-cerezada',
  'limonada de cereza': 'limonada-cerezada',

  // 11. Sancocho de Bagre (Fotos 49 a 53)
  'sancocho de bagre': 'sancocho-de-bagre',

  // 12. Ceviche de Camarón (Fotos 54 a 57) - ÚNICAMENTE Ceviche de Camarón
  'ceviche de camaron': 'ceviche-de-camaron',

  // 13. Ejecutivo Mojarra (Fotos 58 a 63)
  'ejecutivo mojarra': 'ejecutivo-mojarra',

  // 14. Camarones Apanados (Fotos 64 a 69) - ÚNICAMENTE Camarones Apanados
  'camarones apanados': 'camarones-apanados',

  // 15. Ejecutivo de Filete de Basa Apanado (Fotos 70 a 74)
  'ejecutivo de filete de basa apanado': 'ejecutivo-de-filete-de-basa-apanado',

  // 16. Sancocho de Pargo (Fotos 75 a 79)
  'sancocho de pargo': 'sancocho-de-pargo',

  // 17. Bocachico Sudado (Fotos 80 a 84)
  'bocachico sudado': 'bocachico-sudado',

  // 18. Mojarra Frita / Pescado Frito (Fotos 85 a 89)
  'mojarra frita': 'mojarra-frita',
  'pescado frito (mojarra)': 'mojarra-frita',
  'pescado frito': 'mojarra-frita',

  // 19. Cazuela de Mariscos (Fotos 90 a 95) - ÚNICAMENTE Cazuela de Mariscos
  'cazuela de mariscos': 'cazuela-de-mariscos',

  // 20. Arroz a la Marinera con Coco (Fotos 96 a 100)
  'arroz a la marinera con coco': 'arroz-a-la-marinera-con-coco',

  // 21. Trucha a la Plancha (Fotos 101 a 106) - ÚNICAMENTE Trucha a la Plancha
  'trucha a la plancha': 'trucha-a-la-plancha',

  // 22. Arroz a la Marinera (Fotos 107 a 112) - ÚNICAMENTE Arroz a la Marinera
  'arroz a la marinera': 'arroz-a-la-marinera',

  // 23. Langosta Rellena (Fotos 113 a 118)
  'langosta rellena': 'langosta-rellena',

  // 24. Entrada de Camarones al Ajillo (Fotos 119 a 122)
  'entrada de camarones al ajillo': 'entrada-de-camarones-al-ajillo',

  // 25. Sierra a la Carta (Fotos 123 a 129)
  'sierra a la carta': 'sierra-a-la-carta',

  // 26. Langostinos en Salsa Marinera (Fotos 130 a 134)
  'langostinos en salsa marinera': 'langostinos-en-salsa-marinera',

  // 27. Ejecutivo de Basa Frita (Fotos 135 a 138)
  'ejecutivo de basa frita': 'ejecutivo-de-basa-frita',
};

export function getDishGallery(dishName: string): DishGalleryItem | null {
  if (!dishName) return null;

  const normalized = normalizeText(dishName);

  // 1. Coincidencia estricta por tabla
  const slug = STRICT_DISH_MAP[normalized];
  if (slug && galleryMap.has(slug)) {
    return galleryMap.get(slug) || null;
  }

  // 2. Coincidencia por slug directo exacto
  const slugCandidate = normalized.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (galleryMap.has(slugCandidate)) {
    return galleryMap.get(slugCandidate) || null;
  }

  // Sin coincidencias: RETORNAR NULL (sin adivinanzas, sin reutilización indebida)
  return null;
}
