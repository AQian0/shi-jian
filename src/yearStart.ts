import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const yearStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};
