// Sesion 5 - El timbre de tu pieza
// Boton entre el pin 2 y GND (sin resistencia: INPUT_PULLUP) y buzzer en el pin 8.
// Ojo: con INPUT_PULLUP el boton apretado se lee LOW.

void setup() {
  pinMode(2, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(2) == LOW) {   // apretado
    tone(8, 523);   // ding
    delay(200);
    tone(8, 392);   // dong
    delay(400);
    noTone(8);
  }
}
