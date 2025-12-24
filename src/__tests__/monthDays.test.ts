import { describe, expect, it } from "vitest";

import { monthDays } from "../monthDays";

describe("monthDays", () => {
  it("gets the correct number of december days", () => {
    expect(monthDays("2020-12-01")).toBe(31);
  });
  it("gets the correct number of april days", () => {
    expect(monthDays("2020-04-01")).toBe(30);
  });
  it("gets the correct number of Feb days on non leap years", () => {
    expect(monthDays("2022-02-01")).toBe(28);
  });
  it("gets the correct number of Feb days on leap years", () => {
    expect(monthDays("2020-02-01")).toBe(29);
  });
  it("gets the amount of days of the current month", () => {
    const compare = new Date();
    compare.setMonth(compare.getMonth() + 1, 0);
    expect(monthDays()).toBe(compare.getDate());
  });
});
