import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Workshop } from "@/types/workshop";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, QrCode } from "lucide-react";
import { useRef } from "react";
import QRCode from "react-qr-code";

interface WorkshopAttendanceQRProps {
  workshop: Workshop | null;
  open: boolean;
  onClose: () => void;
}

export const WorkshopAttendanceQR = ({
  workshop,
  open,
  onClose,
}: WorkshopAttendanceQRProps) => {
  const { t } = useLanguage();
  const printRef = useRef<HTMLDivElement>(null);

  if (!workshop) return null;

  const attendanceUrl = `${window.location.origin}/workshop/${workshop.id}/attendance`;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=700,height=900");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${workshop.title} — Attendance QR</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'IBM Plex Sans Arabic', 'Segoe UI', sans-serif;
              background: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              padding: 32px;
            }
            .page {
              width: 100%;
              max-width: 560px;
              text-align: center;
            }
            .top-bar {
              width: 100%;
              height: 8px;
              background: linear-gradient(90deg, #0ea5e9, #6366f1);
              border-radius: 8px;
              margin-bottom: 36px;
            }
            .badge {
              display: inline-block;
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: #0ea5e9;
              background: #e0f2fe;
              padding: 4px 14px;
              border-radius: 999px;
              margin-bottom: 20px;
            }
            .title {
              font-size: 22px;
              font-weight: 700;
              color: #0f172a;
              line-height: 1.35;
              margin-bottom: 8px;
              padding: 0 16px;
            }
            .doctor {
              font-size: 14px;
              color: #64748b;
              margin-bottom: 36px;
            }
            .qr-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 36px;
              padding: 24px;
              border: 2px solid #e2e8f0;
              border-radius: 20px;
              width: fit-content;
              box-shadow: 0 4px 24px rgba(0,0,0,0.07);
            }
            .qr-wrap svg {
              display: block;
            }
            .divider {
              height: 1px;
              background: #e2e8f0;
              margin-bottom: 24px;
            }
            .url-label {
              font-size: 11px;
              color: #94a3b8;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              margin-bottom: 6px;
            }
            .url {
              font-size: 12px;
              color: #475569;
              word-break: break-all;
              font-family: monospace;
              background: #f8fafc;
              padding: 8px 16px;
              border-radius: 8px;
              border: 1px solid #e2e8f0;
              display: inline-block;
            }
            .footer-note {
              margin-top: 28px;
              font-size: 12px;
              color: #94a3b8;
            }
            .bottom-bar {
              width: 100%;
              height: 4px;
              background: linear-gradient(90deg, #6366f1, #0ea5e9);
              border-radius: 8px;
              margin-top: 36px;
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="top-bar"></div>
            <div class="badge">${t("سجّل حضورك", "Register Your Attendance")}</div>
            <p class="title">${workshop.title}</p>
            ${workshop.doctor_name ? `<p class="doctor">${workshop.doctor_name}</p>` : ""}
            <div class="qr-wrap">
              ${printContent.innerHTML}
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4 pointer-events-auto overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <QrCode className="w-4 h-4 text-primary" />
                  {t("رمز QR للحضور", "Attendance QR Code")}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 text-muted-foreground"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col items-center gap-4">
                <div className="text-center">
                  <p className="font-semibold text-sm line-clamp-2 leading-snug">
                    {workshop.title}
                  </p>
                  {workshop.doctor_name && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {workshop.doctor_name}
                    </p>
                  )}
                </div>

                {/* QR — ref captures the SVG for print */}
                <div
                  ref={printRef}
                  className="bg-white p-4 rounded-xl border border-border shadow-sm"
                >
                  <QRCode value={attendanceUrl} size={200} />
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 flex gap-2">
                <Button className="flex-1 gap-2" onClick={handlePrint}>
                  <Printer className="w-4 h-4" />
                  {t("طباعة", "Print")}
                </Button>
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  {t("إغلاق", "Close")}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
