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
} from "./common";

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

export const parts = (format: Format, locale: string): Part[] => {
  if (STYLES.includes(format as FormatStyle) || typeof format === "object") {
    return styleParts(format as FormatStyle | FormatStyleObj, locale);
  }
  let f = format;
  let match = 0;
  const testPattern = (pattern: FormatPattern) => {
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

  const found24Patterns = [
    ...CLOCK_AGNOSTIC_PATTERNS.filter(testPattern),
    ...CLOCK_24_PATTERNS.filter(testPattern),
  ].map(pattern => createPart(false, pattern));

  const found12Patterns = CLOCK_12_PATTERNS.filter(testPattern).map(pattern =>
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
        return parts[Number(hasIndex[1])]!;
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
  const segments = formatter.formatToParts(new Date()).map(normalizeStr);
  const hourTypeSegments = formatter.formatToParts(new Date()).map(normalizeStr);
  const hourPart = hourTypeSegments.find(segment => segment.type === "hour");
  const hourType = hourPart?.value === "23" ? 24 : 12;
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
  const genitiveFormattedParts = new Intl.DateTimeFormat(locale, {
    dateStyle: style === "short" ? "medium" : "long",
    timeZone: "UTC",
  })
    .formatToParts(date)
    .map(normalizeStr);
  const genitiveMonth = genitiveFormattedParts.find(part => part.type === "month");
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
    const WEEKDAYS = [
      3,
      8,
      9,
      7,
      6,
      4,
      3,
    ] as const;
    const PARTS = [
      "weekday",
      "month",
      "dayPeriod",
    ] as const;
    const PART_STYLES: ReadonlyArray<NamedFormatOption> = [
      "long",
      "short",
      "narrow",
    ];
    const MONTHS_COUNT = 12;
    const formats: Partial<NamedFormats> = {};

    for (let i = 0; i < MONTHS_COUNT; i++) {
      date.setMonth(i);
      if (i in WEEKDAYS) date.setDate(WEEKDAYS[i]!);
      date.setUTCHours(8 + i);

      for (const style of PART_STYLES) {
        const formatOptions = PARTS.reduce(
          (options, part) => ({
            ...options,
            [part]: style,
          }),
          {
            hour12: true,
            timeZone: "UTC",
          } as const,
        );
        const segments = new Intl.DateTimeFormat(locale, formatOptions)
          .formatToParts(date)
          .map(normalizeStr);

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
