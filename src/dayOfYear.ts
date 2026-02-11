import type { MaybeDateInput } from "./types";

import { MS_DAY } from "./common";
import { normalizeDate } from "./date";

/**
 * @description Get the day of the year for the specified date.
 * @example
 * dayOfYear(new Date('2024-01-01')) // 1
 * dayOfYear(new Date('2024-12-31')) // 366 (leap year)
 */
export const dayOfYear = (date?: MaybeDateInput): number => {
  const d = normalizeDate(date);
  return Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0).getTime() -
      new Date(d.getFullYear(), 0, 0).getTime()) /
      MS_DAY,
  );
};
