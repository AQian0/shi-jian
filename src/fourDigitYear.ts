import { CENTURY, YEAR_PREDICTION_THRESHOLD } from "./common";

export const fourDigitYear = (value: string): number => {
  const y = new Date().getFullYear();
  const currentYear = y % CENTURY;
  const century = Math.floor(y / CENTURY);
  const parsedYear = Number(value);
  return (
    (century + (parsedYear > currentYear + YEAR_PREDICTION_THRESHOLD ? -1 : 0)) * CENTURY +
    parsedYear
  );
};
