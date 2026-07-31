// Sesion 4 - El espia del boton
// Boton en el pin 2, con su resistencia de 10 kOhm a GND.
// Abre el monitor serie (lupa, arriba a la derecha) a 9600.

void setup() {
  pinMode(2, INPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(2) == HIGH) {
    Serial.println("¡Apretado!");
  } else {
    Serial.println("suelto...");
  }
  delay(200);   // para que no escriba mil veces por segundo
}
