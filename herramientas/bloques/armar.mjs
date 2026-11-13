// Generador de los programas del curso en bloques (ver README.md).
//   node herramientas/bloques/armar.mjs 02 03 ...   arma los guiones para Playwright
//   node herramientas/bloques/armar.mjs --copiar     copia lo generado al curso
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const curso = join(aqui, '../..');
const bloquino = join(curso, '../Plataforma_Arduino_Bloques/repo');
const salida = join(bloquino, '.playwright-mcp/curso-bloques');
const recorrido = join(bloquino, 'frontend/.recorrido');

if (process.argv[2] === '--copiar') {
  const codigo = {};
  for (const s of readdirSync(salida).sort()) {
    const img = join(curso, 'recursos/img/bloques', `sesion-${s}`);
    mkdirSync(img, { recursive: true });
    for (const f of readdirSync(join(salida, s))) {
      const nombre = f.replace(/\.(png|bloquino)$/, '');
      if (f.endsWith('.png')) copyFileSync(join(salida, s, f), join(img, f));
      if (!f.endsWith('.bloquino')) continue;
      const dir = join(curso, 'sketches', `sesion-${s}`, nombre);
      mkdirSync(dir, { recursive: true });
      const texto = readFileSync(join(salida, s, f), 'utf8');
      writeFileSync(join(dir, f), texto);
      const archivos = Object.values(JSON.parse(texto).fileGroups)[0];
      codigo[`sesion-${s}/${nombre}`] = archivos.find((a) => a.name.endsWith('.ino')).content.replace('// Generado desde bloques\n', '');
    }
  }
  writeFileSync(
    join(curso, 'slides/assets/codigo.js'),
    `// Generado por herramientas/bloques/armar.mjs --copiar: el C++ que generan los bloques de cada programa.\nwindow.CODIGO = ${JSON.stringify(codigo, null, 1)};\n`,
  );
  console.log(Object.keys(codigo).length, 'programas copiados');
} else {
  // Las ayudas del recorrido (instalar.js) las arma su propio conv.mjs.
  const lib = readFileSync(join(bloquino, 'scripts/recorrido/lib.js'), 'utf8');
  const nombres = [...lib.matchAll(/^(?:async )?function (\w+)|^const (\w+) =/gm)].map((m) => m[1] ?? m[2]);
  const comun = readFileSync(join(aqui, 'comun.js'), 'utf8');
  mkdirSync(recorrido, { recursive: true });
  for (const s of process.argv.slice(2)) {
    const dir = join(salida, s);
    mkdirSync(dir, { recursive: true });
    const cuerpo = readFileSync(join(aqui, `sesion-${s}.js`), 'utf8');
    writeFileSync(
      join(recorrido, `curso-${s}.js`),
      `async (page) => {\nconst { ${nombres.join(', ')} } = page.__h;\nconst SALIDA = ${JSON.stringify(dir.replace(/\\/g, '/') + '/')};\nlog.length = 0;\nconst R = {};\n${comun}\ntry {\n${cuerpo}\n} catch (e) { R.error = String(e.message ?? e).slice(0, 300); }\nR.notas = [...log];\nreturn R;\n}\n`,
    );
  }
  if (!existsSync(join(recorrido, 'instalar.js'))) console.log('Falta instalar.js: node scripts/recorrido/conv.mjs en Bloquino');
}
