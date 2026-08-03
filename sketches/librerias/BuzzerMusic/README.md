# BuzzerMusic

Canciones listas para tocar con un buzzer pasivo y un Arduino. Pensada para
cursos de Arduino para niños: dos líneas de código y suena Mario Bros.

```cpp
#include <BuzzerMusic.h>

BuzzerMusic musica(8);   // el buzzer vive en el pin 8

void setup() {
  musica.marioBros();
}

void loop() { }
```

## Instalación

Descarga el ZIP y en el Arduino IDE: **Sketch → Include Library → Add .ZIP
Library…** — o copia esta carpeta dentro de `Documentos/Arduino/libraries/`
y vuelve a abrir el IDE.

## Canciones incluidas

| Método | Canción | Tempo por defecto |
|---|---|---|
| `imperialMarch()` | Marcha Imperial (Star Wars) | 120 |
| `happyBirthday()` | Cumpleaños feliz | 140 |
| `marioBros()` | Super Mario Bros (tema principal) | 200 |
| `odeToJoy()` | Himno de la Alegría | 114 |

Todas aceptan un tempo distinto: `musica.marioBros(250);` la toca más rápido.
Las melodías viven en la memoria flash (`PROGMEM`), así que no gastan RAM.

## Tocar sin bloquear

Los métodos de arriba son **bloqueantes**: el Arduino no hace nada más hasta
que la canción termina. Para tocar música y seguir atendiendo botones,
sensores o luces al mismo tiempo, usa la versión no bloqueante:

```cpp
BuzzerMusic musica(8);

void setup() {
  pinMode(2, INPUT);
  musica.start(BuzzerMusic::MARIO_BROS);   // deja la canción lista
}

void loop() {
  musica.update();   // avanza la canción cuando corresponde; no espera

  if (digitalRead(2) == HIGH) {
    // esto corre miles de veces por segundo, con la música sonando
  }
}
```

| Método | Qué hace |
|---|---|
| `start(cancion, tempo = 0)` | Empieza una canción (`BuzzerMusic::IMPERIAL_MARCH`, `HAPPY_BIRTHDAY`, `MARIO_BROS`, `ODE_TO_JOY`); tempo 0 = el de la partitura |
| `update()` | Llamar seguido en el `loop()`: toca la nota siguiente cuando es su momento |
| `stop()` | Corta la música |
| `isPlaying()` | `true` mientras la canción no termina |

El ejemplo `MusicaSinBloquear` trae esto funcionando con un botón y un LED.

## Agregar canciones

Una canción es una lista de pares `{nota, duración}`:

- Las notas están definidas en `src/pitches.h` (`NOTE_C4` es el do central;
  `REST` es un silencio).
- La duración es la figura musical: `4` = negra, `8` = corchea, `16` =
  semicorchea… Negativa = nota con puntillo (dura 1.5 veces más).

Puedes tocar tu melodía sin tocar la librería, con el método genérico:

```cpp
const int estrellita[] = {
  NOTE_C4,4, NOTE_C4,4, NOTE_G4,4, NOTE_G4,4,
  NOTE_A4,4, NOTE_A4,4, NOTE_G4,2,
};
musica.play(estrellita, 7);   // 7 notas, tempo 120
```

Y para sumarla a la librería: agrega un método en `src/BuzzerMusic.h` y su
melodía en `src/BuzzerMusic.cpp`, copiando el molde de cualquiera de las
canciones incluidas.

## Créditos

- Melodías transcritas por [Robson Couto](https://github.com/robsoncouto/arduino-songs).
- Tabla de frecuencias (`pitches.h`) de [HiBit](https://www.hibit.dev), basada
  en el ejemplo `toneMelody` de Arduino.

## Licencia

GPL-3.0 — ver [LICENSE](LICENSE).
