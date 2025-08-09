import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// jsdom lacks crypto.randomUUID in some envs
Object.defineProperty(globalThis as any, 'crypto', {
  value: { randomUUID: () => 'test-id' },
});

describe('App', () => {
  it('renders and plays a round', () => {
    render(<App />);
    const rockBtn = screen.getByTestId('move-rock');
    fireEvent.click(rockBtn);
    const history = screen.getByTestId('history-list');
    expect(history.textContent).not.toContain('No rounds yet');
  });
});