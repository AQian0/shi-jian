import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const dayEnd = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setHours(23, 59, 59, 999);
  return d;
};
