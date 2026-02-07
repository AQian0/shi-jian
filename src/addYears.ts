import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";
import { monthDays } from "./monthDays";

/**
 * 在指定日期基础上增加或减少年数。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @param count - 增加的年数，默认为 1；传入负数表示减少年数
 * @param dateOverflow - 是否允许日期溢出，默认为 false。
 *   当设置为 false 时，若目标年份该月天数少于原日期的日，则自动调整至该月最后一天。
 *   例如：2024年2月29日（闰年）加1年将得到2025年2月28日
 * @returns 计算后的新 Date 对象
 * @example
 * addYears(new Date('2024-02-29'), 1) // 2025-02-28
 * addYears(new Date('2024-02-29'), 1, true) // 2025-03-01（溢出至3月）
 */
export const addYears = (inputDate?: MaybeDateInput, count = 1, dateOverflow = false): Date => {
  const d = normalizeDate(inputDate);
  const dayOfMonth = d.getDate();

  if (!dateOverflow) {
    d.setDate(1);
    d.setFullYear(d.getFullYear() + count);
    const daysInMonth = monthDays(d);
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth);
  } else {
    d.setFullYear(d.getFullYear() + count);
  }

  return d;
};
