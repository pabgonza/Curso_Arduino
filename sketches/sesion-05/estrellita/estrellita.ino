// Sesion 5 - Estrellita, ¿donde estas?
// Buzzer en el pin 8: la patita + al pin, la otra a GND.

void setup() { }  // nada que preparar: tone() se encarga de todo

void loop() {
  tone(8, 262);   // do
  delay(400);
  tone(8, 262);   // do
  delay(400);
  tone(8, 392);   // sol
  delay(400);
  tone(8, 392);   // sol
  delay(400);

  // TU TURNO: faltan tres notas...
  // la (440), la (440) y un sol (392) mas largo.

  noTone(8);      // silencio
  delay(1000);    // un respiro antes de repetir
}
