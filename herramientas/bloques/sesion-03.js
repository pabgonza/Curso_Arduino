// Sesión 3: el semáforo y la coreografía de luces (rojo 13, verde 12, amarillo 11).
// Iguales al .ino; los comentarios del semáforo van como bloques de comentario.
await nuevo();
await limpiar();
const proto = await agregar('Protoboard');
for (const [pin, col] of [['13', 10], ['12', 24], ['11', 40]]) await ledConResistencia(proto, col, pin);
await cable(proto, 'bn.45', 'uno', 'GND.2');

const comentario = (TEXTO) => ({ type: 'ab_comentario', fields: { TEXTO } });
await guardar('semaforo', [alIniciar(porSiempre(
  comentario('luz roja: 3 segundos'), led('HIGH', 13), esperarB(3), led('LOW', 13),
  comentario('luz verde: 3 segundos'), led('HIGH', 12), esperarB(3), led('LOW', 12),
  comentario('amarilla: 1 segundo'), led('HIGH', 11), esperarB(1), led('LOW', 11),
))]);
await guardar('ola', [alIniciar(porSiempre(
  led('HIGH', 13), esperarB(0.2), led('HIGH', 12), esperarB(0.2), led('HIGH', 11), esperarB(0.2),
  led('LOW', 13), esperarB(0.2), led('LOW', 12), esperarB(0.2), led('LOW', 11), esperarB(0.2),
))]);
await guardar('alarma', [alIniciar(porSiempre(
  led('HIGH', 13), led('HIGH', 12), led('HIGH', 11), esperarB(0.3),
  led('LOW', 13), led('LOW', 12), led('LOW', 11), esperarB(0.3),
))]);
await guardar('auto_fantastico', [alIniciar(porSiempre(
  led('HIGH', 13), esperarB(0.15), led('LOW', 13),
  led('HIGH', 12), esperarB(0.15), led('LOW', 12),
  led('HIGH', 11), esperarB(0.15), led('LOW', 11),
  led('HIGH', 12), esperarB(0.15), led('LOW', 12),
))]);
