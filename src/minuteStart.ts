import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 获取指定日期当前分钟的起始时刻（秒归零）。
 * @example
 * minuteStart(new Date('2024-01-15T14:30:45')) // 2024-01-15T14:30:00
 */
export const minuteStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setSeconds(0, 0);
  return d;
};
