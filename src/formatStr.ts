import type { Format, Part } from "./types";

import {
  CLOCK_12_PATTERNS,
  CLOCK_24_PATTERNS,
  CLOCK_AGNOSTIC_PATTERNS,
} from "./common";
import { parts } from "./parts";

const escapeTokens = (str: string): string => {
  return [
    ...CLOCK_AGNOSTIC_PATTERNS,
    ...CLOCK_24_PATTERNS,
    ...CLOCK_12_PATTERNS,
  ]
    .sort((a, b) => (a[0].length > b[0].length ? 1 : -1))
    .reduce((target, part) => {
      return target.replace(part[0], `\\${part[0]}`);
    }, str);
};

export const formatStr = (
  format: Format,
  locale = "en",
  escapeLiterals = false,
  filterParts: (part: Part) => boolean = () => true,
): string => {
  return parts(format, locale)
    .filter(filterParts)
    .reduce(
      (f, p) =>
        (f +=
          escapeLiterals && p.partName === "literal"
            ? escapeTokens(p.token)
            : p.token),
      "",
    )
    .normalize("NFKC");
};
