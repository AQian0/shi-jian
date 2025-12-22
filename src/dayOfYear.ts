import type { MaybeDateInput } from "./types";

import { MS_DAY } from "./common";
import { normalizeDate } from "./date";

export const dayOfYear = (date?: MaybeDateInput): number => {
  const d = normalizeDate(date);
  return Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0).getTime() -
      new Date(d.getFullYear(), 0, 0).getTime()) /
      MS_DAY,
  );
}
