import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 在指定日期基础上增加或减少天数。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @param count - 增加的天数，默认为 1；传入负数表示减少天数
 * @returns 计算后的新 Date 对象
 * @example
 * addDays(new Date('2024-01-01'), 5) // 2024-01-06
 * addDays('2024-01-15', -10) // 2024-01-05
 */
export const addDays = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setDate(d.getDate() + count);
  return d;
};
