import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { motion } from "framer-motion";
import { Award, Stamp } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Logo from "/spta-logo.png";

export type CertTemplate = "classic" | "modern" | "elegant" | "minimal";

interface Cert {
  id: string | number;
  serial_number?: string;
  recipient_name?: string;
  workshop_title?: string;
  workshop_title_ar?: string;
  issue_date?: string;
  issued_at?: string;
  workshop_date?: string;
  status?: string;
}

interface CertificateSettings {
  signature_image: string | null;
  stamp_image: string | null;
  chairman_name: string;
  custom_text: string;
  partner_logo: string | null;
}

interface Props {
  cert: Cert;
  template: CertTemplate;
}

// ── helpers ──────────────────────────────────────────────────
const storageUrl = (path: string | null | undefined): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const clean = path.replace(/^\/storage\//, "");
  return `https://spta.prower.store/api/files/${clean}`;
};

const formatDate = (raw?: string): string => {
  if (!raw) return "—";
  try {
    return new Date(raw).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return raw.split("T")[0];
  }
};

// ── shared hook: fetch settings once ─────────────────────────
const useSettings = () => {
  const [settings, setSettings] = useState<CertificateSettings>({
    signature_image: null,
    stamp_image: null,
    chairman_name: "",
    custom_text: "",
    partner_logo: null,
  });

  useEffect(() => {
    api
      .get("/certificate-settings")
      .then((res) => {
        const d = res.data?.data ?? res.data;
        setSettings({
          signature_image: d?.signature_image ?? null,
          stamp_image: d?.stamp_image ?? null,
          chairman_name: d?.chairman_name ?? "",
          custom_text: d?.custom_text ?? "",
          partner_logo: d?.partner_logo ?? null,
        });
      })
      .catch(console.error);
  }, []);

  return settings;
};

// ─────────────────────────────────────────────────────────────
const CertificateTemplate: React.FC<Props> = ({ cert, template }) => {
  const { t } = useLanguage();
  const settings = useSettings();

  const qrValue = cert.serial_number
    ? `https://spta-one.vercel.app/certificate/verify/${cert.serial_number}`
    : `https://spta-one.vercel.app/certificate/verify/${cert.id}`;

  const recipientName = cert.recipient_name || "—";

  const workshopTitle =
    t(cert.workshop_title_ar || "", cert.workshop_title || "") ||
    cert.workshop_title ||
    "—";

  const issueDate = formatDate(
    cert.issue_date || cert.issued_at || cert.workshop_date,
  );

  const isVerified = cert.status === "verified";

  // ── Logo row: our logo + optional partner logo ────────────
  const LogoRow = ({ dark = false }: { dark?: boolean }) => (
    <div className="flex items-center justify-center gap-4">
      <img src={Logo} alt="logo" className="h-12 object-contain" />
      {settings.partner_logo && (
        <>
          <div className={`w-px h-8 ${dark ? "bg-white/20" : "bg-black/15"}`} />
          <img
            src={storageUrl(settings.partner_logo)}
            alt="partner logo"
            crossOrigin="anonymous"
            className="h-12 object-contain"
          />
        </>
      )}
    </div>
  );

  // ── Reusable sub-components ───────────────────────────────
  const OrgHeader = (
    <p
      className="text-xs uppercase tracking-widest opacity-60"
      style={{ letterSpacing: "0.18em" }}
    >
      {t(
        "Saudi Physical Therapy Association",
        "Saudi Physical Therapy Association",
      )}
    </p>
  );

  const VerifiedBadge = isVerified ? (
    <Badge className="text-emerald-600 bg-transparent">
      {t("Verified", "Verified")}
    </Badge>
  ) : null;

  const MetaRow = (
    <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
      <span className="flex items-center gap-1 px-3 py-1 text-xs">
        {issueDate}
      </span>
      {VerifiedBadge}
      {cert.serial_number && (
        <span className="flex items-center gap-1 px-3 py-1 font-mono tracking-wide">
          {cert.serial_number}
        </span>
      )}
    </div>
  );

  const Footer = ({
    dark = false,
    accentColor = "currentColor",
  }: {
    dark?: boolean;
    accentColor?: string;
  }) => (
    <div
      className={`flex items-end justify-between pt-4 mt-4 ${
        dark ? "border-t border-white/15" : "border-t border-black/10"
      }`}
    >
      {/* Stamp */}
      <div className="flex flex-col items-center gap-1 w-44">
        {settings.stamp_image ? (
          <img
            src={storageUrl(settings.stamp_image)}
            alt="stamp"
            crossOrigin="anonymous"
            className="h-14 w-14 object-contain opacity-90"
          />
        ) : (
          <div
            className={`h-14 w-14 rounded-full border-2 border-dashed ${
              dark ? "border-white/20" : "border-black/15"
            } flex items-center justify-center`}
          >
            <Stamp
              className={`w-5 h-5 ${dark ? "text-white/30" : "text-black/20"}`}
            />
          </div>
        )}
        <p
          className={`text-[9px] uppercase tracking-widest ${
            dark ? "text-white/40" : "text-black/40"
          }`}
        >
          {t("Official Stamp", "Official Stamp")}
        </p>
      </div>

      {/* QR */}
      <div className="flex flex-col items-center gap-1">
        <div className="bg-white rounded-lg p-1.5 shadow">
          <QRCode value={qrValue} size={56} bgColor="#fff" fgColor="#0d1b33" />
        </div>
        <p
          className={`text-[9px] uppercase tracking-widest ${
            dark ? "text-white/40" : "text-black/40"
          }`}
        >
          {t("", "")}
        </p>
      </div>

      {/* Signature + Chairman */}
      <div className="flex flex-col items-center gap-1">
        {settings.signature_image ? (
          <img
            src={storageUrl(settings.signature_image)}
            alt="signature"
            crossOrigin="anonymous"
            className="h-10 object-contain"
          />
        ) : (
          <div
            className={`h-10 w-28 border-b ${
              dark ? "border-white/25" : "border-black/20"
            }`}
          />
        )}
        <div
          className={`h-px w-28 ${dark ? "bg-white/20" : "bg-black/15"} mt-0.5`}
        />
        <p
          className={`text-xs font-semibold ${
            dark ? "text-white/90" : "text-gray-800"
          }`}
          style={{
            color: accentColor !== "currentColor" ? accentColor : undefined,
          }}
        >
          {settings.chairman_name || t("رئيس الجمعية", "Chairman")}
        </p>
        <p
          className={`text-[9px] text-center leading-tight ${
            dark ? "text-white/45" : "text-black/45"
          }`}
        >
          {t(
            "President, Saudi Physical Therapy Association",
            "President, Saudi Physical Therapy Association",
          )}
        </p>
      </div>
    </div>
  );

  // ══════════════════════════════════════════
  // MODERN
  // ══════════════════════════════════════════
  if (template === "modern") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-primary to-primary/80 p-8 text-white overflow-hidden rounded-xl"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 text-center space-y-2">
          <LogoRow dark />
          {OrgHeader}
          <h3 className="text-xl font-black tracking-wide">
            {t("Certificate of Completion", "Certificate of Completion")}
          </h3>

          <p className="text-xs opacity-60">
            {t("This is to certify that", "This is to certify that")}
          </p>
          <p className="text-2xl font-bold">{recipientName}</p>

          <p className="text-sm opacity-80 max-w-xs mx-auto leading-snug">
            {t("has successfully completed", "has successfully completed")}{" "}
            <span className="font-semibold">"{workshopTitle}"</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="flex items-center gap-1 px-3 py-1 text-xs">
              {issueDate}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="flex items-center gap-1 px-3 py-1 text-xs">
              {cert.serial_number}
            </span>
          </div>

          {isVerified && (
            <Badge className="text-white bg-transparent">
              {t("Verified", "Verified")}
            </Badge>
          )}
        </div>

        <div className="relative z-10">
          <Footer dark accentColor="#fde047" />
        </div>
      </motion.div>
    );
  }

  // ══════════════════════════════════════════
  // ELEGANT
  // ══════════════════════════════════════════
  if (template === "elegant") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-amber-50 p-8 overflow-hidden rounded-xl"
        style={{
          background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
          border: "1px solid rgba(217,119,6,0.2)",
          boxShadow: "inset 0 0 60px rgba(217,119,6,0.04)",
        }}
      >
        <div
          className="absolute inset-3 rounded-lg pointer-events-none"
          style={{ border: "1px solid rgba(217,119,6,0.15)" }}
        />

        <div className="relative text-center space-y-2">
          <LogoRow />
          <Stamp className="w-8 h-8 mx-auto text-amber-600" />
          <p className="text-[10px] uppercase tracking-widest text-amber-700/60">
            {t(
              "Saudi Physical Therapy Association",
              "Saudi Physical Therapy Association",
            )}
          </p>
          <h3 className="text-xl font-black text-amber-900">
            {t("Certificate of Excellence", "Certificate of Excellence")}
          </h3>
          <p className="text-xs text-amber-700/70">
            {t("This is to certify that", "This is to certify that")}
          </p>
          <p className="text-2xl font-bold text-amber-900">{recipientName}</p>
          <p className="text-sm text-amber-800/80 max-w-xs mx-auto leading-snug">
            {t("has successfully completed", "has successfully completed")}{" "}
            <span className="font-semibold">"{workshopTitle}"</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="flex items-center gap-1 px-3 py-1 text-xs">
              {issueDate}
            </span>
            {cert.serial_number}
            {VerifiedBadge}
          </div>
        </div>

        <Footer accentColor="#92400e" />
      </motion.div>
    );
  }

  // ══════════════════════════════════════════
  // MINIMAL
  // ══════════════════════════════════════════
  if (template === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-8 rounded-xl bg-white border-l-4 border-primary overflow-hidden"
        style={{ boxShadow: "0 1px 20px rgba(0,0,0,0.06)" }}
      >
        <LogoRow />

        <p className="text-xs text-muted-foreground mb-1 mt-4">
          {t("This is to certify that", "This is to certify that")}
        </p>
        <p className="text-3xl font-black text-primary leading-tight mb-1">
          {recipientName}
        </p>
        <p className="text-sm font-medium text-foreground/80 mb-3 max-w-sm leading-snug">
          {t("has successfully completed", "has successfully completed")}{" "}
          <span className="font-bold">"{workshopTitle}"</span>
        </p>

        <div className="flex flex-wrap gap-2 mb-1">
          <span className="flex items-center gap-1 px-3 py-1 text-xs">
            {issueDate}
          </span>
          {cert.serial_number}
          {VerifiedBadge}
        </div>

        <Footer />
      </motion.div>
    );
  }

  // ══════════════════════════════════════════
  // CLASSIC (default)
  // ══════════════════════════════════════════
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border overflow-hidden"
      style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}
    >
      <Award
        className="absolute top-4 end-4 w-20 h-20 text-primary/5"
        strokeWidth={1}
      />

      <div className="relative text-center space-y-2">
        <LogoRow />
        <Award className="w-9 h-9 mx-auto text-primary" />
        {OrgHeader}

        <h3 className="text-xl font-black text-foreground">
          {t("Certificate of Attendance", "Certificate of Attendance")}
        </h3>

        <p className="text-xs text-muted-foreground">
          {t("This is to certify that", "This is to certify that")}
        </p>

        <p className="text-2xl font-bold text-primary">{recipientName}</p>

        <p className="text-sm text-foreground/75 max-w-xs mx-auto leading-snug">
          {t("has successfully attended", "has successfully attended")}{" "}
          <span className="font-semibold text-foreground">
            "{workshopTitle}"
          </span>
        </p>

        {MetaRow}
      </div>

      <Footer />
    </motion.div>
  );
};

export default CertificateTemplate;
