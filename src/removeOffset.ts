import type { MaybeDateInput, OffsetString } from "./types";

import { applyOffset } from "./applyOffset";
import { FIRST_CHAR_INDEX } from "./common";

/**
 * @description Remove timezone offset from a date.
 * @example
 * removeOffset(new Date('2024-01-15T08:00:00Z'), '+08:00') // 2024-01-15T00:00:00Z
 */
export const removeOffset = (dateInput?: MaybeDateInput, offset: OffsetString = "+00:00"): Date => {
  const positive = offset.charAt(FIRST_CHAR_INDEX) === "+";
  return applyOffset(
    dateInput,
    offset.replace(positive ? "+" : "-", positive ? "-" : "+") as OffsetString,
  );
};
