import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Get the start moment of the current minute (seconds reset to zero) for the specified date.
 * @example
 * minuteStart(new Date('2024-01-15T14:30:45')) // 2024-01-15T14:30:00
 */
export const minuteStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setSeconds(0, 0);
  return d;
};
