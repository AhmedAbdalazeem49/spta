import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Award, CheckCircle2, Stamp } from "lucide-react";
import QRCode from "react-qr-code";

export type CertTemplate = "classic" | "modern" | "elegant" | "minimal";

interface Cert {
  id: string | number;
  recipient_name?: string;
  workshop_title?: string;
  issue_date?: string;
  hours?: number;
  status?: string;
  verification_code?: string;
  chairman_name?: string;
  signature_url?: string;
  stamp_url?: string;
}

interface Props {
  cert: Cert;
  template: CertTemplate;
}

const CertificateTemplate: React.FC<Props> = ({ cert, template }) => {
  const { t } = useLanguage();

  // 🔥 FIXED QR (same working link everywhere)
  const qrValue = cert.verification_code
    ? `http://localhost:5173/certificate/verify/${cert.verification_code}`
    : `http://localhost:5173/certificate/verify/${cert.id}`;

  const Header = (
    <p className="text-xs uppercase tracking-widest text-muted-foreground">
      {t(
        "الجمعية السعودية للعلاج الطبيعي",
        "Saudi Physical Therapy Association"
      )}
    </p>
  );



  const VerifiedBadge =
    cert.status === "verified" ? (
      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 mt-2">
        <CheckCircle2 className="w-3 h-3 me-1" />
        {t("موثقة", "Verified")}
      </Badge>
    ) : null;

  // =========================
  // SIGNATURE + STAMP BLOCK (FIXED)
  // =========================
  const SignatureBlock = (
    <div className="absolute bottom-6 right-8 left-8 flex justify-between items-end px-6">
      {/* STAMP */}
      <div className="text-center">
        <img
          src={
            cert.stamp_url ||
            "https://via.placeholder.com/120x120.png?text=STAMP"
          }
          alt="stamp"
          className="h-20 w-20 object-contain opacity-90"
        />
        <p className="text-[10px] mt-2 opacity-70">
          {t("الختم الرسمي", "Official Stamp")}
        </p>
      </div>

      {/* CHAIRMAN + SIGNATURE */}
      <div className="text-center flex flex-col items-center">
        <img
          src={
            cert.signature_url ||
            "https://via.placeholder.com/160x60.png?text=SIGNATURE"
          }
          alt="signature"
          className="h-12 object-contain mb-1"
        />

        <div className="h-px w-28 bg-current opacity-30 mb-1" />

        <p className="text-xs opacity-70">
          {t("التوقيع الرسمي", "Official Signature")}
        </p>

        <p className="text-sm font-semibold">
          {cert.chairman_name || t("رئيس الجمعية", "Chairman")}
        </p>
      </div>
    </div>
  );

  // =========================
  // MODERN
  // =========================
  if (template === "modern") {
    return (
      <motion.div className="relative bg-gradient-to-br from-primary to-primary/80 p-10 text-white min-h-[380px] overflow-hidden">
        <div className="text-center space-y-3">
          <Award className="w-10 h-10 mx-auto" />

          {Header}

          <h3 className="text-2xl font-bold">
            {t("شهادة إتمام", "Certificate of Completion")}
          </h3>

          <p className="text-lg font-semibold">{cert.recipient_name}</p>

          <p className="opacity-80">{cert.workshop_title}</p>

          <div className="text-sm mt-2">
            {cert.hours} {t("ساعة تدريبية", "Training Hours")}
          </div>

          <div className="mt-4 bg-white p-2 inline-block rounded-lg">
            <QRCode value={qrValue} size={90} />
          </div>
        </div>

        {SignatureBlock}
      </motion.div>
    );
  }

  // =========================
  // ELEGANT
  // =========================
  if (template === "elegant") {
    return (
      <motion.div className="relative bg-amber-50 p-10 min-h-[380px] border">
        <div className="text-center space-y-3">
          <Stamp className="w-10 h-10 mx-auto text-amber-700" />

          {Header}

          <h3 className="text-xl font-bold text-amber-900">
            {t("شهادة تقدير", "Certificate of Excellence")}
          </h3>

          <p className="text-lg font-semibold">{cert.recipient_name}</p>

          <p className="text-sm">{cert.workshop_title}</p>

          <p className="text-xs text-muted-foreground">
            {cert.issue_date} • {cert.hours} {t("ساعة", "hours")}
          </p>

          <div className="mt-3 bg-white p-2 inline-block rounded">
            <QRCode value={qrValue} size={80} />
          </div>
        </div>

        {SignatureBlock}
      </motion.div>
    );
  }

  // =========================
  // MINIMAL
  // =========================
  if (template === "minimal") {
    return (
      <motion.div className="relative p-10 border-l-4 border-primary min-h-[360px]">
        {Header}

        <h3 className="text-lg font-bold mt-2">{cert.workshop_title}</h3>

        <p className="text-2xl font-bold text-primary mt-4">
          {cert.recipient_name}
        </p>

        <p className="text-sm mt-2">
          {cert.hours} {t("ساعة تدريبية", "hours")}
        </p>

        <div className="mt-4">
          <QRCode value={qrValue} size={90} />
        </div>

        {SignatureBlock}
      </motion.div>
    );
  }

  // =========================
  // CLASSIC (DEFAULT)
  // =========================
  return (
    <motion.div className="relative bg-gradient-to-br from-gray-50 to-white p-10 min-h-[400px] border rounded-lg">
      <div className="text-center space-y-3">
        <Award className="w-10 h-10 mx-auto text-primary" />

        {Header}

        <h3 className="text-xl font-bold">
          {t("شهادة حضور", "Certificate of Attendance")}
        </h3>

        <p className="text-sm text-muted-foreground">{cert.recipient_name}</p>

        <p className="font-semibold">{cert.workshop_title}</p>

        <p className="text-xs text-muted-foreground">
          {cert.issue_date} • {cert.hours} {t("ساعة", "hours")}
        </p>

        <div className="mt-4">
          <QRCode value={qrValue} size={90} />
        </div>

        {VerifiedBadge}
      </div>

      {SignatureBlock}
    </motion.div>
  );
};

export default CertificateTemplate;
