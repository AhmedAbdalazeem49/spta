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
import { Download, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import CertificateTemplate from "@/components/CertificateTemplate";
import { downloadElementAsPdf } from "@/lib/certificate-export";

interface CertificatePreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: Certificate | null;
}

export const CertificatePreviewModal = ({
  isOpen,
  onOpenChange,
  certificate,
}: CertificatePreviewModalProps) => {
  const { t } = useLanguage();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    if (!certificateRef.current || !certificate) return;

    try {
      setDownloadingPdf(true);
      const name = `${certificate.recipient_name || "user"}-${
        certificate.workshop_title || "certificate"
      }`;
      await downloadElementAsPdf(certificateRef.current, `certificate-${name}`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloadingPdf(false);
    }
  };

  if (!certificate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <DialogHeader className="hidden">
          <DialogTitle>Certificate Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* CERTIFICATE */}
          <div
            ref={certificateRef}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <CertificateTemplate
              cert={{
                id: certificate.id,
                serial_number: certificate.serial_number,
                recipient_name: getCertificateName(certificate, t),
                workshop_title: getCertificateWorkshop(certificate, t),
                issue_date: getCertificateDate(certificate),
                workshop_date: certificate.workshop_date,
                workshop_end_date: certificate.workshop_end_date,
                status: certificate.status,
              }}
              template={(certificate.template as any) || "modern"}
            />
          </div>

          {/* ACTIONS */}
          <DialogFooter className="bg-background/95 backdrop-blur-xl border-t p-6 flex flex-row justify-end gap-3 rounded-2xl">
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
              className="bg-green-600 hover:bg-green-700 h-11 px-6 rounded-xl gap-2 shadow-lg text-white"
            >
              {downloadingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Download PDF
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
