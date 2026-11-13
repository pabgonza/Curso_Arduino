// Sesión 2: el LED de la placa (pin 13), sin armar nada.
await nuevo();
await limpiar();
await guardar('blink', [alIniciar(porSiempre(led('HIGH', 13), esperarB(1), led('LOW', 13), esperarB(1)))]);
await guardar('corazon', [alIniciar(porSiempre(
  led('HIGH', 13), esperarB(0.12), led('LOW', 13), esperarB(0.12),
  led('HIGH', 13), esperarB(0.12), led('LOW', 13), esperarB(0.64),
))]);
