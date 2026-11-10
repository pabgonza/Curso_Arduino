// Sesion 8 - Reto: la memoria (temperatura record)
// DHT11 en el pin 2. Abre el monitor serie a 9600.
// La cajita "record" solo cambia cuando ve algo mas alto.

#include <DHT.h>
DHT dht(2, DHT11);

float record = 0;

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float t = dht.readTemperature();
  if (t > record) {
    record = t;      // ¡nuevo record!
  }
  Serial.print("Ahora: ");
  Serial.print(t);
  Serial.print("   Record: ");
  Serial.println(record);
  delay(1000);
}
