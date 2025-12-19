import type { MaybeDateInput } from "./types";

import { monthEnd } from "./monthEnd";

export const monthDays = (inputDate?: MaybeDateInput): number => {
  const d = monthEnd(inputDate);
  return d.getDate();
};
