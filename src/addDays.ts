import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export function addDays(inputDate?: MaybeDateInput, count = 1) {
  const d = normalizeDate(inputDate);
  d.setDate(d.getDate() + count);
  return d;
}
