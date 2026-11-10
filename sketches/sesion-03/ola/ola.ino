// Sesion 3 - Reto: la ola
// Los tres LEDs del semaforo: rojo 13, verde 12, amarillo 11.
// Se prenden uno tras otro y se apagan en el mismo orden.

void setup() {
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(200);
  digitalWrite(12, HIGH);
  delay(200);
  digitalWrite(11, HIGH);
  delay(200);
  digitalWrite(13, LOW);
  delay(200);
  digitalWrite(12, LOW);
  delay(200);
  digitalWrite(11, LOW);
  delay(200);
}
