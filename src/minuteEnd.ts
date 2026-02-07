import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 获取指定日期当前分钟的结束时刻（XX:XX:59.999）。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @returns 当前分钟 XX:XX:59.999 的 Date 对象
 * @example
 * minuteEnd(new Date('2024-01-15T14:30:45')) // 2024-01-15T14:30:59.999
 */
export const minuteEnd = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setSeconds(59, 999);
  return d;
};
