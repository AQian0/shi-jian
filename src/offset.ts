import type { MaybeDateInput, TimezoneToken } from "./types";

import { normalizeStr, minsToOffset } from "./common";
import { normalizeDate } from "./date";

function relativeTime(d: Date, timeZone: string): Date {
  const utcParts = new Intl.DateTimeFormat("en-US", {
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
    .map(normalizeStr);
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

export function offset(
  utcTime?: MaybeDateInput,
  tzA = "UTC",
  tzB = "device",
  timeZoneToken: TimezoneToken = "Z",
): string {
  tzB =
    tzB === "device"
      ? (Intl.DateTimeFormat().resolvedOptions().timeZone ?? "utc")
      : tzB;
  const d = normalizeDate(utcTime);
  const timeA = relativeTime(d, tzA);
  const timeB = relativeTime(d, tzB);
  const timeDiffInMins = Math.round(
    (timeB.getTime() - timeA.getTime()) / 1000 / 60,
  );
  return minsToOffset(timeDiffInMins, timeZoneToken);
}
