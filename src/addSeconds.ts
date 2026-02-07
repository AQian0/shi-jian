import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 在指定日期基础上增加或减少秒数。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @param count - 增加的秒数，默认为 1；传入负数表示减少秒数
 * @returns 计算后的新 Date 对象
 * @example
 * addSeconds(new Date('2024-01-01T10:30:00'), 30) // 2024-01-01T10:30:30
 * addSeconds('2024-01-01T00:00:10', -20) // 2023-12-31T23:59:50
 */
export const addSeconds = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setSeconds(d.getSeconds() + count);
  return d;
};
