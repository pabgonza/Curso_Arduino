// BuzzerMusic - canciones listas para tocar con un buzzer y tone()
// Copyright (c) 2026 Pablo Gonzalez - GPL-3.0
// Melodias transcritas por Robson Couto (github.com/robsoncouto/arduino-songs)

#ifndef BuzzerMusic_h
#define BuzzerMusic_h

#include "pitches.h"

class BuzzerMusic
{
public:
    enum Song { IMPERIAL_MARCH, HAPPY_BIRTHDAY, MARIO_BROS, ODE_TO_JOY };

    BuzzerMusic(int buzzerPin);

    // --- Version bloqueante: toca la cancion completa y recien ahi vuelve ---
    // El tempo por defecto (0) es el de la partitura; pasa otro para
    // tocarla mas rapido o mas lento.
    void imperialMarch(int tempo = 0);
    void happyBirthday(int tempo = 0);
    void marioBros(int tempo = 0);
    void odeToJoy(int tempo = 0);

    // Toca cualquier melodia (bloqueante): pares {nota, duracion}, donde
    // duracion es 4 = negra, 8 = corchea, etc. Negativa = con puntillo (1.5x).
    // nNotes es la cantidad de pares.
    void play(const int melody[], int nNotes, int tempo = 120);

    // --- Version no bloqueante: la musica avanza mientras el loop sigue ---
    // start() solo deja la cancion lista; hay que llamar a update() seguido
    // (en cada vuelta del loop) para que las notas vayan sonando.
    void start(Song song, int tempo = 0);
    void update();
    void stop();
    bool isPlaying();

private:
    int _buzzerPin;
    const int *_melody;          // melodia actual, en PROGMEM
    int _nNotes;
    int _index;                  // posicion dentro del arreglo (avanza de a 2)
    long _wholenote;             // duracion de una redonda en ms
    unsigned long _noteStart;    // millis() cuando empezo la nota actual
    unsigned long _noteDuration;
    bool _playing;

    void playBlocking(Song song, int tempo);
};

#endif
