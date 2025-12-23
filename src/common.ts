import type { FormatPattern, FormatStyle, TimezoneToken } from "./types";

export const MS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MS_PER_MINUTE = (MS_PER_SECOND * SECONDS_PER_MINUTE) as 60000;
export const MINUTES_PER_HOUR = 60;
export const MS_DAY = 86400000;

export const MONTHS_PER_YEAR = 12;
export const DAYS_IN_WEEK = 7;
export const MAX_DAYS_IN_MONTH = 31;
export const HOURS_PER_DAY_24H = 24;
export const HOURS_PER_DAY_12H = 12;
export const NOON = 12;
export const MIDNIGHT = 0;
export const MIDNIGHT_24H = 24;
export const SATURDAY_INDEX = 6;

export const MIN_MONTH = 1;
export const MAX_MONTH = 12;
export const MIN_DAY = 1;
export const MAX_HOUR = 23;
export const MAX_MINUTE = 59;
export const MAX_SECOND = 59;
export const SINGLE_DIGIT_MAX = 9;

export const AM_TEST_HOUR = 5;
export const PM_TEST_HOUR = 20;

export const CENTURY = 100;
export const YEAR_PREDICTION_THRESHOLD = 20;
export const YEAR_RANGE = 120;

export const OFFSET_LENGTH_WITH_COLON = 6;
export const OFFSET_LENGTH_WITHOUT_COLON = 5;

export const MAX_DAY_PERIOD_LENGTH = 4;
export const FIRST_CHAR_INDEX = 0;
export const SECOND_CHAR_INDEX = 1;

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
    return {
      ...part,
      value: part.value.normalize("NFKC"),
    };
  }
  return part;
};

export const minsToOffset = (timeDiffInMins: number, token: TimezoneToken = "Z"): string => {
  const hours = two(Math.floor(Math.abs(timeDiffInMins / MINUTES_PER_HOUR)));
  const mins = two(Math.abs(timeDiffInMins % MINUTES_PER_HOUR));
  const sign = timeDiffInMins < 0 ? "-" : "+";
  if (token === "ZZ") {
    return `${sign}${hours}${mins}`;
  }
  return `${sign}${hours}:${mins}`;
};

const OFFSET_WITH_COLON_REGEX = /^[+-]\d{2}:\d{2}/;
const OFFSET_WITHOUT_COLON_REGEX = /^[+-]\d{4}/;
const OFFSET_Z_VALIDATION_REGEX = /^[+-][0-3]\d:[0-6]\d$/;
const OFFSET_ZZ_VALIDATION_REGEX = /^[+-][0-3]\d[0-6]\d$/;

export const fixedLengthByOffset = (offsetString: string): 6 | 5 => {
  if (OFFSET_WITH_COLON_REGEX.test(offsetString)) {
    return OFFSET_LENGTH_WITH_COLON;
  }
  if (OFFSET_WITHOUT_COLON_REGEX.test(offsetString)) {
    return OFFSET_LENGTH_WITHOUT_COLON;
  }
  throw new Error("Invalid offset format");
};

export const validOffset = (offset: string, token: TimezoneToken = "Z"): string => {
  const valid =
    token === "Z"
      ? OFFSET_Z_VALIDATION_REGEX.test(offset)
      : OFFSET_ZZ_VALIDATION_REGEX.test(offset);
  if (!valid) {
    throw new Error(`Invalid offset: ${offset}`);
  }
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
