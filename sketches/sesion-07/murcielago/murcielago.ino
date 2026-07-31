// Sesion 7 - El murcielago (HC-SR04)
// Sensor: VCC a 5V, GND a GND, TRIG al pin 9, ECHO al pin 10.
// Abre el monitor serie a 9600 para ver la distancia.

void setup() {
  pinMode(9, OUTPUT);    // TRIG: por aqui grita
  pinMode(10, INPUT);    // ECHO: por aqui escucha
  Serial.begin(9600);
}

void loop() {
  digitalWrite(9, HIGH);            // ¡grita!
  delayMicroseconds(10);
  digitalWrite(9, LOW);
  long tiempo = pulseIn(10, HIGH);  // espera el eco
  int distancia = tiempo * 0.034 / 2;
  Serial.print(distancia);
  Serial.println(" cm");
  delay(200);
}
