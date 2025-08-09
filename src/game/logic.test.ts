import { describe, it, expect } from 'vitest';
import { determineOutcome } from './logic';

describe('determineOutcome - classic', () => {
  it('rock beats scissors', () => {
    expect(determineOutcome('rock', 'scissors', 'classic')).toBe('player');
  });
  it('paper beats rock', () => {
    expect(determineOutcome('paper', 'rock', 'classic')).toBe('player');
  });
  it('scissors loses to rock', () => {
    expect(determineOutcome('scissors', 'rock', 'classic')).toBe('computer');
  });
  it('tie when same', () => {
    expect(determineOutcome('paper', 'paper', 'classic')).toBe('tie');
  });
});

describe('determineOutcome - rpsls', () => {
  it('spock vaporizes rock', () => {
    expect(determineOutcome('spock', 'rock', 'rpsls')).toBe('player');
  });
  it('lizard poisons spock', () => {
    expect(determineOutcome('lizard', 'spock', 'rpsls')).toBe('player');
  });
  it('scissors decapitated by spock', () => {
    expect(determineOutcome('scissors', 'spock', 'rpsls')).toBe('computer');
  });
});