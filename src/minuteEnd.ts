import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const minuteEnd = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setSeconds(59, 999);
  return d;
};
