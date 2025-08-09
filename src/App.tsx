import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveButton } from './components/MoveButton';
import { ScoreBoard } from './components/ScoreBoard';
import { HistoryList } from './components/HistoryList';
import { RulesModal } from './components/RulesModal';
import { ThemeToggle } from './components/ThemeToggle';
import { Difficulty, ExtendedMove, GameMode, GameState, Outcome, RoundRecord } from './game/types';
import { getMovesForMode, determineOutcome, getFunResultText, formatMove } from './game/logic';
import { pickComputerMove } from './game/ai';
import { loadState, saveState } from './game/storage';

function createInitialState(): GameState {
  const saved = (typeof window !== 'undefined' ? loadState() : undefined) ?? {};
  return {
    mode: (saved.mode ?? 'classic') as GameMode,
    difficulty: (saved.difficulty ?? 'normal') as Difficulty,
    playerScore: saved.playerScore ?? 0,
    computerScore: saved.computerScore ?? 0,
    ties: saved.ties ?? 0,
    rounds: saved.rounds ?? 0,
    currentStreak: saved.currentStreak ?? 0,
    bestStreak: saved.bestStreak ?? 0,
    history: saved.history ?? [],
    lastOutcome: saved.lastOutcome,
  };
}

export default function App() {
  const [state, setState] = useState<GameState>(() => createInitialState());
  const [showRules, setShowRules] = useState(false);
  const [lastRoundText, setLastRoundText] = useState<string>('');

  const moves = useMemo(() => getMovesForMode(state.mode), [state.mode]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  function play(move: ExtendedMove) {
    const computerMove = pickComputerMove(state.mode, state.difficulty, state.history);
    const outcome = determineOutcome(move, computerMove, state.mode);

    const round: RoundRecord = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      mode: state.mode,
      playerMove: move,
      computerMove,
      outcome,
    };

    const history = [round, ...state.history].slice(0, 50);

    const next: GameState = {
      ...state,
      history,
      rounds: state.rounds + 1,
      playerScore: state.playerScore + (outcome === 'player' ? 1 : 0),
      computerScore: state.computerScore + (outcome === 'computer' ? 1 : 0),
      ties: state.ties + (outcome === 'tie' ? 1 : 0),
      currentStreak: outcome === 'player' ? state.currentStreak + 1 : outcome === 'tie' ? state.currentStreak : 0,
      bestStreak: outcome === 'player' ? Math.max(state.bestStreak, state.currentStreak + 1) : state.bestStreak,
      lastOutcome: outcome,
    };

    setState(next);
    setLastRoundText(getFunResultText(outcome, move, computerMove, state.mode));
  }

  function resetScores() {
    setState((s) => ({
      ...s,
      playerScore: 0,
      computerScore: 0,
      ties: 0,
      rounds: 0,
      currentStreak: 0,
      bestStreak: 0,
      history: [],
      lastOutcome: undefined,
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-50">
      <header className="container mx-auto px-4 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🪨✂️📜</div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            Rock · Paper · Scissors <span className="opacity-70">Reimagined</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost rounded-xl px-3 py-2" onClick={() => setShowRules(true)}>Rules</button>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-sm opacity-80">Mode</label>
              <select
                className="rounded-xl border border-slate-300/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 px-3 py-2"
                value={state.mode}
                onChange={(e) => setState((s) => ({ ...s, mode: e.target.value as GameMode }))}
                aria-label="Game mode"
              >
                <option value="classic">Classic — R·P·S</option>
                <option value="rpsls">Bonus — R·P·S·L·S</option>
              </select>

              <label className="text-sm opacity-80">Difficulty</label>
              <select
                className="rounded-xl border border-slate-300/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 px-3 py-2"
                value={state.difficulty}
                onChange={(e) => setState((s) => ({ ...s, difficulty: e.target.value as Difficulty }))}
                aria-label="Difficulty"
              >
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-ghost rounded-xl px-3 py-2" onClick={resetScores}>Reset</button>
            </div>
          </div>

          <ScoreBoard
            playerScore={state.playerScore}
            computerScore={state.computerScore}
            ties={state.ties}
            rounds={state.rounds}
            currentStreak={state.currentStreak}
            bestStreak={state.bestStreak}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {moves.map((m) => (
              <MoveButton key={m} move={m} onSelect={play} />)
            )}
          </div>

          <AnimatePresence>
            {state.lastOutcome && (
              <motion.div
                key={state.history[0]?.id ?? 'result'}
                className="glass rounded-2xl p-4 sm:p-6"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
              >
                <div className="text-center text-lg sm:text-xl font-semibold">
                  {lastRoundText}
                </div>
                {state.history[0] && (
                  <div className="mt-2 text-center text-sm opacity-70">
                    You: <strong>{formatMove(state.history[0].playerMove)}</strong> ·
                    Computer: <strong>{formatMove(state.history[0].computerMove)}</strong>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <aside className="space-y-6">
          <HistoryList history={state.history} />
          <div className="glass rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg font-bold mb-2">About</h3>
            <p className="text-sm opacity-80">
              A modern, beautiful take on the timeless game. Choose a mode, set a difficulty, and chase a winning streak!
            </p>
          </div>
        </aside>
      </main>

      <RulesModal open={showRules} onClose={() => setShowRules(false)} />

      <footer className="container mx-auto px-4 pb-8 text-center opacity-70 text-sm">
        Built with ❤️ using React + Vite
      </footer>
    </div>
  );
}