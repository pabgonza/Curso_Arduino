// Sesión 7: sensor de distancia (TRIG 10, ECHO 9), buzzer en el 8 y LEDs del
// semáforo: rojo 13, amarillo 12, verde 11. De izquierda a derecha van los
// LEDs, el sensor y el buzzer, en el orden de los pines de la placa.
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
// El sensor al centro, con 5 V y tierra; cada programa suma lo que usa.
const soloSensor = async () => {
  const proto = await tablero();
  await cincoVolts(proto, 9);
  await tierraArriba(proto, 11);
  await ponerSensor(proto, 36, 10, 2, 9, 1);
  return proto;
};
const ledRojo = (proto) => ponerLed(proto, 16, 13, 1);
const ledsAmarilloYVerde = async (proto) => { await ponerLed(proto, 21, 12, 2, 'yellow'); await ponerLed(proto, 25, 11, 3, 'green'); };
let proto = await soloSensor();

const distancia = { type: 'variables_get', fields: { VAR: { id: 'd' } } };
const medir = { type: 'variables_set', fields: { VAR: { id: 'd' } }, inputs: { VALUE: { ...num(0), block: { type: 'ab_distancia', fields: { DISPARO: '10', ECO: '9' } } } } };
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

// Con el buzzer, a la derecha del sensor.
await cerrarCodigo();
await ponerBuzzer(proto, 52, 8);
await guardar('retroceso', [alIniciar(porSiempre(
  medir,
  { type: 'ab_si', inputs: { COND: { block: menos(100) }, DO: { block: cadena([
    tocar(880, 0.06),
    { type: 'ab_esperar', inputs: { S: { ...num(1), block: { type: 'ab_aritmetica', fields: { OP: '*' }, inputs: { A: { ...num(0), block: distancia }, B: num(0.008) } } } } },
  ]) } } },
))], D);
await guardar('theremin', [alIniciar(porSiempre(
  medir,
  siSino(menos(15), [tocar(262, 0.03)], [siSino(menos(30), [tocar(330, 0.03)], [siSino(menos(45), [tocar(392, 0.03)], [
    siSino(menos(60), [tocar(523, 0.03)], [silencio, esperarB(0.03)]),
  ])])]),
))], D);

// Con el LED rojo, a la izquierda del sensor.
await cerrarCodigo();
await ledRojo(proto);
await guardar('alarma', [alIniciar(porSiempre(
  medir,
  siSino(menos(20), [led('HIGH', 13), tocar(880, 0.15), led('LOW', 13), tocar(659, 0.15)], [silencio]),
  esperarB(0.05),
))], D);

// El semáforo completo y el buzzer.
await cerrarCodigo();
await ledsAmarilloYVerde(proto);
await guardar('estacionamiento_pito', [alIniciar(porSiempre(
  medir,
  ...apagarTodo,
  siSino(menos(10), [led('HIGH', 13), tocar(440, 0.1)], [
    silencio,
    siSino(menos(30), [led('HIGH', 12)], [led('HIGH', 11)]),
    esperarB(0.1),
  ]),
))], D);

// El semáforo sin buzzer.
await cerrarCodigo();
await limpiar();
proto = await soloSensor();
await ledRojo(proto);
await ledsAmarilloYVerde(proto);
await guardar('estacionamiento', [alIniciar(porSiempre(
  medir,
  ...apagarTodo,
  siSino(menos(10), [led('HIGH', 13)], [siSino(menos(30), [led('HIGH', 12)], [led('HIGH', 11)])]),
  esperarB(0.1),
))], D);
