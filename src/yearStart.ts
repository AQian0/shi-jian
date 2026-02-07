import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 获取指定日期所在年份的第一天起始时刻（1月1日 00:00:00）。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @returns 当年 1月1日 00:00:00 的 Date 对象
 * @example
 * yearStart(new Date('2024-06-15T14:30:00')) // 2024-01-01T00:00:00
 */
export const yearStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};
