import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { ExtendedMove } from '../game/types';

const EMOJI: Record<ExtendedMove, string> = {
  rock: '🪨',
  paper: '📜',
  scissors: '✂️',
  lizard: '🦎',
  spock: '🖖',
};

const COLORS: Record<ExtendedMove, string> = {
  rock: 'from-slate-500 to-slate-700',
  paper: 'from-sky-400 to-blue-600',
  scissors: 'from-pink-500 to-rose-600',
  lizard: 'from-emerald-500 to-green-700',
  spock: 'from-violet-500 to-indigo-700',
};

interface MoveButtonProps {
  move: ExtendedMove;
  onSelect: (move: ExtendedMove) => void;
}

export function MoveButton({ move, onSelect }: MoveButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      data-testid={`move-${move}`}
      aria-label={`Choose ${move}`}
      className={clsx(
        'btn rounded-2xl text-white shadow-lg bg-gradient-to-br w-full py-6 text-lg sm:text-xl',
        COLORS[move]
      )}
      onClick={() => onSelect(move)}
    >
      <span className="text-2xl sm:text-3xl mr-2" aria-hidden>{EMOJI[move]}</span>
      <span className="font-bold capitalize">{move}</span>
    </motion.button>
  );
}