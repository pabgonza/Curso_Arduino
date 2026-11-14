// Ayudas del generador, además de las del recorrido de Bloquino (lib.js).
// Se antepone al cuerpo de cada sesion-NN.js (ver armar.mjs).

/** Arma el resultado de un programa: lo carga, comprueba que compila y
 *  simula, captura sus bloques (scripts lado a lado) y guarda el .bloquino. */
async function guardar(nombre, bloques, variables = []) {
  const sketch = await programar(bloques, variables);
  const r = { simula: await simular() };
  await detener();
  if (!r.simula) r.error = (await page.locator('.bq-error pre').first().innerText().catch(() => '')).slice(0, 300);
  await page.getByRole('button', { name: 'Código', exact: true }).click();
  await espera(1500);
  // Panel de bloques ancho y alto, bloques a escala fija, scripts en fila.
  await page.setViewportSize({ width: 2600, height: 2600 });
  await page.evaluate(() => { document.querySelector('.bq-lateral').style.width = '2500px'; dispatchEvent(new Event('resize')); });
  await espera(600);
  const caja = await page.evaluate(async () => {
    const B = (await import('/src/blocks/blockly.ts')).Blockly;
    const ws = B.getMainWorkspace();
    ws.setScale(0.75); // la escala del panel (0.675) más un 10 %
    // Scripts en fila; el que pasaría de 1100 px de imagen baja a otra fila.
    let x = 0, y = 0, alto = 0;
    for (const b of ws.getTopBlocks(true)) {
      const { width, height } = b.getHeightWidth();
      if (x && (x + width) * 0.75 > 1100) [x, y, alto] = [0, y + alto + 50, 0];
      b.moveTo(new B.utils.Coordinate(x, y));
      x += width + 50;
      alto = Math.max(alto, height);
    }
    ws.scrollCenter();
    await new Promise((res) => setTimeout(res, 300));
    const r = ws.getCanvas().getBoundingClientRect();
    return { x: r.x - 12, y: r.y - 12, width: r.width + 24, height: r.height + 24 };
  });
  await page.screenshot({ path: SALIDA + nombre + '.png', clip: caja });
  r.tamaño = Math.round(caja.width) + '×' + Math.round(caja.height);
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.evaluate((n) => { document.querySelector('.bq-lateral').style.width = ''; window.prompt = () => n; }, nombre);
  const [d] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Descargar', exact: true }).click()]);
  await d.saveAs(SALIDA + nombre + '.bloquino');
  R[nombre] = r.simula ? `ok ${r.tamaño}` : r;
  void sketch;
}
