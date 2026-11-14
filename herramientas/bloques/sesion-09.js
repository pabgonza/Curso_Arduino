// Sesión 9: LED RGB (R 3, G 5, B 6, patita común a GND), cada color con su
// 220 Ω. Se suman la perilla en A0 (rueda_perilla) y el HC-SR04 con TRIG 9 y
// ECHO 10 (lampara_humor), los dos en la protoboard con los rieles de 5 V y GND.
// Diferencias con los .ino:
// - color(r, g, b) es un bloque propio de Mis bloques, «definir color (r) (g)
//   (b)» con tres «fijar pin» (3, 5, 6), y sale en C++ como la función del
//   .ino, con float en vez de int (el bloque del LED RGB solo tiene 10 colores
//   fijos). rueda(pos) también: «definir rueda (pos)».
// - respiracion no usa color: presenta el «fijar pin» con un solo pin.
// - Dentro de la rueda, la posición dentro del tramo va en la variable
//   `tramo` (en el .ino se reusa el parámetro pos, y una entrada no se puede
//   cambiar).
// - rueda_perilla y lampara_humor le pasan la cuenta directo a la rueda, sin
//   la variable pos; en arcoiris la variable que da la vuelta se llama giro
//   (si se llamara pos, en C++ la entrada saldría como pos_entrada).
// - Los for que bajan de 255 a 0 son «contar de 0 a 255» con 255 − brillo.
// - rueda_perilla: map(A0, 0, 1023, 0, 255) en vez de analogRead(A0) / 4.
// - lampara_humor: el bloque de distancia (cm con decimales; sin eco da 400
//   y no 0, así que sin mano queda azul en vez de rojo); los dos if de recorte
//   son un «restringir entre 5 y 50».
// - Las variables de bloques son float; los valores son los mismos enteros.
await nuevo();
await limpiar();
const proto = await agregar('Protoboard');
const rgb = await agregar('LED RGB');
const asiento = await asentar(rgb, 'R', proto, '30b.f');
for (const [patita, pin] of [['R', '3'], ['G', '5'], ['B', '6']]) {
  const col = Number(asiento[patita]?.match(/^\d+/)?.[0]);
  const res = await agregar('Resistencia');
  await asentar(res, '1', proto, `${col}t.c`);
  await cable(proto, `${col}t.a`, 'uno', pin);
}
await cable(proto, asiento.COM.replace(/\w$/, 'j'), proto, 'bn.24');
await cable(proto, 'bn.45', 'uno', 'GND.2');
const pote = await agregar('Potenciómetro');
await asentar(pote, 'SIG', proto, '22b.f');
await cable(proto, '22b.j', 'uno', 'A0');
await cable(proto, '21b.i', proto, 'bn.17');
await cable(proto, '23b.i', proto, 'bp.21');
await sensorDistancia(proto, 8);
await cable(proto, 'bp.48', 'uno', '5V');

const n = (x) => (typeof x === 'number' ? num(x) : { ...num(0), block: x });
const pwm = (PIN, x) => ({ type: 'ab_pin_pwm', fields: { PIN }, inputs: { VALOR: n(x) } });
// Mis bloques: «definir color (r) (g) (b)» y sus usos.
const COLOR = [{ tipo: 'nombre', texto: 'color', id: 'n' }, ...['r', 'g', 'b'].map((e) => ({ tipo: 'numero', texto: e, id: e }))];
const entrada = (e, definicion = 'color', fija = false) => ({ type: 'ab_entrada', ...(fija && { deletable: false }), extraState: { definicion, entrada: e, tipo: 'numero', texto: e } });
const DEFINIR_COLOR = {
  type: 'ab_definir',
  extraState: { id: 'color', partes: COLOR },
  inputs: Object.fromEntries(['r', 'g', 'b'].map((e) => [e, { block: entrada(e, 'color', true) }])),
  next: { block: cadena([pwm('3', entrada('r')), pwm('5', entrada('g')), pwm('6', entrada('b'))]) },
};
const color = (r, g, b) => ({ type: 'ab_mi_bloque', extraState: { definicion: 'color', partes: COLOR }, inputs: { r: n(r), g: n(g), b: n(b) } });
const variable = (id) => ({ type: 'variables_get', fields: { VAR: { id } } });
const fijar = (id, x) => ({ type: 'variables_set', fields: { VAR: { id } }, inputs: { VALUE: n(x) } });
const op = (A, OP, B) => ({ type: 'ab_aritmetica', fields: { OP }, inputs: { A: n(A), B: n(B) } });
const mapear = (X, A, B, C, D) => ({ type: 'ab_mapear', inputs: { X: n(X), A: n(A), B: n(B), C: n(C), D: n(D) } });
const comentario = (TEXTO) => ({ type: 'ab_comentario', fields: { TEXTO } });
const contar = (...cuerpo) => ({ type: 'ab_contar', fields: { VAR: { id: 'b' } }, inputs: { DESDE: num(0), HASTA: num(255), DO: { block: cadena(cuerpo) } } });
const tramo = variable('t');
const brillo = variable('b');
const bajando = op(255, '-', brillo);
// Mis bloques: «definir rueda (pos)» y sus usos.
const RUEDA_PARTES = [{ tipo: 'nombre', texto: 'rueda', id: 'n' }, { tipo: 'numero', texto: 'pos', id: 'pos' }];
const pos = () => entrada('pos', 'rueda');
const DEFINIR_RUEDA = {
  type: 'ab_definir',
  extraState: { id: 'rueda', partes: RUEDA_PARTES },
  inputs: { pos: { block: entrada('pos', 'rueda', true) } },
  next: { block: siSino(comparar(n(pos()), '<', num(85)),
    [comentario('rojo → verde'), color(op(255, '-', op(pos(), '*', 3)), op(pos(), '*', 3), 0)],
    [siSino(comparar(n(pos()), '<', num(170)),
      [comentario('verde → azul'), fijar('t', op(pos(), '-', 85)), color(0, op(255, '-', op(tramo, '*', 3)), op(tramo, '*', 3))],
      [comentario('azul → rojo'), fijar('t', op(pos(), '-', 170)), color(op(tramo, '*', 3), 0, op(255, '-', op(tramo, '*', 3)))])]) },
};
const rueda = (x) => ({ type: 'ab_mi_bloque', extraState: { definicion: 'rueda', partes: RUEDA_PARTES }, inputs: { pos: n(x) } });
const RUEDA = [{ name: 'tramo', id: 't' }];
const BRILLO = [{ name: 'brillo', id: 'b' }];

await guardar('mezcla', [alIniciar(porSiempre(
  comentario('naranjo'), color(255, 120, 0), esperarB(1),
  comentario('morado'), color(150, 0, 255), esperarB(1),
  comentario('celeste'), color(0, 200, 255), esperarB(1),
  comentario('rosado'), color(255, 60, 120), esperarB(1),
  comentario('amarillo (¡rojo + verde!)'), color(255, 255, 0), esperarB(1),
  comentario('blanco'), color(255, 255, 255), esperarB(1),
)), DEFINIR_COLOR]);
await guardar('respiracion', [alIniciar(porSiempre(
  comentario('inhala: sube el brillo'), contar(pwm('3', brillo), esperarB(0.005)),
  comentario('exhala: lo baja'), contar(pwm('3', bajando), esperarB(0.005)),
))], BRILLO);
await guardar('rueda_perilla', [alIniciar(porSiempre(
  rueda(mapear({ type: 'ab_leer_analogico', fields: { PIN: 'A0' } }, 0, 1023, 0, 255)),
)), DEFINIR_RUEDA, DEFINIR_COLOR], RUEDA);
await guardar('lampara_humor', [alIniciar(porSiempre(
  fijar('d', { type: 'ab_restringir', inputs: { X: n({ type: 'ab_distancia', fields: { DISPARO: '9', ECO: '10' } }), A: num(5), B: num(50) } }),
  rueda(mapear(variable('d'), 5, 50, 0, 255)),
  esperarB(0.03),
)), DEFINIR_RUEDA, DEFINIR_COLOR], [{ name: 'distancia', id: 'd' }, ...RUEDA]);
await guardar('respira_color', [alIniciar(porSiempre(
  comentario('inhala: morado (150, 0, 255) de apagado a todo'), contar(color(mapear(brillo, 0, 255, 0, 150), 0, brillo), esperarB(0.005)),
  comentario('exhala'), contar(color(mapear(bajando, 0, 255, 0, 150), 0, bajando), esperarB(0.005)),
)), DEFINIR_COLOR], BRILLO);
await guardar('fiesta', [alIniciar(porSiempre(
  color(...[0, 0, 0].map(() => ({ type: 'ab_azar', inputs: { A: num(0), B: num(255) } }))), esperarB(0.5),
)), DEFINIR_COLOR]);
await guardar('arcoiris', [alIniciar(porSiempre(
  rueda(variable('g')),
  { type: 'math_change', fields: { VAR: { id: 'g' } }, inputs: { DELTA: num(1) } },
  { type: 'ab_si', inputs: { COND: { block: comparar(n(variable('g')), '>', num(255)) }, DO: { block: fijar('g', 0) } } },
  esperarB(0.02),
)), DEFINIR_RUEDA, DEFINIR_COLOR], [{ name: 'giro', id: 'g' }, ...RUEDA]);
