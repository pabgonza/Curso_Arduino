// Sesion 5 - Reto: un boton, una melodia
// Tres botones entre los pines 2, 3 y 4 y GND (sin resistencia: INPUT_PULLUP,
// apretado = LOW) y el buzzer en el pin 8. Cada boton toca su melodia corta.

void setup() {
  pinMode(2, INPUT_PULLUP);   // cada boton va entre su pin y GND
  pinMode(3, INPUT_PULLUP);
  pinMode(4, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(2) == LOW) {    // boton 1: do - mi - sol
    tone(8, 262);
    delay(200);
    tone(8, 330);
    delay(200);
    tone(8, 392);
    delay(400);
    noTone(8);
  }
  if (digitalRead(3) == LOW) {    // boton 2: sol - mi - do (al reves)
    tone(8, 392);
    delay(200);
    tone(8, 330);
    delay(200);
    tone(8, 262);
    delay(400);
    noTone(8);
  }
  if (digitalRead(4) == LOW) {    // boton 3: la sirena
    tone(8, 440);
    delay(150);
    tone(8, 660);
    delay(150);
    tone(8, 440);
    delay(150);
    tone(8, 660);
    delay(150);
    noTone(8);
  }
}
