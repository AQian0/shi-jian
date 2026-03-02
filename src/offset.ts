import type { MaybeDateInput, OffsetString, TimezoneToken } from "./types";

import { MS_PER_SECOND, SECONDS_PER_MINUTE, minsToOffset, normalizeStr } from "./common";
import { normalizeDate } from "./date";

function relativeTime(d: Date, timeZone: string): Date {
  let utcParts: ReadonlyArray<Intl.DateTimeFormatPart>;
  try {
    utcParts = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone,
      hourCycle: "h23",
    })
      .formatToParts(d)
      .map(part => normalizeStr(part));
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Invalid timezone "${timeZone}". ${reason}`, {
      cause: error,
    });
  }
  const parts: {
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
    second?: string;
  } = {};
  utcParts.forEach(part => {
    parts[part.type as keyof typeof parts] = part.value;
  });
  return new Date(
    `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`,
  );
}

/**
 * @description Calculate the offset between two timezones.
 * @example
 * offset(new Date(), 'UTC', 'Asia/Shanghai') // '+08:00'
 * offset(new Date(), 'UTC', 'America/New_York', 'ZZ') // '-0500'
 */
export function offset(
  utcTime?: MaybeDateInput,
  tzA = "UTC",
  tzB = "device",
  timeZoneToken: TimezoneToken = "Z",
): OffsetString {
  tzB = tzB === "device" ? (Intl.DateTimeFormat().resolvedOptions().timeZone ?? "utc") : tzB;
  const d = normalizeDate(utcTime);
  const timeA = relativeTime(d, tzA);
  const timeB = relativeTime(d, tzB);
  const timeDiffInMins = Math.round(
    (timeB.getTime() - timeA.getTime()) / MS_PER_SECOND / SECONDS_PER_MINUTE,
  );
  return minsToOffset(timeDiffInMins, timeZoneToken);
}
