// Sesión 7: sensor de distancia (TRIG 9, ECHO 10), buzzer en el 8 y LEDs del
// semáforo: rojo 13, verde 12, amarillo 11.
// Diferencias con los .ino:
// - El bloque de distancia da centímetros con decimales (el murciélago escribe 23.45 cm)
//   y 400 si no hay eco.
// - «tocar nota» suena un rato y espera (tone con duración): el ni-no de la alarma es
//   880 y 659 Hz (no 660); el pitido continuo del rojo es una nota de 0.1 s que
//   reemplaza al delay(100) de esa rama.
// - Los >= de los semáforos son si / si no anidados (mismo resultado, sin «y»).
// - Theremin: no hay tone de frecuencia libre; la mano elige entre 4 notas
//   (do, mi, sol, do agudo cada 15 cm hasta 60), de 0.03 s cada una.
await nuevo();
await limpiar();
const proto = await agregar('Protoboard');
await sensorEn(proto, 10);
const rojo = await ledConResistencia(proto, 40, '13');
await buzzerEn(proto, 52);
const verde = await ledConResistencia(proto, 24, '12');
const amarillo = await ledConResistencia(proto, 30, '11');
await page.evaluate((colores) => {
  const s = window.__s.useSimulatorStore.getState();
  for (const [id, color] of colores) s.updateComponent(id, { properties: { ...s.components.find((c) => c.id === id).properties, color } });
}, [[rojo, 'red'], [verde, 'green'], [amarillo, 'yellow']]);
await cable(proto, 'bp.48', 'uno', '5V');
await cable(proto, 'bn.45', 'uno', 'GND.2');

const distancia = { type: 'variables_get', fields: { VAR: { id: 'd' } } };
const medir = { type: 'variables_set', fields: { VAR: { id: 'd' } }, inputs: { VALUE: { ...num(0), block: { type: 'ab_distancia', fields: { DISPARO: '9', ECO: '10' } } } } };
const menos = (cm) => comparar({ ...num(0), block: distancia }, '<', num(cm));
const tocar = (NOTA, s) => ({ type: 'ab_tocar_nota', fields: { NOTA: String(NOTA), PIN: '8' }, inputs: { S: num(s) } });
const silencio = { type: 'ab_silenciar', fields: { PIN: '8' } };
const apagarTodo = [led('LOW', 13), led('LOW', 12), led('LOW', 11)];
const D = [{ name: 'distancia', id: 'd' }];

await guardar('murcielago', [alIniciar(porSiempre(
  medir,
  { type: 'ab_decir_seguido', inputs: { VALOR: { block: distancia } } },
  decir({ shadow: { type: 'text', fields: { TEXT: ' cm' } } }),
  esperarB(0.2),
))], D);
await guardar('alarma', [alIniciar(porSiempre(
  medir,
  siSino(menos(20), [led('HIGH', 13), tocar(880, 0.15), led('LOW', 13), tocar(659, 0.15)], [silencio]),
  esperarB(0.05),
))], D);
await guardar('retroceso', [alIniciar(porSiempre(
  medir,
  { type: 'ab_si', inputs: { COND: { block: menos(100) }, DO: { block: cadena([
    tocar(880, 0.06),
    { type: 'ab_esperar', inputs: { S: { ...num(1), block: { type: 'ab_aritmetica', fields: { OP: '*' }, inputs: { A: { ...num(0), block: distancia }, B: num(0.008) } } } } },
  ]) } } },
))], D);
await guardar('estacionamiento', [alIniciar(porSiempre(
  medir,
  ...apagarTodo,
  siSino(menos(10), [led('HIGH', 13)], [siSino(menos(30), [led('HIGH', 11)], [led('HIGH', 12)])]),
  esperarB(0.1),
))], D);
await guardar('estacionamiento_pito', [alIniciar(porSiempre(
  medir,
  ...apagarTodo,
  siSino(menos(10), [led('HIGH', 13), tocar(440, 0.1)], [
    silencio,
    siSino(menos(30), [led('HIGH', 11)], [led('HIGH', 12)]),
    esperarB(0.1),
  ]),
))], D);
await guardar('theremin', [alIniciar(porSiempre(
  medir,
  siSino(menos(15), [tocar(262, 0.03)], [siSino(menos(30), [tocar(330, 0.03)], [siSino(menos(45), [tocar(392, 0.03)], [
    siSino(menos(60), [tocar(523, 0.03)], [silencio, esperarB(0.03)]),
  ])])]),
))], D);
