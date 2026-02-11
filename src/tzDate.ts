import type { MaybeDateInput } from "./types";

import { applyOffset } from "./applyOffset";
import { normalizeDate } from "./date";
import { offset } from "./offset";

/**
 * @description Convert date to a date in the specified timezone.
 * @example
 * tzDate(new Date('2024-01-15T00:00:00Z'), 'Asia/Shanghai') // Date object representing Shanghai time
 */
export const tzDate = (inputDate: MaybeDateInput, tz: string): Date => {
  const d = normalizeDate(inputDate);
  return applyOffset(d, offset(d, tz));
};
