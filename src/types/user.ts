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
  role?: string;
  status?: "pending" | "approved" | "rejected" | "active";
  classification_number?: string;
  membership_type?: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
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
  role: string;
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
  role: string;
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
  role: "member",
  password: "",
  password_confirmation: "",
};
