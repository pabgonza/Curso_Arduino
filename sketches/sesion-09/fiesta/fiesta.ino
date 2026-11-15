// Sesion 9 - Reto: modo fiesta
// LED RGB de anodo comun: la patita larga a 5V; R al pin 6, G al pin 5, B al pin 3,
// cada color con su resistencia de 220 ohm. Se prende al reves: 0 = a todo, 255 = apagado.
// Cada medio segundo, un color al azar.

void setup() {
}

void loop() {
  color(random(256), random(256), random(256));   // random(256): un numero de 0 a 255
  delay(500);
}

void color(int r, int g, int b) {
  analogWrite(6, 255 - r);   // al reves: 255 - r prende r
  analogWrite(5, 255 - g);
  analogWrite(3, 255 - b);
}
