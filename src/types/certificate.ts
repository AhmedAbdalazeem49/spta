export type CertificateTemplate = "classic" | "modern" | "elegant" | "minimal";

export interface Certificate {
  id: number;
  code: string;
  user_id: number;
  user_name: string;
  title_ar: string;
  title_en: string;
  issued_at: string;
  template?: CertificateTemplate;
  workshop_id?: number;
  conference_id?: number;
}
