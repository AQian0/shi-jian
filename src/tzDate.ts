import type { MaybeDateInput } from "./types";

import { applyOffset } from "./applyOffset";
import { normalizeDate } from "./date";
import { offset } from "./offset";

/**
 * 将日期转换为指定时区的日期。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined
 * @param tz - 目标时区，如 'Asia/Shanghai'、'America/New_York'
 * @returns 转换后的 Date 对象
 * @example
 * tzDate(new Date('2024-01-15T00:00:00Z'), 'Asia/Shanghai') // 表示上海时间的 Date 对象
 */
export const tzDate = (inputDate: MaybeDateInput, tz: string): Date => {
  const d = normalizeDate(inputDate);
  return applyOffset(d, offset(d, tz));
};
