import type { MaybeDateInput } from "./types";

import { MS_DAY } from "./common";
import { normalizeDate } from "./date";

/**
 * @description 获取指定日期所在年份的天数。
 * @example
 * yearDays(new Date('2024-06-15')) // 366（闰年）
 * yearDays(new Date('2023-06-15')) // 365
 */
export const yearDays = (date?: MaybeDateInput): number => {
  const d = normalizeDate(date);
  return (
    (new Date(d.getFullYear() + 1, 0, 0).getTime() - new Date(d.getFullYear(), 0, 0).getTime()) /
    MS_DAY
  );
};
