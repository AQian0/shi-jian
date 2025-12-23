import type { MaybeDateInput } from "./types";

import { MIDNIGHT, MIN_DAY } from "./common";
import { normalizeDate } from "./date";

export const monthEnd = (date?: MaybeDateInput): Date => {
  const d = normalizeDate(date);
  d.setDate(MIN_DAY);
  d.setMonth(d.getMonth() + 1);
  d.setDate(MIDNIGHT);
  return d;
};
