// Sesión 4: el botón en el pin 2 (resistencia interna) y el LED en el 13.
// Diferencias con el .ino:
// - Las cajitas guardan 1 (apretado) o 0 (suelto) en vez de LOW/HIGH: el bloque
//   «botón presionado» ya da verdadero cuando el pin lee LOW.
// - contador: las variables de bloques son decimales; el monitor muestra 1.00, 2.00…
// - luz_fija: cada camino del «si» enciende o apaga el LED, en vez de
//   digitalWrite(13, encendida) (el bloque del LED no recibe una variable).
await nuevo();
await limpiar();
const proto = await agregar('Protoboard');
await ledConResistencia(proto, 40, '13');
const boton = await agregar('Botón');
// Girado, el botón deja las patitas 1 en la columna 14 y las 2 en la 12.
await asentar(boton, '1.l', proto, '14t.c');
await cable(proto, '14t.a', 'uno', '2');
await cable(proto, '12b.j', proto, 'bn.10');
await cable(proto, 'bn.45', 'uno', 'GND.2');

const apretado = { type: 'ab_boton', fields: { PIN: '2' } };
const texto = (TEXT) => ({ block: { type: 'text', fields: { TEXT } } });
const caja = (id) => ({ block: { type: 'variables_get', fields: { VAR: { id } } } });
const fijar = (id, VALUE) => ({ type: 'variables_set', fields: { VAR: { id } }, inputs: { VALUE } });
const si = (cond, ...bs) => ({ type: 'ab_si', inputs: { COND: { block: cond }, DO: { block: cadena(bs) } } });
// Recién lo apretaron: ahora apretado y antes suelto.
const recien = {
  type: 'ab_logica', fields: { OP: '&&' },
  inputs: { A: { block: comparar(caja('ahora'), '==', num(1)) }, B: { block: comparar(caja('antes'), '==', num(0)) } },
};
const cajas = (...nombres) => nombres.map((n) => ({ name: n, id: n }));

await guardar('espia', [alIniciar(porSiempre(
  siSino(apretado, [decir(texto('¡Apretado!'))], [decir(texto('suelto...'))]),
  esperarB(0.2),
))]);
await guardar('boton', [alIniciar(porSiempre(siSino(apretado, [led('HIGH', 13)], [led('LOW', 13)])))]);
await guardar('contador', [alIniciar(porSiempre(
  fijar('ahora', { block: apretado }),
  si(recien, { type: 'math_change', fields: { VAR: { id: 'contador' } }, inputs: { DELTA: num(1) } }, decir(caja('contador'))),
  fijar('antes', caja('ahora')),
))], cajas('contador', 'antes', 'ahora'));
await guardar('luz_fija', [alIniciar(porSiempre(
  fijar('ahora', { block: apretado }),
  si(recien,
    siSino(comparar(caja('encendida'), '==', num(0)), [fijar('encendida', num(1)), led('HIGH', 13)], [fijar('encendida', num(0)), led('LOW', 13)]),
    esperarB(0.05),
  ),
  fijar('antes', caja('ahora')),
))], cajas('encendida', 'antes', 'ahora'));
