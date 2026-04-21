import { motion } from "framer-motion";
import { Award, CheckCircle2, Stamp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

export type CertTemplate = "classic" | "modern" | "elegant" | "minimal";

interface Cert {
  id: string | number;
  recipient_name?: string;
  workshop_title?: string;
  issue_date?: string;
  hours?: number;
  status?: string;
  verification_code?: string;
}

interface Props {
  cert: Cert;
  template: CertTemplate;
}

const CertificateTemplate: React.FC<Props> = ({ cert, template }) => {
  const { t } = useLanguage();

  const Header = (
    <p className="text-xs uppercase tracking-widest text-muted-foreground">
      {t("الجمعية السعودية للعلاج الطبيعي", "Saudi Physical Therapy Association")}
    </p>
  );

  const VerifiedBadge = cert.status === "verified" && (
    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 mt-2">
      <CheckCircle2 className="w-3 h-3 me-1" />
      {t("موثقة", "Verified")}
    </Badge>
  );

  if (template === "modern") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-primary via-primary/90 to-primary p-10 text-primary-foreground overflow-hidden min-h-[340px]"
      >
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
        <div className="relative text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <Award className="w-7 h-7" />
          </div>
          <p className="text-xs uppercase tracking-widest text-primary-foreground/70">
            {t("الجمعية السعودية للعلاج الطبيعي", "Saudi Physical Therapy Association")}
          </p>
          <h3 className="text-2xl font-bold">
            {t("شهادة إنجاز", "Certificate of Achievement")}
          </h3>
          <p className="text-sm text-primary-foreground/80">
            {t("تشهد بأن", "Awarded to")}
          </p>
          <p className="text-2xl font-bold">{cert.recipient_name}</p>
          <p className="text-sm text-primary-foreground/80">
            {t("لإتمام", "for completing")}
          </p>
          <p className="font-semibold text-base">{cert.workshop_title}</p>
          <div className="flex justify-center gap-4 text-xs text-primary-foreground/70 pt-2">
            <span>{cert.issue_date}</span>
            {cert.hours && <span>· {cert.hours} {t("ساعة", "hours")}</span>}
          </div>
        </div>
      </motion.div>
    );
  }

  if (template === "elegant") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-b from-amber-50 via-white to-amber-50 dark:from-amber-950/20 dark:via-background dark:to-amber-950/20 p-10 min-h-[340px]"
      >
        {/* Ornate borders */}
        <div className="absolute inset-4 border-2 border-amber-600/40 rounded-sm" />
        <div className="absolute inset-5 border border-amber-600/20 rounded-sm" />
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-s-2 border-amber-600" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-e-2 border-amber-600" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-s-2 border-amber-600" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-e-2 border-amber-600" />

        <div className="relative text-center space-y-3 py-4">
          <Stamp className="w-10 h-10 mx-auto text-amber-700" />
          <p className="text-xs uppercase tracking-[0.3em] text-amber-700">
            {t("شهادة تقدير", "Certificate of Excellence")}
          </p>
          <div className="h-px w-32 mx-auto bg-amber-600/50" />
          <p className="text-sm italic text-muted-foreground">
            {t("تتشرف الجمعية بمنح هذه الشهادة إلى", "Proudly presented to")}
          </p>
          <p className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300">
            {cert.recipient_name}
          </p>
          <div className="h-px w-24 mx-auto bg-amber-600/50" />
          <p className="text-sm font-semibold">{cert.workshop_title}</p>
          <p className="text-xs text-muted-foreground">
            {cert.issue_date} {cert.hours && `· ${cert.hours} ${t("ساعة", "hours")}`}
          </p>
          {VerifiedBadge}
        </div>
      </motion.div>
    );
  }

  if (template === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-background p-10 border-s-4 border-primary min-h-[340px]"
      >
        <div className="space-y-4">
          {Header}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {t("شهادة", "Certificate")}
            </p>
            <h3 className="text-xl font-bold">{cert.workshop_title}</h3>
          </div>
          <div className="h-px w-12 bg-primary" />
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              {t("ممنوحة إلى", "Awarded to")}
            </p>
            <p className="text-2xl font-bold text-primary">{cert.recipient_name}</p>
          </div>
          <div className="flex items-center justify-between pt-4 text-xs text-muted-foreground border-t">
            <span>{cert.issue_date}</span>
            {cert.hours && <span>{cert.hours} {t("ساعة", "hours")}</span>}
          </div>
          {VerifiedBadge}
        </div>
      </motion.div>
    );
  }

  // Classic (default)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-8 min-h-[340px]"
    >
      <div className="absolute inset-3 border-2 border-primary/20 rounded-lg" />
      <div className="absolute inset-4 border border-accent/10 rounded-lg" />

      <div className="relative text-center space-y-3 py-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Award className="w-7 h-7 text-primary-foreground" />
        </div>
        {Header}
        <h3 className="text-lg font-bold mt-2">
          {t("شهادة حضور", "Certificate of Attendance")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("تشهد الجمعية بأن", "This certifies that")}
        </p>
        <p className="text-xl font-bold text-primary">{cert.recipient_name}</p>
        <p className="text-sm text-muted-foreground">
          {t("قد أتم بنجاح حضور", "has successfully completed")}
        </p>
        <p className="font-semibold">{cert.workshop_title}</p>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
          <span>{cert.issue_date}</span>
          {cert.hours && <span>{cert.hours} {t("ساعة", "hours")}</span>}
        </div>
        {VerifiedBadge}
      </div>
    </motion.div>
  );
};

export default CertificateTemplate;
