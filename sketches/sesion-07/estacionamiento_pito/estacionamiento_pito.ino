// Sesion 7 - Reto: el semaforo de estacionamiento con pitido
// HC-SR04: TRIG al pin 9, ECHO al pin 10. LEDs: rojo 13, verde 12, amarillo 11.
// Buzzer en el pin 8: en rojo pita largo y seguido, como los autos.

void setup() {
  pinMode(9, OUTPUT);    // TRIG
  pinMode(10, INPUT);    // ECHO
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
}

void loop() {
  digitalWrite(9, HIGH);
  delayMicroseconds(10);
  digitalWrite(9, LOW);
  long tiempo = pulseIn(10, HIGH);
  int distancia = tiempo * 0.034 / 2;

  digitalWrite(13, LOW);
  digitalWrite(12, LOW);
  digitalWrite(11, LOW);

  if (distancia < 10) {
    digitalWrite(13, HIGH);   // rojo: ¡FRENA!
    tone(8, 440);             // y pita sin parar
  }
  if (distancia >= 10 && distancia < 30) {
    digitalWrite(11, HIGH);   // amarillo
    noTone(8);
  }
  if (distancia >= 30) {
    digitalWrite(12, HIGH);   // verde
    noTone(8);
  }
  delay(100);
}
