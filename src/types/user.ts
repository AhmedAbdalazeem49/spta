export interface UserItem {
  id: number;
  name: string;
  name_ar?: string;
  email: string;
  phone?: string;
  national_id?: string;
  specialization?: string;
  sub_specialization?: string;
  employer?: string;
  role: "system_admin" | "branch_admin" | "user";

  status?: "pending" | "approved" | "rejected" | "active";

  classification_number?: string;
  membership_type?: string;

  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;

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
  };
}

export interface EditForm {
  name: string;
  name_ar: string;
  email: string;
  phone: string;
  national_id: string;
  specialization: string;
  sub_specialization: string;
  employer: string;
  role: "system_admin" | "branch_admin" | "user";
  password: string;
  password_confirmation: string;
}

export interface AddForm {
  name: string;
  name_ar: string;
  email: string;
  phone: string;
  national_id: string;
  specialization: string;
  sub_specialization: string;
  employer: string;
  role: "system_admin" | "branch_admin" | "user";
  password: string;
  password_confirmation: string;
}

export const defaultAddForm: AddForm = {
  name: "",
  name_ar: "",
  email: "",
  phone: "",
  national_id: "",
  specialization: "",
  sub_specialization: "",
  employer: "",
  role: "user",
  password: "",
  password_confirmation: "",
};
