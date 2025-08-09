import { ExtendedMove, GameMode } from './types';

export const CLASSIC_MOVES: ExtendedMove[] = ['rock', 'paper', 'scissors'];
export const RPSLS_MOVES: ExtendedMove[] = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

export const MODE_TO_MOVES: Record<GameMode, ExtendedMove[]> = {
  classic: CLASSIC_MOVES,
  rpsls: RPSLS_MOVES,
};

// Map of what each move defeats
export const CLASSIC_DEFEATS: Record<ExtendedMove, ExtendedMove[]> = {
  rock: ['scissors'],
  paper: ['rock'],
  scissors: ['paper'],
  lizard: [],
  spock: [],
};

export const RPSLS_DEFEATS: Record<ExtendedMove, ExtendedMove[]> = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock'],
};