import { Certificate } from "@/types/certificate";

export const getCertificateName = (c: Certificate, t: (ar: string, en: string) => string) =>
  c.recipient_name || t(c.recipientNameAr || "", c.recipientNameEn || "");

export const getCertificateWorkshop = (c: Certificate, t: (ar: string, en: string) => string) =>
  c.workshop_title || t(c.workshopTitleAr || "", c.workshopTitleEn || "");

export const getCertificateDate = (c: Certificate) => {
  const raw =
    c.issue_date || c.issueDate || c.workshop_date || c.workshopDate || "—";

  if (raw === "—") return raw;

  return String(raw).split("T")[0];
};

export const getCertificateVerificationUrl = (c: Certificate) =>
  c.verification_url || c.verificationUrl || "";
