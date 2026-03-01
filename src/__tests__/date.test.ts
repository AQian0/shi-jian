import { describe, it, expect } from "vitest";

import { normalizeDate } from "../date";

describe("normalizeDate", () => {
  it("qualifies and re-timezones a date", () => {
    expect(normalizeDate("2022-01-22 00:00:00").toISOString()).toBe("2022-01-22T05:00:00.000Z");
  });
  it("accepts a time with a timezone offset", () => {
    expect(normalizeDate("2022-01-22T00:00-0300").toISOString()).toBe("2022-01-22T03:00:00.000Z");
    expect(normalizeDate("2022-01-22T00:00-03:24").toISOString()).toBe("2022-01-22T03:24:00.000Z");
  });

  it("should throw error when passing non-ISO8601 string", () => {
    expect(() => normalizeDate("not a date")).toThrow("Non ISO 8601 compliant date");
  });

  it("should throw error when day overflows the month", () => {
    expect(() => normalizeDate("2024-02-30")).toThrow("Invalid ISO 8601 date");
    expect(() => normalizeDate("2023-02-29")).toThrow("Invalid ISO 8601 date");
    expect(() => normalizeDate("2024-04-31")).toThrow("Invalid ISO 8601 date");
  });

  it("should accept valid edge-case dates", () => {
    expect(normalizeDate("2024-02-29")).toBeInstanceOf(Date);
    expect(normalizeDate("2024-01-31")).toBeInstanceOf(Date);
    expect(normalizeDate("2024-12-31")).toBeInstanceOf(Date);
  });
});
