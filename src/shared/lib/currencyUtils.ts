/**
 * Standard Financial & Currency Helpers as strictly defined in FRONTEND_RULES.md
 * - Zero hardcoded currency symbols
 * - Indian / Locale grouping format (e.g. 1,50,000.00)
 * - Safe numeric handling (avoids floating point artifacts)
 */

export interface FormatCurrencyOptions {
  currencySymbol?: string;
  decimals?: number;
  locale?: string;
}

/**
 * Formats a monetary amount into a clean, grouped representation.
 * Example: 150000 -> "₹ 1,50,000.00" (or with provided symbol)
 */
export function formatCurrency(
  amount: number | string | null | undefined,
  options: FormatCurrencyOptions = {}
): string {
  if (amount === null || amount === undefined || amount === "") {
    return options.currencySymbol ? `${options.currencySymbol} 0.00` : "0.00";
  }

  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) {
    return options.currencySymbol ? `${options.currencySymbol} 0.00` : "0.00";
  }

  const { currencySymbol, decimals = 2, locale = "en-IN" } = options;

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);

  return currencySymbol ? `${currencySymbol} ${formatted}` : formatted;
}

/**
 * Parses user input currency strings (e.g. "1,50,000.50") into a clean numeric string for backend submission.
 */
export function cleanCurrencyInput(value: string): string {
  return value.replace(/[^0-9.]/g, "");
}
