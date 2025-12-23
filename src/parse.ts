import type { ParseOptions, Format, Part, FormatStyle, FormatToken } from "./types";

import { ap } from "./ap";
import { FIXED_LENGTH, STYLES, four, two, validOffset } from "./common";
import { normalizeDate } from "./date";
import { formatStr } from "./formatStr";
import { fourDigitYear } from "./fourDigitYear";
import { monthDays } from "./monthDays";
import { parseParts } from "./parseParts";
import { parts } from "./parts";
import { range } from "./range";

const validate = (parts: Part[]): Part[] | never => {
  let lastPart: Part | undefined = undefined;
  for (const part of parts) {
    if (part.partName === "literal" && !isNaN(Number.parseFloat(part.partValue))) {
      throw new Error(`Numbers in format (${part.partValue}).`);
    }
    if (lastPart && lastPart.partName !== "literal" && part.partName !== "literal") {
      if (
        !(lastPart.token in FIXED_LENGTH) &&
        !(part.token in FIXED_LENGTH) &&
        !(
          [
            "numeric",
            "2-digit",
          ].includes(lastPart.partValue) && part.token.toLowerCase() === "a"
        )
      ) {
        throw new Error(`Illegal adjacent tokens (${lastPart.token}, ${part.token})`);
      }
    }
    lastPart = part;
  }
  return parts;
};

export function parse(options: ParseOptions): Date | never;
export function parse(dateStr: string, format?: Format, locale?: string): Date | never;
export function parse(
  dateStrOrOptions: string | ParseOptions,
  format: Format = "ISO8601",
  locale = "device",
): Date | never {
  let partFilter: (part: Part) => boolean = () => true;
  let dateStr: string;
  let dateOverflow = "backward";
  if (typeof dateStrOrOptions === "object") {
    ({
      date: dateStr,
      format = "ISO8601",
      locale = "device",
      dateOverflow = "backward",
      partFilter = () => true,
    } = dateStrOrOptions);
  } else {
    dateStr = dateStrOrOptions;
  }
  if (!dateStr) throw new Error("parse() requires a date string.");
  const invalid = (): never => {
    throw new Error(`Date (${dateStr}) does not match format (${formatStr(format, locale)})`);
  };
  if (format === "ISO8601") return normalizeDate(dateStr);
  const genitive = STYLES.includes(format as FormatStyle) || typeof format === "object";
  const formatParts = validate(parts(format, locale).filter(partFilter));
  if (formatParts.length === 0) throw new Error("parse() requires a pattern.");
  let parsedParts;
  try {
    parsedParts = parseParts(dateStr, formatParts);
  } catch {
    return invalid();
  }
  const now = new Date();
  const parsed = new Map([
    [
      "YYYY",
      now.getFullYear(),
    ],
    [
      "MM",
      now.getMonth() + 1,
    ],
    [
      "DD",
      now.getDate(),
    ],
    [
      "HH",
      0,
    ],
    [
      "mm",
      0,
    ],
    [
      "ss",
      0,
    ],
  ]);
  let a: null | boolean = null;
  let offset = "";
  parsedParts.forEach((part): void | never => {
    if (part.partName === "literal") return;
    if (part.token === part.value) return invalid();
    const v = Number(part.value);
    if (parsed.has(part.token)) {
      parsed.set(part.token, v);
    } else if (part.token === "YY") {
      parsed.set("YYYY", fourDigitYear(part.value));
    } else {
      const t = part.token;
      if (t.startsWith("d")) {
        return;
      } else if (t === "D") {
        parsed.set("DD", v);
      } else if (t === "H" || t.startsWith("h")) {
        parsed.set("HH", v);
      } else if (t === "M") {
        parsed.set("MM", v);
      } else if (t === "a" || t === "A") {
        a = part.value.toLowerCase() === ap("am", locale).toLowerCase();
      } else if (t === "Z" || t === "ZZ") {
        offset = validOffset(part.value, t);
      } else {
        const values = range(t as FormatToken, locale, genitive);
        const index = values.indexOf(part.value);
        if (index !== -1) {
          switch (t) {
            case "MMM":
            case "MMMM":
              parsed.set("MM", index + 1);
              break;
          }
        }
      }
    }
  });
  let hours = parsed.get("HH") || 0;
  if (a === false) {
    hours += hours === 12 ? 0 : 12;
    parsed.set("HH", hours === 24 ? 0 : hours);
  } else if (a === true && hours === 12) {
    // 12am === 00 in 24 hour clock.
    parsed.set("HH", 0);
  }
  parsed.set("MM", (parsed.get("MM") || 1) - 1);
  let [Y, M, D, h, m, s] = [
    "YYYY",
    "MM",
    "DD",
    "HH",
    "mm",
    "ss",
  ].map(k => parsed.get(k)!) as [
    number,
    number,
    number,
    number,
    number,
    number,
  ];

  // Determine if the date is valid for the month.
  const maxDaysInMonth = monthDays(new Date(`${four(Y)}-${two(M + 1)}-10`));
  if (maxDaysInMonth < D && dateOverflow === "throw")
    throw new Error(`Invalid date ${four(Y)}-${two(M + 1)}-${two(D)}`);
  D = dateOverflow === "backward" ? Math.min(D, maxDaysInMonth) : D;

  // Create the date.
  const isoString = `${four(Y)}-${two(M + 1)}-${two(D)}T${two(h)}:${two(m)}:${two(s)}${offset}`;
  const d = new Date(isoString);
  if (isFinite(+d)) return d;
  return invalid();
}
