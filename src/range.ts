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

export const range = (token: FormatToken, locale = "en", genitive = false): string[] => {
  const r: (n: number, c: (index: number) => string | number) => string[] = (n, c) =>
    Array(n)
      .fill("")
      .map((_, i) => `${c(i)}`);

  if (token === "M") return r(MONTHS_PER_YEAR, i => i + 1);
  if (token === "MM")
    return r(MONTHS_PER_YEAR, i => {
      const m = i + 1;
      return m <= SINGLE_DIGIT_MAX ? `0${m}` : m;
    });
  if (token.startsWith("M"))
    return range("MM").map(m => format(`2000-${m}-05`, token, locale, genitive));
  if (token.startsWith("d"))
    return r(DAYS_IN_WEEK, i => `0${i + 2}`).map(d => format(`2022-10-${d}`, token, locale));
  if (token === "a")
    return [
      ap("am", locale).toLowerCase(),
      ap("pm", locale).toLowerCase(),
    ];
  if (token === "A")
    return [
      ap("am", locale).toUpperCase(),
      ap("pm", locale).toUpperCase(),
    ];
  if (token.startsWith("Y")) {
    const year = new Date().getFullYear();
    return r(YEAR_RANGE, i => i + 1).reduce(
      (ranges, i) => {
        if (i !== `${YEAR_RANGE}`) ranges.push(format(`${year + Number(i)}-06-06`, token, locale));
        ranges.unshift(format(`${year - Number(i)}-06-06`, token, locale));
        return ranges;
      },
      [
        format(`${year}-06-06`, token, locale),
      ],
    );
  }
  if (token.startsWith("D"))
    return r(
      MAX_DAYS_IN_MONTH,
      i => `${token === "DD" && i <= SINGLE_DIGIT_MAX ? "0" : ""}${i + 1}`,
    );
  if (token.startsWith("H"))
    return r(HOURS_PER_DAY_24H, i => `${token === "HH" && i <= SINGLE_DIGIT_MAX ? "0" : ""}${i}`);
  if (token.startsWith("h"))
    return r(
      HOURS_PER_DAY_12H,
      i => `${token === "hh" && i <= SINGLE_DIGIT_MAX ? "0" : ""}${i + 1}`,
    );
  if (token.startsWith("m") || token.startsWith("s"))
    return r(MAX_MINUTE + 1, i => `${token.length > 1 && i <= SINGLE_DIGIT_MAX ? "0" : ""}${i}`);
  return [];
};
