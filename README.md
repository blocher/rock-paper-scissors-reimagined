# Rock Paper Scissors Reimagined

A 2D, casual, variant-heavy take on Rock–Paper–Scissors. Web-first for instant playtesting and sharing; package for iOS/Android once core gameplay feels right.

## Goals

- Fast iteration for a solo/small team.
- Web-first delivery; mobile stores later with minimal friction.
- Multiple fun variants of RPS; crisp feel, juice, and polish.

## Target platforms

- Web (desktop + mobile browsers)
- iOS and Android via Capacitor (WebView wrapper with native plugins)
- Optional later: Desktop via Tauri/Electron

## Primary stack decision

- Language: TypeScript
- Engine/Framework: Phaser 3
- Tooling: Vite (dev/build), ESLint/Prettier
- Native wrapper (when ready): Capacitor

### Why this stack

- Web-first: Instant deploys and sharing for feedback loops.
- Productive: Phaser is battle-tested for 2D; TS improves maintainability.
- Performance-fit: WebGL 2D is sufficient for casual effects at 60fps on modern phones.
- Portable: Capacitor unlocks native APIs (haptics, IAP, ads) without rewriting.

### When to reconsider

Choose an alternative if any of the following become priorities:

- You want a visual scene/animation editor and tighter native feel → Godot 4 or Cocos Creator.
- You’re mobile-first and love Flutter’s dev UX → Flutter + Flame.
- You foresee complex systems/3D or need deep ecosystem tooling → Unity.

## Alternatives (and when to use them)

### Godot 4 (GDScript or C#)

- Pros: Excellent 2D pipeline, native rendering, scene editor, signals, small runtime; exports to iOS/Android/Web (WASM).
- Cons: Different language/runtime; mobile SDKs (IAP/ads) via plugins/native steps.
- Choose if: You want an editor and native feel with strong 2D and plan to stay native-first.

### Cocos Creator (TypeScript)

- Pros: TypeScript + full visual editor, solid 2D, native builds (no WebView), easy mobile exports.
- Cons: Editor lock-in; smaller Western community.
- Choose if: You want TS with an editor and native performance.

### Flutter + Flame

- Pros: Great mobile dev UX/hot reload, native apps, good performance.
- Cons: Lighter game framework, fewer built-ins vs Phaser/Godot; no rich visual editor.
- Choose if: You prefer Dart/Flutter and will keep the game moderately simple.

### Unity (C#)

- Pros: Huge ecosystem, editor, profiling/analytics/ads/IAP tooling; strong 2D.
- Cons: Heavy runtime, larger builds, licensing considerations; overkill here.
- Choose if: You may scale into complex systems or 3D and need ecosystem depth.

### PixiJS or Excalibur.js + Capacitor

- Pros: Leaner rendering/framework; more control.
- Cons: More plumbing; fewer batteries-included game systems.
- Choose if: You want minimal layers and will build your own systems.

## Functional requirements

- Core game modes:
  - Classic RPS (baseline)
  - Variant sets (e.g., RPSLS and custom items), toggleable per mode
  - Streaks, best-of-N, timed rounds, sudden death
- Game feel & feedback:
  - Juice: screen shake, particles, tweens
  - Audio: sfx/music with mute controls
  - Haptics on supported devices
- Players:
  - Single-player baseline (AI/weighted randomness)
  - Optional later: local versus; online multiplayer (future)
- Progression/Meta (optional): cosmetics, achievements, daily challenges
- Monetization (optional): ads, in-app purchases (remove ads/cosmetics)
- Settings: difficulty, speed, accessibility (color-blind palettes, reduced motion)

## UX & gameplay flow

### Visual design

- Hero look: bold, readable 2D with playful, high-contrast palettes and subtle gradients.
- "Juice": snappy tweens, particles, light screen shake, and contextual sfx/haptics.
- Hand/gesture icons: crisp silhouettes for each gesture in every variant.

#### Opening sequence

- Short intro animation: Rock drops in and smashes Scissors (impact particles/hit flash), then a large Paper sweeps in and covers Rock (fold/slide with soft rustle sfx). Logo/title appears.
- Duration target: 1.5–2.0s; skippable on tap/click/any key.
- Accessibility: respect reduced-motion setting (fade-only alternative), and mute if audio disabled.

### On‑screen layout

- Two players visible at all times: left = human, right = computer.
- Each side shows: avatar, display name, per‑match score, and last throw.
- Center HUD: countdown/chant, variant label, and round/match status.
- Series status (toggleable): display current series score, e.g., "2–1 (Best‑of‑3)", with pip or progress indicators.

### Throw cadence (Rock → Paper → Scissors → Go)

- Four-beat rhythm with visual pulses: Rock, Paper, Scissors, Go.
- On "Go": the selectable gesture palette appears/enables for the current variant; user taps/clicks to choose.
- Input window: brief buffer around "Go" to capture intended selection; reveal both throws together with result + explanation (if enabled).

### Variant switching

- Variant selector in main menu before a match (e.g., Classic, RPSLS, Metal Mayhem, OmniThrow, Overrule).
- Optional quick switcher between matches (not during an active match) to keep results comparable per variant.

### Match settings (number of games)

- Match length mode:
  - Best‑of selector: 1/3/5/7 (odd numbers by default to avoid ties).
  - Fixed number of games selector: 1–9 (even/odd allowed; total rounds played regardless of early winner).
- Persist selections between sessions.

### Scores and persistence

- Keep local high scores and recent history per variant (win rate, longest streak, best‑of achievements).
- Storage: `localStorage` for v1; schema versioned for future migration.

### Player identity

- Allow the player to set a user name; allow naming the computer opponent.
- Persist names in `localStorage`; render names in HUD and results.

## Non-functional requirements

- Performance: 60 fps target on mid-range mobile; smooth input and animations
- Bundle size: aim for < 10–15 MB web bundle excluding optional assets
- Latency: tight input latency; minimal GC pressure during gameplay
- Offline: play without network; sync analytics later
- Cross-platform: consistent behavior across browsers and devices
- Observability: basic analytics/events; crash/error reporting

## Technical approach (Phaser + TS + Vite)

- Scenes: `Boot` → `Preload` → `MainMenu` → `Gameplay` → `Results`
- Systems: input manager, game rules engine, UI layer, audio manager, effects manager
- Assets: texture atlases/sprite sheets; web audio
- Config: device capability detection (DPR, refresh rate, reduced motion)
- State: lightweight store for session state (rounds, streaks, settings)
  - Include: player names, selected variant, best‑of setting, and high score summaries (persisted via `localStorage`).

## Mobile integration plan (Capacitor)

- Plugins: App (lifecycle), Haptics, Device, Splash Screen, KeepAwake
- Monetization: AdMob (ads), In‑App Purchases (remove ads/cosmetics)
- Platform services: Game Center / Google Play Games (achievements/leaderboards)
- Lifecycle: pause/resume handling; audio suspend/resume; visibility changes

## Performance guidelines

- Use sprite sheets/atlases to minimize draw calls
- Prefer Arcade Physics (simple, fast); keep collision sets small
- Pool transient objects (particles, hit flashes) to avoid per-frame allocations
- Cap particle counts; throttle expensive effects on low-end devices
- Preload audio; use short, compressed sfx; avoid large decode stutters
- Measure on real devices early; profile frame time and GC pauses

## Testing & QA

- Unit tests for rules/variants in TypeScript (e.g., Vitest)
- Visual/e2e sanity via Playwright (core flows)
- Device test matrix: recent iOS/Android mid-range; Safari/Chrome/Firefox
- CI: lint, type-check, unit tests on PR; preview deploys for web

## Variant build plan (single‑player v1)

### Shared systems

- Rules engine: `src/rules/engine.ts` with a pluggable `Adjudicator` interface and `ModeConfig` describing gestures, win logic, rounds, and toggles.
- AI opponents: `src/ai/` with strategies `Random`, `Adaptive` (counters last‑N tendencies), `Cheeky` (small peek/advantage). Selectable per mode.
- UI/Scenes: `MainMenu` → `Gameplay` → `Results`, with per‑mode HUD toggles (property‑of‑round, explanations, streaks).
- Settings: `src/config/features.ts` for feature flags; persisted in `localStorage` key `rpsr.settings.v1`.

### Modes to implement

- Classic Throw (Normal)
  - Gestures: Rock, Paper, Scissors. Standard relationships.
  - Option: Streak bonus toggle (e.g., +1 on 3+ consecutive wins).

- Spock Expansion (RPSLS)
  - Gestures: Rock, Paper, Scissors, Lizard, Spock. Standard relationships.
  - Option: "Explain the win" toggle showing the specific reason each round.

- Metal Mayhem (curated metals)
  - Predefined list in `data/metals.json`: Titanium, Bronze, Steel, Gold, Iron, Mercury, Uranium, Silver.
  - Round property pool: `hardness_mohs` (max), `melting_C` (max), `density_gcc` (max), `conductivity_MS_m` (max), `reactivity_rank` (min), `corrosion_resistance` (max).
  - Default: pre‑announce property‑of‑the‑round; tie → evaluate a secondary random property.
  - Option: Risk round (hide property until after selection).
  - Data shape example:

    ```json
    {
      "metals": [
        { "name": "Tungsten", "hardness_mohs": 7.5, "melting_C": 3422, "density_gcc": 19.25, "conductivity_MS_m": 18.2, "reactivity_rank": 15, "corrosion_resistance": 8 }
      ],
      "properties": {
        "hardness_mohs": { "direction": "max" },
        "melting_C": { "direction": "max" },
        "density_gcc": { "direction": "max" },
        "conductivity_MS_m": { "direction": "max" },
        "reactivity_rank": { "direction": "min" },
        "corrosion_resistance": { "direction": "max" }
      }
    }
    ```

- OmniThrow (Anything mode)
  - Curated vs Freestyle selector.
  - Algorithmic adjudicator (default, no AI): `src/rules/adjudicators/ontology.ts` uses tags for entries and a weight matrix `W[tagA][tagB]` to compute a score; highest‑impact tag pair forms the explanation.
  - Optional AI fallback (configurable): if tags are sparse or score ≈ 0, call an adapter and cache the verdict/tags for consistency. Safety filters for inputs.
  - Tag data and mappings in `data/ontology/`.

- Overrule (special mode with I Win / Reverse)
  - Adds special throws: `I Win` (beats everything) and `Reverse` (beats `I Win`; ties with itself; normal behavior vs standard gestures).
  - Balance: each side gets 1 `I Win` and 1 `Reverse` per match by default; optional cooldowns; optional "no I Win on match point" toggle.

### Optional add‑ons (cross‑mode)

- Difficulty flavors: Random, Adaptive, Cheeky.
- Streak bonus (off by default except Classic).
- Explain‑the‑win captions (RPSLS on; others optional).
- Risk round (Metal Mayhem).
- Accessibility: color‑blind palettes, reduced motion.

### Testing plan (rules‑first)

- Deterministic adjudication unit tests per mode:
  - Classic/RPSLS: full matchup matrices.
  - Metal Mayhem: property comparisons, tie‑break cascade, hidden property reveal.
  - OmniThrow: tag matrix samples, low‑score fallback behavior; AI path is mocked.
  - Overrule: `I Win` > all, `Reverse` > `I Win`, ties for identical specials, normal interactions otherwise.
- Seeded RNG for AI choices to ensure reproducible tests.

### Milestones

1. Scaffold repo (Vite + Phaser + TS), scene shell, feature flags, seeded RNG.
2. Implement Classic + RPSLS with explanations, unit tests.
3. Add Metal Mayhem with `data/metals.json`, risk/announce toggles, tests.
4. Implement OmniThrow (algorithmic), seed `data/ontology/` and weight matrix, tests.
5. Add Overrule mode, charges UI, tests.
6. Polish: juice (particles/haptics), settings persistence, basic analytics; prepare mobile wrapper.

## Build & release plan

- Web: build with Vite; host on static hosting (e.g., GitHub Pages, Netlify, Vercel)
- Mobile: add Capacitor when ready; `sync` native projects; store submissions
- Versioning: semantic versioning; CHANGELOG; feature flags for experiments

## Future extensions

- Online multiplayer (e.g., Colyseus) and/or async challenges
- Cloud save / cross-device sync
- Seasonal events, rotating modifiers
- Localization and accessibility enhancements

## Open questions

- PWA support and install prompts on web?

## Next steps (no scaffolding yet)

1) 1–2 day spike with Phaser + TS + Vite to validate feel and performance
2) Test on a couple of real devices (iOS/Android) from mobile browser
3) If input/latency or workflow isn’t satisfying, reevaluate Godot/Cocos early
4) Lock stack choice; then scaffold the repo and CI
