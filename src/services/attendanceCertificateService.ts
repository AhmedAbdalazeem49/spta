import api from "@/services/api";

export interface ConferenceCertificateStatusResponse {
  eligible: boolean;
  has_reviewed?: boolean;
  status: "not_registered" | "not_attended" | "needs_evaluation" | "ready_to_generate" | "issued";
  message: string;
  message_en: string;
  participant_name: string;
  certificate?: {
    id: number;
    serial_number: string;
    recipient_name: string;
    workshop_title: string;
    type: string;
    status: string;
    issued_at: string;
    payload?: any;
  } | null;
}

export const attendanceCertificateService = {
  /**
   * Fetch current user's conference attendance certificate status
   */
  getStatus: async (): Promise<ConferenceCertificateStatusResponse> => {
    const res = await api.get("/conference/certificate/status");
    return res.data?.data || res.data;
  },

  /**
   * Request backend to issue/generate the conference attendance certificate
   */
  generate: async () => {
    const res = await api.post("/conference/certificate/generate");
    return res.data?.data || res.data;
  },

  /**
   * Fetch PDF blob securely with authenticated session
   */
  downloadPdfBlob: async (): Promise<Blob> => {
    const res = await api.get("/conference/certificate/download", {
      responseType: "blob",
    });
    return res.data;
  },

  /**
   * Download certificate directly as a file
   */
  downloadCertificate: async (participantName?: string) => {
    const blob = await attendanceCertificateService.downloadPdfBlob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (participantName || "Certificate")
      .replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, "_")
      .replace(/_+/g, "_");
    a.download = `SPTA_Attendance_Certificate_${safeName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
  },

  /**
   * Download Workshop Certificate PDF directly from backend using template
   */
  downloadWorkshopCertificate: async (certificateId: number | string, participantName?: string, workshopTitle?: string) => {
    const res = await api.get(`/conference/workshops/certificate/${certificateId}/download`, {
      responseType: "blob",
    });
    const blob = res.data;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeTitle = (workshopTitle || "Workshop")
      .substring(0, 30)
      .replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, "_");
    const safeName = (participantName || "Participant")
      .replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, "_");
    a.download = `SPTA_Workshop_Certificate_${safeTitle}_${safeName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
  },

  /**
   * Print PDF directly using an invisible iframe to prevent printing UI
   */
  printCertificate: async () => {
    const blob = await attendanceCertificateService.downloadPdfBlob();
    const url = window.URL.createObjectURL(blob);

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.src = url;

    document.body.appendChild(iframe);

    iframe.onload = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (err) {
        console.error("Print error:", err);
        // Fallback open in new window
        window.open(url, "_blank");
      } finally {
        setTimeout(() => {
          document.body.removeChild(iframe);
          window.URL.revokeObjectURL(url);
        }, 60000);
      }
    };
  },
};
