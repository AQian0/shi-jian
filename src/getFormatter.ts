import { createLRUCache } from "./cache";

const formatterCache = createLRUCache<string, Intl.DateTimeFormat>(50);

/**
 * @description Get cached Intl.DateTimeFormat instance to avoid repeated instantiation.
 */
export const getFormatter = (
  locale: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat => {
  const key = `${locale}|${JSON.stringify(options)}`;
  let formatter = formatterCache.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, options);
    formatterCache.set(key, formatter);
  }
  return formatter;
};
