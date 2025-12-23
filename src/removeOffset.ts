import type { MaybeDateInput } from "./types";

import { applyOffset } from "./applyOffset";
import { FIRST_CHAR_INDEX } from "./common";

export function removeOffset(dateInput?: MaybeDateInput, offset = "+00:00"): Date {
  const positive = offset.charAt(FIRST_CHAR_INDEX) === "+";
  return applyOffset(dateInput, offset.replace(positive ? "+" : "-", positive ? "-" : "+"));
}
