import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";
import { monthDays } from "./monthDays";

/**
 * 在指定日期基础上增加或减少月数。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @param count - 增加的月数，默认为 1；传入负数表示减少月数
 * @param dateOverflow - 是否允许日期溢出至下月，默认为 false。
 *   当设置为 false 时，若目标月份天数少于原日期的日，则自动调整至该月最后一天。
 *   例如：1月31日加1个月将得到2月28日（或闰年2月29日）
 * @returns 计算后的新 Date 对象
 * @example
 * addMonths(new Date('2024-01-31'), 1) // 2024-02-29（闰年）
 * addMonths(new Date('2024-01-31'), 1, true) // 2024-03-02（溢出至3月）
 */
export const addMonths = (inputDate?: MaybeDateInput, count = 1, dateOverflow = false): Date => {
  const d = normalizeDate(inputDate);
  const dayOfMonth = d.getDate();
  if (!dateOverflow) d.setDate(1);
  d.setMonth(d.getMonth() + count);
  if (!dateOverflow) {
    const daysInMonth = monthDays(d);
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth);
  }
  return d;
};
