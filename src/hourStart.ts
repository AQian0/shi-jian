import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Get the start moment of the current hour (minutes and seconds reset to zero) for the specified date.
 * @example
 * hourStart(new Date('2024-01-15T14:30:45')) // 2024-01-15T14:00:00
 */
export const hourStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMinutes(0, 0, 0);
  return d;
};
