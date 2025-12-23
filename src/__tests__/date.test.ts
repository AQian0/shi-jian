import { describe, it, expect } from "vitest"
import { normalizeDate } from "../date"

process.env.TZ = "America/New_York"
describe("normalizeDate", () => {
  it("qualifies and re-timezones a date", () => {
    expect(normalizeDate("2022-01-22 00:00:00").toISOString()).toBe(
      "2022-01-22T05:00:00.000Z"
    )
  })
  it("accepts a time with a timezone offset", () => {
    expect(normalizeDate("2022-01-22T00:00-0300").toISOString()).toBe(
      "2022-01-22T03:00:00.000Z"
    )
    expect(normalizeDate("2022-01-22T00:00-03:24").toISOString()).toBe(
      "2022-01-22T03:24:00.000Z"
    )
  })
})
