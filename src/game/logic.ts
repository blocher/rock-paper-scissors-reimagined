import { ExtendedMove, GameMode, Outcome } from './types';
import { MODE_TO_MOVES, CLASSIC_DEFEATS, RPSLS_DEFEATS } from './constants';

export function getMovesForMode(mode: GameMode): ExtendedMove[] {
  return MODE_TO_MOVES[mode];
}

export function determineOutcome(
  player: ExtendedMove,
  computer: ExtendedMove,
  mode: GameMode
): Outcome {
  if (player === computer) return 'tie';
  const defeats = mode === 'classic' ? CLASSIC_DEFEATS : RPSLS_DEFEATS;
  if (defeats[player]?.includes(computer)) return 'player';
  if (defeats[computer]?.includes(player)) return 'computer';
  // Fallback for classic mode when extended move is present (shouldn't happen at runtime)
  return 'tie';
}

export function getFunResultText(outcome: Outcome, player: ExtendedMove, computer: ExtendedMove, mode: GameMode): string {
  if (outcome === 'tie') return `Tie! You both picked ${formatMove(player)}.`;
  const verb = describeInteraction(player, computer, mode);
  if (outcome === 'player') return `You win! ${capitalize(formatMove(player))} ${verb} ${formatMove(computer)}.`;
  return `You lose! ${capitalize(formatMove(computer))} ${verb} ${formatMove(player)}.`;
}

export function formatMove(move: ExtendedMove): string {
  return move.charAt(0).toUpperCase() + move.slice(1);
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function describeInteraction(a: ExtendedMove, b: ExtendedMove, mode: GameMode): string {
  const pair = `${a}-${b}`;
  const table: Record<string, string> = mode === 'classic' ? {
    'rock-scissors': 'crushes',
    'paper-rock': 'covers',
    'scissors-paper': 'cuts',
  } : {
    'rock-scissors': 'crushes',
    'rock-lizard': 'crushes',
    'paper-rock': 'covers',
    'paper-spock': 'disproves',
    'scissors-paper': 'cuts',
    'scissors-lizard': 'decapitates',
    'lizard-spock': 'poisons',
    'lizard-paper': 'eats',
    'spock-scissors': 'smashes',
    'spock-rock': 'vaporizes',
  };
  return table[pair] ?? 'meets';
}