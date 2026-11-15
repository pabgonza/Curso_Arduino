// Sesión 3: el semáforo y la coreografía de luces. De izquierda a derecha:
// rojo en el 13, amarillo en el 12 y verde en el 11 (el circuito del ejemplo
// 02 de Bloquino).
// Iguales al .ino; los comentarios del semáforo van como bloques de comentario.
await nuevo();
await limpiar();
const proto = await tablero();
await ponerLed(proto, 28, 13, 2);
await ponerLed(proto, 33, 12, 1, 'yellow');
await ponerLed(proto, 37, 11, 0, 'green');
await tierraArriba(proto, 27, 3);

const comentario = (TEXTO) => ({ type: 'ab_comentario', fields: { TEXTO } });
await guardar('semaforo', [alIniciar(porSiempre(
  comentario('luz roja: 3 segundos'), led('HIGH', 13), esperarB(3), led('LOW', 13),
  comentario('luz verde: 3 segundos'), led('HIGH', 11), esperarB(3), led('LOW', 11),
  comentario('amarilla: 1 segundo'), led('HIGH', 12), esperarB(1), led('LOW', 12),
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
