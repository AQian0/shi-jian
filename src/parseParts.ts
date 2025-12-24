import type { Part, FilledPart } from "./types";

import { FIXED_LENGTH, MAX_DAY_PERIOD_LENGTH, fixedLengthByOffset } from "./common";

export const parseParts = (dateStr: string, formatParts: Part[]): FilledPart[] => {
  let index = 0;
  const advance = (
    parts: Part[],
  ): [
    Part,
    Part | undefined,
  ] => [
    parts[index++] as Part,
    parts[index],
  ];
  let pos = 0;
  const parsed: FilledPart[] = [];
  while (index < formatParts.length) {
    const [current, next] = advance(formatParts);
    let len = 1;
    if (current.partName === "literal") {
      len = current.partValue.length;
    } else if (current.partName === "timeZoneName") {
      len = fixedLengthByOffset(dateStr.slice(pos));
    } else if (current.token in FIXED_LENGTH) {
      len = FIXED_LENGTH[current.token as keyof typeof FIXED_LENGTH];
    } else if (next) {
      if (next.partName === "literal") {
        len = dateStr.indexOf(next.partValue, pos) - pos;
        if (len < 0) throw new Error();
      } else if (next.partName === "dayPeriod") {
        for (let j = 1; j <= MAX_DAY_PERIOD_LENGTH; j++) {
          if (Number.isNaN(Number(dateStr.charAt(pos + j)))) {
            len = j;
            break;
          }
        }
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
