// Sesion 7 - ¡No me toques! (sirena de cercania)
// HC-SR04: TRIG al pin 9, ECHO al pin 10.
// LED en el pin 13 (como en la sesion 3) y buzzer en el pin 8 (sesion 5).
// Si algo se acerca a menos de 20 cm, suena la sirena: ni-no, ni-no.

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
    tone(8, 880);             // ni...
    delay(150);
    digitalWrite(13, LOW);
    tone(8, 660);             // ...no!
    delay(150);
  } else {
    noTone(8);                // silencio
  }
  delay(50);
}
