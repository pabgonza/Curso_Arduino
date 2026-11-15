// Sesion 7 - Sensor de retroceso para tu bici
// HC-SR04: TRIG al pin 10, ECHO al pin 9. Buzzer en el pin 8.
// Mientras mas cerca de la pared, mas seguido pita.

void setup() {
  pinMode(10, OUTPUT);
  pinMode(9, INPUT);
}

void loop() {
  digitalWrite(10, HIGH);
  delayMicroseconds(10);
  digitalWrite(10, LOW);
  long tiempo = pulseIn(9, HIGH);
  int distancia = tiempo * 0.034 / 2;

  if (distancia < 100) {         // a menos de un metro, empieza a avisar
    int pausa = distancia * 8;   // cerca = pausa cortita = ¡pip pip pip!
    tone(8, 880);
    delay(60);
    noTone(8);
    delay(pausa);
  }
}
