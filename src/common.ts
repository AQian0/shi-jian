export const MS_DAY = 86400000 as const;

export const SPEC_DATE = "1999-03-04T02:05:01.000Z" as const;

export const normalizeStr = (part: Intl.DateTimeFormatPart): Intl.DateTimeFormatPart => {
  if (part.type === "literal") {
    part.value = part.value.normalize("NFKC");
  }
  return part;
};
