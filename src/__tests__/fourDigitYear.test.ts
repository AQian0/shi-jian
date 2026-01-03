import { describe, it, expect } from "vitest";

import { fourDigitYear } from "../fourDigitYear";

describe("fourDigitYear", () => {
  it("should return full year when two-digit year is within threshold", () => {
    const currentYear = new Date().getFullYear();
    const currentYearTwoDigit = currentYear % 100;
    const testYear = (currentYearTwoDigit + 10).toString().padStart(2, "0");
    const result = fourDigitYear(testYear);
    const expected = Math.floor(currentYear / 100) * 100 + Number(testYear);
    expect(result).toBe(expected);
  });

  it("should return previous century year when two-digit year exceeds threshold", () => {
    const currentYear = new Date().getFullYear();
    const currentYearTwoDigit = currentYear % 100;
    const testYear = (currentYearTwoDigit + 25).toString().padStart(2, "0");
    const result = fourDigitYear(testYear);
    const expected = (Math.floor(currentYear / 100) - 1) * 100 + Number(testYear);
    expect(result).toBe(expected);
  });

  it("should handle year exactly at threshold", () => {
    const currentYear = new Date().getFullYear();
    const currentYearTwoDigit = currentYear % 100;
    const testYear = (currentYearTwoDigit + 20).toString().padStart(2, "0");
    const result = fourDigitYear(testYear);
    const expected = Math.floor(currentYear / 100) * 100 + Number(testYear);
    expect(result).toBe(expected);
  });

  it("should handle year just beyond threshold", () => {
    const currentYear = new Date().getFullYear();
    const currentYearTwoDigit = currentYear % 100;
    const testYear = (currentYearTwoDigit + 21).toString().padStart(2, "0");
    const result = fourDigitYear(testYear);
    const expected = (Math.floor(currentYear / 100) - 1) * 100 + Number(testYear);
    expect(result).toBe(expected);
  });
});
