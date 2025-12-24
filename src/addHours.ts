import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const addHours = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setHours(d.getHours() + count);
  return d;
};
