import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Get the end moment of the current minute (XX:XX:59.999) for the specified date.
 * @example
 * minuteEnd(new Date('2024-01-15T14:30:45')) // 2024-01-15T14:30:59.999
 */
export const minuteEnd = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setSeconds(59, 999);
  return d;
};
