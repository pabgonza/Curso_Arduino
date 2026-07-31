// Sesion 4 - El contador de apretones (experimento misterioso)
// Boton en el pin 2. Abre el monitor serie a 9600, aprieta 10 veces
// contando en voz alta... ¿llego justo a 10 o se paso?

int contador = 0;
int antes = LOW;

void setup() {
  pinMode(2, INPUT);
  Serial.begin(9600);
}

void loop() {
  int ahora = digitalRead(2);
  if (ahora == HIGH && antes == LOW) {
    contador = contador + 1;
    Serial.println(contador);
  }
  antes = ahora;
  // Si cuenta de mas, es el rebote del boton. El arreglo: un
  // delay(50) adentro del if, justo despues de contar. ¡Pruebalo!
}
