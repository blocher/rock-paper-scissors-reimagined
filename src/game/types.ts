export type ClassicMove = 'rock' | 'paper' | 'scissors';
export type ExtendedMove = ClassicMove | 'lizard' | 'spock';
export type GameMode = 'classic' | 'rpsls';
export type Difficulty = 'easy' | 'normal' | 'hard';
export type Outcome = 'player' | 'computer' | 'tie';

export interface RoundRecord {
  id: string;
  timestamp: number;
  mode: GameMode;
  playerMove: ExtendedMove;
  computerMove: ExtendedMove;
  outcome: Outcome;
}

export interface GameState {
  mode: GameMode;
  difficulty: Difficulty;
  playerScore: number;
  computerScore: number;
  ties: number;
  rounds: number;
  currentStreak: number;
  bestStreak: number;
  history: RoundRecord[];
  lastOutcome?: Outcome;
}