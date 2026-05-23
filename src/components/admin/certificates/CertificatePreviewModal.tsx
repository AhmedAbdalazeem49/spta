import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Certificate } from "@/types/certificate";
import {
  getCertificateDate,
  getCertificateName,
  getCertificateWorkshop,
} from "@/utils/certificateUtils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Award, Download, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

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
  settings: CertificateSettings;
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export const CertificatePreviewModal = ({
  isOpen,
  onOpenChange,
  certificate,
  settings,
}: CertificatePreviewModalProps) => {
  const { t } = useLanguage();

  const certificateRef = useRef<HTMLDivElement>(null);

  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // ───────────────────────────────────────────────────────────
  // FILE URL HELPER
  // ───────────────────────────────────────────────────────────

  const storageUrl = (value: File | string | null | undefined): string => {
    if (!value) return "";

    if (value instanceof File) {
      return URL.createObjectURL(value);
    }

    if (value.startsWith("http")) {
      return value;
    }

    const path = value.replace(/^\/storage\//, "");

    return `https://spta.prower.store/api/files/${path}`;
  };

  // ───────────────────────────────────────────────────────────
  // QR
  // ───────────────────────────────────────────────────────────

  const qrValue = certificate?.serial_number
    ? `https://spta-one.vercel.app/certificate/verify/${certificate.serial_number}`
    : "";

  // ───────────────────────────────────────────────────────────
  // PDF DOWNLOAD
  // ───────────────────────────────────────────────────────────

  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;

    try {
      setDownloadingPdf(true);

      const canvas = await html2canvas(certificateRef.current, {
        scale: 4,
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

  // ───────────────────────────────────────────────────────────
  // UI
  // ───────────────────────────────────────────────────────────

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1700px]  p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <DialogHeader className="hidden">
          <DialogTitle>Certificate Preview</DialogTitle>
        </DialogHeader>

        <>
          {/* CERTIFICATE */}
          <div
            ref={certificateRef}
            className="relative overflow-hidden rounded-[40px] shadow-[0_30px_120px_rgba(0,0,0,0.45)] border border-white/10"
          >
            {/* ───────────────── BACKGROUND ───────────────── */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#071120] via-[#0d1f38] to-[#122b4d]" />

            {/* GLOW */}
            <div className="absolute top-0 inset-x-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.18),transparent_70%)]" />

            {/* GRID PATTERN */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            {/* DECORATION */}
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl" />

            {/* BORDERS */}
            <div className="absolute inset-6 rounded-[34px] border border-yellow-400/20" />

            <div className="absolute inset-10 rounded-[28px] border border-white/5" />

            {/* ───────────────── CONTENT ───────────────── */}
            <div className="relative z-10 px-24 py-20 min-h-[1050px] flex flex-col text-white">
              {/* ───────────────── HEADER ───────────────── */}
              <div className="flex items-center justify-between">
                {/* LEFT ICON */}
                <div className="w-36 h-36 rounded-full bg-white/5 backdrop-blur-xl border border-yellow-400/20 flex items-center justify-center shadow-2xl">
                  <Award className="w-16 h-16 text-yellow-300" />
                </div>

                {/* CENTER */}
                <div className="text-center max-w-4xl">
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-200 text-sm font-semibold mb-7">
                    <Sparkles className="w-4 h-4" />
                    Professional Achievement Certificate
                  </div>

                  <h1 className="text-[82px] leading-none font-black tracking-tight bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                    CERTIFICATE
                  </h1>

                  <p className="mt-7 text-2xl text-blue-100 tracking-wide font-medium">
                    Saudi Physical Therapy Association
                  </p>

                  <div className="w-44 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-8" />
                </div>

                {/* RIGHT ICON */}
                <div className="w-36 h-36 rounded-full bg-white/5 backdrop-blur-xl border border-yellow-400/20 flex items-center justify-center shadow-2xl">
                  <ShieldCheck className="w-16 h-16 text-yellow-300" />
                </div>
              </div>

              {/* ───────────────── BODY ───────────────── */}
              <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                {/* TOP TEXT */}
                <p className="text-2xl text-blue-100 font-medium tracking-wide uppercase mb-8">
                  This Certificate Is Proudly Presented To
                </p>

                {/* NAME */}
                <div className="relative mb-14">
                  <div className="absolute inset-0 blur-3xl bg-yellow-300/20 rounded-full" />

                  <h2 className="relative text-[92px] font-black leading-tight tracking-tight text-yellow-300">
                    {getCertificateName(certificate, t)}
                  </h2>
                </div>

                {/* DESCRIPTION */}
                <div className="max-w-5xl">
                  <p className="text-[30px] leading-[60px] text-blue-100 font-light">
                    Has successfully completed and participated in the
                    professional training workshop
                  </p>
                </div>

                {/* WORKSHOP */}
                <div className="relative mt-12 mb-12 max-w-6xl">
                  <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full" />

                  <h3 className="relative text-[58px] font-bold leading-[1.35] text-white">
                    {getCertificateWorkshop(certificate, t)}
                  </h3>
                </div>

                {/* DATE */}
                <div className="flex items-center gap-5 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <span className="text-blue-200 uppercase tracking-[3px] text-sm">
                    Issue Date
                  </span>

                  <span className="text-2xl font-bold text-yellow-300">
                    {getCertificateDate(certificate)}
                  </span>
                </div>

                {/* CUSTOM TEXT */}
                {settings.custom_text && (
                  <div className="mt-14 max-w-4xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-8">
                    <p className="text-xl leading-[42px] text-blue-100 italic font-light">
                      {settings.custom_text}
                    </p>
                  </div>
                )}
              </div>

              {/* ───────────────── FOOTER ───────────────── */}
              <div className="grid grid-cols-3 items-end gap-14 pt-16">
                {/* SIGNATURE */}
                <div className="text-center">
                  <div className="h-36 flex items-end justify-center mb-5">
                    {settings.signature_image ? (
                      <img
                        src={storageUrl(settings.signature_image)}
                        alt="signature"
                        crossOrigin="anonymous"
                        className="max-h-32 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                      />
                    ) : (
                      <div className="w-64 border-b border-white/30" />
                    )}
                  </div>

                  <div className="w-64 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-4" />

                  <p className="text-[32px] font-bold text-yellow-300">
                    {settings.chairman_name || "Chairman"}
                  </p>

                  <p className="text-sm text-blue-200 mt-3 tracking-[4px] uppercase">
                    Official Signature
                  </p>
                </div>

                {/* QR */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-2xl rounded-[32px]" />

                    <div className="relative bg-white rounded-[30px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-black/5">
                      <QRCode
                        value={qrValue || " "}
                        size={170}
                        bgColor="#ffffff"
                        fgColor="#000000"
                      />
                    </div>
                  </div>

                  <div className="mt-7 text-center">
                    <p className="text-xs uppercase tracking-[5px] text-blue-200">
                      Certificate Serial
                    </p>

                    <p className="text-[32px] font-black text-yellow-300 mt-3 tracking-wide">
                      {certificate.serial_number || `CERT-${certificate.id}`}
                    </p>
                  </div>
                </div>

                {/* STAMP */}
                <div className="text-center">
                  <div className="h-36 flex items-end justify-center mb-5">
                    {settings.stamp_image ? (
                      <img
                        src={storageUrl(settings.stamp_image)}
                        alt="stamp"
                        crossOrigin="anonymous"
                        className="max-h-32 object-contain opacity-95 drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/30" />
                    )}
                  </div>

                  <p className="text-sm text-blue-200 tracking-[4px] uppercase">
                    Official Stamp
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ───────────────── ACTIONS ───────────────── */}
          <DialogFooter className="bg-background/95 backdrop-blur-xl border-t border-white/10 p-6 flex-row justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 px-6 rounded-xl"
            >
              Close
            </Button>

            <Button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="bg-green-600 hover:bg-green-700 h-11 px-6 rounded-xl gap-2 shadow-lg"
            >
              {downloadingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Download PDF
            </Button>
          </DialogFooter>
        </>
      </DialogContent>
    </Dialog>
  );
};
