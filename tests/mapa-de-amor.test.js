const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const gameApi = require('../src/tests/mapa-de-amor/game');
const questions = require('../src/tests/mapa-de-amor/questions');

test('el banco contiene 60 preguntas numeradas con sus puntuaciones', () => {
  assert.equal(questions.length, 60);
  assert.deepEqual(questions.map(q => q.id), Array.from({ length: 60 }, (_, i) => i + 1));
  assert.equal(questions[10].points, 5);
  assert.equal(questions[59].text, '¿Cuál es mi equipo deportivo favorito?');
  assert.ok(questions.every(q => q.text && q.points >= 1 && q.points <= 5));
});

test('cada persona recibe 20 preguntas distintas del banco', () => {
  for (let i = 0; i < 100; i++) {
    const game = gameApi.create(['A', 'B'], questions);
    for (const list of game.lists) {
      assert.equal(list.length, 20);
      assert.equal(new Set(list.map(q => q.id)).size, 20);
      assert.ok(list.every(q => questions.includes(q)));
    }
  }
});

test('un acierto da los puntos al responder y uno al preguntar; fallar y pasar no suman', () => {
  const game = gameApi.create(['A', 'B'], questions);
  const first = gameApi.current(game);
  gameApi.answer(game, 'correct');
  assert.deepEqual(gameApi.scores(game), [1, first.question.points]);
  const second = gameApi.current(game);
  assert.equal(second.asker, 1);
  gameApi.answer(game, 'correct');
  assert.deepEqual(gameApi.scores(game), [1 + second.question.points, first.question.points + 1]);
  gameApi.answer(game, 'incorrect');
  gameApi.answer(game, 'skipped');
  assert.deepEqual(gameApi.scores(game), [1 + second.question.points, first.question.points + 1]);
});

test('40 turnos alternados completan 20 preguntas por persona y no admiten más resultados', () => {
  const game = gameApi.create(['A', 'B'], questions);
  for (let i = 0; i < 40; i++) {
    const turn = gameApi.current(game);
    assert.equal(turn.asker, i % 2);
    assert.equal(turn.responder, 1 - i % 2);
    assert.equal(turn.round, Math.floor(i / 2) + 1);
    gameApi.answer(game, 'incorrect');
  }
  assert.equal(gameApi.current(game), null);
  gameApi.answer(game, 'correct');
  assert.equal(game.history.length, 40);
  assert.deepEqual(gameApi.scores(game), [0, 0]);
});

test('deshacer restaura la pregunta y revierte sus puntos, también al terminar', () => {
  const game = gameApi.create(['A', 'B'], questions);
  for (let i = 0; i < 39; i++) gameApi.answer(game, 'incorrect');
  const last = gameApi.current(game);
  gameApi.answer(game, 'correct');
  game.history.pop();
  assert.deepEqual(gameApi.current(game), last);
  assert.deepEqual(gameApi.scores(game), [0, 0]);
  gameApi.answer(game, 'skipped');
  assert.equal(gameApi.current(game), null);
  assert.deepEqual(gameApi.scores(game), [0, 0]);
});

test('escritorio y web/móvil utilizan el mismo juego y tienen acceso desde el menú', () => {
  const root = path.join(__dirname, '..');
  for (const file of ['index.html', 'questions.js', 'game.js', 'renderer.js', 'styles.css']) {
    assert.equal(fs.readFileSync(path.join(root, 'src/tests/mapa-de-amor', file), 'utf8'), fs.readFileSync(path.join(root, 'www/tests/mapa-de-amor', file), 'utf8'));
  }
  for (const folder of ['src', 'www']) {
    assert.match(fs.readFileSync(path.join(root, folder, 'index.html'), 'utf8'), /href="tests\/mapa-de-amor\/index.html"/);
  }
});
