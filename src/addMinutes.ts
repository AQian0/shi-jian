import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

export const addMinutes = (inputDate?: MaybeDateInput, count = 1) => {
  const d = normalizeDate(inputDate);
  d.setMinutes(d.getMinutes() + count);
  return d;
};
