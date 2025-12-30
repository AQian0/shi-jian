import { existsSync, readFileSync } from 'node:fs';
import type { SizeLimitConfig } from 'size-limit';

type BuildFormat = {
  name: string;
  path: string;
  dtsPath: string;
  limit: string;
};

const BUILD_FORMATS: ReadonlyArray<BuildFormat> = [
  {
    name: 'ESM',
    path: './dist/index.mjs',
    dtsPath: './dist/index.d.mts',
    limit: '6 kB',
  },
  {
    name: 'CJS',
    path: './dist/index.cjs',
    dtsPath: './dist/index.d.cts',
    limit: '6 kB',
  },
  {
    name: 'Browser',
    path: './dist/bundle.mjs',
    dtsPath: './dist/bundle.d.mts',
    limit: '6 kB',
  },
] as const;

const extractExports = (dtsPath: string): ReadonlyArray<string> => {
  if (!existsSync(dtsPath)) {
    console.warn(`Warning: ${dtsPath} does not exist, skipping...`);
    return [];
  }
  const dtsContent = readFileSync(dtsPath, 'utf-8');
  const exportMatch = dtsContent.match(/export \{([^}]+)\}/);
  if (!exportMatch) {
    console.warn(`Warning: Cannot find exports in ${dtsPath}`);
    return [];
  }
  const allExports = exportMatch[1]
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return allExports.filter((name) => {
    return /^[a-z]/.test(name) && !/^[A-Z_]+$/.test(name);
  });
};

const configs:SizeLimitConfig = [];

for (const format of BUILD_FORMATS) {
  if (!existsSync(format.path)) {
    console.warn(`Warning: ${format.path} does not exist, skipping...`);
    continue;
  }
  if (format.name !== 'CJS') {
    const functionExports = extractExports(format.dtsPath);
    for (const fnName of functionExports) {
      configs.push({
        name: `${fnName} (${format.name})`,
        path: format.path,
        import: `{ ${fnName} }`,
        limit: '500 B',
      });
    }
  }
  configs.push({
    name: `Full bundle (${format.name})`,
    path: format.path,
    limit: format.limit,
  });
}

export default configs;
