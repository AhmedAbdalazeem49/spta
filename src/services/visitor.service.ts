import api from "@/api/client";
import { VISITOR_ENDPOINTS } from "@/api/endpoints";

export interface VisitorRecord {
  id: number;
  ip: string;
  user_agent?: string;
  page?: string;
  created_at: string;
}

export const visitorService = {
  async adminList(): Promise<VisitorRecord[]> {
    const { data } = await api.get(VISITOR_ENDPOINTS.adminList);
    return data?.data ?? data ?? [];
  },
};
