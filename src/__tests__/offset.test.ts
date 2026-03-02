import { describe, it, expect } from "vitest";

import { offset } from "../offset";

describe("offset", () => {
  it("should return zero offset when both timezones are the same", () => {
    expect(offset("2024-01-15T00:00:00Z", "UTC", "UTC")).toBe("+00:00");
  });

  it("should return correct offset between UTC and a timezone", () => {
    expect(offset("2024-01-15T00:00:00Z", "UTC", "Asia/Shanghai")).toBe("+08:00");
  });

  it("should return offset in ZZ format when timeZoneToken is ZZ", () => {
    expect(offset("2024-01-15T00:00:00Z", "UTC", "Asia/Shanghai", "ZZ")).toBe("+0800");
  });

  it("should throw error when invalid timezone is provided", () => {
    expect(() => offset("2024-01-15T00:00:00Z", "Invalid/Timezone")).toThrow(/Invalid timezone/);
  });

  it("should throw error when tzB is an invalid timezone", () => {
    expect(() => offset("2024-01-15T00:00:00Z", "UTC", "Foo/Bar")).toThrow(/Invalid timezone/);
  });
});
