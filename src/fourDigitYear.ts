import { YEARS_PER_CENTURY, YEAR_PREDICTION_THRESHOLD } from "./common";

/**
 * @description Convert a two-digit year to a four-digit year.
 * If the input value is greater than the current year plus 20, it is considered as the previous century.
 * @example
 * fourDigitYear('24') // 2024 (assuming current year is 2024)
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
