import type {
  Format,
  Part,
  FormatStyle,
  FormatStyleObj,
  FormatPattern,
  NamedFormats,
  NamedFormatOption,
} from "./types";

import {
  STYLES,
  normalizeStr,
  CLOCK_AGNOSTIC_PATTERNS,
  CLOCK_24_PATTERNS,
  CLOCK_12_PATTERNS,
  MONTHS_PER_YEAR,
  getGenitiveMonth,
} from "./common";

const WEEKDAY_TEST_DATES = [
  3,
  8,
  9,
  7,
  6,
  4,
  3,
] as const;
const NAMED_FORMAT_PARTS: ReadonlyArray<keyof NamedFormats> = [
  "weekday",
  "month",
  "dayPeriod",
];
const NAMED_FORMAT_STYLES: ReadonlyArray<NamedFormatOption> = [
  "long",
  "short",
  "narrow",
];
const UTC_HOUR_BASE = 8;

const memoParts: Map<string, NamedFormats> = new Map();
const tokens = new Map(
  [
    ...CLOCK_AGNOSTIC_PATTERNS,
    ...CLOCK_24_PATTERNS,
    ...CLOCK_12_PATTERNS,
  ].map(format => [
    format[0],
    format,
  ]),
);

const validate = (patterns: Part[]): Part[] => {
  const parts = patterns.map(part => part.partName);
  const deduped = new Set(parts);
  if (parts.length > deduped.size) {
    throw new Error(`Cannot reuse format tokens.`);
  }
  return patterns;
};

const createPart = (hour12: boolean, [token, option, exp]: FormatPattern): Part => {
  const [partName, partValue] = Object.entries(option)[0] as [
    Intl.DateTimeFormatPartTypes,
    string,
  ];
  return {
    option,
    partName,
    partValue,
    token,
    pattern: exp as RegExp,
    hour12,
  };
};

export const parts = (format: Format, locale: string): Part[] => {
  if (STYLES.includes(format as FormatStyle) || typeof format === "object") {
    return styleParts(format as FormatStyle | FormatStyleObj, locale);
  }
  let f = format;
  let match = 0;
  const testPattern = (pattern: FormatPattern): boolean => {
    if (!pattern[2]) pattern[2] = new RegExp(`(.)?(${pattern[0]})`, "g");
    if (!pattern[2].test(f)) return false;

    let didAdd = 0;
    f = f.replace(pattern[2], (_, prefix, actualMatch) => {
      if (prefix === "\\") return actualMatch;
      const prefixStr = typeof prefix === "string" ? prefix : "";
      didAdd += 1;
      const currentMatch = match;
      match += 1;
      return `${prefixStr}{!${currentMatch}!}`;
    });
    return didAdd > 0;
  };
  const found24Patterns = [
    ...CLOCK_AGNOSTIC_PATTERNS.filter(pattern => testPattern(pattern)),
    ...CLOCK_24_PATTERNS.filter(pattern => testPattern(pattern)),
  ].map(pattern => createPart(false, pattern));
  const found12Patterns = CLOCK_12_PATTERNS.filter(pattern => testPattern(pattern)).map(pattern =>
    createPart(true, pattern),
  );
  const parts = validate([
    ...found24Patterns,
    ...found12Patterns,
  ]);
  const EXTRACT_INDEX = /^\{!(\d+)!\}$/;
  const EMPTY_PATTERN = new RegExp("");
  return f
    .split(/(\{!\d+!\})/)
    .map((match: string): Part => {
      const hasIndex = match.match(EXTRACT_INDEX);
      if (hasIndex) {
        const index = Number(hasIndex[1]);
        const part = parts[index];
        if (!part) {
          throw new Error(`Invalid part index: ${index}`);
        }
        return part;
      }
      return {
        option: {
          literal: match,
        },
        partName: "literal",
        partValue: match,
        token: match,
        pattern: EMPTY_PATTERN,
        hour12: false,
      };
    })
    .filter(part => part.partName !== "literal" || part.partValue !== "");
};

const styleParts = (format: FormatStyle | FormatStyleObj, locale: string): Part[] => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "UTC",
  };

  if (typeof format === "string") {
    options.dateStyle = format;
  } else {
    if ("date" in format) options.dateStyle = format.date;
    if ("time" in format) options.timeStyle = format.time;
  }

  const formatter = new Intl.DateTimeFormat(locale, options);
  const segments = formatter.formatToParts(new Date()).map(part => normalizeStr(part));
  const resolvedOptions = formatter.resolvedOptions();
  const hourCycle = resolvedOptions.hourCycle ?? (resolvedOptions.hour12 === false ? "h23" : "h12");
  const hourType = hourCycle === "h23" || hourCycle === "h24" ? 24 : 12;
  return segments
    .map((part): Part | undefined => {
      const partName = part.type;
      const formatPattern = guessPattern(
        part.type,
        part.value,
        locale,
        part.type === "hour" ? hourType : void 0,
        options,
      );
      if (!formatPattern) return void 0;

      const partValue = formatPattern[1][partName];
      if (!partValue) return void 0;

      if (!formatPattern[2]) {
        formatPattern[2] = new RegExp(`${formatPattern[0]}`, "g");
      }
      return {
        option: {
          [partName]: partValue,
        },
        partName,
        partValue,
        token: formatPattern[0],
        pattern: formatPattern[2],
        hour12: hourType === 12,
      };
    })
    .filter((part): part is Part => !!part);
};

const guessPattern = <T extends Intl.DateTimeFormatPartTypes>(
  partName: T,
  partValue: string,
  locale: string,
  hour: T extends "hour" ? 12 | 24 : undefined,
  options: Intl.DateTimeFormatOptions,
): FormatPattern | undefined => {
  const length = partValue.length;
  const isNumeric = !Number.isNaN(Number(partValue));

  switch (partName) {
    case "year":
      return tokens.get(length === 2 ? "YY" : "YYYY");

    case "month": {
      if (isNumeric) return tokens.get("M");
      const style = partStyle(locale, partName, partValue);
      return tokens.get(style === "long" ? "MMMM" : "MMM");
    }

    case "day":
      return tokens.get("D");

    case "weekday": {
      const style = partStyle(locale, partName, partValue);
      switch (style) {
        case "narrow":
          return tokens.get("d");
        case "short":
          return tokens.get("ddd");
        default:
          return tokens.get("dddd");
      }
    }

    case "hour":
      if (hour === 12) return tokens.get("h");
      return tokens.get("H");

    case "minute":
      return tokens.get("mm");

    case "second":
      return tokens.get("ss");

    case "dayPeriod":
      return tokens.get(/^[A-Z]+$/u.test(partValue) ? "A" : "a");

    case "literal":
      return [
        partValue,
        {
          literal: partValue,
        },
        new RegExp(""),
      ];

    case "timeZoneName":
      return tokens.get(options.timeStyle === "full" ? "Z" : "ZZ");

    default:
      return void 0;
  }
};

const applyGenitiveMonth = (
  locale: string,
  style: "long" | "short",
  date: Date,
  segments: Intl.DateTimeFormatPart[],
): void => {
  const genitiveMonth = getGenitiveMonth(date, locale, style);
  const index = segments.findIndex(part => part.type === "month");
  if (index > -1 && genitiveMonth) {
    segments[index] = genitiveMonth;
  }
};

const partStyle = (
  locale: string,
  part: keyof NamedFormats,
  value: string,
): NamedFormatOption | undefined => {
  if (!memoParts.has(locale)) {
    const date = new Date();
    const formats: Partial<NamedFormats> = {};

    for (let i = 0; i < MONTHS_PER_YEAR; i++) {
      date.setMonth(i);
      if (i < WEEKDAY_TEST_DATES.length) {
        const weekday = WEEKDAY_TEST_DATES[i];
        if (weekday !== void 0) date.setDate(weekday);
      }
      date.setUTCHours(UTC_HOUR_BASE + i);

      for (const style of NAMED_FORMAT_STYLES) {
        const formatOptions = NAMED_FORMAT_PARTS.reduce(
          (options, part) =>
            Object.assign(options, {
              [part]: style,
            }),
          {
            hour12: true,
            timeZone: "UTC",
          } as Record<string, unknown>,
        );
        const segments = new Intl.DateTimeFormat(locale, formatOptions)
          .formatToParts(date)
          .map(part => normalizeStr(part));

        if (style === "long" || style === "short") {
          applyGenitiveMonth(locale, style, date, segments);
        }

        segments.forEach(part => {
          if (part.type === "literal") return;
          const type = part.type as keyof NamedFormats;
          formats[type] = {
            ...formats[type],
            [part.value]: style,
          };
        });
      }
    }
    memoParts.set(locale, formats as NamedFormats);
  }

  const formats = memoParts.get(locale);
  return formats?.[part]?.[value];
};
