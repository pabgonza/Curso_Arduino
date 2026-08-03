#include "BuzzerMusic.h"
#include "Arduino.h"

// Las melodias viven en la memoria flash (PROGMEM) para no ocupar RAM.
// Formato: pares {nota, duracion}; duracion negativa = nota con puntillo.

static const int MELODY_IMPERIAL_MARCH[] PROGMEM = {
    // Dart Vader theme (Imperial March) - Star Wars
    // Score available at https://musescore.com/user/202909/scores/1141521
    // The tenor saxophone part was used
    NOTE_A4,4, NOTE_A4,4, NOTE_A4,4, NOTE_F4,-8, NOTE_C5,16,

    NOTE_A4,4, NOTE_F4,-8, NOTE_C5,16, NOTE_A4,2,//4
    NOTE_E5,4, NOTE_E5,4, NOTE_E5,4, NOTE_F5,-8, NOTE_C5,16,
    NOTE_A4,4, NOTE_F4,-8, NOTE_C5,16, NOTE_A4,2,

    NOTE_A5,4, NOTE_A4,-8, NOTE_A4,16, NOTE_A5,4, NOTE_GS5,-8, NOTE_G5,16, //7
    NOTE_DS5,16, NOTE_D5,16, NOTE_DS5,8, REST,8, NOTE_A4,8, NOTE_DS5,4, NOTE_D5,-8, NOTE_CS5,16,

    NOTE_C5,16, NOTE_B4,16, NOTE_C5,16, REST,8, NOTE_F4,8, NOTE_GS4,4, NOTE_F4,-8, NOTE_A4,-16,//9
    NOTE_C5,4, NOTE_A4,-8, NOTE_C5,16, NOTE_E5,2,

    NOTE_A5,4, NOTE_A4,-8, NOTE_A4,16, NOTE_A5,4, NOTE_GS5,-8, NOTE_G5,16, //7
    NOTE_DS5,16, NOTE_D5,16, NOTE_DS5,8, REST,8, NOTE_A4,8, NOTE_DS5,4, NOTE_D5,-8, NOTE_CS5,16,

    NOTE_C5,16, NOTE_B4,16, NOTE_C5,16, REST,8, NOTE_F4,8, NOTE_GS4,4, NOTE_F4,-8, NOTE_A4,-16,//9
    NOTE_A4,4, NOTE_F4,-8, NOTE_C5,16, NOTE_A4,2,
};

static const int MELODY_HAPPY_BIRTHDAY[] PROGMEM = {
    // Happy Birthday
    // Score available at https://musescore.com/user/8221/scores/26906

    NOTE_C4,4, NOTE_C4,8,
    NOTE_D4,-4, NOTE_C4,-4, NOTE_F4,-4,
    NOTE_E4,-2, NOTE_C4,4, NOTE_C4,8,
    NOTE_D4,-4, NOTE_C4,-4, NOTE_G4,-4,
    NOTE_F4,-2, NOTE_C4,4, NOTE_C4,8,

    NOTE_C5,-4, NOTE_A4,-4, NOTE_F4,-4,
    NOTE_E4,-4, NOTE_D4,-4, NOTE_AS4,4, NOTE_AS4,8,
    NOTE_A4,-4, NOTE_F4,-4, NOTE_G4,-4,
    NOTE_F4,-2,
};

static const int MELODY_MARIO_BROS[] PROGMEM = {
    // Mario Bros main song

    NOTE_E7, 12, NOTE_E7, 12, REST, 12, NOTE_E7, 12,
    REST, 12, NOTE_C7, 12, NOTE_E7, 12, REST, 12,
    NOTE_G7, 12, REST, 12, REST, 12,  REST, 12,
    NOTE_G6, 12, REST, 12, REST, 12, REST, 12,

    NOTE_C7, 12, REST, 12, REST, 12, NOTE_G6, 12,
    REST, 12, REST, 12, NOTE_E6, 12, REST, 12,
    REST, 12, NOTE_A6, 12, REST, 12, NOTE_B6, 12,
    REST, 12, NOTE_AS6, 12, NOTE_A6, 12, REST, 12,

    NOTE_G6, 9, NOTE_E7, 9, NOTE_G7, 9,
    NOTE_A7, 12, REST, 12, NOTE_F7, 12, NOTE_G7, 12,
    REST, 12, NOTE_E7, 12, REST, 12, NOTE_C7, 12,
    NOTE_D7, 12, NOTE_B6, 12, REST, 12, REST, 12,

    NOTE_C7, 12, REST, 12, REST, 12, NOTE_G6, 12,
    REST, 12, REST, 12, NOTE_E6, 12, REST, 12,
    REST, 12, NOTE_A6, 12, REST, 12, NOTE_B6, 12,
    REST, 12, NOTE_AS6, 12, NOTE_A6, 12, REST, 12,

    NOTE_G6, 9, NOTE_E7, 9, NOTE_G7, 9,
    NOTE_A7, 12, REST, 12, NOTE_F7, 12, NOTE_G7, 12,
    REST, 12, NOTE_E7, 12, REST, 12, NOTE_C7, 12,
    NOTE_D7, 12, NOTE_B6, 12, REST, 12, REST, 12,
};

static const int MELODY_ODE_TO_JOY[] PROGMEM = {
    // Ode to Joy

    NOTE_E4,4,  NOTE_E4,4,  NOTE_F4,4,  NOTE_G4,4,//1
    NOTE_G4,4,  NOTE_F4,4,  NOTE_E4,4,  NOTE_D4,4,
    NOTE_C4,4,  NOTE_C4,4,  NOTE_D4,4,  NOTE_E4,4,
    NOTE_E4,-4, NOTE_D4,8,  NOTE_D4,2,

    NOTE_E4,4,  NOTE_E4,4,  NOTE_F4,4,  NOTE_G4,4,//4
    NOTE_G4,4,  NOTE_F4,4,  NOTE_E4,4,  NOTE_D4,4,
    NOTE_C4,4,  NOTE_C4,4,  NOTE_D4,4,  NOTE_E4,4,
    NOTE_D4,-4,  NOTE_C4,8,  NOTE_C4,2,

    NOTE_D4,4,  NOTE_D4,4,  NOTE_E4,4,  NOTE_C4,4,//8
    NOTE_D4,4,  NOTE_E4,8,  NOTE_F4,8,  NOTE_E4,4, NOTE_C4,4,
    NOTE_D4,4,  NOTE_E4,8,  NOTE_F4,8,  NOTE_E4,4, NOTE_D4,4,
    NOTE_C4,4,  NOTE_D4,4,  NOTE_G3,2,

    NOTE_E4,4,  NOTE_E4,4,  NOTE_F4,4,  NOTE_G4,4,//12
    NOTE_G4,4,  NOTE_F4,4,  NOTE_E4,4,  NOTE_D4,4,
    NOTE_C4,4,  NOTE_C4,4,  NOTE_D4,4,  NOTE_E4,4,
    NOTE_D4,-4,  NOTE_C4,8,  NOTE_C4,2
};

struct SongData
{
    const int *melody;
    int nNotes;
    int defaultTempo; // el de la partitura
};

#define N_NOTES(m) (int)(sizeof(m) / sizeof(m[0]) / 2)

// En el mismo orden que el enum Song
static const SongData SONGS[] = {
    { MELODY_IMPERIAL_MARCH, N_NOTES(MELODY_IMPERIAL_MARCH), 120 },
    { MELODY_HAPPY_BIRTHDAY, N_NOTES(MELODY_HAPPY_BIRTHDAY), 140 },
    { MELODY_MARIO_BROS,     N_NOTES(MELODY_MARIO_BROS),     200 },
    { MELODY_ODE_TO_JOY,     N_NOTES(MELODY_ODE_TO_JOY),     114 },
};

BuzzerMusic::BuzzerMusic(int buzzerPin)
{
    _buzzerPin = buzzerPin;
    _playing = false;
}

// ---------- version no bloqueante ----------

void BuzzerMusic::start(Song song, int tempo)
{
    const SongData &s = SONGS[song];
    if (tempo <= 0)
        tempo = s.defaultTempo;

    _melody = s.melody;
    _nNotes = s.nNotes;
    _wholenote = (60000L * 4) / tempo;
    _index = 0;
    _noteStart = millis();
    _noteDuration = 0; // para que update() toque la primera nota de inmediato
    _playing = true;
}

void BuzzerMusic::update()
{
    if (!_playing)
        return;
    if (millis() - _noteStart < _noteDuration)
        return; // la nota actual todavia esta sonando

    if (_index >= _nNotes * 2)
    {
        stop(); // se acabo la cancion
        return;
    }

    // las melodias estan en PROGMEM: hay que leerlas con pgm_read_word
    int note = (int16_t)pgm_read_word(&_melody[_index]);
    int divider = (int16_t)pgm_read_word(&_melody[_index + 1]);
    _index += 2;

    if (divider == 0)
        return;

    _noteDuration = _wholenote / abs(divider);
    if (divider < 0)
        _noteDuration *= 1.5; // negativa = nota con puntillo

    // la nota suena el 90% de su duracion; el 10% queda de silencio
    if (note > 0)
        tone(_buzzerPin, note, _noteDuration * 0.9);
    else
        noTone(_buzzerPin);

    _noteStart = millis();
}

void BuzzerMusic::stop()
{
    noTone(_buzzerPin);
    _playing = false;
}

bool BuzzerMusic::isPlaying()
{
    return _playing;
}

// ---------- version bloqueante ----------

void BuzzerMusic::playBlocking(Song song, int tempo)
{
    start(song, tempo);
    while (_playing)
        update();
}

void BuzzerMusic::imperialMarch(int tempo) { playBlocking(IMPERIAL_MARCH, tempo); }
void BuzzerMusic::happyBirthday(int tempo) { playBlocking(HAPPY_BIRTHDAY, tempo); }
void BuzzerMusic::marioBros(int tempo)     { playBlocking(MARIO_BROS, tempo); }
void BuzzerMusic::odeToJoy(int tempo)      { playBlocking(ODE_TO_JOY, tempo); }

// Melodia propia del usuario (en RAM, no en PROGMEM): se toca directo.
void BuzzerMusic::play(const int melody[], int nNotes, int tempo)
{
    long wholenote = (60000L * 4) / tempo;

    for (int i = 0; i < nNotes * 2; i += 2)
    {
        int divider = melody[i + 1];
        if (divider == 0)
            continue;

        long noteDuration = wholenote / abs(divider);
        if (divider < 0)
            noteDuration *= 1.5;

        if (melody[i] > 0)
            tone(_buzzerPin, melody[i], noteDuration * 0.9);

        delay(noteDuration);
        noTone(_buzzerPin);
    }
}
