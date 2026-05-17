export type PaymentMethod =
  | "creditcard"
  | "mada"
  | "applepay"
  | "googlepay"
  | "tabby"
  | "tamara";

export interface CreatePaymentPayload {
  amount: number;
  payment_method: PaymentMethod;
  membership_type?: string;
  workshop_id?: number;
  conference_id?: number;
  email?: string;
  promo_code?: string;
}

export interface CreatePaymentResponse {
  payment_url?: string;
  payment_id: string;
  status: string;
}
