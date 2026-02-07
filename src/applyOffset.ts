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
  const match = offset.match(/([+-])([0-3][0-9]):?([0-6][0-9])/);
  if (!match) {
    throw new Error(`Invalid offset format: ${offset}`);
  }
  const [_, sign, hours, mins] = match;
  const offsetInMins = Number(hours) * MINUTES_PER_HOUR + Number(mins);
  return sign === "+" ? offsetInMins : -offsetInMins;
};

/**
 * 将时区偏移应用到日期上。
 * @param dateInput - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @param offset - 时区偏移量，支持 '+08:00' 或 '+0800' 格式；默认为 '+00:00'
 * @returns 应用偏移后的新 Date 对象
 * @example
 * applyOffset(new Date('2024-01-15T00:00:00Z'), '+08:00') // 2024-01-15T08:00:00Z
 */
export const applyOffset = (dateInput?: MaybeDateInput, offset = "+00:00"): Date => {
  const d = normalizeDate(dateInput);
  const token = ((): TimezoneToken => {
    switch (fixedLengthByOffset(offset)) {
      case OFFSET_LENGTH_WITHOUT_COLON:
        return "ZZ";
      case OFFSET_LENGTH_WITH_COLON:
        return "Z";
      default:
        return "Z";
    }
  })();
  const timeDiffInMins = offsetToMins(offset, token);
  return new Date(d.getTime() + timeDiffInMins * MS_PER_MINUTE);
};
