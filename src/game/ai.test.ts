import { describe, it, expect } from 'vitest';
import { pickComputerMove } from './ai';

const sampleHistory = (playerMove: any) => [{ id: '1', timestamp: Date.now(), mode: 'classic', playerMove, computerMove: 'rock', outcome: 'player' }];

describe('AI', () => {
  it('returns a valid move in normal difficulty', () => {
    const move = pickComputerMove('classic', 'normal', [] as any);
    expect(['rock', 'paper', 'scissors']).toContain(move);
  });

  it('hard tries to counter last player move', () => {
    const move = pickComputerMove('classic', 'hard', sampleHistory('rock') as any);
    // paper counters rock in classic
    expect(move).toBe('paper');
  });

  it('easy gifts a move that loses to the player last move when possible', () => {
    const move = pickComputerMove('classic', 'easy', sampleHistory('rock') as any);
    // rock defeats scissors in classic
    expect(move).toBe('scissors');
  });
});