import { SPEC_DATE, normalizeStr } from "./common";

const dayPeriodMap: Map<
  string,
  {
    am?: string;
    pm?: string;
  }
> = new Map();

export const ap = (ampm: "am" | "pm", locale: string): string => {
  const l = dayPeriodMap.get(locale);
  if (l && l[ampm]) return l[ampm] as string;
  const specimen = new Date(SPEC_DATE);
  specimen.setUTCHours(ampm === "am" ? 5 : 20);
  const subparts = new Intl.DateTimeFormat(locale, {
    timeStyle: "full",
    timeZone: "UTC",
    hour12: true,
  })
    .formatToParts(specimen)
    .map(normalizeStr);
  const period = subparts.find(part => part.type === "dayPeriod");
  if (period) {
    const localePeriods: {
      am?: string;
      pm?: string;
    } = l || {};
    dayPeriodMap.set(
      locale,
      Object.assign(localePeriods, {
        [ampm]: period.value,
      }),
    );
    return period.value;
  }
  return ampm;
};
