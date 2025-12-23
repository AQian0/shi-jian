import type { Part, FilledPart } from "./types";

import { FIXED_LENGTH, fixedLengthByOffset } from "./common";

export const parseParts = (dateStr: string, formatParts: Part[]): FilledPart[] => {
  let i = 0;
  const advance = (
    parts: Part[],
  ): [
    Part,
    Part | undefined,
  ] => [
    parts[(i += 1)] as Part,
    parts[i],
  ];
  let pos = 0;
  const parsed: FilledPart[] = [];
  let n: undefined | Part = void 0;
  do {
    const [current, next] = advance(formatParts);
    n = next;
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
        for (let i = 1; i <= 4; i++) {
          if (Number.isNaN(Number(dateStr.charAt(pos + i)))) {
            len = i;
            break;
          }
        }
      } else {
        const nextChar = dateStr.slice(pos).search(/\d/);
        if (nextChar !== -1) len = pos + nextChar;
      }
    } else {
      len = dateStr.length;
    }
    parsed.push({
      ...current,
      value: dateStr.slice(pos, pos + len),
    });
    pos += len;
  } while (n);
  return parsed;
};
