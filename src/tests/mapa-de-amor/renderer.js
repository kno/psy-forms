'use strict';

const byId = id => document.getElementById(id);
let game = null;

function showScreen(id) {
  for (const screen of ['start-screen', 'game-screen', 'results-screen']) byId(screen).hidden = screen !== id;
}

function renderScores(id) {
  const scores = LoveMapGame.scores(game);
  byId(id).replaceChildren(...game.names.map((name, i) => {
    const box = document.createElement('div');
    const label = document.createElement('span');
    const value = document.createElement('strong');
    label.textContent = name;
    value.textContent = `${scores[i]} puntos`;
    box.append(label, value);
    return box;
  }));
}

function render() {
  const turn = LoveMapGame.current(game);
  if (!turn) {
    showScreen('results-screen');
    const scores = LoveMapGame.scores(game);
    byId('winner').textContent = scores[0] === scores[1] ? '¡Empate!' : `¡Gana ${game.names[scores[0] > scores[1] ? 0 : 1]}!`;
    renderScores('final-scoreboard');
    const labels = { correct: 'Correcta', incorrect: 'Incorrecta', skipped: 'Pasada' };
    byId('history').replaceChildren(...game.history.map(item => {
      const li = document.createElement('li');
      const points = item.outcome === 'correct' ? `${game.names[item.responder]} +${item.question.points}; ${game.names[item.asker]} +1` : '0 puntos';
      li.textContent = `${game.names[item.asker]} pregunta a ${game.names[item.responder]}: ${item.question.id}. ${item.question.text} — ${labels[item.outcome]} (${points}).`;
      return li;
    }));
    byId('results-heading').focus();
    return;
  }
  showScreen('game-screen');
  renderScores('scoreboard');
  byId('progress').value = game.history.length;
  byId('turn-counter').textContent = `Turno ${game.history.length + 1} de 40 · Pregunta ${turn.round} de 20 de ${game.names[turn.asker]}`;
  byId('turn-heading').textContent = `${game.names[turn.asker]} pregunta; ${game.names[turn.responder]} responde`;
  byId('question-number').textContent = `Pregunta nº ${turn.question.id} · ${turn.question.points} ${turn.question.points === 1 ? 'punto' : 'puntos'}`;
  byId('question-text').textContent = turn.question.text;
  byId('points-description').textContent = `Si acierta: ${game.names[turn.responder]} suma ${turn.question.points} y ${game.names[turn.asker]} suma 1.`;
  byId('undo-btn').disabled = game.history.length === 0;
  byId('turn-heading').focus();
}

byId('start-form').addEventListener('submit', event => {
  event.preventDefault();
  const names = [byId('player-one').value.trim() || 'Persona 1', byId('player-two').value.trim() || 'Persona 2'];
  game = LoveMapGame.create(names, LOVE_MAP_QUESTIONS);
  render();
});

for (const [id, outcome] of [['correct-btn', 'correct'], ['incorrect-btn', 'incorrect'], ['skip-btn', 'skipped']]) {
  byId(id).addEventListener('click', () => {
    LoveMapGame.answer(game, outcome);
    render();
  });
}

function undo() {
  game.history.pop();
  render();
}
byId('undo-btn').addEventListener('click', undo);
byId('review-btn').addEventListener('click', undo);
byId('restart-btn').addEventListener('click', () => {
  game = null;
  showScreen('start-screen');
  byId('player-one').focus();
});
byId('back-link').addEventListener('click', event => {
  if (game && LoveMapGame.current(game) && !window.confirm('Si abandonas el juego perderás la partida. ¿Quieres volver al menú?')) event.preventDefault();
});
window.addEventListener('beforeunload', event => {
  if (game && LoveMapGame.current(game)) {
    event.preventDefault();
    event.returnValue = '';
  }
});
