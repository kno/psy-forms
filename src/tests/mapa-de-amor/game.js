'use strict';

const LoveMapGame = (() => {
  const questionsPerPlayer = 20;

  function drawQuestions(questions, random = Math.random) {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, questionsPerPlayer);
  }

  function create(names, questions, random = Math.random) {
    return { names, lists: [drawQuestions(questions, random), drawQuestions(questions, random)], history: [] };
  }

  function current(game) {
    const turn = game.history.length;
    if (turn >= questionsPerPlayer * 2) return null;
    const asker = turn % 2;
    return { asker, responder: 1 - asker, question: game.lists[asker][Math.floor(turn / 2)], round: Math.floor(turn / 2) + 1 };
  }

  function answer(game, outcome) {
    const turn = current(game);
    if (!turn || !['correct', 'incorrect', 'skipped'].includes(outcome)) return;
    game.history.push({ ...turn, outcome });
  }

  function scores(game) {
    const totals = [0, 0];
    for (const turn of game.history) {
      if (turn.outcome === 'correct') {
        totals[turn.asker] += 1;
        totals[turn.responder] += turn.question.points;
      }
    }
    return totals;
  }

  return { create, current, answer, scores };
})();

if (typeof module !== 'undefined') module.exports = LoveMapGame;
