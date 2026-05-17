import api from "@/api/client";
import { PAYMENT_ENDPOINTS } from "@/api/endpoints";
import type {
  CreatePaymentPayload,
  CreatePaymentResponse,
} from "@/types/payment";

export const paymentService = {
  async create(payload: CreatePaymentPayload): Promise<CreatePaymentResponse> {
    const { data } = await api.post(PAYMENT_ENDPOINTS.create, payload);
    return data?.data ?? data;
  },
  async verify(paymentId: string) {
    const { data } = await api.post(PAYMENT_ENDPOINTS.verify, {
      payment_id: paymentId,
    });
    return data?.data ?? data;
  },
};
