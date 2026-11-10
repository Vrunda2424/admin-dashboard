// Colours come from CSS variables, so charts switch with the theme (pastel colours in dark mode).
export const COLORS = { primary: "var(--chart-1)", secondary: "var(--chart-2)", inactive: "var(--chart-3)", grid: "var(--border)" };
export const STATUS_COLORS = { Active: COLORS.primary, Inactive: COLORS.inactive };
export const ROLE_COLORS = {
  "Super Admin": "var(--chart-4)",
  Admin: "var(--chart-2)",
  Manager: "var(--chart-1)",
  Analyst: "var(--chart-3)",
  "Support Staff": "var(--chart-5)",
};
