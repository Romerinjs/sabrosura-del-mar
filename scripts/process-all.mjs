import { execSync } from 'child_process';

console.log('====================================================');
console.log('  PROCESAMIENTO COMPLETO DE FOTOS - SABROSURA DEL MAR');
console.log('====================================================\n');

try {
  console.log('[1/3] Ejecutando: 01-convert-webp.mjs...');
  execSync('node scripts/01-convert-webp.mjs', { stdio: 'inherit' });

  console.log('\n[2/3] Ejecutando: 02-organize-dishes.mjs...');
  execSync('node scripts/02-organize-dishes.mjs', { stdio: 'inherit' });

  console.log('\n[3/3] Ejecutando: 03-relocate-to-public.mjs...');
  execSync('node scripts/03-relocate-to-public.mjs', { stdio: 'inherit' });

  console.log('\n====================================================');
  console.log('  ¡TODOS LOS PASOS COMPLETADOS SATISFACTORIAMENTE!');
  console.log('====================================================');
} catch (error) {
  console.error('\nError durante la ejecución del pipeline:', error.message);
  process.exit(1);
}
