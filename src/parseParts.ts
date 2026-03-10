import type { Part, FilledPart } from "./types";

import { FIXED_LENGTH, MAX_DAY_PERIOD_LENGTH, fixedLengthByOffset } from "./common";

const isFixedLengthToken = (token: string): token is keyof typeof FIXED_LENGTH =>
  token in FIXED_LENGTH;

const findDayPeriodLength = (dateStr: string, pos: number): number => {
  for (let j = 1; j <= MAX_DAY_PERIOD_LENGTH; j++) {
    if (Number.isNaN(Number(dateStr.charAt(pos + j)))) {
      return j;
    }
  }
  return 1;
};

/**
 * @description Parse date string based on format parts.
 */
export const parseParts = (dateStr: string, formatParts: ReadonlyArray<Part>): FilledPart[] => {
  let index = 0;
  const advance = (
    parts: ReadonlyArray<Part>,
  ): [
    Part,
    Part | undefined,
  ] => {
    const current = parts[index];
    index += 1;
    if (!current) {
      throw new Error(`Unexpected end of format parts at index ${index - 1}`);
    }
    return [
      current,
      parts[index],
    ];
  };
  let pos = 0;
  const parsed: FilledPart[] = [];
  while (index < formatParts.length) {
    const [current, next] = advance(formatParts);
    let len = 1;
    if (current.partName === "literal") {
      len = current.partValue.length;
    } else if (current.partName === "timeZoneName") {
      len = fixedLengthByOffset(dateStr.slice(pos));
    } else if (isFixedLengthToken(current.token)) {
      len = FIXED_LENGTH[current.token];
    } else if (next) {
      if (next.partName === "literal") {
        len = dateStr.indexOf(next.partValue, pos) - pos;
        if (len < 0) {
          throw new Error(
            `Expected literal "${next.partValue}" at position ${pos}, but got "${dateStr.slice(pos, pos + 20)}${dateStr.length > pos + 20 ? "..." : ""}"`,
          );
        }
      } else if (next.partName === "dayPeriod") {
        len = findDayPeriodLength(dateStr, pos);
      } else {
        const nextChar = dateStr.slice(pos).search(/\d/);
        if (nextChar !== -1) len = nextChar;
      }
    } else {
      len = dateStr.length - pos;
    }
    parsed.push({
      ...current,
      value: dateStr.slice(pos, pos + len),
    });
    pos += len;
  }
  return parsed;
};
