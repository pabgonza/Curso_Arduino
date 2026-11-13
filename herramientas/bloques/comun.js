// Ayudas del generador, además de las del recorrido de Bloquino (lib.js).
// Se antepone al cuerpo de cada sesion-NN.js (ver armar.mjs).

/** Sensor de distancia en la protoboard (VCC en `col`), como sensorDistancia
 *  de lib.js. Mide sus patitas en el dibujo: los cuadros de pin del HC-SR04
 *  quedan corridos respecto del dibujo y el arrastre de lib.js no lo asienta. */
async function sensorEn(proto, col) {
  const s = await agregar('Sensor de distancia');
  for (let i = 0; i < 3 && (await asientos(s)).VCC !== `${col}b.f`; i++) {
    const hasta = await posPin(proto, `${col}b.f`);
    const { desde, a } = await page.evaluate((id) => {
      const el = document.getElementById(id);
      const r = el.shadowRoot.querySelector('svg').getBoundingClientRect();
      const p = el.pinInfo.find((x) => x.name === 'VCC');
      const z = r.width / el.shadowRoot.querySelector('svg').width.baseVal.value;
      return { desde: { x: r.left + p.x * z, y: r.top + p.y * z }, a: { x: r.left + r.width / 2, y: r.top + r.height / 3 } };
    }, s);
    await page.mouse.move(a.x, a.y);
    await page.mouse.down();
    await page.mouse.move(a.x + (hasta.x - desde.x) / 2, a.y + (hasta.y - desde.y) / 2, { steps: 6 });
    await page.mouse.move(a.x + hasta.x - desde.x, a.y + hasta.y - desde.y, { steps: 8 });
    await page.mouse.up();
    await espera(400);
  }
  if ((await asientos(s)).GND !== `${col + 3}b.f`) nota('SENSOR mal asentado: ' + JSON.stringify(await asientos(s)));
  await cable(proto, `${col}b.j`, proto, `bp.${col - 4}`);
  await cable(proto, `${col + 1}b.j`, 'uno', '9');
  await cable(proto, `${col + 2}b.j`, 'uno', '10');
  await cable(proto, `${col + 3}b.j`, proto, `bn.${col + 2}`);
  return s;
}

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
    ws.setScale(1.1);
    let x = 0;
    for (const b of ws.getTopBlocks(true)) {
      b.moveTo(new B.utils.Coordinate(x, 0));
      x += b.getHeightWidth().width + 50;
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
