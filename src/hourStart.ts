import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const hourStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMinutes(0, 0, 0);
  return d;
};
