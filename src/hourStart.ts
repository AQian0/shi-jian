import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description 获取指定日期当前小时的起始时刻（分秒归零）。
 * @example
 * hourStart(new Date('2024-01-15T14:30:45')) // 2024-01-15T14:00:00
 */
export const hourStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMinutes(0, 0, 0);
  return d;
};
