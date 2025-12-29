import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";
import { monthDays } from "./monthDays";

export const addYears = (inputDate?: MaybeDateInput, count = 1, dateOverflow = false): Date => {
  const d = normalizeDate(inputDate);
  const dayOfMonth = d.getDate();
  if (!dateOverflow) d.setDate(1);
  d.setFullYear(d.getFullYear() + count);
  if (!dateOverflow) {
    const daysInMonth = monthDays(d);
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth);
  }
  return d;
};
