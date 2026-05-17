import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Certificate } from "@/types/certificate";
import { getCertificateDate, getCertificateName, getCertificateWorkshop } from "@/utils/certificateUtils";
import { Award, Download, Printer, QrCode, Signature, Stamp } from "lucide-react";
import React, { useRef } from "react";

interface CertificatePreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: Certificate | null;
}

export const CertificatePreviewModal = ({ isOpen, onOpenChange, certificate }: CertificatePreviewModalProps) => {
  const { t } = useLanguage();
  const printRef = useRef<HTMLDivElement>(null);

  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    // TODO: Implement PDF generation
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto print:max-w-none print:m-0 print:p-0">
        <DialogHeader className="print:hidden">
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            {t("معاينة الشهادة", "Certificate Preview")}
          </DialogTitle>
        </DialogHeader>

        <div className="relative print:m-0 print:p-0" ref={printRef}>
          <div className="aspect-[1.4/1] bg-gradient-to-br from-midnight via-dark-navy to-navy-light rounded-2xl p-8 text-primary-foreground overflow-hidden print:rounded-none print:h-screen print:w-screen">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0l50 50-50 50L0 50z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-green-accent" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {t("شهادة حضور", "Certificate of Attendance")}
                </h2>
                <p className="text-blue-pale">
                  {t("الجمعية السعودية للعلاج الطبيعي", "Saudi Physical Therapy Association")}
                </p>
              </div>

              {/* Body */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-lg mb-4">
                  {t("تشهد الجمعية بأن", "This is to certify that")}
                </p>
                <h3 className="text-4xl font-bold mb-4 text-green-accent">
                  {getCertificateName(certificate, t)}
                </h3>
                <p className="text-lg mb-2">
                  {t("قد أتم بنجاح حضور", "has successfully completed")}
                </p>
                <h4 className="text-2xl font-semibold mb-4">
                  {getCertificateWorkshop(certificate, t)}
                </h4>
                <p className="text-blue-pale">
                  {t("بتاريخ", "on")} {getCertificateDate(certificate)}
                  {certificate.hours
                    ? ` • ${certificate.hours} ${t("ساعات تدريبية", "training hours")}`
                    : ""}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between">
                <div className="text-center">
                  <div className="w-24 h-16 border-b-2 border-blue-pale/50 mb-2 flex items-end justify-center">
                    <Signature className="w-8 h-8 text-blue-pale/50" />
                  </div>
                  <p className="text-sm text-blue-pale">{t("التوقيع", "Signature")}</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-lg p-2 mb-2">
                    <QrCode className="w-full h-full text-navy" />
                  </div>
                  <p className="text-xs text-blue-pale">{certificate.id}</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-16 border-b-2 border-blue-pale/50 mb-2 flex items-end justify-center">
                    <Stamp className="w-8 h-8 text-blue-pale/50" />
                  </div>
                  <p className="text-sm text-blue-pale">{t("الختم", "Stamp")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 print:hidden">
          <Button variant="outline" className="gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            {t("طباعة", "Print")}
          </Button>
          <Button className="bg-green-accent hover:bg-green-light gap-2" onClick={handleDownloadPdf}>
            <Download className="w-4 h-4" />
            {t("تحميل PDF", "Download PDF")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
