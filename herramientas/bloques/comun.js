// Ayudas del generador, además de las del recorrido de Bloquino (lib.js).
// Se antepone al cuerpo de cada sesion-NN.js (ver armar.mjs).

// ── Circuitos ordenados, como los ejemplos de Bloquino ──────────────────────
// La protoboard va sobre la placa. Cada cable a un pin de arriba baja por su
// carril (k = 0 es el más cercano a la placa) y los que van a un riel bajan
// derecho. Para que no se crucen: de izquierda a derecha en la protoboard los
// pines van de mayor a menor (13 … 2), como en la placa; entre los cables que
// van hacia la derecha, el de más a la derecha lleva el carril más alto, y al
// revés entre los que van hacia la izquierda. 5V, GND.2 y A0 rodean la placa
// por la izquierda y por abajo. revisar() avisa si algo se cruza.
const colocar = (id, x, y) => page.evaluate(({ id, x, y }) => { const s = window.__s.useSimulatorStore.getState(); s.updateComponent(id, { x, y }); s.updateWirePositions(id); }, { id, x, y });

/** guardar() deja abierto el panel del programa, que tapa la paleta de componentes. */
const cerrarCodigo = async () => { await page.getByRole('button', { name: 'Código', exact: true }).click(); await espera(600); };

/** Protoboard donde la dejan los ejemplos de Bloquino: sobre la placa. */
async function tablero() {
  const proto = await agregar('Protoboard');
  await colocar(proto, -110, -230);
  await espera(300);
  return proto;
}

// Esquinas de un cable, como expresión sobre sus puntas (A, B) y la placa (P).
const DERECHO = '[{x:A.x,y:B.y}]';
const carril = (k) => `[{x:A.x,y:P.y-${14 + 9 * k}},{x:B.x,y:P.y-${14 + 9 * k}}]`;
const porAbajo = (k) => `[{x:A.x,y:P.y+${219 + 9 * k}},{x:B.x,y:P.y+${219 + 9 * k}}]`;

// Colores de los cables de señal, en orden; rojo y negro quedan para 5 V y tierra.
const SEÑALES = ['#0000cc', '#FF8C00', '#8B00FF', '#22c55e', '#FFD700', '#00FFFF', '#FF00FF', '#8B4513'];
const DEL_LED = { red: '#FF00FF', yellow: '#FFD700', green: '#22c55e' };

/** Tiende un cable con el mouse y le fija las esquinas y el color (el de una
 *  señal sale de SEÑALES si no se da; los de alimentación los pinta guardar). */
async function ruta(a, pinA, b, pinB, via, color) {
  if (!(await cable(a, pinA, b, pinB))) throw new Error(`cable ${pinA} → ${pinB}`);
  await page.evaluate(({ via, color, SEÑALES }) => {
    const s = window.__s.useSimulatorStore.getState();
    const cables = s.wires.filter((x) => !x.bb);
    const w = cables.at(-1);
    const deSeñal = (x) => ![x.start.pinName, x.end.pinName].some((p) => /^([tb][np]\.|GND|5V|V\+|VCC|VDD)/.test(p));
    const usados = cables.slice(0, -1).filter(deSeñal).map((x) => x.color);
    s.updateWire(w.id, {
      autoRouted: false,
      waypoints: new Function('A', 'B', 'P', 'return ' + via)(w.start, w.end, s.boards[0]),
      ...(deSeñal(w) && { color: color ?? SEÑALES.find((c) => !usados.includes(c)) ?? SEÑALES[0] }),
    });
  }, { via, color, SEÑALES });
  await espera(150);
}

/** Agujero del riel que queda justo bajo una columna (las columnas 8, 14, 20… no tienen). */
const riel = (col) => { for (let r = 1; r <= 50; r++) if (r + Math.floor((r - 1) / 5) + 2 === col) return r; throw new Error('sin riel bajo la columna ' + col); };
const aTierra = (proto, col) => ruta(proto, `${col}b.j`, proto, `bn.${riel(col)}`, DERECHO);
const a5V = (proto, col) => ruta(proto, `${col}b.j`, proto, `bp.${riel(col)}`, DERECHO);
const alPin = (proto, col, pin, k = 0, color) => ruta(proto, `${col}b.j`, 'uno', String(pin), carril(k), color);
/** Vuelta del riel − a la placa: por arriba (GND.1, a la izquierda del 13) o por abajo (GND.2). */
const tierraArriba = (proto, col, k = 0) => ruta(proto, `bn.${riel(col)}`, 'uno', 'GND.1', carril(k));
const tierraAbajo = (proto, col = 9) => ruta(proto, `bn.${riel(col)}`, 'uno', 'GND.2', porAbajo(1));
const cincoVolts = (proto, col = 11) => ruta(proto, `bp.${riel(col)}`, 'uno', '5V', porAbajo(0));

/** LED con la patita − en `col` y la + en `col + 1`, su 220 Ω al riel − y el cable al pin. */
async function ponerLed(proto, col, pin, k = 0, color = 'red') {
  const l = await agregar('LED');
  await asentar(l, 'C', proto, `${col}b.f`);
  const r = await asentar(await agregar('Resistencia'), '1', proto, `${col}b.g`);
  if (!r['2']?.startsWith('bn.')) nota(`RESISTENCIA de la columna ${col} no llegó al riel: ${JSON.stringify(r)}`);
  await page.evaluate(({ l, color }) => { const s = window.__s.useSimulatorStore.getState(); s.updateComponent(l, { properties: { ...s.components.find((c) => c.id === l).properties, color } }); }, { l, color });
  await alPin(proto, col + 1, pin, k, DEL_LED[color]);
  return l;
}

/** Perilla con la patita del medio en `col`: tierra a la izquierda, 5 V a la
 *  derecha y la señal a A0 rodeando la placa. Necesita cincoVolts(proto, 13). */
async function ponerPerilla(proto, col = 10) {
  const p = await agregar('Potenciómetro');
  await asentar(p, 'SIG', proto, `${col}b.f`);
  await aTierra(proto, col - 1);
  await a5V(proto, col + 1);
  await ruta(proto, `${col}b.j`, 'uno', 'A0', porAbajo(1));
  return p;
}

/** Servo a la derecha de la placa: la señal sube por el costado al carril 0
 *  (su pin tiene que ser el de más a la derecha de los que se usan) y la
 *  alimentación va a los rieles. */
async function ponerServo(proto, pin) {
  const s = await agregar('Servo');
  await colocar(s, 400, 100);
  await espera(300);
  await ruta(s, 'PWM', 'uno', String(pin), '[{x:P.x+288,y:A.y},{x:P.x+288,y:P.y-14},{x:B.x,y:P.y-14}]', '#FF8C00');
  await ruta(s, 'V+', proto, 'bp.39', '[{x:B.x,y:A.y}]');
  await ruta(s, 'GND', proto, 'bn.40', '[{x:B.x,y:A.y}]');
  return s;
}

/** Sensor de temperatura y humedad: S en `col`, + y − en las dos siguientes. */
async function ponerDht(proto, col, pin, k = 0) {
  const d = await agregar('Temperatura y humedad');
  await asentar(d, 'S', proto, `${col}b.f`);
  await alPin(proto, col, pin, k);
  await a5V(proto, col + 1);
  await aTierra(proto, col + 2);
  return d;
}

/** LED RGB de ánodo común (el del kit) arriba de la protoboard, como en el
 *  ejemplo 08 de Bloquino: R en `col`, la patita común en la siguiente y G y B
 *  en las dos que siguen; cada color con su 220 Ω a caballo del canal. La
 *  común va al riel +: necesita cincoVolts. */
async function ponerRgb(proto, col, r, g, b) {
  const led = await agregar('LED RGB');
  const a = await asentar(led, 'R', proto, `${col}t.a`);
  if (a.B !== `${col + 3}t.a`) nota('LED RGB mal asentado: ' + JSON.stringify(a));
  for (const [c, pin, color] of [[col, r, '#FF00FF'], [col + 2, g, '#22c55e'], [col + 3, b, '#0000cc']]) {
    await asentar(await agregar('Resistencia'), '1', proto, `${c}t.c`);
    await alPin(proto, c, pin, 0, color);
  }
  await ruta(proto, `${col + 1}t.e`, proto, `${col + 1}b.h`, '[]', '#cc0000'); // la patita común cruza el canal: es 5 V
  await a5V(proto, col + 1);
  return led;
}

/** Botón a caballo del canal: el pin en `col` y la tierra dos columnas a la izquierda. */
async function ponerBoton(proto, col, pin, k = 0) {
  const b = await agregar('Botón');
  await asentar(b, '1.l', proto, `${col}t.c`);
  await alPin(proto, col, pin, k);
  await aTierra(proto, col - 2);
  return b;
}

/** Buzzer con la patita del pin en `col` y la de tierra en `col + 1`. */
async function ponerBuzzer(proto, col, pin, k = 0) {
  const b = await agregar('Buzzer');
  const a = await asentar(b, '1', proto, `${col}b.f`);
  if (a['2'] !== `${col + 1}b.f`) nota('BUZZER mal asentado: ' + JSON.stringify(a));
  await alPin(proto, col, pin, k);
  await aTierra(proto, col + 1);
  return b;
}

/** Sensor de distancia: VCC en `col`, TRIG, ECHO y GND en las tres siguientes. */
async function ponerSensor(proto, col, trig, kTrig, echo, kEcho) {
  const s = await agregar('Sensor de distancia');
  const a = await asentar(s, 'VCC', proto, `${col}b.f`);
  if (a.GND !== `${col + 3}b.f`) nota('SENSOR mal asentado: ' + JSON.stringify(a));
  await a5V(proto, col);
  await alPin(proto, col + 1, trig, kTrig);
  await alPin(proto, col + 2, echo, kEcho);
  await aTierra(proto, col + 3);
  return s;
}

/** Cruces entre cables y cables que pasan sobre un componente que no es suyo. */
const revisar = () => page.evaluate(() => {
  const s = window.__s.useSimulatorStore.getState();
  const cables = s.wires.filter((w) => !w.bb).map((w) => {
    // Como los dibuja Bloquino: entre dos puntos que no están en línea, primero horizontal.
    const p = [w.start, ...(w.waypoints ?? []), w.end].flatMap((q, i, v) => (i && v[i - 1].x !== q.x && v[i - 1].y !== q.y ? [{ x: q.x, y: v[i - 1].y }, q] : [q]));
    return { n: `${w.start.pinName}→${w.end.pinName}`, ids: [w.start.componentId, w.end.componentId], seg: p.slice(1).map((q, i) => [p[i], q]) };
  });
  const dentro = (v, p, q) => v > Math.min(p, q) + 0.5 && v < Math.max(p, q) - 0.5;
  const corta = ([a, b], [c, d]) => {
    const h1 = Math.abs(a.y - b.y) < 0.5, h2 = Math.abs(c.y - d.y) < 0.5;
    if (h1 !== h2) { const [H, V] = h1 ? [[a, b], [c, d]] : [[c, d], [a, b]]; return dentro(V[0].x, H[0].x, H[1].x) && dentro(H[0].y, V[0].y, V[1].y); }
    // Paralelos: encimados si van por la misma línea y se pisan.
    const [k, l] = h1 ? ['y', 'x'] : ['x', 'y'];
    return Math.abs(a[k] - c[k]) < 3 && Math.min(Math.max(a[l], b[l]), Math.max(c[l], d[l])) - Math.max(Math.min(a[l], b[l]), Math.min(c[l], d[l])) > 3;
  };
  const cruces = [];
  for (let i = 0; i < cables.length; i++) for (let j = i + 1; j < cables.length; j++)
    if (cables[i].seg.some((s1) => cables[j].seg.some((s2) => corta(s1, s2)))) cruces.push(cables[i].n + ' × ' + cables[j].n);
  const cajas = s.components.filter((c) => !c.metadataId.startsWith('breadboard')).map((c) => { const el = document.getElementById(c.id); return { id: c.id, n: c.metadataId, x: c.x, y: c.y, w: el.offsetWidth, h: el.offsetHeight }; });
  cajas.push({ id: 'arduino-uno', n: 'placa', x: s.boards[0].x + 6, y: s.boards[0].y + 16, w: 262, h: 170 });
  for (const c of cables) for (const k of cajas) {
    if (c.ids.includes(k.id)) continue;
    if (c.seg.some(([p, q]) => Math.max(p.x, q.x) > k.x + 2 && Math.min(p.x, q.x) < k.x + k.w - 2 && Math.max(p.y, q.y) > k.y + 2 && Math.min(p.y, q.y) < k.y + k.h - 2)) cruces.push(c.n + ' sobre ' + k.n);
  }
  return cruces;
});

/** Arma el resultado de un programa: lo carga, comprueba que compila y
 *  simula, captura sus bloques (scripts lado a lado) y guarda el .bloquino. */
async function guardar(nombre, bloques, variables = []) {
  // Cables a tierra negros y a 5 V rojos. Bloquino solo lo hace con el cable
  // que empieza en el riel o en el pin; aquí también con el que termina ahí.
  await page.evaluate(() => {
    const s = window.__s.useSimulatorStore.getState();
    for (const w of s.wires.filter((w) => !w.bb)) {
      const pines = [w.start.pinName, w.end.pinName];
      const color = pines.some((p) => /^([tb]n\.|GND)/.test(p)) ? '#000000' : pines.some((p) => /^([tb]p\.|5V|V\+|VCC|VDD)/.test(p)) ? '#cc0000' : w.color;
      if (color !== w.color) s.updateWire(w.id, { color });
    }
  });
  const cruces = await revisar();
  if (cruces.length) nota(`CRUCES en ${nombre}: ${cruces.join('; ')}`);
  await page.mouse.move(700, 740);
  await page.screenshot({ path: SALIDA + nombre + '.circuito.jpg', type: 'jpeg', quality: 80 });
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
