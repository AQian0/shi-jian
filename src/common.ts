import type { FormatPattern, FormatStyle, TimezoneToken } from "./types";

export const MS_DAY = 86400000;

export const SPEC_DATE = "1999-03-04T02:05:01.000Z";

export const STYLES = [
  "full",
  "long",
  "medium",
  "short",
] as const satisfies ReadonlyArray<FormatStyle>;

export const CLOCK_24_PATTERNS = [
  [
    "HH",
    {
      hour: "2-digit",
    },
  ],
  [
    "H",
    {
      hour: "numeric",
    },
  ],
] as const satisfies ReadonlyArray<FormatPattern>;

export const CLOCK_12_PATTERNS = [
  [
    "hh",
    {
      hour: "2-digit",
    },
  ],
  [
    "h",
    {
      hour: "numeric",
    },
  ],
  [
    "a",
    {
      dayPeriod: "narrow",
    },
  ],
  [
    "A",
    {
      dayPeriod: "narrow",
    },
  ],
] as const satisfies ReadonlyArray<FormatPattern>;

export const CLOCK_AGNOSTIC_PATTERNS = [
  [
    "YYYY",
    {
      year: "numeric",
    },
  ],
  [
    "YY",
    {
      year: "2-digit",
    },
  ],
  [
    "MMMM",
    {
      month: "long",
    },
  ],
  [
    "MMM",
    {
      month: "short",
    },
  ],
  [
    "MM",
    {
      month: "2-digit",
    },
  ],
  [
    "M",
    {
      month: "numeric",
    },
  ],
  [
    "DD",
    {
      day: "2-digit",
    },
  ],
  [
    "D",
    {
      day: "numeric",
    },
  ],
  [
    "dddd",
    {
      weekday: "long",
    },
  ],
  [
    "ddd",
    {
      weekday: "short",
    },
  ],
  [
    "d",
    {
      weekday: "narrow",
    },
  ],
  [
    "mm",
    {
      minute: "2-digit",
    },
  ],
  [
    "m",
    {
      minute: "numeric",
    },
  ],
  [
    "ss",
    {
      second: "2-digit",
    },
  ],
  [
    "s",
    {
      second: "numeric",
    },
  ],
  [
    "ZZ",
    {
      timeZoneName: "long",
    },
  ],
  [
    "Z",
    {
      timeZoneName: "short",
    },
  ],
] as const satisfies ReadonlyArray<FormatPattern>;

export const normalizeStr = (part: Intl.DateTimeFormatPart): Intl.DateTimeFormatPart => {
  if (part.type === "literal") {
    part.value = part.value.normalize("NFKC");
  }
  return part;
};

export const minsToOffset = (timeDiffInMins: number, token: TimezoneToken = "Z"): string => {
  const hours = String(Math.floor(Math.abs(timeDiffInMins / 60))).padStart(2, "0");
  const mins = String(Math.abs(timeDiffInMins % 60)).padStart(2, "0");
  const sign = timeDiffInMins < 0 ? "-" : "+";
  if (token === "ZZ") {
    return `${sign}${hours}${mins}`;
  }
  return `${sign}${hours}:${mins}`;
};

const OFFSET_WITH_COLON_REGEX = /^[+-]\d{2}:\d{2}/;
const OFFSET_WITHOUT_COLON_REGEX = /^[+-]\d{4}/;

export const fixedLengthByOffset = (offsetString: string): 6 | 5 => {
  if (OFFSET_WITH_COLON_REGEX.test(offsetString)) {
    return 6;
  }
  if (OFFSET_WITHOUT_COLON_REGEX.test(offsetString)) {
    return 5;
  }
  throw new Error("Invalid offset format");
};

export const validOffset = (offset: string, token: TimezoneToken = "Z") => {
  const valid = ((token: TimezoneToken): boolean => {
    switch (token) {
      case "Z":
        return /^([+-])[0-3][0-9]:[0-6][0-9]$/.test(offset);
      case "ZZ":
        return /^([+-])[0-3][0-9][0-6][0-9]$/.test(offset);
    }
  })(token);
  if (!valid) throw new Error(`Invalid offset: ${offset}`);
  return offset;
};

export const FIXED_LENGTH = {
  DD: 2,
  HH: 2,
  MM: 2,
  YY: 2,
  YYYY: 4,
  hh: 2,
  mm: 2,
  ss: 2,
} as const;

export const two = (n: number) => String(n).padStart(2, "0");

export const four = (n: number) => String(n).padStart(4, "0");
