# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

shi-jian (时间) is a zero-dependency, immutable JavaScript/TypeScript date handling library built on native `Date` and `Intl` APIs. Inspired by [tempo](https://github.com/formkit/tempo). The library is still under active development and APIs may change.

## Commands

All commands use `bun` as the runtime and package manager.

- **Build**: `bun run build` (uses tsdown, outputs ESM/CJS/browser bundles to `dist/`)
- **Test**: `bun run test` (vitest, all tests run with `TZ=America/New_York` and `LC_ALL=en_US.UTF-8`)
- **Test single file**: `bunx vitest run src/__tests__/format.test.ts`
- **Test watch**: `bun run test:watch`
- **Coverage**: `bun run coverage`
- **Type check**: `bun run check` (uses `tsgo --noEmit`, not `tsc`)
- **Lint**: `bun run lint` (oxlint)
- **Lint with type-aware rules**: `bun run lint:type`
- **Format check**: `bunx oxfmt --check`
- **Format fix**: `bunx oxfmt --write`
- **Bundle size check**: `bun run size` (size-limit, per-function limits defined in `.size-limit.ts`)
- **Package publish validation**: `bun run publint`
- **Docs dev**: `bun run docs:dev` (VitePress)

## Architecture

### Source Structure (`src/`)

Each public function lives in its own file (e.g., `format.ts`, `parse.ts`, `addDays.ts`). All exports are re-exported through `src/index.ts`. Tests are colocated in `src/__tests__/` with matching filenames.

### Core Modules

- **`date.ts`** — `normalizeDate()`: The central input normalizer. Converts `MaybeDateInput` (Date | string | undefined) into a `Date` object. Requires ISO 8601 strings; throws on non-compliant input.
- **`types.ts`** — All shared type definitions (`MaybeDateInput`, `FormatToken`, `Part`, `FormatOptions`, `ParseOptions`, etc.).
- **`common.ts`** — Shared constants (time units, format patterns for `Intl.DateTimeFormat`) and utilities (`two()`, `four()`, `minsToOffset()`, `normalizeStr()`). Format tokens are organized into three pattern arrays: `CLOCK_AGNOSTIC_PATTERNS`, `CLOCK_24_PATTERNS`, `CLOCK_12_PATTERNS`.
- **`parts.ts`** — Converts a `Format` (string pattern or style object) into an array of `Part` objects. This is the tokenizer that both `format` and `parse` depend on.
- **`format.ts`** — Formats dates using `Intl.DateTimeFormat` under the hood. Supports token-based formats (`"YYYY-MM-DD"`), style-based formats (`"long"`, `{ date: "full", time: "short" }`), timezone conversion, genitive month forms, and locale-aware AM/PM.
- **`parse.ts`** — Parses date strings back into `Date` objects by matching against `Part` arrays. Supports `dateOverflow` strategies (`"backward"` | `"forward"` | `"throw"`).
- **`range.ts`** — Generates all possible values for a given format token (e.g., all months, weekdays). Uses caching.

### Build Output (tsdown)

Three build targets defined in `tsdown.config.ts`:

1. **ESM** — All `src/**.ts` files individually (for tree-shaking in bundlers)
2. **CJS** — Only `src/index.ts` (for Node.js/backend)
3. **Browser bundle** — Single `bundle.mjs` (for CDN/`<script>`)

### Key Data Flow

`format()` and `parse()` both accept overloaded signatures: positional args or a single options object. Both rely on `parts()` to tokenize the format string, then use `Intl.DateTimeFormat` for locale-aware value resolution.

## Design Conventions

- **`undefined` over `null`**: The project uses `undefined` as the standard falsy value. `null` is intentionally avoided.
- **Immutability**: All date operations return new Date objects; inputs are never mutated.
- **Error handling**: Errors are thrown directly (design trade-off for a lightweight library).
- **Caching**: Performance-sensitive functions (`range`, `parse` validation, `parts` named formats) use `Map`-based caching.
- **`oxlint-disable-next-line no-default-export`**: Required on all config files that use default exports (tsdown, vitest, vitepress, size-limit configs).

## Linting & Formatting

- **Linter**: oxlint (not ESLint). Config in `.oxlintrc.json`.
  - `import/no-default-export` is enforced — use named exports for all library code.
  - `typescript/explicit-function-return-type` is enforced.
  - `typescript/no-explicit-any` is enforced — use `unknown` instead.
  - `no-console` is enforced.
- **Formatter**: oxfmt (not Prettier). Config in `.oxfmtrc.json`.
  - `objectWrap: "always"`, `arrowParens: "avoid"`.

## Testing Notes

- All tests run in a fixed timezone (`America/New_York`) and locale (`en_US.UTF-8`) via vitest env config. Be aware of this when writing timezone-sensitive tests.
- Test files follow the pattern `src/__tests__/<module>.test.ts`.
