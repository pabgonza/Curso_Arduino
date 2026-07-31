// Sesion 5 - El timbre de tu pieza
// Boton en el pin 2 (con su resistencia de 10 kOhm a GND, como en la sesion 4)
// y buzzer en el pin 8.

void setup() {
  pinMode(2, INPUT);
}

void loop() {
  if (digitalRead(2) == HIGH) {
    tone(8, 523);   // ding
    delay(200);
    tone(8, 392);   // dong
    delay(400);
    noTone(8);
  }
}
