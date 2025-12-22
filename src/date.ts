import type { MaybeDateInput } from "./types";

import { isIso8601, ISO8601_PATTERN } from "./iso8601";

export const normalizeDate = (date?: MaybeDateInput): Date => {
  if (!date) {
    return new Date();
  }
  if (date instanceof Date) {
    return new Date(new Date(date).setMilliseconds(0));
  }
  if (isIso8601(date)) {
    const matches = date.match(ISO8601_PATTERN);
    return new Date(matches && !matches[4] ? date.concat("T00:00:00") : date);
  }
  throw new Error(`Non ISO 8601 compliant date (${date}).`);
};
