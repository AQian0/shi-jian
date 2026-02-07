import { YEARS_PER_CENTURY, YEAR_PREDICTION_THRESHOLD } from "./common";

/**
 * 将两位年份转换为四位年份。
 * @param value - 两位年份字符串，如 '24'、'99'
 * @returns 四位年份数字。若输入值大于当前年份加 20，则视为上个世纪
 * @example
 * fourDigitYear('24') // 2024（假设当前年份为 2024 年）
 * fourDigitYear('99') // 1999
 */
export const fourDigitYear = (value: string): number => {
  const y = new Date().getFullYear();
  const currentYear = y % YEARS_PER_CENTURY;
  const century = Math.floor(y / YEARS_PER_CENTURY);
  const parsedYear = Number(value);
  return (
    (century + (parsedYear > currentYear + YEAR_PREDICTION_THRESHOLD ? -1 : 0)) *
      YEARS_PER_CENTURY +
    parsedYear
  );
};
