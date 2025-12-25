import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const minuteStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setSeconds(0, 0);
  return d;
};
