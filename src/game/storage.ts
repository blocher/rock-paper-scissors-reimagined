import { GameMode, Difficulty, GameState, RoundRecord } from './types';

const THEME_KEY = 'rpsr_theme';
const STATE_KEY = 'rpsr_state_v1';

export function loadTheme(): 'light' | 'dark' {
  const t = localStorage.getItem(THEME_KEY);
  return t === 'dark' ? 'dark' : 'light';
}

export function saveTheme(theme: 'light' | 'dark') {
  localStorage.setItem(THEME_KEY, theme);
}

export function loadState(): Partial<GameState> | undefined {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as Partial<GameState>;
  } catch {
    return undefined;
  }
}

export function saveState(state: GameState) {
  const snapshot: Partial<GameState> = {
    mode: state.mode,
    difficulty: state.difficulty,
    playerScore: state.playerScore,
    computerScore: state.computerScore,
    ties: state.ties,
    rounds: state.rounds,
    currentStreak: state.currentStreak,
    bestStreak: state.bestStreak,
    // keep a short history to limit storage
    history: state.history.slice(0, 50),
    lastOutcome: state.lastOutcome,
  };
  localStorage.setItem(STATE_KEY, JSON.stringify(snapshot));
}