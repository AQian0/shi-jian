import type { MaybeDateInput } from "./types";

import { MS_DAY } from "./common";
import { normalizeDate } from "./date";

/**
 * 获取指定日期是当年的第几天。
 * @param date - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @returns 当年的第几天（1-365 或 1-366）
 * @example
 * dayOfYear(new Date('2024-01-01')) // 1
 * dayOfYear(new Date('2024-12-31')) // 366（闰年）
 */
export const dayOfYear = (date?: MaybeDateInput): number => {
  const d = normalizeDate(date);
  return Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0).getTime() -
      new Date(d.getFullYear(), 0, 0).getTime()) /
      MS_DAY,
  );
};
