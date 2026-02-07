import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 获取指定日期当天的起始时刻（00:00:00）。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @returns 当天 00:00:00 的 Date 对象
 * @example
 * dayStart(new Date('2024-01-15T14:30:00')) // 2024-01-15T00:00:00
 */
export const dayStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setHours(0, 0, 0);
  return d;
};
