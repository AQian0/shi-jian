import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const weekStart = (inputDate?: MaybeDateInput, startOfWeekDay = 0): Date => {
  const d = normalizeDate(inputDate);
  let diff = startOfWeekDay - d.getDay();
  if (diff > 0) diff = diff - 7;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};
