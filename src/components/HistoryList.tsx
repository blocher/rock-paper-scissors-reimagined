import { ExtendedMove, RoundRecord } from '../game/types';

const ICON: Record<ExtendedMove, string> = {
  rock: '🪨',
  paper: '📜',
  scissors: '✂️',
  lizard: '🦎',
  spock: '🖖',
};

interface HistoryListProps {
  history: RoundRecord[];
}

export function HistoryList({ history }: HistoryListProps) {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">Recent Rounds</h3>
        <span className="text-sm opacity-70">{history.length}</span>
      </div>
      <ul className="space-y-2 max-h-72 overflow-auto" data-testid="history-list">
        {history.length === 0 && (
          <li className="text-sm opacity-70">No rounds yet. Pick a move to play!</li>
        )}
        {history.map((h) => (
          <li
            key={h.id}
            className="flex items-center justify-between rounded-xl border border-slate-200/60 dark:border-slate-700/60 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span title={h.playerMove} aria-hidden>{ICON[h.playerMove]}</span>
              <span className="text-xs opacity-60">vs</span>
              <span title={h.computerMove} aria-hidden>{ICON[h.computerMove]}</span>
            </div>
            <div className="text-xs uppercase tracking-wide opacity-70">
              {h.outcome === 'player' ? 'Win' : h.outcome === 'computer' ? 'Loss' : 'Tie'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}