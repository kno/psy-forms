'use strict';

// Preguntas y puntuaciones del documento Juego mapa de amor, en su orden original.
const LOVE_MAP_QUESTIONS = [
  {
    "id": 1,
    "text": "Nombra a dos de mis mejores amigos",
    "points": 2
  },
  {
    "id": 2,
    "text": "¿Cuál es mi grupo musical favorito, compositor o instrumento musical?",
    "points": 2
  },
  {
    "id": 3,
    "text": "¿Qué ropa llevaba cuando nos conocimos?",
    "points": 2
  },
  {
    "id": 4,
    "text": "Nombra una de mis aficiones",
    "points": 3
  },
  {
    "id": 5,
    "text": "¿Dónde nací?",
    "points": 1
  },
  {
    "id": 6,
    "text": "¿A qué tensiones me enfrento actualmente?",
    "points": 4
  },
  {
    "id": 7,
    "text": "Describe con detalle lo que he hecho hoy, o ayer",
    "points": 4
  },
  {
    "id": 8,
    "text": "¿Cuándo es mi cumpleaños?",
    "points": 1
  },
  {
    "id": 9,
    "text": "¿Cuándo es nuestro aniversario?",
    "points": 1
  },
  {
    "id": 10,
    "text": "¿Quién es mi pariente favorito?",
    "points": 2
  },
  {
    "id": 11,
    "text": "¿Cuál es mi mayor sueño no realizado?",
    "points": 5
  },
  {
    "id": 12,
    "text": "¿Cuál es mi flor favorita?",
    "points": 2
  },
  {
    "id": 13,
    "text": "Nombra uno de mis mayores miedos",
    "points": 3
  },
  {
    "id": 14,
    "text": "¿Cuál es mi hora del día favorita para hacer el amor?",
    "points": 3
  },
  {
    "id": 15,
    "text": "¿Qué me hace sentir más competente?",
    "points": 4
  },
  {
    "id": 16,
    "text": "¿Qué me excita sexualmente?",
    "points": 3
  },
  {
    "id": 17,
    "text": "¿Cuál es mi plato favorito?",
    "points": 2
  },
  {
    "id": 18,
    "text": "¿Cómo prefiero pasar una tarde?",
    "points": 2
  },
  {
    "id": 19,
    "text": "¿Cuál es mi color favorito?",
    "points": 1
  },
  {
    "id": 20,
    "text": "¿En qué quiero mejorar personalmente?",
    "points": 4
  },
  {
    "id": 21,
    "text": "¿Qué regalos me gustan más?",
    "points": 2
  },
  {
    "id": 22,
    "text": "Nombra una de mis experiencias de infancia",
    "points": 2
  },
  {
    "id": 23,
    "text": "¿Dónde prefiero ir de vacaciones?",
    "points": 2
  },
  {
    "id": 24,
    "text": "¿Cómo prefiero que me tranquilicen?",
    "points": 4
  },
  {
    "id": 25,
    "text": "¿Quién es mi mayor fuente de apoyo, aparte de ti?",
    "points": 3
  },
  {
    "id": 26,
    "text": "¿Cuál es mi deporte favorito?",
    "points": 2
  },
  {
    "id": 27,
    "text": "¿Qué es lo que más me gusta hacer en mi tiempo libre?",
    "points": 2
  },
  {
    "id": 28,
    "text": "Nombra una de mis actividades favoritas los fines de semana",
    "points": 2
  },
  {
    "id": 29,
    "text": "¿Cuál es mi lugar preferido para una escapada?",
    "points": 3
  },
  {
    "id": 30,
    "text": "¿Cuál es mi película favorita?",
    "points": 2
  },
  {
    "id": 31,
    "text": "Nombra algunos de los sucesos importantes que están ocurriendo en mi vida. ¿Cómo me siento con respecto a ellos?",
    "points": 4
  },
  {
    "id": 32,
    "text": "Nombra alguna de mis formas favoritas de ejercicio",
    "points": 2
  },
  {
    "id": 33,
    "text": "¿Quién era mi mejor amigo en la infancia?",
    "points": 3
  },
  {
    "id": 34,
    "text": "Nombra una de mis revistas favoritas",
    "points": 2
  },
  {
    "id": 35,
    "text": "Nombra uno de mis mayores rivales o enemigos",
    "points": 3
  },
  {
    "id": 36,
    "text": "¿Cuál sería para mí el trabajo ideal?",
    "points": 4
  },
  {
    "id": 37,
    "text": "¿Qué me da más miedo?",
    "points": 4
  },
  {
    "id": 38,
    "text": "¿Cuál es el pariente que menos me gusta?",
    "points": 3
  },
  {
    "id": 39,
    "text": "¿Cómo son mis vacaciones favoritas?",
    "points": 2
  },
  {
    "id": 40,
    "text": "¿Qué clase de libros me gusta leer?",
    "points": 3
  },
  {
    "id": 41,
    "text": "¿Cuál es mi programa favorito de televisión?",
    "points": 2
  },
  {
    "id": 42,
    "text": "¿Qué lado de la cama prefiero?",
    "points": 2
  },
  {
    "id": 43,
    "text": "¿Qué me pone triste?",
    "points": 4
  },
  {
    "id": 44,
    "text": "Nombra una de mis preocupaciones",
    "points": 4
  },
  {
    "id": 45,
    "text": "¿Qué problemas médicos me preocupan?",
    "points": 2
  },
  {
    "id": 46,
    "text": "¿Cuál fue el momento en que pasé más vergüenza?",
    "points": 3
  },
  {
    "id": 47,
    "text": "¿Cuál fue la peor experiencia de mi infancia?",
    "points": 3
  },
  {
    "id": 48,
    "text": "Nombra dos de las personas que más admiro",
    "points": 4
  },
  {
    "id": 49,
    "text": "Nombra a mi mayor rival o enemigo",
    "points": 3
  },
  {
    "id": 50,
    "text": "De todas las personas que los dos conocemos, ¿quién me cae peor?",
    "points": 3
  },
  {
    "id": 51,
    "text": "Nombra uno de mis postres favoritos",
    "points": 2
  },
  {
    "id": 52,
    "text": "¿Cuál es mi número de la seguridad social?",
    "points": 2
  },
  {
    "id": 53,
    "text": "Nombra una de mis novelas favoritas",
    "points": 2
  },
  {
    "id": 54,
    "text": "¿Cuál es mi restaurante favorito?",
    "points": 2
  },
  {
    "id": 55,
    "text": "Nombra dos de mis aspiraciones, esperanzas o deseos",
    "points": 4
  },
  {
    "id": 56,
    "text": "¿Tengo alguna ambición secreta? ¿Cuál es?",
    "points": 4
  },
  {
    "id": 57,
    "text": "¿Qué platos aborrezco?",
    "points": 2
  },
  {
    "id": 58,
    "text": "¿Cuál es mi animal favorito?",
    "points": 2
  },
  {
    "id": 59,
    "text": "¿Cuál es mi canción favorita?",
    "points": 2
  },
  {
    "id": 60,
    "text": "¿Cuál es mi equipo deportivo favorito?",
    "points": 2
  }
];

if (typeof module !== 'undefined') module.exports = LOVE_MAP_QUESTIONS;
