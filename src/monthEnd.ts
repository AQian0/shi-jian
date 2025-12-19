import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const monthEnd = (date?: MaybeDateInput): Date => {
  const d = normalizeDate(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  return d;
};
