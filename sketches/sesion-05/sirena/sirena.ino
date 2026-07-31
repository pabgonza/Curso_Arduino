// Sesion 5 - La sirena de policia
// Buzzer en el pin 8. Dos notas que se turnan, rapidito.

void setup() { }

void loop() {
  tone(8, 440);   // nota grave
  delay(300);
  tone(8, 660);   // nota aguda
  delay(300);
}

// ¿Y si cambias el 300 por 80? ¿Y por 800?
