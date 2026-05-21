import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { Certificate } from "@/types/certificate";
import {
  getCertificateDate,
  getCertificateName,
  getCertificateWorkshop,
} from "@/utils/certificateUtils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Award, Download, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";

// ✅ File | string | null — matches what the parent passes
interface CertificateSettings {
  signature_image: File | string | null;
  stamp_image: File | string | null;
  chairman_name: string;
  custom_text: string;
}

interface CertificatePreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: Certificate | null;
  settings: CertificateSettings; // ✅ received from parent (already fetched)
}

export const CertificatePreviewModal = ({
  isOpen,
  onOpenChange,
  certificate,
  settings, // ✅ use parent settings directly — no internal fetch needed
}: CertificatePreviewModalProps) => {
  const { t } = useLanguage();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // ✅ Resolve preview URL for both File objects and server path strings
  const storageUrl = (value: File | string | null | undefined): string => {
    if (!value) return "";
    if (value instanceof File) return URL.createObjectURL(value);
    if (value.startsWith("http")) return value;

    // ✅ Strip the /storage/ prefix and route through Laravel API
    const path = value.replace(/^\/storage\//, "");
    return `http://localhost:8000/api/files/${path}`;
  };

  const qrValue = certificate?.serial_number
    ? `http://localhost:5173/certificate/verify/${certificate.serial_number}`
    : "";

  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    try {
      setDownloadingPdf(true);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(
        `${certificate?.serial_number || `certificate-${certificate?.id}`}.pdf`
      );
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloadingPdf(false);
    }
  };

  if (!certificate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-7xl p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <DialogHeader className="hidden">
          <DialogTitle>Certificate Preview</DialogTitle>
        </DialogHeader>

        <>
          {/* CERTIFICATE */}
          <div
            ref={certificateRef}
            className="relative overflow-hidden rounded-[32px] shadow-2xl border border-white/10"
          >
            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#07111f] via-[#0d1b33] to-[#14294d]" />

            {/* PATTERN */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25px 25px, white 2px, transparent 0),
                  radial-gradient(circle at 75px 75px, white 2px, transparent 0)
                `,
                backgroundSize: "100px 100px",
              }}
            />

            {/* OUTER BORDER */}
            <div className="absolute inset-5 rounded-[28px] border border-yellow-400/30" />

            {/* INNER LIGHT */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_60%)]" />

            {/* CONTENT */}
            <div className="relative z-10 px-20 py-16 min-h-[900px] flex flex-col text-white">
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <div className="w-28 h-28 rounded-full border border-yellow-400/30 bg-white/5 backdrop-blur-md flex items-center justify-center">
                  <Award className="w-14 h-14 text-yellow-300" />
                </div>
                <div className="text-center">
                  <h1 className="text-6xl font-black tracking-wide text-yellow-300">
                    {t("شهادة حضور", "Certificate")}
                  </h1>
                  <p className="mt-4 text-xl text-blue-100">
                    {t(
                      "الجمعية السعودية للعلاج الطبيعي",
                      "Saudi Physical Therapy Association"
                    )}
                  </p>
                </div>
                <div className="w-28" />
              </div>

              {/* BODY */}
              <div className="flex-1 flex flex-col items-center justify-center text-center py-14">
                <p className="text-2xl text-blue-100 mb-6">
                  {t(
                    "تشهد الجمعية بأن",
                    "This certificate is proudly presented to"
                  )}
                </p>
                <h2 className="text-7xl font-black text-yellow-300 mb-10 leading-tight drop-shadow-2xl">
                  {getCertificateName(certificate, t)}
                </h2>
                <p className="text-2xl text-blue-100 mb-4">
                  {t(
                    "قد أتم بنجاح حضور الورشة التدريبية",
                    "Has successfully completed the training workshop"
                  )}
                </p>
                <h3 className="text-5xl font-bold mb-8 max-w-5xl leading-relaxed">
                  {getCertificateWorkshop(certificate, t)}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-5 text-xl text-blue-100">
                  <span>
                    {t("بتاريخ", "Date")}:
                    <span className="text-white font-bold ms-2">
                      {getCertificateDate(certificate)}
                    </span>
                  </span>
                  {certificate.hours && (
                    <>
                      <span className="text-yellow-300">•</span>
                      <span>
                        {certificate.hours}{" "}
                        {t("ساعات تدريبية", "Training Hours")}
                      </span>
                    </>
                  )}
                </div>

                {/* CUSTOM TEXT — ✅ now visible because settings come from parent */}
                {settings.custom_text && (
                  <div className="mt-12 max-w-4xl">
                    <p className="text-lg leading-10 text-blue-100 italic">
                      {settings.custom_text}
                    </p>
                  </div>
                )}
              </div>

              {/* FOOTER */}
              <div className="grid grid-cols-3 items-end gap-10 pt-12">
                {/* SIGNATURE */}
                <div className="text-center">
                  <div className="h-32 flex items-end justify-center mb-4">
                    {settings.signature_image ? (
                      <img
                        src={storageUrl(settings.signature_image)}
                        alt="signature"
                        crossOrigin="anonymous"
                        className="max-h-28 object-contain drop-shadow-2xl"
                      />
                    ) : (
                      <div className="w-52 border-b border-white/30" />
                    )}
                  </div>
                  <div className="w-52 h-px bg-white/30 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-yellow-300">
                    {settings.chairman_name || t("رئيس الجمعية", "Chairman")}
                  </p>
                  <p className="text-sm text-blue-200 mt-2 tracking-wide">
                    {t("التوقيع الرسمي", "Official Signature")}
                  </p>
                </div>

                {/* QR */}
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-3xl p-4 shadow-2xl">
                    <QRCode
                      value={qrValue || " "}
                      size={150}
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                  </div>
                  <div className="mt-5 text-center">
                    <p className="text-xs uppercase tracking-[4px] text-blue-200">
                      {t("رقم الشهادة", "Certificate Serial")}
                    </p>
                    <p className="text-2xl font-bold text-yellow-300 mt-2">
                      {certificate.serial_number || `CERT-${certificate.id}`}
                    </p>
                  </div>
                </div>

                {/* STAMP */}
                <div className="text-center">
                  <div className="h-32 flex items-end justify-center mb-4">
                    {settings.stamp_image ? (
                      <img
                        src={storageUrl(settings.stamp_image)}
                        alt="stamp"
                        crossOrigin="anonymous"
                        className="max-h-28 object-contain opacity-95 drop-shadow-2xl"
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-full border border-dashed border-white/30" />
                    )}
                  </div>
                  <p className="text-sm text-blue-200 tracking-wide">
                    {t("الختم الرسمي", "Official Stamp")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <DialogFooter className="bg-background border-t p-5 flex-row justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t("إغلاق", "Close")}
            </Button>
            <Button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="bg-green-600 hover:bg-green-700 gap-2"
            >
              {downloadingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {t("تحميل PDF", "Download PDF")}
            </Button>
          </DialogFooter>
        </>
      </DialogContent>
    </Dialog>
  );
};
