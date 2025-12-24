import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const addSeconds = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setSeconds(d.getSeconds() + count);
  return d;
};
