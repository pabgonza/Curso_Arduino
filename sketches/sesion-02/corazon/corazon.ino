// Sesion 2 - Reto: haz latir un corazon
// El LED de la placa. Dos destellos cortos y una pausa larga: tum-tum... pausa.

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // tum
  delay(120);
  digitalWrite(LED_BUILTIN, LOW);
  delay(120);
  digitalWrite(LED_BUILTIN, HIGH);   // tum
  delay(120);
  digitalWrite(LED_BUILTIN, LOW);
  delay(640);                        // ...pausa
}
