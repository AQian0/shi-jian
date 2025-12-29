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

export const range = (token: FormatToken, locale = "en", genitive = false): string[] => {
  const cacheKey = `${token}|${locale}|${genitive ? 1 : 0}`;
  const cached = rangeCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  const r: (n: number, c: (index: number) => string | number) => string[] = (n, c) =>
    Array.from(
      {
        length: n,
      },
      _ => "",
    ).map((_, i) => `${c(i)}`);
  let result: string[];
  if (token === "M") {
    result = r(MONTHS_PER_YEAR, i => i + 1);
  } else if (token === "MM") {
    result = r(MONTHS_PER_YEAR, i => {
      const m = i + 1;
      return m <= SINGLE_DIGIT_MAX ? `0${m}` : m;
    });
  } else if (token.startsWith("M")) {
    result = range("MM", locale, genitive).map(m =>
      format(`2000-${m}-05`, token, locale, genitive),
    );
  } else if (token.startsWith("d")) {
    result = r(DAYS_IN_WEEK, i => `0${i + 2}`).map(d => format(`2022-10-${d}`, token, locale));
  } else if (token === "a") {
    result = [
      ap("am", locale).toLowerCase(),
      ap("pm", locale).toLowerCase(),
    ];
  } else if (token === "A") {
    result = [
      ap("am", locale).toUpperCase(),
      ap("pm", locale).toUpperCase(),
    ];
  } else if (token.startsWith("Y")) {
    const year = new Date().getFullYear();
    result = r(YEAR_RANGE, i => i + 1).reduce(
      (ranges, i) => {
        if (i !== `${YEAR_RANGE}`) ranges.push(format(`${year + Number(i)}-06-06`, token, locale));
        ranges.unshift(format(`${year - Number(i)}-06-06`, token, locale));
        return ranges;
      },
      [
        format(`${year}-06-06`, token, locale),
      ],
    );
  } else if (token.startsWith("D")) {
    result = r(
      MAX_DAYS_IN_MONTH,
      i => `${token === "DD" && i <= SINGLE_DIGIT_MAX ? "0" : ""}${i + 1}`,
    );
  } else if (token.startsWith("H")) {
    result = r(HOURS_PER_DAY_24H, i => `${token === "HH" && i <= SINGLE_DIGIT_MAX ? "0" : ""}${i}`);
  } else if (token.startsWith("h")) {
    result = r(
      HOURS_PER_DAY_12H,
      i => `${token === "hh" && i <= SINGLE_DIGIT_MAX ? "0" : ""}${i + 1}`,
    );
  } else if (token.startsWith("m") || token.startsWith("s")) {
    result = r(MAX_MINUTE + 1, i => `${token.length > 1 && i <= SINGLE_DIGIT_MAX ? "0" : ""}${i}`);
  } else {
    result = [];
  }

  // 将结果缓存起来
  rangeCache.set(cacheKey, result);
  return result;
};
