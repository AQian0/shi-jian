import { describe, it, expect } from "vitest";

import { isIso8601 } from "../iso8601";

process.env.TZ = "America/New_York";

describe("validating ISO 8601", () => {
  it("validates full dates", () => expect(isIso8601("2022-01-22 00:00:00")).toBe(true));
  it("validates full dates with T", () => expect(isIso8601("2022-01-22T23:59:59")).toBe(true));
  it("does allow ancient dates", () => expect(isIso8601("0032-06-15 00:00:00")).toBe(true));
  it("does allow milliseconds", () => expect(isIso8601("0032-06-15 00:00:00.456")).toBe(true));
  it("does now allow 24 hours", () => expect(isIso8601("2022-01-22 24:00:00")).toBe(false));
  it("does now allow 60 minutes", () => expect(isIso8601("2022-01-22 00:60:00")).toBe(false));
  it("does now allow 60 seconds", () => expect(isIso8601("2022-01-22 00:00:60")).toBe(false));
  it("does now allow 13 months", () => expect(isIso8601("2022-13-22 00:00:00")).toBe(false));
  it("does now allow 10,000 years", () => expect(isIso8601("10000-01-01 00:00:00")).toBe(false));
  it("does now allow 40 days", () => expect(isIso8601("2000-01-40 00:00:00")).toBe(false));
  it("allows a lot of decimals", () =>
    expect(isIso8601("2000-01-30 00:00:00.0000000000")).toBe(true));
});
