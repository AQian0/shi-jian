import { describe, it, expect } from "vitest";

import { parts } from "../parts";

describe("parts", () => {
  it("can determine a cyrillic long vs short month", () => {
    expect(parts("long", "ru").find(p => p.partName === "month")?.token).toBe("MMMM");
  });
  it("uses a Z format when the time style is full", () => {
    expect(
      parts(
        {
          time: "full",
        },
        "en",
      ).find(p => p.partName === "timeZoneName")?.token,
    ).toBe("Z");
  });
  it("uses a ZZ format when the time style is long", () => {
    expect(
      parts(
        {
          time: "long",
        },
        "en",
      ).find(p => p.partName === "timeZoneName")?.token,
    ).toBe("ZZ");
  });

  it("should throw error when duplicate tokens are used", () => {
    expect(() => parts("YYYY YYYY", "en")).toThrow();
  });

  it("should handle narrow weekday format", () => {
    const result = parts("d", "en");
    expect(result.find(p => p.partName === "weekday")?.token).toBe("d");
  });

  it("should handle short weekday format", () => {
    const result = parts("ddd", "en");
    expect(result.find(p => p.partName === "weekday")?.token).toBe("ddd");
  });

  it("should handle long weekday format", () => {
    const result = parts("dddd", "en");
    expect(result.find(p => p.partName === "weekday")?.token).toBe("dddd");
  });

  it("should return undefined for unknown part types", () => {
    const result = parts("full", "en");
    expect(result.every(p => p.partName !== "unknown")).toBe(true);
  });
});
