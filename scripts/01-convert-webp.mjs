import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.resolve('fotos-pagina-web');
const outputDir = path.resolve('fotos-pagina-web-webp');

if (!fs.existsSync(inputDir)) {
  console.error(`Error: No existe el directorio de origen ${inputDir}`);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertAllToWebp() {
  console.log('--- PASO 1: CONVERSIÓN A .WEBP CON ALTA COMPRESIÓN ---');
  console.log(`Leyendo fotos desde: ${inputDir}`);

  const allFiles = fs.readdirSync(inputDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });

  console.log(`Total de imágenes detectadas: ${allFiles.length}`);

  let totalOriginalBytes = 0;
  let totalWebpBytes = 0;
  let processedCount = 0;

  for (const file of allFiles) {
    const srcPath = path.join(inputDir, file);
    const baseName = path.basename(file, path.extname(file));
    // Guardamos el nombre normalizado en .webp
    const outFileName = `${baseName}.webp`;
    const destPath = path.join(outputDir, outFileName);

    try {
      const stat = fs.statSync(srcPath);
      totalOriginalBytes += stat.size;

      // Compresión WebP optimizada: max 1600px, quality 80, effort 4

      await sharp(srcPath)
        .rotate() // Respeta orientación EXIF
        .resize({
          width: 1600,
          height: 1600,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({
          quality: 80,
          effort: 4,
          smartSubsample: true,
        })
        .toFile(destPath);

      const webpStat = fs.statSync(destPath);
      totalWebpBytes += webpStat.size;
      processedCount++;

      if (processedCount % 20 === 0 || processedCount === allFiles.length) {
        console.log(`[${processedCount}/${allFiles.length}] Convertidas...`);
      }
    } catch (err) {
      console.error(`Error convirtiendo ${file}:`, err.message);
    }
  }

  const origMB = (totalOriginalBytes / (1024 * 1024)).toFixed(2);
  const webpMB = (totalWebpBytes / (1024 * 1024)).toFixed(2);
  const reduction = (((totalOriginalBytes - totalWebpBytes) / totalOriginalBytes) * 100).toFixed(1);

  console.log('\n--- RESULTADOS DE LA CONVERSIÓN ---');
  console.log(`Archivos procesados: ${processedCount}/${allFiles.length}`);
  console.log(`Peso original total: ${origMB} MB`);
  console.log(`Peso nuevo en WebP:  ${webpMB} MB`);
  console.log(`Ahorro de espacio:   ${reduction}%`);
  console.log(`Destino WebP temporal: ${outputDir}\n`);
}

convertAllToWebp().catch((err) => {
  console.error('Fallo en script 01:', err);
  process.exit(1);
});
