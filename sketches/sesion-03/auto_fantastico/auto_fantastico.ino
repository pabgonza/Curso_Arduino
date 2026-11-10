// Sesion 3 - Reto: el auto fantastico
// Los tres LEDs del semaforo: rojo 13, verde 12, amarillo 11.
// La luz va 13 -> 12 -> 11 y vuelve por el 12; como el loop se repite,
// nunca se nota donde empieza la vuelta.

void setup() {
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(150);
  digitalWrite(13, LOW);
  digitalWrite(12, HIGH);
  delay(150);
  digitalWrite(12, LOW);
  digitalWrite(11, HIGH);
  delay(150);
  digitalWrite(11, LOW);
  digitalWrite(12, HIGH);   // de vuelta
  delay(150);
  digitalWrite(12, LOW);
}
