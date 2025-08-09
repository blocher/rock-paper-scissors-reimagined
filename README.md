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
