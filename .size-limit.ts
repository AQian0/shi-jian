import type { SizeLimitConfig } from "size-limit";

import { existsSync, readFileSync } from "node:fs";

type BuildFormat = {
  name: string;
  path: string;
  dtsPath: string;
  limit: string;
};

const BUILD_FORMATS: ReadonlyArray<BuildFormat> = [
  {
    name: "ESM",
    path: "./dist/index.mjs",
    dtsPath: "./dist/index.d.mts",
    limit: "7 kB",
  },
  {
    name: "CJS",
    path: "./dist/index.cjs",
    dtsPath: "./dist/index.d.cts",
    limit: "7 kB",
  },
  {
    name: "Browser",
    path: "./dist/bundle.mjs",
    dtsPath: "./dist/bundle.d.mts",
    limit: "7 kB",
  },
] as const;

// TODO: 以下函数体积较大，未来需要优化以减小打包体积
// Note: 尺寸增长主要来自改进的错误处理和更详细的错误消息
const CUSTOM_LIMITS: Record<string, string> = {
  format: "3.5 kB",
  parse: "5.1 kB",
  range: "3.8 kB",
  formatStr: "1.8 kB",
  parts: "1.8 kB",
  tzDate: "1.4 kB",
  offset: "1.05 kB",
};

const extractExports = (dtsPath: string): ReadonlyArray<string> => {
  if (!existsSync(dtsPath)) {
    // oxlint-disable-next-line no-console
    console.warn(`Warning: ${dtsPath} does not exist, skipping...`);
    return [];
  }
  const dtsContent = readFileSync(dtsPath, "utf-8");
  const exportMatch = dtsContent.match(/export \{([^}]+)\}/);
  if (!exportMatch) {
    // oxlint-disable-next-line no-console
    console.warn(`Warning: Cannot find exports in ${dtsPath}`);
    return [];
  }
  const allExports = exportMatch[1]
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
  return allExports.filter(name => {
    return /^[a-z]/.test(name) && !/^[A-Z_]+$/.test(name);
  });
};

const configs: SizeLimitConfig = [];

for (const format of BUILD_FORMATS) {
  if (!existsSync(format.path)) {
    // oxlint-disable-next-line no-console
    console.warn(`Warning: ${format.path} does not exist, skipping...`);
    continue;
  }
  if (format.name !== "CJS") {
    const functionExports = extractExports(format.dtsPath);
    for (const fnName of functionExports) {
      configs.push({
        name: `${fnName} (${format.name})`,
        path: format.path,
        import: `{ ${fnName} }`,
        limit: CUSTOM_LIMITS[fnName] ?? "1 kB",
      });
    }
  }
  configs.push({
    name: `Full bundle (${format.name})`,
    path: format.path,
    limit: format.limit,
  });
}

// oxlint-disable-next-line no-default-export
export default configs;
