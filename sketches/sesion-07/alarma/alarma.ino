// Sesion 7 - La alarma de intrusos
// HC-SR04: TRIG al pin 9, ECHO al pin 10.
// LED en el pin 13 (como en la sesion 3) y buzzer en el pin 8 (sesion 5).

void setup() {
  pinMode(9, OUTPUT);
  pinMode(10, INPUT);
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(9, HIGH);
  delayMicroseconds(10);
  digitalWrite(9, LOW);
  long tiempo = pulseIn(10, HIGH);
  int distancia = tiempo * 0.034 / 2;

  if (distancia < 20) {
    digitalWrite(13, HIGH);   // ¡luz!
    tone(8, 880);             // ¡alarma!
  } else {
    digitalWrite(13, LOW);
    noTone(8);
  }
  delay(100);
}
