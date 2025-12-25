import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const hourEnd = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMinutes(59, 59, 999);
  return d;
};
