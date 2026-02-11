import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Get the end moment of the current hour (XX:59:59.999) for the specified date.
 * @example
 * hourEnd(new Date('2024-01-15T14:30:45')) // 2024-01-15T14:59:59.999
 */
export const hourEnd = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMinutes(59, 59, 999);
  return d;
};
