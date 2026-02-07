import type { MaybeDateInput } from "./types";

import { monthEnd } from "./monthEnd";

/**
 * 获取指定日期所在月份的天数。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @returns 当月的天数（28、29、30 或 31）
 * @example
 * monthDays(new Date('2024-02-15')) // 29（闰年）
 * monthDays(new Date('2023-02-15')) // 28
 * monthDays(new Date('2024-01-15')) // 31
 */
export const monthDays = (inputDate?: MaybeDateInput): number => {
  const d = monthEnd(inputDate);
  return d.getDate();
};
