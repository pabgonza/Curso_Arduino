// Sesion 3 - El semaforo
// Tres LEDs con sus resistencias de 220 ohm:
// rojo en el pin 13, verde en el 12, amarillo en el 11.
// ¡Todos comparten el mismo GND!

void setup() {
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
}

void loop() {
  // luz roja: 3 segundos
  digitalWrite(13, HIGH);
  delay(3000);
  digitalWrite(13, LOW);
  // luz verde: 3 segundos
  digitalWrite(12, HIGH);
  delay(3000);
  digitalWrite(12, LOW);
  // amarilla: 1 segundo
  digitalWrite(11, HIGH);
  delay(1000);
  digitalWrite(11, LOW);
}
