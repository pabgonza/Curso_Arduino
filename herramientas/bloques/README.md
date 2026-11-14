# Programas del curso en bloques

Arma en Bloquino (`../Plataforma_Arduino_Bloques/repo`) cada programa del
curso: circuito de la sesión + bloques, lo simula, captura la imagen de los
bloques y guarda el `.bloquino`. Usa el arnés de Playwright de Bloquino
(`scripts/recorrido/lib.js`).

- `sesion-NN.js`: arma el circuito de la sesión y llama a
  `guardar('<carpeta de sketches>', [scripts], variables)` por programa. El
  comentario inicial dice en qué se aparta cada programa de su `.ino`.
- `comun.js`: `guardar` (captura los bloques y guarda el `.bloquino`).
- `armar.mjs`: arma los guiones y copia los resultados al curso.
- `sesion-02-pantallazos.js`: capturas de Bloquino de la sesión 2
  (`recursos/img/pantallazos/bq-*.jpg`; se copian a mano).
- `revisar-slides.js`: revisión de una sesión a 1280×720 (desborde, imágenes
  rotas, «Ver el código» sin C++, una captura por slide).

## Correrlo

Con el frontend de Bloquino en 5173 (`npx vite` en `frontend/`) y su backend
arriba, desde `Plataforma_Arduino_Bloques/repo`:

```powershell
node scripts/recorrido/conv.mjs
node ../../Curso_Arduino/herramientas/bloques/armar.mjs 02 03 04
```

En el MCP de Playwright (`browser_run_code_unsafe`), por sesión:

```js
async (page) => {
  await page.goto('http://localhost:5173/editor?alumno', { timeout: 90000 });
  const cargar = async (n) => {
    const mod = await page.evaluate((n) => fetch('/.recorrido/' + n + '.js?raw&t=' + Date.now()).then((r) => r.text()), n);
    return (0, eval)('(' + JSON.parse(mod.slice(mod.indexOf('"'), mod.lastIndexOf('"') + 1)) + ')')(page);
  };
  await cargar('instalar');
  return cargar('curso-03');
}
```

Cada programa devuelve `ok <ancho>×<alto>` o el error de compilación; `notas`
lista piezas que no se asentaron. Después:

```powershell
node ../../Curso_Arduino/herramientas/bloques/armar.mjs --copiar
```

copia las imágenes a `recursos/img/bloques/sesion-NN/`, los `.bloquino` a
`sketches/sesion-NN/<nombre>/` y el C++ de cada uno a `slides/assets/codigo.js`
(el popup «Ver el código»).
