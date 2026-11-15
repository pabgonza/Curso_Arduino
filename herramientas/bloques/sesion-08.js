// Sesión 8: el termómetro (DHT11 en el pin 2, a la derecha). Circuito de la
// slide: DHT11 y semáforo de 3 LEDs (rojo 13, amarillo 12, verde 11, como en la
// sesión 3); para la alarma de fiebre, el buzzer del pin 8 en vez de los LEDs.
// Diferencias con los .ino:
// - Sin la cajita `t`: cada bloque de temperatura lee el sensor (la librería
//   guarda la lectura 2 s, así que en una vuelta todos ven el mismo valor).
// - fiebre y fiebre_aviso: no hay bloque de tone() sin fin; sobre 30 °C se
//   toca la nota la aguda (880 Hz) 1 s, que dura lo mismo que la espera de la
//   vuelta y suena seguido; bajo 30 °C se espera 1 s (la nota ya terminó sola).
// - Las variables de bloques son float: `ya avisé` vale 0 o 1 igual que el int.
await nuevo();
await limpiar();
const soloDht = async () => {
  const proto = await tablero();
  await cincoVolts(proto, 13);
  await tierraArriba(proto, 27, 3);
  await ponerDht(proto, 46, 2);
  return proto;
};
let proto = await soloDht();

const temperatura = { type: 'ab_temperatura', fields: { PIN: '2' } };
const leer = { ...num(0), block: temperatura };
const texto = (TEXT) => ({ shadow: { type: 'text', fields: { TEXT } } });
const comoTexto = (block) => ({ ...texto(''), block });
const decirSeguido = (VALOR) => ({ type: 'ab_decir_seguido', inputs: { VALOR } });
const variable = (id) => ({ ...num(0), block: { type: 'variables_get', fields: { VAR: { id } } } });
const fijar = (id, VALUE) => ({ type: 'variables_set', fields: { VAR: { id } }, inputs: { VALUE } });
const si = (cond, cuerpo) => ({ type: 'ab_si', inputs: { COND: { block: cond }, DO: { block: cadena(cuerpo) } } });
const fiebre = comparar(leer, '>', num(30));
const pito = { type: 'ab_tocar_nota', fields: { NOTA: '880', PIN: '8' }, inputs: { S: num(1) } };

await guardar('termometro', [alIniciar(porSiempre(
  decirSeguido(texto('Temperatura: ')), decir(comoTexto(temperatura)), esperarB(1),
))]);
await guardar('record', [alIniciar(porSiempre(
  si(comparar(leer, '>', variable('r')), [fijar('r', leer)]),
  decirSeguido(texto('Ahora: ')), decirSeguido(comoTexto(temperatura)),
  decirSeguido(texto('   Record: ')), decir(comoTexto({ type: 'variables_get', fields: { VAR: { id: 'r' } } })),
  esperarB(1),
))], [{ name: 'récord', id: 'r' }]);

// Con el buzzer, bajo el pin 8.
await cerrarCodigo();
await ponerBuzzer(proto, 34, 8);
await guardar('fiebre', [alIniciar(porSiempre(
  decir(comoTexto(temperatura)),
  siSino(fiebre, [pito], [esperarB(1)]),
))]);
await guardar('fiebre_aviso', [alIniciar(porSiempre(
  siSino(fiebre,
    [si(comparar(variable('a'), '==', num(0)), [decir(texto('¡Hace calor!')), fijar('a', num(1))]), pito],
    [fijar('a', num(0)), esperarB(1)]),
))], [{ name: 'ya avisé', id: 'a' }]);

// El semáforo de la sesión 3 en vez del buzzer.
await cerrarCodigo();
await limpiar();
proto = await soloDht();
await ponerLed(proto, 28, 13, 2);
await ponerLed(proto, 33, 12, 1, 'yellow');
await ponerLed(proto, 37, 11, 0, 'green');
await guardar('semaforo_termico', [alIniciar(porSiempre(
  decir(comoTexto(temperatura)),
  led('LOW', 11), led('LOW', 12), led('LOW', 13),
  siSino(comparar(leer, '<', num(15)), [led('HIGH', 11)], [siSino(comparar(leer, '<', num(25)), [led('HIGH', 12)], [led('HIGH', 13)])]),
  esperarB(1),
))]);
