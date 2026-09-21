import fs from 'fs';
import path from 'path';

const webpSourceDir = path.resolve('fotos-pagina-web-webp');
const organizedOutputDir = path.resolve('fotos-organizadas');

if (!fs.existsSync(webpSourceDir)) {
  console.error(`Error: No existe el directorio ${webpSourceDir}. Ejecuta primero el paso 1.`);
  process.exit(1);
}

// Mapeo canónico de platos con sus rangos numéricos iniciales
const DISH_DEFINITIONS = [
  { start: 1, name: 'Viudo de Sierra', slug: 'viudo-de-sierra' },
  { start: 6, name: 'Cazuela de Camarones', slug: 'cazuela-de-camarones' },
  { start: 10, name: 'Salmón Gratinado', slug: 'salmon-gratinado' },
  { start: 15, name: 'Pasta a la Marinera', slug: 'pasta-a-la-marinera' },
  { start: 21, name: 'Arroz de Camarón con Ostras', slug: 'arroz-de-camaron-con-ostras' },
  { start: 26, name: 'Arroz de Camarón', slug: 'arroz-de-camaron' },
  { start: 31, name: 'Ejecutivo de Sierra Sudada', slug: 'ejecutivo-de-sierra-sudada' },
  { start: 36, name: 'Soda Italiana Frutos Rojos', slug: 'soda-italiana-frutos-rojos' },
  { start: 40, name: 'Ejecutivo de Trucha Frita', slug: 'ejecutivo-de-trucha-frita' },
  { start: 45, name: 'Limonada Cerezada', slug: 'limonada-cerezada' },
  { start: 49, name: 'Sancocho de Bagre', slug: 'sancocho-de-bagre' },
  { start: 54, name: 'Ceviche de Camarón', slug: 'ceviche-de-camaron' },
  { start: 58, name: 'Ejecutivo Mojarra', slug: 'ejecutivo-mojarra' },
  { start: 64, name: 'Camarones Apanados', slug: 'camarones-apanados' },
  { start: 70, name: 'Ejecutivo de Filete de Basa Apanado', slug: 'ejecutivo-de-filete-de-basa-apanado' },
  { start: 75, name: 'Sancocho de Pargo', slug: 'sancocho-de-pargo' },
  { start: 80, name: 'Bocachico Sudado', slug: 'bocachico-sudado' },
  { start: 85, name: 'Mojarra Frita', slug: 'mojarra-frita' },
  { start: 90, name: 'Cazuela de Mariscos', slug: 'cazuela-de-mariscos' },
  { start: 96, name: 'Arroz a la marinera con Coco', slug: 'arroz-a-la-marinera-con-coco' },
  { start: 101, name: 'Trucha a la Plancha', slug: 'trucha-a-la-plancha' },
  { start: 107, name: 'Arroz a la Marinera', slug: 'arroz-a-la-marinera' },
  { start: 113, name: 'Langosta Rellena', slug: 'langosta-rellena' },
  { start: 119, name: 'Entrada de Camarones al Ajillo', slug: 'entrada-de-camarones-al-ajillo' },
  { start: 123, name: 'Sierra a la Carta', slug: 'sierra-a-la-carta' },
  { start: 130, name: 'Langostinos en Salsa Marinera', slug: 'langostinos-en-salsa-marinera' },
  { start: 135, name: 'Ejecutivo de Basa Frita', slug: 'ejecutivo-de-basa-frita' },
];

function getDishForNumber(num) {
  for (let i = DISH_DEFINITIONS.length - 1; i >= 0; i--) {
    if (num >= DISH_DEFINITIONS[i].start) {
      return DISH_DEFINITIONS[i];
    }
  }
  return null;
}

async function organizePhotos() {
  console.log('--- PASO 2: ORGANIZACIÓN DE FOTOS POR SUBCARPETAS Y PLATOS ---');

  if (fs.existsSync(organizedOutputDir)) {
    fs.rmSync(organizedOutputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(organizedOutputDir, { recursive: true });

  const files = fs.readdirSync(webpSourceDir);
  const dishCounts = {};

  let platosCount = 0;
  let equipoCount = 0;
  let espaciosCount = 0;

  for (const file of files) {
    const src = path.join(webpSourceDir, file);

    if (file.toUpperCase().startsWith('PLATOS-')) {
      const match = file.match(/^PLATOS-(\d+)/i);
      if (!match) continue;
      const num = parseInt(match[1], 10);
      const dish = getDishForNumber(num);

      if (dish) {
        const dishFolder = path.join(organizedOutputDir, 'carta', dish.slug);
        fs.mkdirSync(dishFolder, { recursive: true });

        // Guardamos con nombre normalizado limpio: plato-<num>.webp
        const destFileName = `plato-${num}.webp`;
        const dest = path.join(dishFolder, destFileName);
        fs.copyFileSync(src, dest);

        dishCounts[dish.slug] = (dishCounts[dish.slug] || 0) + 1;
        platosCount++;
      }
    } else if (file.toUpperCase().startsWith('EQUIPO')) {
      const equipoFolder = path.join(organizedOutputDir, 'equipo');
      fs.mkdirSync(equipoFolder, { recursive: true });
      fs.copyFileSync(src, path.join(equipoFolder, file.toLowerCase()));
      equipoCount++;
    } else if (file.toUpperCase().startsWith('ESPACIOS')) {
      const espaciosFolder = path.join(organizedOutputDir, 'espacios');
      fs.mkdirSync(espaciosFolder, { recursive: true });
      fs.copyFileSync(src, path.join(espaciosFolder, file.toLowerCase()));
      espaciosCount++;
    }
  }

  console.log(`\nFotos de platos organizadas: ${platosCount}`);
  console.log(`Fotos de equipo organizadas: ${equipoCount}`);
  console.log(`Fotos de espacios organizadas: ${espaciosCount}`);
  console.log('\n--- DESGLOSE POR PLATO ---');
  for (const d of DISH_DEFINITIONS) {
    console.log(`  [${d.start.toString().padStart(3, ' ')}] ${d.name.padEnd(36, ' ')} -> ${dishCounts[d.slug] || 0} fotos (${d.slug})`);
  }
  console.log(`\nCarpetas organizadas creadas con éxito en: ${organizedOutputDir}\n`);
}

organizePhotos().catch((err) => {
  console.error('Fallo en script 02:', err);
  process.exit(1);
});
