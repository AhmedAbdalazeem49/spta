import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { motion } from "framer-motion";
import { Stamp } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Logo from "/logo.png";

export type CertTemplate = "attendance" | "simplified" | "appreciation" | "modern";

interface Cert {
  id: string | number;
  serial_number?: string;
  recipient_name?: string;
  workshop_title?: string;
  workshop_title_ar?: string;
  doctor_name?: string;
  issue_date?: string;
  issued_at?: string;
  workshop_date?: string;
  workshop_end_date?: string;
  workshop_hours?: number;
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
  return `https://spta.techflow1.com/api/files/${clean}`;
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
    : `https://spta-one.vercel.app/certificate/verify/${cert.serial_number}`;

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
  const getDurationAndHours = () => {
    const sStr = cert.workshop_date || cert.issue_date || "";
    const eStr =
      cert.workshop_end_date || cert.workshop_date || cert.issue_date || "";
    let days = 1;
    let hours = 4;
    if (sStr && eStr) {
      try {
        const start = new Date(sStr.split("T")[0]);
        const end = new Date(eStr.split("T")[0]);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        if (diffDays > 0) {
          days = diffDays;
          hours = days * 4;
        }
        // eslint-disable-next-line no-empty
      } catch {}
    }
    return { days, hours };
  };

  const { days, hours } = getDurationAndHours();

  // ══════════════════════════════════════════
  // ATTENDANCE TEMPLATE
  // ══════════════════════════════════════════
  if (template === "attendance") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-[#071426] via-[#0b1e38] to-[#122e54] p-10 text-white overflow-hidden rounded-2xl border border-yellow-500/20"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Borders */}
        <div className="absolute inset-4 rounded-xl border border-yellow-500/10 pointer-events-none" />
        <div className="absolute inset-6 rounded-lg border border-white/5 pointer-events-none" />

        <div className="relative z-10 text-center space-y-4">
          <LogoRow dark />
          {OrgHeader}
          <h3 className="text-2xl font-black tracking-widest text-yellow-400 uppercase">
            {t("Certificate of Attendance", "Certificate of Attendance")}
          </h3>

          <p className="text-xs opacity-60 italic">
            {t("This is to certify that", "This is to certify that")}
          </p>
          <p className="text-3xl font-extrabold text-white tracking-wide">
            {recipientName}
          </p>

          <p className="text-xs opacity-60">
            {t(
              "has successfully attended and completed the workshop:",
              "has successfully attended and completed the workshop:",
            )}
          </p>

          {/* Workshop title on its own dedicated line */}
          <div className="max-w-xl mx-auto  my-3">
            <h4 className="text-lg font-bold text-yellow-300 leading-relaxed">
              {workshopTitle}
            </h4>
          </div>

          {/* Presented by doctor */}
          {cert.doctor_name && (
            <p className="text-sm text-blue-200">
              {t("Presented by", "Presented by")}:{" "}
              <span className="font-semibold text-white">
                {cert.doctor_name}
              </span>
            </p>
          )}

          {/* Duration & Hours */}
          <div className="flex justify-center items-center gap-4 text-xs bg-yellow-500/10 text-yellow-300 px-4 py-2 rounded-full w-fit mx-auto border border-yellow-500/20">
            <span>
              {t("Duration", "Duration")}: {days}{" "}
              {days === 1 ? t("Day", "Day") : t("Days", "Days")}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span>
              {hours} {t("Training Hours", "Training Hours")}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs opacity-60">
            <span>
              {t("Issue Date", "Issue Date")}: {issueDate}
            </span>
            {cert.serial_number && (
              <span>
                {t("Serial", "Serial")}: {cert.serial_number}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-6">
          <Footer dark accentColor="#fde047" />
        </div>
      </motion.div>
    );
  }

  // ══════════════════════════════════════════
  // SIMPLIFIED TEMPLATE
  // ══════════════════════════════════════════
  if (template === "simplified") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-amber-50/10 p-10 text-slate-800 overflow-hidden rounded-2xl border-2 border-double border-slate-300 bg-white"
      >
        <div className="absolute inset-4 rounded-xl border border-slate-200 pointer-events-none" />

        <div className="relative z-10 text-center space-y-4">
          <LogoRow />
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            {t(
              "Saudi Physical Therapy Association",
              "Saudi Physical Therapy Association",
            )}
          </p>
          <h3 className="text-2xl font-bold tracking-wide text-slate-900 border-b pb-2 max-w-md mx-auto border-slate-200">
            {t("Training Certificate", "Training Certificate")}
          </h3>

          <p className="text-xs text-slate-500 uppercase tracking-wider">
            {t("This is to certify that", "This is to certify that")}
          </p>
          <p className="text-2xl font-extrabold text-slate-950">
            {recipientName}
          </p>

          <p className="text-xs text-slate-500">
            {t(
              "has successfully completed the training workshop:",
              "has successfully completed the training workshop:",
            )}
          </p>

          {/* Workshop title on its own dedicated line */}
          <div className="max-w-xl mx-auto py-2">
            <h4 className="text-lg font-bold text-slate-800 underline decoration-slate-300 underline-offset-4">
              {workshopTitle}
            </h4>
          </div>

          {/* Duration & Hours */}
          <div className="flex justify-center items-center gap-4 text-xs font-medium text-slate-700 bg-slate-100 px-4 py-2 rounded-lg w-fit mx-auto border border-slate-200">
            <span>
              {t("Duration", "Duration")}: {days}{" "}
              {days === 1 ? t("Day", "Day") : t("Days", "Days")}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>
              {hours} {t("Training Hours", "Training Hours")}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs text-slate-500">
            <span>
              {t("Issue Date", "Issue Date")}: {issueDate}
            </span>
            {cert.serial_number && (
              <span>
                {t("Serial", "Serial")}: {cert.serial_number}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-6">
          <Footer accentColor="#0f172a" />
        </div>
      </motion.div>
    );
  }

  // ══════════════════════════════════════════
  // APPRECIATION TEMPLATE
  // ══════════════════════════════════════════
  if (template === "appreciation") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-[#3b0a1c] via-[#4d0f25] to-[#631330] p-10 text-white overflow-hidden rounded-2xl border border-yellow-600/35"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-4 rounded-xl border border-yellow-600/20 pointer-events-none" />
        <div className="absolute inset-6 rounded-lg border border-white/5 pointer-events-none" />

        <div className="relative z-10 text-center space-y-4">
          <LogoRow dark />
          {OrgHeader}
          <h3 className="text-2xl font-black tracking-widest text-yellow-400 uppercase font-serif">
            {t("Certificate of Appreciation", "Certificate of Appreciation")}
          </h3>

          <p className="text-xs opacity-60 italic">
            {t(
              "This certificate is proudly presented to",
              "This certificate is proudly presented to",
            )}
          </p>
          <p className="text-3xl font-bold text-yellow-200 font-serif tracking-wide">
            {recipientName}
          </p>

          <p className="text-xs opacity-70 leading-relaxed max-w-md mx-auto">
            {t(
              "in recognition of their outstanding contribution, active participation, and commitment to the success of the event:",
              "in recognition of their outstanding contribution, active participation, and commitment to the success of the event:",
            )}
          </p>

          {/* Workshop title on its own dedicated line */}
          <div className="max-w-xl mx-auto py-3 px-6 rounded-2xl bg-white/5 border border-white/10 my-3">
            <h4 className="text-lg font-bold text-white leading-relaxed">
              {workshopTitle}
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs opacity-60">
            <span>
              {t("Issue Date", "Issue Date")}: {issueDate}
            </span>
            {cert.serial_number && (
              <span>
                {t("Serial", "Serial")}: {cert.serial_number}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-6">
          <Footer dark accentColor="#fbbf24" />
        </div>
      </motion.div>
    );
  }

  // ══════════════════════════════════════════
  // MODERN
  // ══════════════════════════════════════════
  if (template === "modern" || !template) {
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

        <div className="relative z-10 text-center space-y-3">
          <LogoRow dark />
          {OrgHeader}

          <h3 className="text-xl font-black tracking-wide">
            {t("Certificate of Completion", "Certificate of Completion")}
          </h3>

          <p className="text-xs opacity-60">
            {t("This is to certify that", "This is to certify that")}
          </p>

          <p className="text-2xl font-bold">{recipientName}</p>

          <p className="text-xs opacity-70">
            {t(
              "has successfully completed the workshop",
              "has successfully completed the workshop",
            )}
          </p>

          {/* Workshop title — its own dedicated block */}
          <div className="max-w-xl mx-auto ">
            <h4 className="text-base font-bold leading-snug text-white">
              {workshopTitle}
            </h4>
          </div>

          {/* Doctor name */}
          {cert.doctor_name && (
            <p className="text-xs opacity-60">
              {t("Presented by", "Presented by")}:{" "}
              <span className="font-semibold opacity-90">
                {cert.doctor_name}
              </span>
            </p>
          )}

          {/* Duration + Hours row */}
          <div className="flex justify-center items-center gap-4 text-xs font-medium rounded-full w-fit mx-auto">
            <span>
              {t("Duration", "Duration")}: {days}{" "}
              {days === 1 ? t("Day", "Day") : t("Days", "Days")}
            </span>
            <span>
              {cert.workshop_hours ?? hours}{" "}
              {t("Training Hours", "Training Hours")}
            </span>
          </div>

          {/* Dates row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs opacity-60">
            {cert.workshop_end_date && (
              <>
                <span>
                  {t("End", "End")}: {formatDate(cert.workshop_end_date)}
                </span>
              </>
            )}
            {cert.workshop_date && (
              <span>
                {t("Start", "Start")}: {formatDate(cert.workshop_date)}
              </span>
            )}
          </div>

          {/* Issue date + serial */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs opacity-50">
            {cert.serial_number && (
              <span className="text-white">
                {t("Serial", "Serial")}: {cert.serial_number}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-4">
          <Footer dark accentColor="#fde047" />
        </div>
      </motion.div>
    );
  }
};;

export default CertificateTemplate;
