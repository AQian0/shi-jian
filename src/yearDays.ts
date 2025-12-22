import type { MaybeDateInput } from "./types";

import { MS_DAY } from "./common";
import { normalizeDate } from "./date";

export const yearDays = (date?: MaybeDateInput): number => {
  const d = normalizeDate(date);
  return (
    (new Date(d.getFullYear() + 1, 0, 0).getTime() -
      new Date(d.getFullYear(), 0, 0).getTime()) /
    MS_DAY
  );
};
