export type MaybeDateInput = Date | string | undefined;

export type NamedFormatOption = "long" | "short" | "narrow";

export type NamedFormats = {
  weekday: Record<string, NamedFormatOption>;
  month: Record<string, NamedFormatOption>;
  dayPeriod: Record<string, NamedFormatOption>;
};

export type Part = {
  option: FormatPattern[1];
  partName: Intl.DateTimeFormatPartTypes;
  partValue: string;
  token: string;
  pattern: RegExp;
  hour12: boolean;
};

export type FilledPart = Part & {
  value: string;
};

export type FormatPattern = [
  pattern: FormatToken | string,
  option: Partial<Record<Intl.DateTimeFormatPartTypes, string>>,
  exp?: RegExp,
];

export type FormatStyle = "full" | "long" | "medium" | "short";

export type FormatStyleObj =
  | {
      date: FormatStyle;
      time: FormatStyle;
    }
  | {
      date: FormatStyle;
    }
  | {
      time: FormatStyle;
    };

export type Format = FormatStyle | FormatStyleObj | `${string}`;

export type FormatToken =
  | "YYYY"
  | "YY"
  | "MMMM"
  | "MMM"
  | "MM"
  | "M"
  | "DD"
  | "D"
  | "dddd"
  | "ddd"
  | "d"
  | "mm"
  | "m"
  | "ss"
  | "s"
  | "HH"
  | "H"
  | "hh"
  | "h"
  | "a"
  | "A"
  | "ZZ"
  | "Z";

export type DateOverflowStrategy = "forward" | "backward" | "throw";

export type ParseOptions = {
  date: string;
  format?: Format;
  locale?: string;
  partFilter?: (part: Part) => boolean;
  dateOverflow?: DateOverflowStrategy;
};

export type FormatOptions = {
  date: MaybeDateInput;
  format: Format;
  locale?: string;
  genitive?: boolean;
  tz?: string;
  partFilter?: (part: Part) => boolean;
};

export type TimezoneToken = "Z" | "ZZ";
