import { useEffect, useState } from 'react';
import { saveTheme, loadTheme } from '../game/storage';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (typeof window !== 'undefined' ? loadTheme() : 'light'));

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    saveTheme(theme);
  }, [theme]);

  return (
    <button
      className="btn-ghost rounded-xl px-3 py-2"
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}