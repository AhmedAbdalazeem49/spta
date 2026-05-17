export interface Certificate {
  id: string | number;
  recipient_name?: string;
  recipientNameAr?: string;
  recipientNameEn?: string;
  workshop_title?: string;
  workshopTitleAr?: string;
  workshopTitleEn?: string;
  workshop_date?: string;
  workshopDate?: string;
  issue_date?: string;
  issueDate?: string;
  hours?: number;
  status?: string;
  verification_url?: string;
  verificationUrl?: string;
}

export interface Workshop {
  id: string | number;
  title?: string;
  titleAr?: string;
  titleEn?: string;
  date?: string;
  hours?: number;
}

export interface Recipient {
  id: string | number;
  name?: string;
  nameAr?: string;
  nameEn?: string;
  email?: string;
}
