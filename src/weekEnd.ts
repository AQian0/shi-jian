import type { MaybeDateInput } from "./types";

import { weekStart } from "./weekStart";

export const weekEnd = (inputDate?: MaybeDateInput, startOfWeekDay = 0): Date => {
  const d = weekStart(inputDate, startOfWeekDay);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
};
