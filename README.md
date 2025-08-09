# Rock Paper Scissors — Reimagined (Web)

A modern, beautiful, and fun web version of Rock · Paper · Scissors with optional RPSLS mode, difficulty settings, animated UI, and persistent progress. Built with React + Vite + TypeScript + Tailwind.

## Features

- **Two modes**: Classic (R·P·S) and Bonus (R·P·S·L·S)
- **Difficulties**: Easy, Normal, Hard AI
- **Animated, responsive UI** with a glassmorphism aesthetic
- **Scoreboard** with win streak tracking and recent history
- **Rules modal** and **theme toggle** (light/dark)
- **Persistence** via `localStorage`
- **Unit tests** for core logic and AI (Vitest + Testing Library)

## Getting started

### Prerequisites
- Node.js 18+ and npm

### Install
```bash
npm install
```

### Run the app (dev)
```bash
npm run dev
```
Then open the local URL shown (typically `http://localhost:5173`).

### Build for production
```bash
npm run build
npm run preview
```

### Run tests
```bash
npm test
```

## How to play
- Pick a **mode** (Classic or RPSLS) and **difficulty** (Easy/Normal/Hard).
- Click a move card to play your turn. The computer responds instantly.
- The **result card** tells you who won and why, and the **scoreboard** updates.
- View **Recent Rounds** in the sidebar and open **Rules** anytime from the header.
- Use **Reset** to clear your current session scores and history.
- Use the **Theme** button to switch between light and dark.

## Project structure
```
/ (workspace)
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.ts
├─ src/
│  ├─ index.css
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ App.test.tsx
│  ├─ components/
│  │  ├─ MoveButton.tsx
│  │  ├─ ScoreBoard.tsx
│  │  ├─ HistoryList.tsx
│  │  ├─ RulesModal.tsx
│  │  └─ ThemeToggle.tsx
│  └─ game/
│     ├─ types.ts
│     ├─ constants.ts
│     ├─ logic.ts
│     ├─ logic.test.ts
│     ├─ ai.ts
│     ├─ ai.test.ts
│     └─ storage.ts
└─ vitest.setup.ts
```

## Notes
- This web app intentionally avoids any native wrappers (e.g., Capacitor) per request.
- Data is stored locally in the browser and can be cleared with your site data or via **Reset** in the app.

## Accessibility
- Buttons include semantic labels and keyboard interaction.
- High-contrast dark mode is available.

Enjoy and have fun! 🎉
