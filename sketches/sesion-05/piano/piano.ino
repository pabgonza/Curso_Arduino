// Sesion 5 - Reto: el mini piano
// Tres botones entre los pines 2, 3 y 4 y GND (sin resistencia: INPUT_PULLUP,
// apretado = LOW) y el buzzer en el pin 8. Cada boton, una nota.

void setup() {
  pinMode(2, INPUT_PULLUP);   // cada boton va entre su pin y GND
  pinMode(3, INPUT_PULLUP);
  pinMode(4, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(2) == LOW) {
    tone(8, 262);   // do
  }
  if (digitalRead(3) == LOW) {
    tone(8, 330);   // mi
  }
  if (digitalRead(4) == LOW) {
    tone(8, 392);   // sol
  }
  if (digitalRead(2) == HIGH && digitalRead(3) == HIGH && digitalRead(4) == HIGH) {
    noTone(8);      // nadie aprieta: silencio
  }
}
