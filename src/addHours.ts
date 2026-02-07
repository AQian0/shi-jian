import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 在指定日期基础上增加或减少小时数。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @param count - 增加的小时数，默认为 1；传入负数表示减少小时数
 * @returns 计算后的新 Date 对象
 * @example
 * addHours(new Date('2024-01-01T10:00:00'), 5) // 2024-01-01T15:00:00
 * addHours('2024-01-01T03:00:00', -5) // 2023-12-31T22:00:00
 */
export const addHours = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setHours(d.getHours() + count);
  return d;
};
