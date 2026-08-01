// Sesion 5 - Canciones de verdad con la libreria BuzzerMusic
// Buzzer en el pin 8.
// Antes de compilar, instala la libreria (una sola vez): copia la carpeta
// sketches/librerias/BuzzerMusic dentro de Documentos/Arduino/libraries
// y vuelve a abrir el IDE.

#include <BuzzerMusic.h>

BuzzerMusic musica(8);

void setup() {
  musica.marioBros();
  // Prueba tambien:
  // musica.imperialMarch();   // Star Wars
  // musica.happyBirthday();
  // musica.odeToJoy();
}

void loop() { }
