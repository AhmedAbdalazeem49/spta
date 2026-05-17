import api from "@/api/client";
import { USER_ENDPOINTS } from "@/api/endpoints";
import type { User, UserStatus } from "@/types/auth";
import type { ID } from "@/types/common";

export const userService = {
  async adminList(): Promise<User[]> {
    const { data } = await api.get(USER_ENDPOINTS.adminList);
    return data?.data ?? data ?? [];
  },
  async adminUpdateStatus(id: ID, status: UserStatus) {
    const { data } = await api.patch(USER_ENDPOINTS.adminUpdateStatus(id), {
      status,
    });
    return data?.data ?? data;
  },
};
