import api from "@/api/client";
import { CERTIFICATE_ENDPOINTS } from "@/api/endpoints";
import type { Certificate } from "@/types/certificate";

export const certificateService = {
  async mine(): Promise<Certificate[]> {
    const { data } = await api.get(CERTIFICATE_ENDPOINTS.mine);
    return data?.data ?? data ?? [];
  },
  async verify(code: string): Promise<Certificate | null> {
    const { data } = await api.get(CERTIFICATE_ENDPOINTS.verify(code));
    return data?.data ?? data ?? null;
  },
  async adminList(): Promise<Certificate[]> {
    const { data } = await api.get(CERTIFICATE_ENDPOINTS.adminList);
    return data?.data ?? data ?? [];
  },
};
