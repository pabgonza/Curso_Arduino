// Sesion 4 - El espia del boton
// Boton entre el pin 2 y GND (sin resistencia: INPUT_PULLUP, apretado = LOW).
// Abre el monitor serie (lupa, arriba a la derecha) a 9600.

void setup() {
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(2) == LOW) {
    Serial.println("¡Apretado!");
  } else {
    Serial.println("suelto...");
  }
  delay(200);   // para que no escriba mil veces por segundo
}
