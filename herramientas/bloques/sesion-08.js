// Sesión 8: el termómetro (DHT11 en el pin 2). Circuito de la slide: DHT11 y
// semáforo de 3 LEDs (verde 12, amarillo 11, rojo 13); el buzzer del pin 8 se
// suma para la alarma de fiebre.
// Diferencias con los .ino:
// - Sin la cajita `t`: cada bloque de temperatura lee el sensor (la librería
//   guarda la lectura 2 s, así que en una vuelta todos ven el mismo valor).
// - fiebre y fiebre_aviso: no hay bloque de tone() sin fin; sobre 30 °C se
//   toca la nota la aguda (880 Hz) 1 s, que dura lo mismo que la espera de la
//   vuelta y suena seguido; bajo 30 °C se espera 1 s (la nota ya terminó sola).
// - Las variables de bloques son float: `ya avisé` vale 0 o 1 igual que el int.
await nuevo();
await limpiar();
const proto = await agregar('Protoboard');
const dht = await agregar('Temperatura y humedad');
await asentar(dht, 'S', proto, '20b.f');
await cable(proto, '20b.j', 'uno', '2');
await cable(proto, '21b.j', proto, 'bp.17');
await cable(proto, '22b.j', proto, 'bn.20');
await cable(proto, 'bp.48', 'uno', '5V');
await cable(proto, 'bn.45', 'uno', 'GND.2');
for (const [pin, col] of [['12', 28], ['11', 34], ['13', 40]]) await ledConResistencia(proto, col, pin);
await buzzerEn(proto, 10);

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
await guardar('semaforo_termico', [alIniciar(porSiempre(
  decir(comoTexto(temperatura)),
  led('LOW', 12), led('LOW', 11), led('LOW', 13),
  siSino(comparar(leer, '<', num(15)), [led('HIGH', 12)], [siSino(comparar(leer, '<', num(25)), [led('HIGH', 11)], [led('HIGH', 13)])]),
  esperarB(1),
))]);
await guardar('fiebre', [alIniciar(porSiempre(
  decir(comoTexto(temperatura)),
  siSino(fiebre, [pito], [esperarB(1)]),
))]);
await guardar('fiebre_aviso', [alIniciar(porSiempre(
  siSino(fiebre,
    [si(comparar(variable('a'), '==', num(0)), [decir(texto('¡Hace calor!')), fijar('a', num(1))]), pito],
    [fijar('a', num(0)), esperarB(1)]),
))], [{ name: 'ya avisé', id: 'a' }]);
await guardar('record', [alIniciar(porSiempre(
  si(comparar(leer, '>', variable('r')), [fijar('r', leer)]),
  decirSeguido(texto('Ahora: ')), decirSeguido(comoTexto(temperatura)),
  decirSeguido(texto('   Record: ')), decir(comoTexto({ type: 'variables_get', fields: { VAR: { id: 'r' } } })),
  esperarB(1),
))], [{ name: 'récord', id: 'r' }]);
