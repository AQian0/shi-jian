import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 获取指定日期当前小时的起始时刻（分秒归零）。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @returns 当前小时 XX:00:00 的 Date 对象
 * @example
 * hourStart(new Date('2024-01-15T14:30:45')) // 2024-01-15T14:00:00
 */
export const hourStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMinutes(0, 0, 0);
  return d;
};
