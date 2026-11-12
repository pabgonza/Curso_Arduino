// Sesion 4 - Un actuador que obedece
// Boton entre el pin 2 y GND (sin resistencia: INPUT_PULLUP, apretado = LOW)
// y LED en el pin 13 (con su resistencia de 220 ohm).

void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
}

void loop() {
  if (digitalRead(2) == LOW) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}
