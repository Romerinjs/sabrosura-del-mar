import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processCutout(inputPath, outputPath, config) {
  console.log(`Procesando cutout para ${inputPath}...`);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const outputBuffer = Buffer.from(data);

  const cx = width * (config.cxRatio || 0.5);
  const cy = height * (config.cyRatio || 0.5);
  const rx = width * (config.rxRatio || 0.42);
  const ry = height * (config.ryRatio || 0.42);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Distancia elíptica normalizada desde el centro del plato
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const distSq = dx * dx + dy * dy;

      // Detección de fondo (madera oscura / tonos marrón-oscuro)
      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Es tabla de madera si es oscura o si está fuera del plato elíptico
      const isWoodColor = (luminance < 115 && r > b && (r - b) > 8) || luminance < 75;
      const isOutside = distSq > 1.0;

      let alpha = 255;

      if (distSq > 1.25) {
        // Totalmente fuera de la zona del plato
        alpha = 0;
      } else if (distSq > 0.85) {
        // Zona de borde / transición del plato
        const borderFactor = 1.0 - (distSq - 0.85) / 0.40;
        const clampedBorder = Math.max(0, Math.min(1, borderFactor));
        
        if (isWoodColor) {
          alpha = Math.round(clampedBorder * 255 * 0.2);
        } else {
          alpha = Math.round(clampedBorder * 255);
        }
      } else {
        // Dentro de la zona del plato
        if (isWoodColor && distSq > 0.65) {
          alpha = Math.round((1 - (distSq - 0.65) / 0.2) * 255);
        } else {
          alpha = 255;
        }
      }

      outputBuffer[idx + 3] = alpha;
    }
  }

  await sharp(outputBuffer, {
    raw: { width, height, channels: 4 }
  })
    .webp({ quality: 90, alphaQuality: 90 })
    .toFile(outputPath);

  console.log(`✓ Cutout guardado exitosamente en ${outputPath}`);
}

async function runAll() {
  const targetDir = 'public/carta-cutouts';
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 1. Ceviche de camarón
  await processCutout(
    'public/carta/ceviche-de-camaron/plato-54.webp',
    'public/carta-cutouts/ceviche-camaron-cutout.webp',
    { cxRatio: 0.5, cyRatio: 0.5, rxRatio: 0.38, ryRatio: 0.4 }
  );

  // 2. Mojarra frita / Pescado frito
  await processCutout(
    'public/carta/mojarra-frita/plato-85.webp',
    'public/carta-cutouts/mojarra-frita-cutout.webp',
    { cxRatio: 0.5, cyRatio: 0.5, rxRatio: 0.44, ryRatio: 0.42 }
  );

  // 3. Cazuela de mariscos
  await processCutout(
    'public/carta/cazuela-de-mariscos/plato-90.webp',
    'public/carta-cutouts/cazuela-mariscos-cutout.webp',
    { cxRatio: 0.5, cyRatio: 0.5, rxRatio: 0.44, ryRatio: 0.42 }
  );
}

runAll().catch(console.error);
