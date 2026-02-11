import type { MaybeDateInput } from "./types";

import { monthEnd } from "./monthEnd";

/**
 * @description 获取指定日期所在月份的天数。
 * @example
 * monthDays(new Date('2024-02-15')) // 29（闰年）
 * monthDays(new Date('2023-02-15')) // 28
 * monthDays(new Date('2024-01-15')) // 31
 */
export const monthDays = (inputDate?: MaybeDateInput): number => {
  const d = monthEnd(inputDate);
  return d.getDate();
};
