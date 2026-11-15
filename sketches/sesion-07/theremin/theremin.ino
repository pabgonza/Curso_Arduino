// Sesion 7 - Reto: el theremin fantasma
// HC-SR04: TRIG al pin 10, ECHO al pin 9. Buzzer en el pin 8.
// La distancia de tu mano se convierte en nota: ¡musica en el aire!

void setup() {
  pinMode(10, OUTPUT);   // TRIG
  pinMode(9, INPUT);     // ECHO
}

void loop() {
  digitalWrite(10, HIGH);
  delayMicroseconds(10);
  digitalWrite(10, LOW);
  long tiempo = pulseIn(9, HIGH);
  int distancia = tiempo * 0.034 / 2;

  if (distancia < 60) {               // la mano dentro del campo magico
    tone(8, 100 + distancia * 10);    // mas lejos = mas agudo
  } else {
    noTone(8);                        // sin mano, silencio
  }
  delay(30);
}
