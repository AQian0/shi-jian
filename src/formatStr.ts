import type { Format, Part } from "./types";

import { CLOCK_12_PATTERNS, CLOCK_24_PATTERNS, CLOCK_AGNOSTIC_PATTERNS } from "./common";
import { parts } from "./parts";

const SORTED_PATTERNS = [
  ...CLOCK_AGNOSTIC_PATTERNS,
  ...CLOCK_24_PATTERNS,
  ...CLOCK_12_PATTERNS,
].toSorted((a, b) => (a[0].length > b[0].length ? 1 : -1));

const escapeTokens = (str: string): string => {
  return SORTED_PATTERNS.reduce((target, part) => {
    return target.replace(part[0], `\\${part[0]}`);
  }, str);
};

/**
 * 将格式选项转换为格式字符串。
 * @param format - 格式选项，支持预定义样式或自定义格式字符串
 * @param locale - 语言环境，默认为 'en'
 * @param escapeLiterals - 是否转义字面量中的令牌，默认为 false
 * @param filterParts - 部分过滤器函数
 * @returns 格式字符串
 * @example
 * formatStr('long', 'en') // 'MMMM D, YYYY'
 * formatStr({ date: 'short' }, 'zh-CN') // 'YYYY/M/D'
 */
export const formatStr = (
  format: Format,
  locale = "en",
  escapeLiterals = false,
  filterParts: (part: Part) => boolean = () => true,
): string => {
  return parts(format, locale)
    .filter(part => filterParts(part))
    .reduce(
      (f, p) => (f += escapeLiterals && p.partName === "literal" ? escapeTokens(p.token) : p.token),
      "",
    )
    .normalize("NFKC");
};
