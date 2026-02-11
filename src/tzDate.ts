import type { MaybeDateInput } from "./types";

import { applyOffset } from "./applyOffset";
import { normalizeDate } from "./date";
import { offset } from "./offset";

/**
 * @description 将日期转换为指定时区的日期。
 * @example
 * tzDate(new Date('2024-01-15T00:00:00Z'), 'Asia/Shanghai') // 表示上海时间的 Date 对象
 */
export const tzDate = (inputDate: MaybeDateInput, tz: string): Date => {
  const d = normalizeDate(inputDate);
  return applyOffset(d, offset(d, tz));
};
