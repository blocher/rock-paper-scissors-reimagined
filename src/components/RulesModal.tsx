import { motion, AnimatePresence } from 'framer-motion';

interface RulesModalProps {
  open: boolean;
  onClose: () => void;
}

export function RulesModal({ open, onClose }: RulesModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="glass absolute left-1/2 top-1/2 w-[min(92vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-extrabold">How to Play</h2>
              <button className="btn-ghost rounded-xl px-3 py-2" onClick={onClose}>Close</button>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h3>Classic (Rock · Paper · Scissors)</h3>
              <ul>
                <li>Rock crushes Scissors</li>
                <li>Paper covers Rock</li>
                <li>Scissors cut Paper</li>
              </ul>
              <h3>RPSLS (Rock · Paper · Scissors · Lizard · Spock)</h3>
              <ul>
                <li>Rock crushes Scissors and Lizard</li>
                <li>Paper covers Rock and disproves Spock</li>
                <li>Scissors cut Paper and decapitate Lizard</li>
                <li>Lizard eats Paper and poisons Spock</li>
                <li>Spock smashes Scissors and vaporizes Rock</li>
              </ul>
              <h3>Difficulty</h3>
              <ul>
                <li><strong>Easy</strong>: the computer often gifts you a winning matchup.</li>
                <li><strong>Normal</strong>: purely random choices.</li>
                <li><strong>Hard</strong>: the computer tries to counter your last move.</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}