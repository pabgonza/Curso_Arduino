// Sesion 7 - Reto: el semaforo de estacionamiento
// HC-SR04: TRIG al pin 10, ECHO al pin 9.
// LEDs del semaforo con sus resistencias: rojo 13, amarillo 12, verde 11.
// Verde lejos, amarillo cerca, rojo ¡FRENA!

void setup() {
  pinMode(10, OUTPUT);   // TRIG
  pinMode(9, INPUT);     // ECHO
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
}

void loop() {
  digitalWrite(10, HIGH);
  delayMicroseconds(10);
  digitalWrite(10, LOW);
  long tiempo = pulseIn(9, HIGH);
  int distancia = tiempo * 0.034 / 2;

  // primero apagamos los tres...
  digitalWrite(13, LOW);
  digitalWrite(12, LOW);
  digitalWrite(11, LOW);

  // ...y prende solo el que gana
  if (distancia < 10) {
    digitalWrite(13, HIGH);   // rojo: ¡FRENA!
  }
  if (distancia >= 10 && distancia < 30) {
    digitalWrite(12, HIGH);   // amarillo: cerca
  }
  if (distancia >= 30) {
    digitalWrite(11, HIGH);   // verde: lejos
  }
  delay(100);
}
