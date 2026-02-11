import type { MaybeDateInput } from "./types";

import { addDays } from "./addDays";
import { SATURDAY_INDEX } from "./common";
import { normalizeDate } from "./date";
import { dayOfYear } from "./dayOfYear";
import { monthDays } from "./monthDays";
import { yearDays } from "./yearDays";

/**
 * @description Find the nearest date within the specified range that satisfies the condition.
 * @example
 * // Find the nearest Sunday
 * nearestDay(new Date('2024-01-15'), (d) => d.getDay() === 0, 'week')
 */
export const nearestDay = (
  date: MaybeDateInput,
  search: (date: Date) => boolean,
  constraint: number | "month" | "week" | "year" = 7,
): Date | undefined => {
  let increments: number;
  let decrements: number;
  const d = normalizeDate(date);
  switch (constraint) {
    case "month":
      decrements = d.getDate();
      increments = monthDays(d) - d.getDate();
      break;
    case "week":
      decrements = d.getDay() + 1;
      increments = SATURDAY_INDEX - d.getDay();
      break;
    case "year": {
      const total = yearDays(d);
      const day = dayOfYear(d);
      decrements = day;
      increments = total - day;
      break;
    }
    default:
      increments = decrements = constraint;
  }

  for (let i = 0; i <= increments || i < decrements; i++) {
    if (i <= increments) {
      const next = addDays(d, i);
      if (search(next)) return next;
    }
    if (i && i <= decrements) {
      const prev = addDays(d, -i);
      if (search(prev)) return prev;
    }
  }
  return void 0;
};
