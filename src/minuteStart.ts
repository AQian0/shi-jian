import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 获取指定日期当前分钟的起始时刻（秒归零）。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @returns 当前分钟 XX:XX:00 的 Date 对象
 * @example
 * minuteStart(new Date('2024-01-15T14:30:45')) // 2024-01-15T14:30:00
 */
export const minuteStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setSeconds(0, 0);
  return d;
};
