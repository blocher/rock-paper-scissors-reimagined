import { Difficulty, ExtendedMove, GameMode, RoundRecord } from './types';
import { getMovesForMode } from './logic';
import { CLASSIC_DEFEATS, RPSLS_DEFEATS } from './constants';

function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getDefeatsMap(mode: GameMode) {
  return mode === 'classic' ? CLASSIC_DEFEATS : RPSLS_DEFEATS;
}

export function pickComputerMove(
  mode: GameMode,
  difficulty: Difficulty,
  history: RoundRecord[]
): ExtendedMove {
  const moves = getMovesForMode(mode);
  const last = history[0];

  if (!last || difficulty === 'normal') {
    return randomOf(moves);
  }

  const defeats = getDefeatsMap(mode);

  if (difficulty === 'hard') {
    // Counter the player's last move
    const counters = Object.entries(defeats)
      .filter(([, beats]) => beats.includes(last.playerMove))
      .map(([m]) => m as ExtendedMove)
      .filter((m) => moves.includes(m));
    return counters.length ? randomOf(counters) : randomOf(moves);
  }

  // easy: pick something the player's last move defeats
  const gifts = defeats[last.playerMove]?.filter((m) => moves.includes(m)) ?? [];
  return gifts.length ? randomOf(gifts) : randomOf(moves);
}