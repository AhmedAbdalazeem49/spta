import type { PaymentMethod } from "@/types/payment";

export const PAYMENT_METHODS: {
  key: PaymentMethod;
  label_ar: string;
  label_en: string;
}[] = [
  { key: "creditcard", label_ar: "بطاقة ائتمانية", label_en: "Credit Card" },
  { key: "applepay", label_ar: "Apple Pay", label_en: "Apple Pay" },
  { key: "samsungpay", label_ar: "Google Pay", label_en: "Google Pay" },
];
