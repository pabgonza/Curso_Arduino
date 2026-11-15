// Sesión 6: servo en el pin 9 y perilla en A0; para la barrera y el saludo con
// botón, LED en el 13 y botón entre el pin 12 y GND (el cable del servo sube
// por la derecha de la placa: su pin tiene que ser el de más a la derecha, así
// que el botón no puede ir en el 2).
// Diferencias con los .ino:
// - La perilla de Bloquino da de 0 a 100 (no de 0 a 1023): los map parten de 0-100.
// - «esperar» va en segundos: delay(15) es 0.015 y la cajita velocidad del saludo
//   guarda segundos (0.01 en vez de 10); en saludo_perilla se mapea a 2-40 y se divide por 1000.
// - «contar» solo sube: la vuelta (180 → 0, 120 → 60) cuenta hacia arriba y el
//   servo va a 180 − ángulo.
await nuevo();
await limpiar();
// El servo solo, alimentado desde los rieles (como el ejemplo 05 de Bloquino).
const soloServo = async () => {
  const proto = await tablero();
  await ponerServo(proto, 9);
  await cincoVolts(proto, 13);
  await tierraArriba(proto, 27);
  return proto;
};
let proto = await soloServo();

const mover = (ANGULO, block) => ({ type: 'ab_servo', fields: { PIN: '9' }, inputs: { ANGULO: { shadow: { type: 'ab_angulo', fields: { ANGULO } }, ...(block && { block }) } } });
const contar = (DESDE, HASTA, ...bs) => ({ type: 'ab_contar', fields: { VAR: { id: 'a' } }, inputs: { DESDE: num(DESDE), HASTA: num(HASTA), DO: { block: cadena(bs) } } });
const angulo = { type: 'variables_get', fields: { VAR: { id: 'a' } } };
const vuelta = { type: 'ab_aritmetica', fields: { OP: '-' }, inputs: { A: num(180), B: { ...num(0), block: angulo } } };
const mapear = (C, D) => ({ type: 'ab_mapear', inputs: { X: { ...num(50), block: { type: 'ab_perilla', fields: { PIN: 'A0' } } }, A: num(0), B: num(100), C: num(C), D: num(D) } });
const velocidad = (VALUE) => ({ type: 'variables_set', fields: { VAR: { id: 'v' } }, inputs: { VALUE } });
const pausa = { type: 'ab_esperar', inputs: { S: { ...num(1), block: { type: 'variables_get', fields: { VAR: { id: 'v' } } } } } };
const saludo = [contar(60, 120, mover(90, angulo), pausa), contar(60, 120, mover(90, vuelta), pausa)];
const apretado = { type: 'ab_boton', fields: { PIN: '12' } };
const A = { name: 'ángulo', id: 'a' };
const V = { name: 'velocidad', id: 'v' };

await guardar('servo', [alIniciar(porSiempre(mover(0), esperarB(1), mover(180), esperarB(1)))]);
await guardar('barrido', [alIniciar(mover(0), esperarB(0.5), porSiempre(
  contar(0, 180, mover(90, angulo), esperarB(0.015)),
  contar(0, 180, mover(90, vuelta), esperarB(0.015)),
))], [A]);
await guardar('saludo', [alIniciar(velocidad(num(0.01)), porSiempre(...saludo))], [A, V]);

// Se suma la perilla, a la izquierda.
await cerrarCodigo();
await ponerPerilla(proto);
await guardar('perilla', [alIniciar(porSiempre(mover(90, mapear(0, 180)), esperarB(0.015)))]);
await guardar('saludo_perilla', [alIniciar(porSiempre(
  velocidad({ ...num(0), block: { type: 'ab_aritmetica', fields: { OP: '/' }, inputs: { A: { ...num(0), block: mapear(2, 40) }, B: num(1000) } } }),
  ...saludo,
))], [A, V]);

// La barrera: sin perilla; el LED bajo el pin 13 y el botón a su derecha.
await cerrarCodigo();
await limpiar();
proto = await soloServo();
await ponerLed(proto, 28, 13, 2);
await ponerBoton(proto, 35, 12, 1);
await guardar('barrera', [alIniciar(mover(90), esperarB(0.5), porSiempre(siSino(apretado,
  [mover(0), led('HIGH', 13), esperarB(0.3), led('LOW', 13), esperarB(0.3)],
  [mover(90), esperarB(0.3), led('LOW', 13)],
)))]);
await guardar('saludo_boton', [alIniciar(velocidad(num(0.01)), porSiempre(
  { type: 'ab_si', inputs: { COND: { block: apretado }, DO: { block: cadena(saludo) } } },
))], [A, V]);
