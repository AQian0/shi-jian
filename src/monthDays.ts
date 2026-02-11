import type { MaybeDateInput } from "./types";

import { monthEnd } from "./monthEnd";

/**
 * @description Get the number of days in the month for the specified date.
 * @example
 * monthDays(new Date('2024-02-15')) // 29 (leap year)
 * monthDays(new Date('2023-02-15')) // 28
 * monthDays(new Date('2024-01-15')) // 31
 */
export const monthDays = (inputDate?: MaybeDateInput): number => {
  const d = monthEnd(inputDate);
  return d.getDate();
};
