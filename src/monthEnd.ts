import type { MaybeDateInput } from "./types";

import { MIDNIGHT, MIN_DAY } from "./common";
import { normalizeDate } from "./date";

/**
 * 获取指定日期所在月份的最后一天。
 * @example
 * monthEnd(new Date('2024-01-15')) // 2024-01-31
 * monthEnd(new Date('2024-02-15')) // 2024-02-29（闰年）
 */
export const monthEnd = (date?: MaybeDateInput): Date => {
  const d = normalizeDate(date);
  d.setDate(MIN_DAY);
  d.setMonth(d.getMonth() + 1);
  d.setDate(MIDNIGHT);
  return d;
};
