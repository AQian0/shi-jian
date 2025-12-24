import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const addDays = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setDate(d.getDate() + count);
  return d;
};
