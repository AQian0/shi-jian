import { describe, it, expect } from "vitest";

import type { Part } from "../types";
import { parseParts } from "../parseParts";

const createPart = (token: string, partName: Intl.DateTimeFormatPartTypes, partValue: string): Part => ({
  token,
  partName,
  partValue,
  option: {},
  pattern: new RegExp(""),
  hour12: false,
});

describe("parseParts", () => {
  it("should parse date with fixed length tokens when using YYYY-MM-DD format", () => {
    const formatParts: Part[] = [
      createPart("YYYY", "year", "numeric"),
      createPart("-", "literal", "-"),
      createPart("MM", "month", "2-digit"),
      createPart("-", "literal", "-"),
      createPart("DD", "day", "2-digit"),
    ];

    const result = parseParts("2024-03-15", formatParts);

    expect(result).toHaveLength(5);
    expect(result.at(0)?.value).toBe("2024");
    expect(result.at(2)?.value).toBe("03");
    expect(result.at(4)?.value).toBe("15");
  });

  it("should parse variable length values when followed by literal", () => {
    const formatParts: Part[] = [
      createPart("M", "month", "numeric"),
      createPart("/", "literal", "/"),
      createPart("D", "day", "numeric"),
    ];

    const result = parseParts("3/9", formatParts);

    expect(result.at(0)?.value).toBe("3");
    expect(result.at(2)?.value).toBe("9");
  });

  it("should parse time with dayPeriod when format includes AM/PM", () => {
    const formatParts: Part[] = [
      createPart("h", "hour", "numeric"),
      createPart(":", "literal", ":"),
      createPart("mm", "minute", "2-digit"),
      createPart(" ", "literal", " "),
      createPart("A", "dayPeriod", "narrow"),
    ];

    const result = parseParts("3:45 PM", formatParts);

    expect(result.at(0)?.value).toBe("3");
    expect(result.at(2)?.value).toBe("45");
    expect(result.at(4)?.value).toBe("PM");
  });

  it("should parse timezone offset with Z token when format includes +HH:MM", () => {
    const formatParts: Part[] = [
      createPart("HH", "hour", "2-digit"),
      createPart(":", "literal", ":"),
      createPart("mm", "minute", "2-digit"),
      createPart(" ", "literal", " "),
      createPart("Z", "timeZoneName", "short"),
    ];

    const result = parseParts("14:30 +05:30", formatParts);

    expect(result.at(4)?.value).toBe("+05:30");
  });

  it("should parse timezone offset without colon when using ZZ token", () => {
    const formatParts: Part[] = [
      createPart("HH", "hour", "2-digit"),
      createPart(":", "literal", ":"),
      createPart("mm", "minute", "2-digit"),
      createPart(" ", "literal", " "),
      createPart("ZZ", "timeZoneName", "long"),
    ];

    const result = parseParts("14:30 +0530", formatParts);

    expect(result.at(4)?.value).toBe("+0530");
  });

  it("should parse to end of string when last part has no next part", () => {
    const formatParts: Part[] = [createPart("YYYY", "year", "numeric")];

    const result = parseParts("2024", formatParts);

    expect(result.at(0)?.value).toBe("2024");
  });

  it("should throw error when literal not found in date string", () => {
    const formatParts: Part[] = [
      createPart("M", "month", "numeric"),
      createPart("/", "literal", "/"),
      createPart("D", "day", "numeric"),
    ];

    expect(() => parseParts("12-25", formatParts)).toThrow();
  });
});
