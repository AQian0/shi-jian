import type { MaybeDateInput } from "./types";

import { isIso8601, ISO8601_PATTERN } from "./iso8601";

/**
 * @description 将输入转换为标准化的 Date 对象。
 * @example
 * normalizeDate(new Date()) // 当前时间
 * normalizeDate('2024-01-15') // 2024-01-15T00:00:00
 * normalizeDate('2024-01-15T10:30:00') // 2024-01-15T10:30:00
 */
export const normalizeDate = (date?: MaybeDateInput): Date => {
  if (!date) {
    return new Date();
  }
  if (date instanceof Date) {
    const d = new Date(date);
    d.setMilliseconds(0);
    return d;
  }
  if (isIso8601(date)) {
    const matches = date.match(ISO8601_PATTERN);
    return new Date(matches && !matches[4] ? date.concat("T00:00:00") : date);
  }
  throw new Error(`Non ISO 8601 compliant date (${date}).`);
};
