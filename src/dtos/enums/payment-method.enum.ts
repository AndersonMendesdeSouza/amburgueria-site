export const PaymentMethod = {
  CREDIT_CARD: "CREDIT_CARD",
  DEBIT_CARD: "DEBIT_CARD",
  PIX: "PIX",
  CASH: "CASH",
} as const;

export type PaymentMethodEnum =
  (typeof PaymentMethod)[keyof typeof PaymentMethod];
