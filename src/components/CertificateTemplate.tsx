import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  CheckCircle2,
  FileText,
  MapPin,
  Stamp,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Logo from "/logo.png";

export type CertTemplate =
  | "attendance"
  | "simplified"
  | "appreciation"
  | "modern"
  | "completion"
  | "appreciation_person"
  | "appreciation_org"
  | "attended";

interface Cert {
  id: string | number;
  serial_number?: string;
  recipient_name?: string;
  recipient_name_ar?: string;
  workshop_title?: string;
  workshop_title_ar?: string;
  doctor_name?: string;
  issue_date?: string;
  issued_at?: string;
  workshop_date?: string;
  workshop_end_date?: string;
  workshop_hours?: number;
  status?: string;
  type?: string;
  template?: string;
  partner_logo?: string | null; // ← from workshop, not settings
  payload?: {
    type?: string;
    participant?: {
      name?: string;
      name_ar?: string;
      identifier?: string | number;
    };
    event?: {
      title?: string;
      start_date?: string;
      end_date?: string;
      hours?: number;
    };
    venue?: {
      location?: string;
    };
    speaker?: {
      name?: string;
    };
    organization?: {
      name?: string;
      role?: string;
    };
    extra?: {
      role?: string;
      completion_status?: string;
      contribution_description?: string;
      duration?: string;
    };
  };
}

interface CertificateSettings {
  signature_image: string | null;
  stamp_image: string | null;
  chairman_name: string;
  custom_text: string;
}

interface Props {
  cert: Cert;
  template?: CertTemplate;
}

// ── helpers ──────────────────────────────────────────────────
const STORAGE_BASE_URL = import.meta.env.VITE_Storage_URL;

// eslint-disable-next-line react-refresh/only-export-components
export const storageUrl = (path: string | null | undefined): string => {
  if (!path) return "";

  if (path.startsWith("http")) return path;

  const clean = path.replace(/^\/storage\//, "");

  return `${STORAGE_BASE_URL}/storage/${clean}`;
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
        });
      })
      .catch(console.error);
  }, []);

  return settings;
};

const CertificateTemplate: React.FC<Props> = ({ cert, template }) => {
  const { t, isRTL } = useLanguage();
  const settings = useSettings();

  const baseUrl = window.location.origin;

  const qrValue = cert.serial_number
    ? `${baseUrl}/certificate/verify/${cert.serial_number}`
    : `${baseUrl}/certificate/verify/${cert.serial_number}`;

  const payload = cert.payload;
  // Resolve certificate type
  const type = payload?.type || cert.type || template || "attendance";

  // 1. Recipient Info
  const recipientName =
    payload?.participant?.name || cert.recipient_name || "—";

  // 2. Event Info
  const eventTitle = payload?.event?.title || cert.workshop_title || "—";
  const eventTitleAr = cert.workshop_title_ar || "";

  // 3. Speaker / Presenter
  const speakerName = payload?.speaker?.name || cert.doctor_name || "";

  // 4. Location / Venue
  const venueLocation = payload?.venue?.location || "";

  // 5. Dates
  const startDateStr =
    payload?.event?.start_date ||
    cert.workshop_date ||
    cert.issue_date ||
    cert.issued_at ||
    "";
  const endDateStr =
    payload?.event?.end_date || cert.workshop_end_date || startDateStr;
  const issueDateStr = cert.issue_date || cert.issued_at || startDateStr;

  const displayIssueDate = formatDate(issueDateStr);
  const displayStartDate = formatDate(startDateStr);
  const displayEndDate = formatDate(endDateStr);

  // 6. Hours and Durations
  const trainingHours = payload?.event?.hours || cert.workshop_hours || null;
  const completionStatus = payload?.extra?.completion_status || "Completed";
  const role = payload?.organization?.role || payload?.extra?.role || "";
  const contributionDesc = payload?.extra?.contribution_description || "";
  const organizationName = payload?.organization?.name || "";

  // Calculate duration in days dynamically
  const getDurationDays = () => {
    if (!startDateStr || !endDateStr) return 1;
    try {
      const start = new Date(startDateStr.split("T")[0]);
      const end = new Date(endDateStr.split("T")[0]);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };
  const durationDays = getDurationDays();
  const calculatedHours = trainingHours || durationDays * 4;

  console.log("stamp_image", settings.stamp_image);
  console.log("stamp_url", storageUrl(settings.stamp_image));

  // Dynamic values based on certificate type
  let badgeLabel = t("Attendance", "Attendance");
  let certTitle = t("Certificate of Attendance", "Certificate of Attendance");
  let subText = t("This is to certify that", "This is to certify that");
  let bodyText = t(
    "has successfully attended and completed",
    "has successfully attended and completed",
  );

  if (type === "completion") {
    badgeLabel = t("Completion", "Completion");
    certTitle = t("Certificate of Completion", "Certificate of Completion");
    subText = t("This is to certify that", "This is to certify that");
    bodyText = t("has successfully completed", "has successfully completed");
  } else if (type === "appreciation_person") {
    badgeLabel = t("Appreciation", "Appreciation");
    certTitle = t("Certificate of Appreciation", "Certificate of Appreciation");
    subText = t(
      "This certificate is proudly presented to",
      "This certificate is proudly presented to",
    );
    bodyText = t(
      role
        ? `in recognition of their outstanding contribution and role as a ${role} in the event`
        : "in recognition of their outstanding contribution in the event",
      role
        ? `تقديراً لجهودهم ومشاركتهم الفعالة بصفة ${role} في فعالية:`
        : "تقديراً لجهودهم ومشاركتهم الفعالة في فعالية:",
    );
  } else if (type === "appreciation_org") {
    badgeLabel = t("Appreciation", "Appreciation");
    certTitle = t("Certificate of Appreciation", "Certificate of Appreciation");
    subText = t(
      "This certificate is proudly presented to",
      "This certificate is proudly presented to",
    );
    bodyText = t(
      role
        ? `in appreciation of their hosting and active role as a ${role} in the event:`
        : "in appreciation of their hosting and active role in the event:",
      role
        ? `تقديراً لتعاونهم واستضافتهم ودورهم كـ ${role} في فعالية:`
        : "تقديراً لتعاونهم واستضافتهم ودورهم في فعالية:",
    );
  } else if (type === "attended") {
    badgeLabel = t("Seminar Attendance", "Seminar Attendance");
    certTitle = t("Certificate of Attendance", "Certificate of Attendance");
    subText = t("This is to certify that", "This is to certify that");
    bodyText = t("has attended:", "has attended:");
  }

  // Workshop partner_logo — from cert prop (set per-workshop, not global settings)
  const partnerLogo = cert.partner_logo || null;

  // Unified Premium Logo Row
  const LogoRow = () => (
    <div className="flex items-center justify-between w-full border-b border-[#c5a880]/20 pb-4 mb-4">
      <div className="flex items-center gap-3">
        <img
          src={Logo}
          alt="SPTA Logo"
          className="h-14 object-contain filter brightness-110 drop-shadow-md"
        />
        {partnerLogo && (
          <>
            <div className="w-px h-8 bg-[#c5a880]/30" />
            <img
              src={storageUrl(partnerLogo)}
              alt="partner logo"
              className="h-14 object-contain filter brightness-110 drop-shadow-md"
            />
          </>
        )}
      </div>
      <div className="text-left">
        <p className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold">
          {t(
            "Saudi Physical Therapy Association",
            "Saudi Physical Therapy Association",
          )}
        </p>
        <p className="text-[12px] opacity-80 tracking-wider  mt-0.5 text-[#c5a880]">
          {cert.serial_number || `CERT-REF-${cert.id}`}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-[#0e3756] via-[#175e93] to-[#1e7ec8] p-8 text-white overflow-hidden rounded-3xl border-2 border-[#c5a880]/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] select-none"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Premium background decorative rings */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-[#c5a880]/10 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border border-[#c5a880]/10 pointer-events-none" />

      {/* Borders */}
      <div className="absolute inset-3 rounded-[20px] border border-[#c5a880]/20 pointer-events-none" />
      <div className="absolute inset-4 rounded-[18px] border border-white/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full min-h-[480px]">
        {/* Logo and Header */}
        <LogoRow />

        {/* Certificate Title / Badge */}
        <div className="text-center space-y-4 my-2">
          <div className="text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
            {badgeLabel}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white  uppercase">
            {certTitle}
          </h2>

          <p className="text-xs opacity-60 italic tracking-wide">{subText}</p>

          {/* Recipient Name */}
          <div className="py-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide font-serif drop-shadow-md">
              {type === "appreciation_org"
                ? organizationName || recipientName
                : recipientName}
            </h1>
          </div>

          <p className="text-xs opacity-60 tracking-wide">{bodyText}</p>

          {/* Event Title Block */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-[#fde047] leading-relaxed">
              {eventTitle}
            </h3>
            {eventTitleAr && (
              <h3 className="text-md font-semibold text-white/90 mt-1">
                {eventTitleAr}
              </h3>
            )}
          </div>

          {/* Contribution Description for Appreciation */}
          {contributionDesc && (
            <p className="text-xs text-[#c5a880] max-w-lg mx-auto leading-relaxed italic">
              "{contributionDesc}"
            </p>
          )}

          {/* Meta details depending on type */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-medium text-blue-200 mt-2">
            {/* Speaker block */}
            {speakerName && (
              <div className="flex items-center gap-1.5">
                <span>
                  {t("Presented by", "Presented by")}:{" "}
                  <span className="text-white font-semibold">
                    {speakerName}
                  </span>
                </span>
              </div>
            )}

            {/* Venue Block */}
            {venueLocation && (
              <div className="flex items-center gap-1.5">
                <span>
                  {t("Held at", "Held at")}:{" "}
                  <span className="text-white font-semibold">
                    {venueLocation}
                  </span>
                </span>
              </div>
            )}

            {/* Duration Block */}
            {type !== "attended" && type !== "appreciation_org" && (
              <div className="flex items-center gap-1.5  text-yellow-300">
                <span>
                  {t("Duration", "Duration")}: {durationDays}{" "}
                  {durationDays === 1 ? t("Day", "Day") : t("Days", "Days")}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#c5a880]/50" />
                <span>
                  {calculatedHours} {t("Training Hours", "Training Hours")}
                </span>
              </div>
            )}

            {/* Completion Status */}
            {type === "completion" && completionStatus && (
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{completionStatus}</span>
              </div>
            )}
          </div>

          {/* Dates block */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-white/50 font-mono tracking-wide pt-1">
            <span>
              {t("Issued", "Issued")}: {displayIssueDate}
            </span>
            {type !== "attended" &&
              type !== "appreciation_org" &&
              startDateStr && (
                <>
                  <span className="opacity-30">|</span>
                  <span>
                    {t("Start", "Start")}: {displayStartDate}
                  </span>
                  <span className="opacity-30">|</span>
                  <span>
                    {t("End", "End")}: {displayEndDate}
                  </span>
                </>
              )}
          </div>
        </div>

        {/* Footer Area with Stamp, QR and Signature */}
        <div className="flex items-end justify-between border-t border-[#c5a880]/20 pt-4 mt-4">
          {/* Official Stamp */}
          <div className="flex flex-col items-center gap-1 w-32 sm:w-40 text-center">
            {settings.stamp_image ? (
              <img
                src={storageUrl(settings.stamp_image)}
                alt="stamp"
                className="h-16 w-16 object-contain opacity-90 filter drop-shadow-md"
              />
            ) : (
              <div className="h-16 w-16 rounded-full border-2 border-dashed border-[#c5a880]/20 flex items-center justify-center">
                <Stamp className="w-6 h-6 text-[#c5a880]/40" />
              </div>
            )}
            <p className="text-[9px] uppercase tracking-widest text-white/40">
              {t("Official Stamp", "Official Stamp")}
            </p>
          </div>

          {/* Verification QR */}
          <div className="flex flex-col items-center gap-1">
            <div className="bg-white rounded-xl p-1.5 shadow-lg border border-[#c5a880]/30 hover:scale-105 transition-transform">
              <QRCode
                value={qrValue}
                size={64}
                bgColor="#fff"
                fgColor="#0e3756"
              />
            </div>
          </div>

          {/* Signature and Chairman */}
          <div className="flex flex-col items-center gap-1 w-32 sm:w-44 text-center">
            {settings.signature_image ? (
              <img
                src={storageUrl(settings.signature_image)}
                alt="signature"
                className="h-10 object-contain"
              />
            ) : (
              <div className="h-10 w-28 border-b border-[#c5a880]/30" />
            )}
            <div className="h-px w-24 bg-[#c5a880]/20 mt-1" />
            <p className="text-xs font-bold text-[#c5a880]">
              {settings.chairman_name || t("رئيس الجمعية", "Chairman")}
            </p>
            <p className="text-[8px] text-white/50 leading-tight">
              {t(
                "President, Saudi Physical Therapy Association",
                "President, Saudi Physical Therapy Association",
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateTemplate;
