import fs from 'fs';
import path from 'path';

const dir = 'fotos-pagina-web';
const files = fs.readdirSync(dir);
const platos = files.filter(f => f.toUpperCase().startsWith('PLATOS-'));

const parsed = platos.map(f => {
  // Matches PLATOS-1 (Viudo de Sierra).jpg or PLATOS-90 - (Cazuela de Mariscos) .jpg
  const match = f.match(/^PLATOS-(\d+)(?:[ -]+)?(?:\((.*?)\))?/i);
  return {
    filename: f,
    num: match ? parseInt(match[1], 10) : 0,
    named: match && match[2] ? match[2].trim() : null
  };
}).sort((a, b) => a.num - b.num);

console.log('Total PLATOS files:', platos.length);
console.log('Range min:', parsed[0]?.num, 'max:', parsed[parsed.length - 1]?.num);

console.log('\n--- DISH MARKERS FOUND ---');
parsed.forEach(p => {
  if (p.named) {
    console.log(`Foto #${p.num} => Dish: "${p.named}" (file: ${p.filename})`);
  }
});
