import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const yearEnd = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMonth(11, 31);
  d.setHours(23, 59, 59, 999);
  return d;
};
