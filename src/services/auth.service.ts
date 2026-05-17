import api from "@/api/client";
import { AUTH_ENDPOINTS } from "@/api/endpoints";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post(AUTH_ENDPOINTS.login, payload);
    return data?.data ?? data;
  },
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post(AUTH_ENDPOINTS.register, payload);
    return data?.data ?? data;
  },
  async logout(): Promise<void> {
    await api.post(AUTH_ENDPOINTS.logout);
  },
  async me(): Promise<User> {
    const { data } = await api.get(AUTH_ENDPOINTS.me);
    return data?.data ?? data;
  },
  async verifyOtp(email: string, otp: string) {
    const { data } = await api.post(AUTH_ENDPOINTS.verifyOtp, { email, otp });
    return data?.data ?? data;
  },
  async resendOtp(email: string) {
    const { data } = await api.post(AUTH_ENDPOINTS.resendOtp, { email });
    return data?.data ?? data;
  },
  async forgotPassword(email: string) {
    const { data } = await api.post(AUTH_ENDPOINTS.forgotPassword, { email });
    return data?.data ?? data;
  },
  async resetPassword(payload: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }) {
    const { data } = await api.post(AUTH_ENDPOINTS.resetPassword, payload);
    return data?.data ?? data;
  },
};
