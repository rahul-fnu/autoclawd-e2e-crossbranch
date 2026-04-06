# Task Tracker

A simple in-memory task tracker library.

## Tech Stack
- TypeScript (strict mode)
- Vitest for testing

## Architecture
- `src/types.ts` — shared interfaces (`Task`, `TaskStore`)
- `src/index.ts` — public API re-exports

All implementations must conform to the `TaskStore` interface defined in `src/types.ts`.
Tests must import from source modules, never duplicate implementations.

## Commands
```bash
npm install
npm run typecheck   # tsc --noEmit
npm test            # vitest run
```
