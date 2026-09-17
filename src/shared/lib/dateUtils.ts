import dayjs from "dayjs";

/**
 * Standard User-Facing Date Formats as strictly defined in FRONTEND_RULES.md
 * - Date strictly: "DD MMM YYYY" (e.g. 17 Sep 2026)
 * - DateTime strictly: "DD MMM YYYY, hh:mm A" (e.g. 17 Sep 2026, 09:30 AM)
 * - Time strictly: "hh:mm A" (e.g. 09:30 AM)
 */

export const DATE_FORMAT = "DD MMM YYYY";
export const DATETIME_FORMAT = "DD MMM YYYY, hh:mm A";
export const TIME_FORMAT = "hh:mm A";

/**
 * Formats any date string, Date object, or timestamp into the standardized "DD MMM YYYY" display format.
 * Returns fallback if date is invalid or missing.
 */
export function formatDate(date: string | number | Date | null | undefined, fallback = "—"): string {
  if (!date) return fallback;
  const parsed = dayjs(date);
  if (!parsed.isValid()) return fallback;
  return parsed.format(DATE_FORMAT);
}

/**
 * Formats any date into "DD MMM YYYY, hh:mm A" format.
 */
export function formatDateTime(date: string | number | Date | null | undefined, fallback = "—"): string {
  if (!date) return fallback;
  const parsed = dayjs(date);
  if (!parsed.isValid()) return fallback;
  return parsed.format(DATETIME_FORMAT);
}

/**
 * Formats time into "hh:mm A" format.
 */
export function formatTime(date: string | number | Date | null | undefined, fallback = "—"): string {
  if (!date) return fallback;
  const parsed = dayjs(date);
  if (!parsed.isValid()) return fallback;
  return parsed.format(TIME_FORMAT);
}

/**
 * Returns ISO-8601 UTC string for backend mutations.
 */
export function toISOString(date: string | number | Date | null | undefined): string | null {
  if (!date) return null;
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.toISOString() : null;
}
