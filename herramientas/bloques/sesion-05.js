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
//    botones a la vez las notas se turnan en lugar de ganar la del pin 4.
await nuevo();
await limpiar();
const proto = await agregar('Protoboard');
const buzzer = await agregar('Buzzer');
await asentar(buzzer, '1', proto, '30b.f');
await cable(proto, '30b.j', 'uno', '8');
await cable(proto, '31b.j', proto, 'bn.28');
await cable(proto, 'bn.45', 'uno', 'GND.2');

const tocar = (hz, s) => ({ type: 'ab_tocar_nota', fields: { NOTA: String(hz), PIN: '8' }, inputs: { S: num(s) } });
const apretado = (pin) => ({ type: 'ab_boton', fields: { PIN: String(pin) } });
const si = (cond, ...bs) => ({ type: 'ab_si', inputs: { COND: { block: cond }, DO: { block: cadena(bs) } } });
// guardar() deja abierto el panel del programa, que tapa la paleta de componentes.
const cerrarCodigo = async () => { await page.getByRole('button', { name: 'Código', exact: true }).click(); await espera(600); };

await guardar('estrellita', [alIniciar(porSiempre(tocar(262, 0.4), tocar(262, 0.4), tocar(392, 0.4), tocar(392, 0.4), esperarB(1)))]);
await guardar('sirena', [alIniciar(porSiempre(tocar(440, 0.3), tocar(659, 0.3)))]);

await cerrarCodigo();
const boton = await agregar('Botón');
await asentar(boton, '1.l', proto, '14t.c');
await cable(proto, '14t.a', 'uno', '2');
await cable(proto, '12b.j', proto, 'bn.10');
await guardar('timbre', [alIniciar(porSiempre(si(apretado(2), tocar(523, 0.2), tocar(392, 0.4))))]);

// Botones del pin 4 (columnas 38-40) y del pin 3 (44-46), como en el ejemplo
// 04-rockola: el pin desde la patita 1 y GND desde la 2, por abajo.
await cerrarCodigo();
for (const [col, pin] of [[40, '4'], [46, '3']]) {
  await asentar(await agregar('Botón'), '1.l', proto, `${col}t.c`);
  await cable(proto, `${col}b.j`, 'uno', pin);
  await cable(proto, `${col - 2}b.j`, proto, `bn.${Math.round((col - 2) * 0.8)}`);
}
await guardar('piano', [alIniciar(porSiempre(
  si(apretado(2), tocar(262, 0.1)),
  si(apretado(3), tocar(330, 0.1)),
  si(apretado(4), tocar(392, 0.1)),
))]);
await guardar('piano_melodias', [alIniciar(porSiempre(
  si(apretado(2), tocar(262, 0.2), tocar(330, 0.2), tocar(392, 0.4)),
  si(apretado(3), tocar(392, 0.2), tocar(330, 0.2), tocar(262, 0.4)),
  si(apretado(4), tocar(440, 0.15), tocar(659, 0.15), tocar(440, 0.15), tocar(659, 0.15)),
))]);
await guardar('cancion', [alIniciar({ type: 'ab_tocar_cancion', fields: { CANCION: 'MARIO_BROS', PIN: '8' } })]);
