import type { FormatToken } from "./types";

import { ap } from "./ap";
import {
  DAYS_IN_WEEK,
  HOURS_PER_DAY_12H,
  HOURS_PER_DAY_24H,
  MAX_DAYS_IN_MONTH,
  MAX_MINUTE,
  MONTHS_PER_YEAR,
  SINGLE_DIGIT_MAX,
  YEAR_RANGE,
} from "./common";
import { format } from "./format";

const rangeCache = new Map<string, string[]>();

/**
 * Generate array with formatted values
 */
export const generateFormattedArray = (
  length: number,
  formatter: (index: number) => string | number,
): string[] =>
  Array.from(
    {
      length,
    },
    (_, i) => `${formatter(i)}`,
  );

/**
 * Pad number with leading zero if needed
 */
const padZero = (value: number, shouldPad: boolean): string =>
  shouldPad && value <= SINGLE_DIGIT_MAX ? `0${value}` : `${value}`;

/**
 * Range generator configuration type
 */
type RangeGenerator = (locale: string, genitive: boolean) => string[];

/**
 * Range generators for exact token matches
 */
const EXACT_GENERATORS: Partial<Record<FormatToken, RangeGenerator>> = {
  // Month - numeric
  M: () => generateFormattedArray(MONTHS_PER_YEAR, i => i + 1),
  MM: () => generateFormattedArray(MONTHS_PER_YEAR, i => padZero(i + 1, i < SINGLE_DIGIT_MAX)),

  // Day - numeric
  D: () => generateFormattedArray(MAX_DAYS_IN_MONTH, i => i + 1),
  DD: () => generateFormattedArray(MAX_DAYS_IN_MONTH, i => padZero(i + 1, i < SINGLE_DIGIT_MAX)),

  // Hour - 24h
  H: () => generateFormattedArray(HOURS_PER_DAY_24H, i => i),
  HH: () => generateFormattedArray(HOURS_PER_DAY_24H, i => padZero(i, true)),

  // Hour - 12h
  h: () => generateFormattedArray(HOURS_PER_DAY_12H, i => i + 1),
  hh: () => generateFormattedArray(HOURS_PER_DAY_12H, i => padZero(i + 1, i < SINGLE_DIGIT_MAX)),

  // Minute
  m: () => generateFormattedArray(MAX_MINUTE + 1, i => i),
  mm: () => generateFormattedArray(MAX_MINUTE + 1, i => padZero(i, true)),

  // Second
  s: () => generateFormattedArray(MAX_MINUTE + 1, i => i),
  ss: () => generateFormattedArray(MAX_MINUTE + 1, i => padZero(i, true)),

  // AM/PM
  a: locale => [
    ap("am", locale).toLowerCase(),
    ap("pm", locale).toLowerCase(),
  ],
  A: locale => [
    ap("am", locale).toUpperCase(),
    ap("pm", locale).toUpperCase(),
  ],
};

/**
 * Generate month ranges (MMM, MMMM)
 */
const generateMonthRange = (token: FormatToken, locale: string, genitive: boolean): string[] =>
  range("MM", locale, genitive).map(m => format(`2000-${m}-05`, token, locale, genitive));

/**
 * Generate weekday ranges (d, ddd, dddd)
 */
const generateWeekdayRange = (token: FormatToken, locale: string): string[] =>
  generateFormattedArray(DAYS_IN_WEEK, i => `0${i + 2}`).map(d =>
    format(`2022-10-${d}`, token, locale),
  );

/**
 * Generate year ranges (YY, YYYY)
 */
const generateYearRange = (token: FormatToken, locale: string): string[] => {
  const currentYear = new Date().getFullYear();
  const result: string[] = [
    format(`${currentYear}-06-06`, token, locale),
  ];

  for (let i = 1; i <= YEAR_RANGE; i++) {
    if (i !== YEAR_RANGE) {
      result.push(format(`${currentYear + i}-06-06`, token, locale));
    }
    result.unshift(format(`${currentYear - i}-06-06`, token, locale));
  }

  return result;
};

/**
 * Prefix-based generators for dynamic tokens
 */
const PREFIX_HANDLERS: Record<
  string,
  (token: FormatToken, locale: string, genitive: boolean) => string[]
> = {
  M: generateMonthRange,
  d: generateWeekdayRange,
  Y: generateYearRange,
};

/**
 * @description Get all possible values for the specified format token.
 * @example
 * range('MM', 'en') // ['01', '02', ..., '12']
 * range('MMMM', 'zh-CN') // ['一月', '二月', ..., '十二月']
 * range('ddd', 'en') // ['Sun', 'Mon', ..., 'Sat']
 */
export const range = (token: FormatToken, locale = "en", genitive = false): string[] => {
  const cacheKey = `${token}|${locale}|${genitive ? 1 : 0}`;
  const cached = rangeCache.get(cacheKey);
  if (cached) return cached;

  let result: string[];

  // Try exact match first
  const exactGenerator = EXACT_GENERATORS[token];
  if (exactGenerator) {
    result = exactGenerator(locale, genitive);
  } else {
    // Try prefix match
    const prefix = token[0];
    const prefixHandler = prefix ? PREFIX_HANDLERS[prefix] : undefined;
    result = prefixHandler?.(token, locale, genitive) ?? [];
  }

  rangeCache.set(cacheKey, result);
  return result;
};
