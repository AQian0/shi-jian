import type {
  FilledPart,
  Format,
  FormatOptions,
  MaybeDateInput,
  Part,
  TimezoneToken,
} from "./types";

import { ap } from "./ap";
import { minsToOffset, normalizeStr, getGenitiveMonth } from "./common";
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
  const addValues = (requestedParts: Part[], hour12 = false): void => {
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
        .map(part => normalizeStr(part)),
    );
    if (genitive && genitiveParts.length > 0) {
      for (const part of genitiveParts) {
        let genitiveFormattedPart: Intl.DateTimeFormatPart | undefined;
        switch (part.token) {
          case "MMMM":
            genitiveFormattedPart = getGenitiveMonth(d, locale, "long");
            break;
          case "MMM":
            genitiveFormattedPart = getGenitiveMonth(d, locale, "short");
            break;
          default:
            break;
        }
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
  offset: string | undefined,
): FilledPart[] => {
  const partMap = createPartMap(inputDate, parts, locale, genitive);
  const d = normalizeDate(inputDate);
  const value = ({ partName, partValue, token }: Part): string => {
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

/**
 * 将日期格式化为指定格式的字符串。
 * @param options - 格式化选项对象
 * @returns 格式化后的日期字符串
 * @example
 * format({ date: new Date('2024-01-15'), format: 'YYYY-MM-DD' }) // '2024-01-15'
 */
export function format(options: FormatOptions): string;
/**
 * 将日期格式化为指定格式的字符串。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined
 * @param format - 输出格式，支持预定义样式（'full'|'long'|'medium'|'short'）或自定义格式字符串；默认为 'long'
 * @param locale - 语言环境，默认为 'device'（设备语言）
 * @param genitive - 是否使用属格形式（某些语言中月份名称会变化）；默认为 false
 * @param partFilter - 部分过滤器函数，用于筛选输出的日期部分
 * @returns 格式化后的日期字符串
 * @example
 * format(new Date('2024-01-15'), 'YYYY年MM月DD日') // '2024年01月15日'
 * format('2024-01-15', 'long', 'zh-CN') // '2024年1月15日'
 */
export function format(
  inputDate: MaybeDateInput,
  format?: Format,
  locale?: string,
  genitive?: boolean,
  partFilter?: (part: Part) => boolean,
): string;
export function format(
  inputDateOrOptions: MaybeDateInput | FormatOptions,
  format: Format = "long",
  locale: string | undefined = "device",
  genitive: boolean | undefined = false,
  partFilter?: (part: Part) => boolean,
): string {
  if (!inputDateOrOptions) {
    return "";
  }
  let forceOffset: string | undefined, tz: string | undefined;
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
    parts(format, locale).filter(part => (partFilter ?? ((): boolean => true))(part)),
    locale,
    genitive,
    forceOffset,
  )
    .map(p => p.value)
    .join("");
}
