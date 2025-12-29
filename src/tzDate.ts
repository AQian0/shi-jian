import type { MaybeDateInput } from "./types";

import { applyOffset } from "./applyOffset";
import { normalizeDate } from "./date";
import { offset } from "./offset";

export const tzDate = (inputDate: MaybeDateInput, tz: string): Date => {
  const d = normalizeDate(inputDate);
  return applyOffset(d, offset(d, tz));
};
