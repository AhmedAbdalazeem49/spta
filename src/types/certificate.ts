export interface Certificate {
  id: string | number;
  recipient_name?: string;
  recipientNameAr?: string;
  recipientNameEn?: string;
  recipient_name_ar?: string;
  workshop_title?: string;
  workshopTitleAr?: string;
  workshopTitleEn?: string;
  workshop_title_ar?: string;
  workshop_date?: string;
  workshopDate?: string;
  issue_date?: string;
  issueDate?: string;
  status?: string;
  serial_number?: string;
  verification_url?: string;
  verificationUrl?: string;
  template?: string;
  type?: string;
  workshop_end_date?: string;
  workshopEndDate?: string;
  partner_logo?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface Workshop {
  id: number;
  title: string;
  titleAr?: string;
  titleEn?: string;
  description?: string;
  doctor_name?: string;
  location?: string;
  date?: string;
  time?: string;
  regular_price?: string | number;
  member_price?: string | number;
  total_capacity?: number;
  registered_count?: number;
  status?: "open" | "closed" | "completed" | "postponed";
  image?: string | null;
  image_url?: string | null;
  is_registered?: boolean;
}

export interface Recipient {
  id: string | number;
  name?: string;
  nameAr?: string;
  nameEn?: string;
  email?: string;
}
