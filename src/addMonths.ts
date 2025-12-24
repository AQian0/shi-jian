import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";
import { monthDays } from "./monthDays";

export const addMonths = (inputDate?: MaybeDateInput, count = 1, dateOverflow = false) => {
  const d = normalizeDate(inputDate);
  const dayOfMonth = d.getDate();
  if (!dateOverflow) d.setDate(1);
  d.setMonth(d.getMonth() + count);
  if (!dateOverflow) {
    const daysInMonth = monthDays(d);
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth);
  }
  return d;
};
