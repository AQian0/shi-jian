import { normalizeDate } from "./date"
import { fixedLengthByOffset, validOffset } from "./common"
import type { MaybeDateInput, TimezoneToken } from "./types"

const offsetToMins = (offset: string, token: TimezoneToken): number => {
  validOffset(offset, token)
  const [_, sign, hours, mins] = offset.match(/([+-])([0-3][0-9]):?([0-6][0-9])/)!
  const offsetInMins = Number(hours) * 60 + Number(mins)
  return sign === "+" ? offsetInMins : -offsetInMins
}

export const applyOffset = (dateInput?: MaybeDateInput, offset = "+00:00"): Date => {
  const d = normalizeDate(dateInput)
  const token = ((): TimezoneToken => {
    switch (fixedLengthByOffset(offset)) {
      case 5:
        return "ZZ"
      case 6:
        return "Z"
    }
  })()
  const timeDiffInMins = offsetToMins(offset, token)
  return new Date(d.getTime() + timeDiffInMins * 1000 * 60)
}

