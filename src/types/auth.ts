export type UserStatus = "pending" | "approved" | "rejected" | "active";
export type UserRole = "system_admin" | "branch_admin" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  national_id?: string;
  classification_number?: string;
  role: UserRole;
  status: UserStatus;
  email_verified_at?: string | null;
  membership_type?: string | null;
  created_at?: string;
  membership_status?: "active" | "inactive";
  active_membership?: {
    id: number;
    user_id: number;
    membership_type: string;
    membership_number: string;
    starts_at: string;
    ends_at: string;
    status: string;
    created_at: string;
    updated_at: string;
  } | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  membership_type?: string;
  classification_number?: string;
  promo_code?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
