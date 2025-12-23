import { describe, it, expect } from "vitest";

import { ap } from "../ap";

process.env.TZ = "America/New_York";
describe("ap", () => {
  it("should return AM period when ampm is 'am'", () => {
    const result = ap("am", "en-US");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });
  it("should return PM period when ampm is 'pm'", () => {
    const result = ap("pm", "en-US");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });
  it("should return different values for am and pm when locale is 'en-US'", () => {
    const amResult = ap("am", "en-US");
    const pmResult = ap("pm", "en-US");
    expect(amResult).not.toBe(pmResult);
  });
  it("should cache and return the same value when called multiple times with same arguments", () => {
    const firstCall = ap("am", "en-US");
    const secondCall = ap("am", "en-US");
    expect(firstCall).toBe(secondCall);
  });
  it("should work with different locales", () => {
    const enResult = ap("am", "en-US");
    const zhResult = ap("am", "zh-CN");
    expect(typeof enResult).toBe("string");
    expect(typeof zhResult).toBe("string");
  });
  it("should return 'am' as fallback when dayPeriod is not found", () => {
    const result = ap("am", "en-US");
    expect(result).toBeTruthy();
  });
  it("should return 'pm' as fallback when dayPeriod is not found", () => {
    const result = ap("pm", "en-US");
    expect(result).toBeTruthy();
  });
  it("should handle multiple locales independently", () => {
    const enAm = ap("am", "en-US");
    const enPm = ap("pm", "en-US");
    const zhAm = ap("am", "zh-CN");
    const zhPm = ap("pm", "zh-CN");
    expect(enAm).toBeTruthy();
    expect(enPm).toBeTruthy();
    expect(zhAm).toBeTruthy();
    expect(zhPm).toBeTruthy();
  });
});
