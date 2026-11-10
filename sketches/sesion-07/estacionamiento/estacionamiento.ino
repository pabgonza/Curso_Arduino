// Sesion 7 - Reto: el semaforo de estacionamiento
// HC-SR04: TRIG al pin 9, ECHO al pin 10.
// LEDs del semaforo con sus resistencias: rojo 13, verde 12, amarillo 11.
// Verde lejos, amarillo cerca, rojo ¡FRENA!

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

  // primero apagamos los tres...
  digitalWrite(13, LOW);
  digitalWrite(12, LOW);
  digitalWrite(11, LOW);

  // ...y prende solo el que gana
  if (distancia < 10) {
    digitalWrite(13, HIGH);   // rojo: ¡FRENA!
  }
  if (distancia >= 10 && distancia < 30) {
    digitalWrite(11, HIGH);   // amarillo: cerca
  }
  if (distancia >= 30) {
    digitalWrite(12, HIGH);   // verde: lejos
  }
  delay(100);
}
