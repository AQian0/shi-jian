import type { MaybeDateInput } from "./types";

import { applyOffset } from "./applyOffset";

export function removeOffset(dateInput?: MaybeDateInput, offset = "+00:00"): Date {
  const positive = offset.slice(0, 1) === "+";
  return applyOffset(dateInput, offset.replace(positive ? "+" : "-", positive ? "-" : "+"));
}
