import { defineConfig } from "tsdown";

// oxlint-disable-next-line no-default-export
export default defineConfig([
  // for bundlers like vite, rollup, esbuild, webpack etc
  {
    entry: [
      "src/**.ts",
    ],
    format: [
      "esm",
    ],
    sourcemap: true,
    dts: true,
    outExtensions: ({ format }) => ({
      js: format === "cjs" ? ".cjs" : ".mjs",
    }),
  },
  // common js for node and other backend runtimes
  {
    entry: [
      "src/index.ts",
    ],
    format: [
      "cjs",
    ],
    sourcemap: true,
    dts: true,
    outExtensions: ({ format }) => ({
      js: format === "cjs" ? ".cjs" : ".mjs",
    }),
  },
  // bundle js for browsers/cdn
  {
    entry: {
      bundle: "src/index.ts",
    },
    format: [
      "esm",
    ],
    sourcemap: true,
    dts: true,
    outExtensions: ({ format }) => ({
      js: format === "cjs" ? ".cjs" : ".mjs",
    }),
  },
]);
