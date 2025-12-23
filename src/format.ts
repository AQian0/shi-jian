import type {
  DateInput,
  FilledPart,
  Format,
  FormatOptions,
  MaybeDateInput,
  Part,
  TimezoneToken,
} from "./types";

import { ap } from "./ap";
import { minsToOffset, normalizeStr } from "./common";
import { normalizeDate } from "./date";
import { offset } from "./offset";
import { parts } from "./parts";
import { removeOffset } from "./removeOffset";

const createPartMap = (
  inputDate: MaybeDateInput,
  parts: Part[],
  locale: string,
  genitive = false,
): Record<keyof Intl.DateTimeFormatPartTypesRegistry, string> => {
  const d = normalizeDate(inputDate);
  const hour12 = parts.filter(part => part.hour12);
  const hour24 = parts.filter(part => !part.hour12);
  const valueParts: Intl.DateTimeFormatPart[] = [];
  const genitiveParts: Part[] = [];
  const addValues = (requestedParts: Part[], hour12 = false) => {
    const preciseLocale = `${locale}-u-hc-${hour12 ? "h12" : "h23"}`;
    valueParts.push(
      ...new Intl.DateTimeFormat(
        preciseLocale,
        requestedParts.reduce(
          (options, part) => {
            if (part.partName === "literal") return options;
            if (
              genitive &&
              [
                "MMMM",
                "MMM",
                "dddd",
                "ddd",
              ].includes(part.token)
            ) {
              genitiveParts.push(part);
            }
            return Object.assign(options, part.option);
          },
          {
            timeZone: "UTC",
          } as Intl.DateTimeFormatOptions,
        ),
      )
        .formatToParts(d)
        .map(normalizeStr),
    );
    if (genitive && genitiveParts.length > 0) {
      for (const part of genitiveParts) {
        let formattedParts: Intl.DateTimeFormatPart[] = [];
        switch (part.token) {
          case "MMMM":
            formattedParts = new Intl.DateTimeFormat(preciseLocale, {
              dateStyle: "long",
              timeZone: "UTC",
            })
              .formatToParts(d)
              .map(normalizeStr);
            break;
          case "MMM":
            formattedParts = new Intl.DateTimeFormat(preciseLocale, {
              dateStyle: "medium",
              timeZone: "UTC",
            })
              .formatToParts(d)
              .map(normalizeStr);
            break;
        }
        const genitiveFormattedPart = formattedParts.find(p => p.type === part.partName);
        const index = valueParts.findIndex(p => p.type === part.partName);
        if (genitiveFormattedPart && index > -1) {
          valueParts[index] = genitiveFormattedPart;
        }
      }
    }
  };

  if (hour12.length > 0) addValues(hour12, true);
  if (hour24.length > 0) addValues(hour24);

  return valueParts.reduce(
    (map, part) => {
      map[part.type] = part.value;
      return map;
    },
    {} as Record<keyof Intl.DateTimeFormatPartTypesRegistry, string>,
  );
};

const fill = (
  inputDate: MaybeDateInput,
  parts: Part[],
  locale: string,
  genitive = false,
  offset: string | null = null,
): FilledPart[] => {
  const partMap = createPartMap(inputDate, parts, locale, genitive);
  const d = normalizeDate(inputDate);
  const value = ({ partName, partValue, token }: Part) => {
    if (partName === "literal") return partValue;
    const value = partMap[partName];
    if (partName === "hour" && token === "H") {
      return value.replace(/^0/, "") || "0";
    }
    if (
      [
        "mm",
        "ss",
        "MM",
      ].includes(token) &&
      value.length === 1
    ) {
      return `0${value}`;
    }
    if (partName === "dayPeriod") {
      const p = ap(d.getUTCHours() < 12 ? "am" : "pm", locale);
      return token === "A" ? p.toUpperCase() : p.toLowerCase();
    }
    if (partName === "timeZoneName") {
      return offset ?? minsToOffset(-1 * d.getTimezoneOffset(), token as TimezoneToken);
    }
    return value;
  };
  return parts.map((part): FilledPart => {
    return {
      ...part,
      value: value(part),
    };
  });
};

const getOffsetFormat = (format: Format): TimezoneToken => {
  if (typeof format === "string") {
    return format.includes("ZZ") ? "ZZ" : "Z";
  }
  return "time" in format && format.time === "full" ? "Z" : "ZZ";
};

export function format(options: FormatOptions): string;
export function format(
  inputDate: DateInput,
  format?: Format,
  locale?: string,
  genitive?: boolean,
  partFilter?: (part: Part) => boolean,
): string;
export function format(
  inputDateOrOptions: DateInput | FormatOptions,
  format: Format = "long",
  locale: string | undefined = "device",
  genitive: boolean | undefined = false,
  partFilter?: (part: Part) => boolean,
): string {
  let tz: string | undefined, forceOffset: string | undefined;

  if (typeof inputDateOrOptions === "object" && !(inputDateOrOptions instanceof Date)) {
    ({ date: inputDateOrOptions, format, locale, genitive, partFilter, tz } = inputDateOrOptions);
  }
  if (format === "ISO8601") return normalizeDate(inputDateOrOptions).toISOString();

  if (tz) {
    forceOffset = offset(inputDateOrOptions, "utc", tz, getOffsetFormat(format));
  }

  tz ??= Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (tz?.toLowerCase() !== "utc") {
    inputDateOrOptions = removeOffset(inputDateOrOptions, offset(inputDateOrOptions, tz, "utc"));
  }

  if (!locale || locale === "device") {
    locale = Intl.DateTimeFormat().resolvedOptions().locale;
  }

  return fill(
    inputDateOrOptions,
    parts(format, locale).filter(partFilter ?? (() => true)),
    locale,
    genitive,
    forceOffset,
  )
    .map(p => p.value)
    .join("");
}
