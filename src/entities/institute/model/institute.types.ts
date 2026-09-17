/**
 * Institute Settings Entity Model strictly defined per FRONTEND_RULES.md (Section 1.1)
 * Loaded dynamically from Backend API (/api/v1/institute/settings).
 * Zero hardcoded institute names in UI.
 */

export interface InstituteSettings {
  name: string;
  code: string;
  tagline?: string;
  logoUrl?: string;
  faviconUrl?: string;
  urduCalligraphy?: string;
  address?: string;
  phone?: string;
  email?: string;
  currencySymbol: string;
  currencyCode: string;
  timezone: string;
  academicYear?: string;
}

export const DEFAULT_INSTITUTE_SETTINGS: InstituteSettings = {
  name: "TaleemOne ERP",
  code: "T1",
  tagline: "Institutional Management System",
  logoUrl: "/logo.png",
  currencySymbol: "₹",
  currencyCode: "INR",
  timezone: "UTC",
  academicYear: "2026-2027",
};
