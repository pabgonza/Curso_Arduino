// Sesión 6: servo en el pin 9 y perilla en A0; para la barrera y el saludo con
// botón, LED en el 13 y botón entre el pin 2 y GND.
// Diferencias con los .ino:
// - La perilla de Bloquino da de 0 a 100 (no de 0 a 1023): los map parten de 0-100.
// - «esperar» va en segundos: delay(15) es 0.015 y la cajita velocidad del saludo
//   guarda segundos (0.01 en vez de 10); en saludo_perilla se mapea a 2-40 y se divide por 1000.
// - «contar» solo sube: la vuelta (180 → 0, 120 → 60) cuenta hacia arriba y el
//   servo va a 180 − ángulo.
await nuevo();
await limpiar();
const proto = await agregar('Protoboard');
const pote = await agregar('Potenciómetro');
await asentar(pote, 'SIG', proto, '20b.f');
await cable(proto, '20b.j', 'uno', 'A0');
await cable(proto, '19b.i', proto, 'bn.15');
await cable(proto, '21b.i', proto, 'bp.19');
const servo = await agregar('Servo');
await cable(servo, 'PWM', 'uno', '9');
await cable(servo, 'V+', proto, 'bp.40');
await cable(servo, 'GND', proto, 'bn.40');
await ledConResistencia(proto, 30, '13');
const boton = await agregar('Botón');
await asentar(boton, '1.l', proto, '14t.c');
await cable(proto, '14t.a', 'uno', '2');
await cable(proto, '12b.j', proto, 'bn.10');
await cable(proto, 'bp.48', 'uno', '5V');
await cable(proto, 'bn.45', 'uno', 'GND.2');

const mover = (ANGULO, block) => ({ type: 'ab_servo', fields: { PIN: '9' }, inputs: { ANGULO: { shadow: { type: 'ab_angulo', fields: { ANGULO } }, ...(block && { block }) } } });
const contar = (DESDE, HASTA, ...bs) => ({ type: 'ab_contar', fields: { VAR: { id: 'a' } }, inputs: { DESDE: num(DESDE), HASTA: num(HASTA), DO: { block: cadena(bs) } } });
const angulo = { type: 'variables_get', fields: { VAR: { id: 'a' } } };
const vuelta = { type: 'ab_aritmetica', fields: { OP: '-' }, inputs: { A: num(180), B: { ...num(0), block: angulo } } };
const mapear = (C, D) => ({ type: 'ab_mapear', inputs: { X: { ...num(50), block: { type: 'ab_perilla', fields: { PIN: 'A0' } } }, A: num(0), B: num(100), C: num(C), D: num(D) } });
const velocidad = (VALUE) => ({ type: 'variables_set', fields: { VAR: { id: 'v' } }, inputs: { VALUE } });
const pausa = { type: 'ab_esperar', inputs: { S: { ...num(1), block: { type: 'variables_get', fields: { VAR: { id: 'v' } } } } } };
const saludo = [contar(60, 120, mover(90, angulo), pausa), contar(60, 120, mover(90, vuelta), pausa)];
const apretado = { type: 'ab_boton', fields: { PIN: '2' } };
const A = { name: 'ángulo', id: 'a' };
const V = { name: 'velocidad', id: 'v' };

await guardar('servo', [alIniciar(porSiempre(mover(0), esperarB(1), mover(180), esperarB(1)))]);
await guardar('barrido', [alIniciar(mover(0), esperarB(0.5), porSiempre(
  contar(0, 180, mover(90, angulo), esperarB(0.015)),
  contar(0, 180, mover(90, vuelta), esperarB(0.015)),
))], [A]);
await guardar('perilla', [alIniciar(porSiempre(mover(90, mapear(0, 180)), esperarB(0.015)))]);
await guardar('barrera', [alIniciar(mover(90), esperarB(0.5), porSiempre(siSino(apretado,
  [mover(0), led('HIGH', 13), esperarB(0.3), led('LOW', 13), esperarB(0.3)],
  [mover(90), esperarB(0.3), led('LOW', 13)],
)))]);
await guardar('saludo', [alIniciar(velocidad(num(0.01)), porSiempre(...saludo))], [A, V]);
await guardar('saludo_boton', [alIniciar(velocidad(num(0.01)), porSiempre(
  { type: 'ab_si', inputs: { COND: { block: apretado }, DO: { block: cadena(saludo) } } },
))], [A, V]);
await guardar('saludo_perilla', [alIniciar(porSiempre(
  velocidad({ ...num(0), block: { type: 'ab_aritmetica', fields: { OP: '/' }, inputs: { A: { ...num(0), block: mapear(2, 40) }, B: num(1000) } } }),
  ...saludo,
))], [A, V]);
