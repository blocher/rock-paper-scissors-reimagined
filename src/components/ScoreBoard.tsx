interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
  ties: number;
  rounds: number;
  currentStreak: number;
  bestStreak: number;
}

export function ScoreBoard({ playerScore, computerScore, ties, rounds, currentStreak, bestStreak }: ScoreBoardProps) {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6 grid grid-cols-2 gap-4">
      <div className="text-center">
        <div className="text-sm uppercase tracking-wide opacity-70">You</div>
        <div className="text-3xl font-extrabold" data-testid="score-player">{playerScore}</div>
      </div>
      <div className="text-center">
        <div className="text-sm uppercase tracking-wide opacity-70">Computer</div>
        <div className="text-3xl font-extrabold" data-testid="score-computer">{computerScore}</div>
      </div>
      <div className="col-span-2 grid grid-cols-3 gap-2 text-center pt-2">
        <div>
          <div className="text-xs opacity-70">Rounds</div>
          <div className="text-xl font-bold">{rounds}</div>
        </div>
        <div>
          <div className="text-xs opacity-70">Ties</div>
          <div className="text-xl font-bold">{ties}</div>
        </div>
        <div>
          <div className="text-xs opacity-70">Streak</div>
          <div className="text-xl font-bold">{currentStreak} <span className="opacity-60">/ {bestStreak}</span></div>
        </div>
      </div>
    </div>
  );
}