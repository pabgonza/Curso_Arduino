// Sesion 4 - Un actuador que obedece
// Boton en el pin 2 (con su resistencia de 10 kOhm a GND)
// y LED en el pin 13 (con su resistencia de 220 ohm).

void setup() {
  pinMode(2, INPUT);
  pinMode(13, OUTPUT);
}

void loop() {
  if (digitalRead(2) == HIGH) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}
