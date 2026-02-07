import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 在指定日期基础上增加或减少分钟数。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @param count - 增加的分钟数，默认为 1；传入负数表示减少分钟数
 * @returns 计算后的新 Date 对象
 * @example
 * addMinutes(new Date('2024-01-01T10:30:00'), 15) // 2024-01-01T10:45:00
 * addMinutes('2024-01-01T00:10:00', -20) // 2023-12-31T23:50:00
 */
export const addMinutes = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setMinutes(d.getMinutes() + count);
  return d;
};
