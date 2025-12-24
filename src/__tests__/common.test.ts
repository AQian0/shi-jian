import { describe, it, expect } from "vitest";

import { normalizeStr, minsToOffset, fixedLengthByOffset, validOffset, two, four } from "../common";

describe("normalizeStr", () => {
  it("should normalize literal part when type is literal", () => {
    const part: Intl.DateTimeFormatPart = {
      type: "literal",
      value: "\uFF1A",
    };
    const result = normalizeStr(part);
    expect(result.value).toBe(":");
  });

  it("should not change non-literal parts", () => {
    const part: Intl.DateTimeFormatPart = {
      type: "month",
      value: "January",
    };
    const result = normalizeStr(part);
    expect(result.value).toBe("January");
  });
});

describe("minsToOffset", () => {
  it("should convert positive minutes to offset with Z token", () => {
    expect(minsToOffset(330)).toBe("+05:30");
  });

  it("should convert negative minutes to offset with Z token", () => {
    expect(minsToOffset(-300)).toBe("-05:00");
  });

  it("should convert positive minutes to offset with ZZ token", () => {
    expect(minsToOffset(330, "ZZ")).toBe("+0530");
  });

  it("should convert negative minutes to offset with ZZ token", () => {
    expect(minsToOffset(-300, "ZZ")).toBe("-0500");
  });

  it("should handle zero offset", () => {
    expect(minsToOffset(0)).toBe("+00:00");
  });

  it("should pad single digit hours and minutes", () => {
    expect(minsToOffset(65)).toBe("+01:05");
  });
});

describe("fixedLengthByOffset", () => {
  it("should return 6 when offset format is +HH:MM", () => {
    expect(fixedLengthByOffset("+05:30")).toBe(6);
  });

  it("should return 6 when offset format is -HH:MM", () => {
    expect(fixedLengthByOffset("-03:00")).toBe(6);
  });

  it("should return 5 when offset format is +HHMM", () => {
    expect(fixedLengthByOffset("+0530")).toBe(5);
  });

  it("should return 5 when offset format is -HHMM", () => {
    expect(fixedLengthByOffset("-0300")).toBe(5);
  });

  it("should throw error when offset format is invalid", () => {
    expect(() => fixedLengthByOffset("invalid")).toThrow("Invalid offset format");
  });
});

describe("validOffset", () => {
  it("should validate offset with Z token format +HH:MM", () => {
    expect(validOffset("+05:30", "Z")).toBe("+05:30");
  });

  it("should validate offset with Z token format -HH:MM", () => {
    expect(validOffset("-12:00", "Z")).toBe("-12:00");
  });

  it("should validate offset with ZZ token format +HHMM", () => {
    expect(validOffset("+0530", "ZZ")).toBe("+0530");
  });

  it("should validate offset with ZZ token format -HHMM", () => {
    expect(validOffset("-1200", "ZZ")).toBe("-1200");
  });

  it("should throw error when offset is invalid for Z token", () => {
    expect(() => validOffset("+9999", "Z")).toThrow("Invalid offset: +9999");
  });

  it("should throw error when offset is invalid for ZZ token", () => {
    expect(() => validOffset("+99:99", "ZZ")).toThrow("Invalid offset: +99:99");
  });

  it("should throw error when offset format is completely wrong", () => {
    expect(() => validOffset("invalid", "Z")).toThrow("Invalid offset: invalid");
  });
});

describe("two", () => {
  it("should pad single digit number with zero", () => {
    expect(two(5)).toBe("05");
  });

  it("should not pad double digit number", () => {
    expect(two(15)).toBe("15");
  });

  it("should handle zero", () => {
    expect(two(0)).toBe("00");
  });

  it("should convert numbers greater than 99 to string", () => {
    expect(two(123)).toBe("123");
  });
});

describe("four", () => {
  it("should pad single digit number with zeros", () => {
    expect(four(5)).toBe("0005");
  });

  it("should pad double digit number with zeros", () => {
    expect(four(99)).toBe("0099");
  });

  it("should pad triple digit number with zero", () => {
    expect(four(999)).toBe("0999");
  });

  it("should not pad four digit number", () => {
    expect(four(2022)).toBe("2022");
  });

  it("should handle zero", () => {
    expect(four(0)).toBe("0000");
  });

  it("should convert numbers greater than 9999 to string", () => {
    expect(four(12345)).toBe("12345");
  });
});
