import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicAssetsDir = path.resolve('public/assets');
const logoPath = path.join(publicAssetsDir, 'logo.png');

if (!fs.existsSync(logoPath)) {
  console.error('Logo no encontrado en:', logoPath);
  process.exit(1);
}

async function generateOpenGraphImages() {
  console.log('🎨 Generando banners Open Graph premium con fondo azul petróleo...');

  const width = 1200;
  const height = 630;

  // ----------------------------------------------------
  // 1. BANNER PRINCIPAL 1200 x 630 (Diseño de Alto Impacto)
  // ----------------------------------------------------
  const svgLandscape = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradiente Azul Petróleo Abisal -->
      <radialGradient id="oceanGlow" cx="45%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#114b6e" stop-opacity="0.9" />
        <stop offset="35%" stop-color="#0a2e46" stop-opacity="0.98" />
        <stop offset="70%" stop-color="#051928" stop-opacity="1" />
        <stop offset="100%" stop-color="#020d16" stop-opacity="1" />
      </radialGradient>

      <!-- Resplandor Dorado de Fondo para el Logo -->
      <radialGradient id="goldGlow" cx="270" cy="315" r="280">
        <stop offset="0%" stop-color="#d99a3f" stop-opacity="0.32" />
        <stop offset="45%" stop-color="#d99a3f" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#d99a3f" stop-opacity="0" />
      </radialGradient>

      <!-- Gradiente Dorado Metálico -->
      <linearGradient id="goldLinear" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fae3a8" />
        <stop offset="40%" stop-color="#d99a3f" />
        <stop offset="100%" stop-color="#966116" />
      </linearGradient>

      <!-- Gradiente Turquesa Marina -->
      <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2b90ad" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#14738f" stop-opacity="0.1" />
      </linearGradient>

      <!-- Filtro de Sombra Suave -->
      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
      
      <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
    </defs>

    <!-- Fondo Base Azul Petróleo -->
    <rect width="${width}" height="${height}" fill="#051928" />
    <rect width="${width}" height="${height}" fill="url(#oceanGlow)" />

    <!-- Olas marinas estilizadas en el fondo -->
    <path d="M-100,480 C220,400 520,570 880,470 C1080,410 1240,460 1350,440 L1350,650 L-100,650 Z" fill="url(#tealGrad)" opacity="0.18" />
    <path d="M-100,530 C300,460 620,610 990,520 C1140,480 1280,510 1350,500 L1350,650 L-100,650 Z" fill="#03111b" opacity="0.55" />

    <!-- Marco elegante perimetral con filete dorado fino -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="18" fill="none" stroke="url(#goldLinear)" stroke-width="1.6" stroke-opacity="0.4" />
    <rect x="34" y="34" width="${width - 68}" height="${height - 68}" rx="14" fill="none" stroke="#2b90ad" stroke-width="0.8" stroke-opacity="0.22" />

    <!-- Acentos en las 4 esquinas interiores -->
    <circle cx="46" cy="46" r="3" fill="#d99a3f" opacity="0.7" />
    <circle cx="${width - 46}" cy="46" r="3" fill="#d99a3f" opacity="0.7" />
    <circle cx="46" cy="${height - 46}" r="3" fill="#d99a3f" opacity="0.7" />
    <circle cx="${width - 46}" cy="${height - 46}" r="3" fill="#d99a3f" opacity="0.7" />

    <!-- Resplandor circular cálido detrás del logo -->
    <circle cx="270" cy="315" r="260" fill="url(#goldGlow)" />

    <!-- Badge superior: "ARMENIA, QUINDÍO • RESTAURANTE DE COMIDA DE MAR" -->
    <g transform="translate(540, 95)" filter="url(#badgeShadow)">
      <rect x="0" y="0" width="440" height="36" rx="18" fill="#082238" fill-opacity="0.95" stroke="url(#goldLinear)" stroke-width="1" />
      <circle cx="24" cy="18" r="4" fill="#d99a3f" />
      <text x="228" y="23" font-family="'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="12.5" font-weight="700" fill="#f5d78e" letter-spacing="2.5" text-anchor="middle">
        ARMENIA, QUINDÍO • SABOR COSTEÑO
      </text>
      <circle cx="416" cy="18" r="4" fill="#d99a3f" />
    </g>

    <!-- Título Principal con tipografía serif de lujo -->
    <g transform="translate(540, 195)">
      <text font-family="'Fraunces', 'Georgia', 'Times New Roman', serif" font-size="46" font-weight="800" fill="#ffffff" filter="url(#softShadow)">
        La Sabrosura del Mar
      </text>
      <line x1="0" y1="18" x2="340" y2="18" stroke="url(#goldLinear)" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- Subtítulo / Propuesta de Valor -->
    <g transform="translate(540, 268)">
      <text font-family="'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="400" fill="#e1f1f7" opacity="0.95">
        Auténtica comida de mar, cazuelas, ceviches
      </text>
      <text y="30" font-family="'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="400" fill="#e1f1f7" opacity="0.95">
        y pescados frescos con porciones generosas.
      </text>
    </g>

    <!-- Píldoras / Especialidades de la Casa -->
    <g transform="translate(540, 365)">
      <!-- Pill 1 -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="150" height="36" rx="18" fill="#0d3550" stroke="#2b90ad" stroke-width="1" />
        <text x="75" y="23" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">Pescados Fritos</text>
      </g>
      <!-- Pill 2 -->
      <g transform="translate(160, 0)">
        <rect x="0" y="0" width="125" height="36" rx="18" fill="#0d3550" stroke="#2b90ad" stroke-width="1" />
        <text x="62.5" y="23" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">Cazuelas</text>
      </g>
      <!-- Pill 3 -->
      <g transform="translate(295, 0)">
        <rect x="0" y="0" width="125" height="36" rx="18" fill="#0d3550" stroke="#2b90ad" stroke-width="1" />
        <text x="62.5" y="23" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">Ceviches</text>
      </g>
      <!-- Pill 4 -->
      <g transform="translate(430, 0)">
        <rect x="0" y="0" width="165" height="36" rx="18" fill="#0d3550" stroke="#2b90ad" stroke-width="1" />
        <text x="82.5" y="23" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">Arroces Marineros</text>
      </g>
    </g>

    <!-- Footer Bar: Sedes y Website -->
    <g transform="translate(540, 480)">
      <!-- Sede info -->
      <g transform="translate(0, 0)">
        <circle cx="10" cy="8" r="4" fill="#d99a3f" />
        <text x="24" y="14" font-family="'Segoe UI', Roboto, sans-serif" font-size="16.5" font-weight="600" fill="#ffffff">
          2 Sedes: <tspan fill="#f5d78e" font-weight="700">Centro</tspan> (Cra 13 # 21-32) y <tspan fill="#f5d78e" font-weight="700">Norte</tspan> (Cra 19 # 15N-40)
        </text>
      </g>
      
      <!-- Dominio web -->
      <g transform="translate(0, 44)">
        <rect x="0" y="-12" width="220" height="34" rx="17" fill="#144d6b" fill-opacity="0.8" stroke="#2b90ad" stroke-width="1" />
        <text x="110" y="10" font-family="'Segoe UI', Roboto, sans-serif" font-size="14.5" font-weight="700" fill="#ffffff" letter-spacing="0.8" text-anchor="middle">
          lasabrosuradelmar.com
        </text>
        <text x="240" y="10" font-family="'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="#bad6e8">
          • Domicilios &amp; Reservas en Línea
        </text>
      </g>
    </g>
  </svg>
  `;

  // Process and resize the logo to composite on left
  const logoResizedLandscape = await sharp(logoPath)
    .resize(440, 440, { fit: 'inside' })
    .toBuffer();

  const landscapeOverlaySvgBuffer = Buffer.from(svgLandscape);

  // Generate 1200x630 JPEG (high compatibility with WhatsApp & Facebook)
  await sharp(landscapeOverlaySvgBuffer)
    .composite([
      {
        input: logoResizedLandscape,
        top: 95,
        left: 55,
      },
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(publicAssetsDir, 'og-image.jpg'));

  // Also generate high-quality PNG
  await sharp(landscapeOverlaySvgBuffer)
    .composite([
      {
        input: logoResizedLandscape,
        top: 95,
        left: 55,
      },
    ])
    .png({ quality: 95 })
    .toFile(path.join(publicAssetsDir, 'og-image.png'));

  console.log('✅ Creado og-image.jpg (1200x630) y og-image.png');

  // ----------------------------------------------------
  // 2. BANNER CUADRADO 800 x 800 (WhatsApp Square Thumbnails & Avatars)
  // ----------------------------------------------------
  const svgSquare = `
  <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="oceanGlowSq" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#144d6b" stop-opacity="0.92" />
        <stop offset="45%" stop-color="#0a2e46" stop-opacity="0.98" />
        <stop offset="85%" stop-color="#051826" stop-opacity="1" />
        <stop offset="100%" stop-color="#020d16" stop-opacity="1" />
      </radialGradient>

      <radialGradient id="goldGlowSq" cx="400" cy="315" r="260">
        <stop offset="0%" stop-color="#d99a3f" stop-opacity="0.32" />
        <stop offset="60%" stop-color="#d99a3f" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#d99a3f" stop-opacity="0" />
      </radialGradient>

      <linearGradient id="goldLinearSq" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5d78e" />
        <stop offset="50%" stop-color="#d99a3f" />
        <stop offset="100%" stop-color="#a46d20" />
      </linearGradient>

      <filter id="softShadowSq" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.5"/>
      </filter>
    </defs>

    <!-- Fondo Base Azul Petróleo -->
    <rect width="800" height="800" fill="#051826" />
    <rect width="800" height="800" fill="url(#oceanGlowSq)" />

    <!-- Marcos dorados -->
    <rect x="24" y="24" width="752" height="752" rx="20" fill="none" stroke="url(#goldLinearSq)" stroke-width="1.8" stroke-opacity="0.45" />
    <rect x="34" y="34" width="732" height="732" rx="14" fill="none" stroke="#2b90ad" stroke-width="0.8" stroke-opacity="0.25" />

    <!-- Resplandor bajo el logo -->
    <circle cx="400" cy="305" r="250" fill="url(#goldGlowSq)" />

    <!-- Badge superior -->
    <g transform="translate(400, 70)">
      <rect x="-170" y="0" width="340" height="34" rx="17" fill="#082238" fill-opacity="0.95" stroke="url(#goldLinearSq)" stroke-width="1" />
      <circle cx="-145" cy="17" r="3.5" fill="#d99a3f" />
      <text x="0" y="22" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#f5d78e" letter-spacing="2.5" text-anchor="middle">
        ARMENIA • QUINDÍO
      </text>
      <circle cx="145" cy="17" r="3.5" fill="#d99a3f" />
    </g>

    <!-- Texto Inferior -->
    <g transform="translate(400, 565)">
      <text font-family="'Fraunces', 'Georgia', serif" font-size="38" font-weight="800" fill="#ffffff" text-anchor="middle" filter="url(#softShadowSq)">
        La Sabrosura del Mar
      </text>
      
      <text y="38" font-family="'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#d9edf3" text-anchor="middle">
        Restaurante de Comida de Mar &amp; Sabor Costeño
      </text>

      <text y="72" font-family="'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#f5d78e" letter-spacing="0.5" text-anchor="middle">
        Cazuelas • Pescados • Ceviches • Arroces
      </text>

      <g transform="translate(0, 115)">
        <rect x="-135" y="-18" width="270" height="36" rx="18" fill="#144d6b" stroke="#2b90ad" stroke-width="1" />
        <text x="0" y="5" font-family="'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#ffffff" letter-spacing="0.8" text-anchor="middle">
          lasabrosuradelmar.com
        </text>
      </g>
    </g>
  </svg>
  `;

  const logoResizedSquare = await sharp(logoPath)
    .resize(410, 410, { fit: 'inside' })
    .toBuffer();

  const squareOverlaySvgBuffer = Buffer.from(svgSquare);

  await sharp(squareOverlaySvgBuffer)
    .composite([
      {
        input: logoResizedSquare,
        top: 110,
        left: 195,
      },
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(publicAssetsDir, 'og-image-square.jpg'));

  await sharp(squareOverlaySvgBuffer)
    .composite([
      {
        input: logoResizedSquare,
        top: 110,
        left: 195,
      },
    ])
    .png({ quality: 95 })
    .toFile(path.join(publicAssetsDir, 'og-image-square.png'));

  console.log('✅ Creado og-image-square.jpg (800x800) y og-image-square.png');
}

generateOpenGraphImages().catch(console.error);
