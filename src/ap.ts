import { AM_TEST_HOUR, PM_TEST_HOUR, normalizeStr } from "./common";

type DayPeriod = "am" | "pm";
type LocaleDayPeriods = {
  readonly am?: string;
  readonly pm?: string;
};

const dayPeriodCache = new Map<string, LocaleDayPeriods>();

export const ap = (ampm: DayPeriod, locale: string): string => {
  const cached = dayPeriodCache.get(locale)?.[ampm];
  if (cached) {
    return cached;
  }
  const specimen = new Date();
  specimen.setUTCHours(ampm === "am" ? AM_TEST_HOUR : PM_TEST_HOUR, 0, 0, 0);
  const subparts = new Intl.DateTimeFormat(locale, {
    timeStyle: "full",
    timeZone: "UTC",
    hour12: true,
  })
    .formatToParts(specimen)
    .map(part => normalizeStr(part));
  const period = subparts.find(part => part.type === "dayPeriod");
  if (period) {
    const existingPeriods = dayPeriodCache.get(locale) || {};
    dayPeriodCache.set(locale, {
      ...existingPeriods,
      [ampm]: period.value,
    });
    return period.value;
  }
  return ampm;
};
