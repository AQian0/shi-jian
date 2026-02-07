import type {
  ParseOptions,
  Format,
  Part,
  FormatStyle,
  FormatToken,
  DateOverflowStrategy,
} from "./types";

import { ap } from "./ap";
import {
  FIXED_LENGTH,
  MIDNIGHT,
  MIDNIGHT_24H,
  NOON,
  STYLES,
  four,
  two,
  validOffset,
} from "./common";
import { normalizeDate } from "./date";
import { formatStr } from "./formatStr";
import { fourDigitYear } from "./fourDigitYear";
import { monthDays } from "./monthDays";
import { parseParts } from "./parseParts";
import { parts } from "./parts";
import { range } from "./range";

const validationCache = new Map<string, Part[]>();
const NUMERIC_VALUES = new Set([
  "numeric",
  "2-digit",
]);
const defaultPartFilter = (): boolean => true;
const validate = (parts: Part[]): Part[] | never => {
  const cacheKey = parts.map(p => `${p.token}:${p.partName}`).join("|");
  const cached = validationCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  let lastPart: Part | undefined = void 0;
  for (const part of parts) {
    if (part.partName === "literal" && !Number.isNaN(Number.parseFloat(part.partValue))) {
      throw new Error(`Numbers in format (${part.partValue}).`);
    }
    if (lastPart && lastPart.partName !== "literal" && part.partName !== "literal") {
      if (
        !(lastPart.token in FIXED_LENGTH) &&
        !(part.token in FIXED_LENGTH) &&
        !(NUMERIC_VALUES.has(lastPart.partValue) && part.token.toLowerCase() === "a")
      ) {
        throw new Error(`Illegal adjacent tokens (${lastPart.token}, ${part.token})`);
      }
    }
    lastPart = part;
  }
  validationCache.set(cacheKey, parts);
  return parts;
};

/**
 * 将日期字符串解析为 Date 对象。
 * @param options - 解析选项对象
 * @returns 解析后的 Date 对象
 * @throws 当日期字符串与格式不匹配时抛出错误
 * @example
 * parse({ date: '2024-01-15', format: 'YYYY-MM-DD' })
 */
export function parse(options: ParseOptions): Date | never;
/**
 * 将日期字符串解析为 Date 对象。
 * @param dateStr - 要解析的日期字符串
 * @param format - 日期格式，默认为 'ISO8601'
 * @param locale - 语言环境，默认为 'device'
 * @returns 解析后的 Date 对象
 * @throws 当日期字符串与格式不匹配时抛出错误
 * @example
 * parse('2024-01-15', 'YYYY-MM-DD')
 * parse('15/01/2024', 'DD/MM/YYYY')
 */
export function parse(dateStr: string, format?: Format, locale?: string): Date | never;
export function parse(
  dateStrOrOptions: string | ParseOptions,
  format: Format = "ISO8601",
  locale = "device",
): Date | never {
  let partFilter: (part: Part) => boolean = defaultPartFilter;
  let dateStr: string;
  let dateOverflow: DateOverflowStrategy = "backward";
  if (typeof dateStrOrOptions === "object") {
    ({
      date: dateStr,
      format = "ISO8601",
      locale = "device",
      dateOverflow = "backward",
      partFilter = defaultPartFilter,
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
  const formatParts = validate(parts(format, locale).filter(part => partFilter(part)));
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
  let a: undefined | boolean = void 0;
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
            default:
              break;
          }
        }
      }
    }
  });
  let hours = parsed.get("HH") || MIDNIGHT;
  if (a === false) {
    hours += hours === NOON ? MIDNIGHT : NOON;
    parsed.set("HH", hours === MIDNIGHT_24H ? MIDNIGHT : hours);
  } else if (a === true && hours === NOON) {
    // 12am === 00 in 24 hour clock.
    parsed.set("HH", MIDNIGHT);
  }
  parsed.set("MM", (parsed.get("MM") || 1) - 1);
  const Y = parsed.get("YYYY");
  const M = parsed.get("MM");
  let D = parsed.get("DD");
  const h = parsed.get("HH");
  const m = parsed.get("mm");
  const s = parsed.get("ss");

  if (
    Y === void 0 ||
    M === void 0 ||
    D === void 0 ||
    h === void 0 ||
    m === void 0 ||
    s === void 0
  ) {
    throw new Error(`Missing required date parts`);
  }

  // Determine if the date is valid for the month.
  const maxDaysInMonth = monthDays(new Date(`${four(Y)}-${two(M + 1)}-10`));
  if (maxDaysInMonth < D && dateOverflow === "throw")
    throw new Error(`Invalid date ${four(Y)}-${two(M + 1)}-${two(D)}`);
  D = dateOverflow === "backward" ? Math.min(D, maxDaysInMonth) : D;

  // Create the date.
  const isoString = `${four(Y)}-${two(M + 1)}-${two(D)}T${two(h)}:${two(m)}:${two(s)}${offset}`;
  const d = new Date(isoString);
  if (Number.isFinite(+d)) return d;
  return invalid();
}
