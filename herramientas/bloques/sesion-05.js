// Sesión 5: el buzzer en el pin 8; el botón del pin 2 para el timbre y dos más
// (pines 3 y 4) para los pianos. Diferencias con los .ino:
//  - «tocar nota … por N segundos» es tone() con duración más su delay: la
//    nota se apaga sola, así que los noTone() sobran (estrellita, timbre,
//    piano_melodias).
//  - El menú de notas va de do4 a si5: el 660 de la sirena y de la tercera
//    melodía del piano queda en 659 (mi agudo).
//  - piano: cada vuelta toca la nota del botón apretado por 0,1 s en vez de
//    tone() sin fin + noTone() cuando nadie aprieta; suena mientras se
//    mantiene apretado y calla al soltar (con hasta 0,1 s de cola). Con dos
//    botones a la vez las notas se turnan en lugar de ganar la del pin 2.
await nuevo();
await limpiar();
// De izquierda a derecha: el buzzer (pin 8) y los botones de los pines 4, 3 y
// 2, en el orden de los pines de la placa. El del timbre es el del pin 2.
const proto = await tablero();
await tierraArriba(proto, 25);
await ponerBuzzer(proto, 27, 8, 1);

const tocar = (hz, s) => ({ type: 'ab_tocar_nota', fields: { NOTA: String(hz), PIN: '8' }, inputs: { S: num(s) } });
const apretado = (pin) => ({ type: 'ab_boton', fields: { PIN: String(pin) } });
const si = (cond, ...bs) => ({ type: 'ab_si', inputs: { COND: { block: cond }, DO: { block: cadena(bs) } } });

await guardar('estrellita', [alIniciar(porSiempre(tocar(262, 0.4), tocar(262, 0.4), tocar(392, 0.4), tocar(392, 0.4), esperarB(1)))]);
await guardar('sirena', [alIniciar(porSiempre(tocar(440, 0.3), tocar(659, 0.3)))]);
await guardar('cancion', [alIniciar({ type: 'ab_tocar_cancion', fields: { CANCION: 'MARIO_BROS', PIN: '8' } })]);

await cerrarCodigo();
await ponerBoton(proto, 47, 2);
await guardar('timbre', [alIniciar(porSiempre(si(apretado(2), tocar(523, 0.2), tocar(392, 0.4))))]);

// Los otros dos botones van a la izquierda del primero: pines 4 y 3. Las notas
// suben de izquierda a derecha, como en un piano: pines 4, 3 y 2.
await cerrarCodigo();
await ponerBoton(proto, 35, 4);
await ponerBoton(proto, 41, 3, 1);
await guardar('piano', [alIniciar(porSiempre(
  si(apretado(4), tocar(262, 0.1)),
  si(apretado(3), tocar(330, 0.1)),
  si(apretado(2), tocar(392, 0.1)),
))]);
await guardar('piano_melodias', [alIniciar(porSiempre(
  si(apretado(4), tocar(262, 0.2), tocar(330, 0.2), tocar(392, 0.4)),
  si(apretado(3), tocar(392, 0.2), tocar(330, 0.2), tocar(262, 0.4)),
  si(apretado(2), tocar(440, 0.15), tocar(659, 0.15), tocar(440, 0.15), tocar(659, 0.15)),
))]);
