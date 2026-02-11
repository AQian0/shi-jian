import type { MaybeDateInput } from "./types";

import { MS_DAY } from "./common";
import { normalizeDate } from "./date";

/**
 * @description Get the number of days in the year for the specified date.
 * @example
 * yearDays(new Date('2024-06-15')) // 366 (leap year)
 * yearDays(new Date('2023-06-15')) // 365
 */
export const yearDays = (date?: MaybeDateInput): number => {
  const d = normalizeDate(date);
  return (
    (new Date(d.getFullYear() + 1, 0, 0).getTime() - new Date(d.getFullYear(), 0, 0).getTime()) /
    MS_DAY
  );
};
