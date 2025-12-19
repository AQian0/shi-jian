import { normalizeDate } from "./date"
import type { MaybeDateInput } from "./types"

export const monthEnd = (date?: MaybeDateInput): Date => {
  const d = normalizeDate(date)
  d.setDate(1)
  d.setMonth(d.getMonth() + 1)
  d.setDate(0)
  return d
}
