import type { MaybeDateInput } from "./types";

import { applyOffset } from "./applyOffset";
import { FIRST_CHAR_INDEX } from "./common";

/**
 * 从日期中移除时区偏移。
 * @param dateInput - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @param offset - 要移除的时区偏移量，支持 '+08:00' 或 '+0800' 格式；默认为 '+00:00'
 * @returns 移除偏移后的新 Date 对象
 * @example
 * removeOffset(new Date('2024-01-15T08:00:00Z'), '+08:00') // 2024-01-15T00:00:00Z
 */
export const removeOffset = (dateInput?: MaybeDateInput, offset = "+00:00"): Date => {
  const positive = offset.charAt(FIRST_CHAR_INDEX) === "+";
  return applyOffset(dateInput, offset.replace(positive ? "+" : "-", positive ? "-" : "+"));
};
