// Sesion 2 - Blink: prende y apaga el LED de la placa

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);   // ¿y si lo cambias por 200? ¿y por 60?
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
