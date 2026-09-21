import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const organizedDir = path.resolve('fotos-organizadas');
const publicDir = path.resolve('public');
const publicCartaDir = path.join(publicDir, 'carta');
const jsonOutputFile = path.resolve('src/data/dishes-gallery.json');

if (!fs.existsSync(organizedDir)) {
  console.error(`Error: No existe el directorio ${organizedDir}. Ejecuta primero los pasos 1 y 2.`);
  process.exit(1);
}

// Función recursiva para copiar directorios
function copyFolderSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function relocateAndGenerateCatalog() {
  console.log('--- PASO 3: REUBICACIÓN EN PUBLIC/CARTA Y GENERACIÓN DE CATÁLOGO ---');

  // Asegurar directorio public/carta
  if (!fs.existsSync(publicCartaDir)) {
    fs.mkdirSync(publicCartaDir, { recursive: true });
  }

  const organizedCarta = path.join(organizedDir, 'carta');
  if (fs.existsSync(organizedCarta)) {
    console.log(`Copiando subcarpetas de platos a: ${publicCartaDir}`);
    copyFolderSync(organizedCarta, publicCartaDir);
  }

  // Copiar también equipo y espacios a public si existen
  const organizedEquipo = path.join(organizedDir, 'equipo');
  if (fs.existsSync(organizedEquipo)) {
    const publicEquipo = path.join(publicDir, 'equipo');
    console.log(`Copiando fotos de equipo a: ${publicEquipo}`);
    copyFolderSync(organizedEquipo, publicEquipo);
  }

  const organizedEspacios = path.join(organizedDir, 'espacios');
  if (fs.existsSync(organizedEspacios)) {
    const publicEspacios = path.join(publicDir, 'espacios');
    console.log(`Copiando fotos de espacios a: ${publicEspacios}`);
    copyFolderSync(organizedEspacios, publicEspacios);
  }

  // Generar miniaturas ultraligeras (360px de ancho para thumbnails de lista)
  console.log('Generando miniaturas ultraligeras (thumbnails) para carga ultra rápida...');
  const dishFolders = fs.readdirSync(publicCartaDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const galleryCatalog = [];

  for (const folderName of dishFolders) {
    const folderPath = path.join(publicCartaDir, folderName);
    const files = fs.readdirSync(folderPath)
      .filter(f => f.endsWith('.webp') && !f.startsWith('thumb-'))
      .sort((a, b) => {
        const numA = parseInt((a.match(/\d+/) || [0])[0], 10);
        const numB = parseInt((b.match(/\d+/) || [0])[0], 10);
        return numA - numB;
      });

    const photoUrls = [];
    const thumbUrls = [];

    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      const thumbFileName = `thumb-${file}`;
      const thumbFullPath = path.join(folderPath, thumbFileName);

      // Generar miniatura si no existe aún
      if (!fs.existsSync(thumbFullPath)) {
        try {
          await sharp(fullPath)
            .resize(380, 280, { fit: 'cover', position: 'center' })
            .webp({ quality: 75 })
            .toFile(thumbFullPath);
        } catch (err) {
          console.error(`Error creando thumbnail para ${fullPath}:`, err.message);
        }
      }

      photoUrls.push(`/carta/${folderName}/${file}`);
      thumbUrls.push(`/carta/${folderName}/${thumbFileName}`);
    }

    // Título legible a partir del slug
    const readableName = folderName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    galleryCatalog.push({
      slug: folderName,
      name: readableName,
      cover: photoUrls[0] || null,
      coverThumb: thumbUrls[0] || photoUrls[0] || null,
      photos: photoUrls,
      thumbs: thumbUrls,
      totalPhotos: photoUrls.length,
    });
  }

  // Ordenar catálogo por número inicial si es posible
  galleryCatalog.sort((a, b) => {
    const numA = parseInt((a.cover?.match(/\d+/) || [0])[0], 10);
    const numB = parseInt((b.cover?.match(/\d+/) || [0])[0], 10);
    return numA - numB;
  });

  // Guardar catálogo JSON en src/data/dishes-gallery.json
  const jsonDir = path.dirname(jsonOutputFile);
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
  }

  fs.writeFileSync(jsonOutputFile, JSON.stringify(galleryCatalog, null, 2), 'utf-8');
  console.log(`Catálogo de platos generado con éxito en: ${jsonOutputFile}`);
  console.log(`Total de platos catalogados: ${galleryCatalog.length}`);
  console.log('\n¡Proceso de reubicación y optimización completado con éxito!');
}

relocateAndGenerateCatalog().catch((err) => {
  console.error('Fallo en script 03:', err);
  process.exit(1);
});
