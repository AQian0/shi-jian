import type { MaybeDateInput, TimezoneToken } from "./types";

import {
  MS_PER_MINUTE,
  MINUTES_PER_HOUR,
  OFFSET_LENGTH_WITHOUT_COLON,
  OFFSET_LENGTH_WITH_COLON,
  fixedLengthByOffset,
  validOffset,
} from "./common";
import { normalizeDate } from "./date";

const offsetToMins = (offset: string, token: TimezoneToken): number => {
  validOffset(offset, token);
  const [_, sign, hours, mins] = offset.match(/([+-])([0-3][0-9]):?([0-6][0-9])/)!;
  const offsetInMins = Number(hours) * MINUTES_PER_HOUR + Number(mins);
  return sign === "+" ? offsetInMins : -offsetInMins;
};

export const applyOffset = (dateInput?: MaybeDateInput, offset = "+00:00"): Date => {
  const d = normalizeDate(dateInput);
  const token = ((): TimezoneToken => {
    switch (fixedLengthByOffset(offset)) {
      case OFFSET_LENGTH_WITHOUT_COLON:
        return "ZZ";
      case OFFSET_LENGTH_WITH_COLON:
        return "Z";
    }
  })();
  const timeDiffInMins = offsetToMins(offset, token);
  return new Date(d.getTime() + timeDiffInMins * MS_PER_MINUTE);
};
