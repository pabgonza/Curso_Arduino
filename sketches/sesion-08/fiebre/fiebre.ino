// Sesion 8 - Reto: la alarma de fiebre
// DHT11 con la patita S al pin 2 (libreria "DHT sensor library").
// Buzzer en el pin 8. Si pasa de 30 grados, suena.

#include <DHT.h>
DHT dht(2, DHT11);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float t = dht.readTemperature();
  Serial.println(t);

  if (t > 30) {
    tone(8, 880);   // ¡fiebre!
  } else {
    noTone(8);
  }
  delay(1000);
}
