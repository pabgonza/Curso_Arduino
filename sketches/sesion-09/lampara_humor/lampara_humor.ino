// Sesion 9 - La lampara de humor
// HC-SR04: VCC a 5V, GND a GND, TRIG al pin 10, ECHO al pin 9.
// Modulo LED RGB: R al pin 6, G al pin 5, B al pin 3, - a GND.
// Mano pegada = rojo, a medio camino = verde, lejos = azul.

void setup() {
  pinMode(10, OUTPUT);   // TRIG
  pinMode(9, INPUT);     // ECHO
}

void loop() {
  // el bloque del murcielago, tal cual
  digitalWrite(10, HIGH);
  delayMicroseconds(10);
  digitalWrite(10, LOW);
  long tiempo = pulseIn(9, HIGH);
  int distancia = tiempo * 0.034 / 2;

  // recortamos: solo nos importa de 5 a 50 cm
  if (distancia < 5) distancia = 5;
  if (distancia > 50) distancia = 50;

  // la distancia manda a la rueda
  int pos = map(distancia, 5, 50, 0, 255);
  rueda(pos);
  delay(30);
}

void color(int r, int g, int b) {
  analogWrite(6, r);
  analogWrite(5, g);
  analogWrite(3, b);
}

void rueda(int pos) {
  if (pos < 85) {
    color(255 - pos * 3, pos * 3, 0);
  } else if (pos < 170) {
    pos = pos - 85;
    color(0, 255 - pos * 3, pos * 3);
  } else {
    pos = pos - 170;
    color(pos * 3, 0, 255 - pos * 3);
  }
}
