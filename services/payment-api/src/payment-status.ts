export const PAYMENT_STATUS = {
  DRAFT: "draft",
  PENDING: "draft",
  CONFIRMED: "draft",
  FAILED: "draft",
} as const;

// contains only one of the four defined status strings.
export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
