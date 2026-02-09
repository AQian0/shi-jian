import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";
import { monthDays } from "./monthDays";

/**
 * 在指定日期基础上增加或减少年数。
 * 当 dateOverflow 设置为 false 时，若目标年份该月天数少于原日期的日，则自动调整至该月最后一天。
 * 例如：2024年2月29日（闰年）加1年将得到2025年2月28日
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
