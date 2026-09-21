import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicAssetsDir = path.resolve('public/assets');
const logoPath = path.join(publicAssetsDir, 'logo.png');

if (!fs.existsSync(logoPath)) {
  console.error('Logo no encontrado en:', logoPath);
  process.exit(1);
}

async function generateCleanOgImages() {
  console.log('🎨 Generando Open Graph limpio: SOLO logo original sobre fondo azul petróleo...');

  // ----------------------------------------------------
  // 1. BANNER 1200 x 630 (Horizontal - Solo Logo Centrado)
  // ----------------------------------------------------
  const width = 1200;
  const height = 630;

  // Fondo azul petróleo limpio y elegante con un suave degradado radial abisal
  const svgLandscapeBg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="oceanBg" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="#0e3857" />
        <stop offset="50%" stop-color="#0a2540" />
        <stop offset="100%" stop-color="#051423" />
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#oceanBg)" />
  </svg>
  `;

  // Tamaño óptimo para el logo en 1200x630 (altura ~460px para que respire con márgenes perfectos)
  const logoLandscape = await sharp(logoPath)
    .resize({ height: 460, fit: 'inside' })
    .toBuffer();

  const logoLandscapeMeta = await sharp(logoLandscape).metadata();
  const leftLandscape = Math.round((width - (logoLandscapeMeta.width || 460)) / 2);
  const topLandscape = Math.round((height - (logoLandscapeMeta.height || 460)) / 2);

  await sharp(Buffer.from(svgLandscapeBg))
    .composite([
      {
        input: logoLandscape,
        top: topLandscape,
        left: leftLandscape,
      },
    ])
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(publicAssetsDir, 'og-image.jpg'));

  await sharp(Buffer.from(svgLandscapeBg))
    .composite([
      {
        input: logoLandscape,
        top: topLandscape,
        left: leftLandscape,
      },
    ])
    .png({ quality: 95 })
    .toFile(path.join(publicAssetsDir, 'og-image.png'));

  console.log('✅ og-image.jpg y og-image.png generados (1200x630 solo logo centrado).');

  // ----------------------------------------------------
  // 2. BANNER CUADRADO 800 x 800 (WhatsApp Square Preview)
  // ----------------------------------------------------
  const sqSize = 800;

  const svgSquareBg = `
  <svg width="${sqSize}" height="${sqSize}" viewBox="0 0 ${sqSize} ${sqSize}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="oceanBgSq" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="#0e3857" />
        <stop offset="50%" stop-color="#0a2540" />
        <stop offset="100%" stop-color="#051423" />
      </radialGradient>
    </defs>
    <rect width="${sqSize}" height="${sqSize}" fill="url(#oceanBgSq)" />
  </svg>
  `;

  const logoSquare = await sharp(logoPath)
    .resize({ width: 560, height: 560, fit: 'inside' })
    .toBuffer();

  const logoSquareMeta = await sharp(logoSquare).metadata();
  const leftSquare = Math.round((sqSize - (logoSquareMeta.width || 560)) / 2);
  const topSquare = Math.round((sqSize - (logoSquareMeta.height || 560)) / 2);

  await sharp(Buffer.from(svgSquareBg))
    .composite([
      {
        input: logoSquare,
        top: topSquare,
        left: leftSquare,
      },
    ])
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(publicAssetsDir, 'og-image-square.jpg'));

  await sharp(Buffer.from(svgSquareBg))
    .composite([
      {
        input: logoSquare,
        top: topSquare,
        left: leftSquare,
      },
    ])
    .png({ quality: 95 })
    .toFile(path.join(publicAssetsDir, 'og-image-square.png'));

  console.log('✅ og-image-square.jpg y og-image-square.png generados (800x800 solo logo centrado).');
}

generateCleanOgImages().catch(console.error);
