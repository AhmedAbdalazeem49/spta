import CertBg from "@/assets/logo-color-cert.png";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { motion } from "framer-motion";
import { CheckCircle2, Stamp } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Logo from "/spta-logo-colors-trans.png";

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
  partner_logo?: string | null;
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
    venue?: { location?: string };
    speaker?: { name?: string };
    organization?: { name?: string; role?: string };
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

// ── SPTA brand colors ─────────────────────────────────────────
const BLUE_DARK = "#0e3d6e"; // navy text / footer bar
const BLUE_MID = "#1a6aa8"; // swooshes / accents
const BLUE_LIGHT = "#3a9bd5"; // dot arcs highlight
const TEAL_DOT = "#3fcbb0"; // first dots in arc
const GREEN_BAR = "#4bb87a"; // bottom green accent
const TEXT_BODY = "#1a3a5c"; // dark navy for body text
const TEXT_MUTED = "#5b84a8"; // muted blue-gray

// ── Background SVG watermark ──────────────────────────────────
const CertBackground = () => (
  <>
    {/* Background image watermark — centered, multiply blend */}
    <img
      src={CertBg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      style={{ opacity: 0.12, mixBlendMode: "multiply" }}
    />

    {/* SVG layer — swooshes on top of the image */}
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 620"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Top-right blue swoosh arcs */}
      <path d="M580,0 Q780,-30 900,80 L900,0 Z" fill={BLUE_MID} opacity="1" />
      <path
        d="M540,0 Q760,10 900,130 Q860,60 780,20 Q680,-10 540,0 Z"
        fill="white"
        opacity="1"
      />
      <path
        d="M460,0 Q700,20 900,170 Q870,110 800,60 Q700,0 460,0 Z"
        fill={BLUE_DARK}
        opacity="1"
      />
    </svg>
  </>
);

const CertificateTemplate: React.FC<Props> = ({ cert, template }) => {
  const { t, isRTL } = useLanguage();
  const settings = useSettings();

  const baseUrl = window.location.origin;
  const qrValue = `${baseUrl}/certificate/verify/${cert.serial_number}`;

  const payload = cert.payload;
  const type = payload?.type || cert.type || template || "attendance";

  const recipientName =
    payload?.participant?.name || cert.recipient_name || "—";
  const eventTitle = payload?.event?.title || cert.workshop_title || "—";
  const eventTitleAr = cert.workshop_title_ar || "";
  const speakerName = payload?.speaker?.name || cert.doctor_name || "";
  const venueLocation = payload?.venue?.location || "";

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

  const trainingHours = payload?.event?.hours || cert.workshop_hours || null;
  const completionStatus = payload?.extra?.completion_status || "Completed";
  const role = payload?.organization?.role || payload?.extra?.role || "";
  const contributionDesc = payload?.extra?.contribution_description || "";
  const organizationName = payload?.organization?.name || "";

  const getDurationDays = () => {
    if (!startDateStr || !endDateStr) return 1;
    try {
      const start = new Date(startDateStr.split("T")[0]);
      const end = new Date(endDateStr.split("T")[0]);
      const diff =
        Math.ceil(Math.abs(end.getTime() - start.getTime()) / 86400000) + 1;
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  };
  const durationDays = getDurationDays();
  const calculatedHours = trainingHours || durationDays * 4;

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
    bodyText = t("has attended:", "has attended:");
  }

  const partnerLogo = cert.partner_logo || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white overflow-hidden rounded-2xl select-none"
      style={{
        border: "1px solid #d0dff0",
        boxShadow: "0 8px 32px rgba(14,61,110,0.12)",
        minHeight: 560,
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* SVG background layer */}
      <CertBackground />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col h-full"
        style={{ minHeight: 560 }}
      >
        {/* ── Header row ── */}
        <div className="flex items-start justify-between px-8 pt-7 pb-4">
          <div></div>
          {/* Logo top-left */}
          <div className="flex items-center gap-3">
            {partnerLogo && (
              <>
                <img
                  src={storageUrl(partnerLogo)}
                  alt="partner logo"
                  className="h-14 object-contain"
                />
                <div className="w-px h-8" style={{ background: "#c5d8ed" }} />
              </>
            )}
            <img src={Logo} alt="SPTA Logo" className="h-20 object-contain" />
          </div>
        </div>

        {/* ── Thin blue separator ── */}
        <div className="mx-8" style={{ height: 1, background: "#d0dff0" }} />

        {/* ── Main body ── */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-10 py-6 gap-3">
          {/* Badge / type label */}
          <p
            className="text-[10px] uppercase tracking-[0.25em] font-bold"
            style={{ color: BLUE_LIGHT }}
          >
            {badgeLabel}
          </p>

          {/* Certificate title */}
          <h2
            className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight"
            style={{ color: BLUE_DARK, letterSpacing: "0.06em" }}
          >
            {certTitle}
          </h2>

          {/* Decorative thin line under title */}
          <div className="flex items-center gap-2 w-40">
            <div className="flex-1 h-px" style={{ background: GREEN_BAR }} />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: GREEN_BAR }}
            />
            <div className="flex-1 h-px" style={{ background: GREEN_BAR }} />
          </div>

          {/* Sub-text */}
          <p className="text-xs italic" style={{ color: TEXT_MUTED }}>
            {subText}
          </p>

          {/* Recipient name */}
          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-wide font-serif"
            style={{ color: BLUE_DARK }}
          >
            {type === "appreciation_org"
              ? organizationName || recipientName
              : recipientName}
          </h1>

          {/* Body text */}
          <p className="text-xs" style={{ color: TEXT_MUTED }}>
            {bodyText}
          </p>

          {/* Event title */}
          <div className="max-w-xl">
            <h3
              className="text-lg sm:text-xl font-bold leading-snug"
              style={{ color: BLUE_MID }}
            >
              {eventTitle}
            </h3>
            {eventTitleAr && (
              <h3
                className="text-base font-semibold mt-0.5"
                style={{ color: TEXT_BODY }}
              >
                {eventTitleAr}
              </h3>
            )}
          </div>

          {/* Contribution description */}
          {contributionDesc && (
            <p
              className="text-xs max-w-lg leading-relaxed italic"
              style={{ color: TEXT_MUTED }}
            >
              "{contributionDesc}"
            </p>
          )}

          {/* Meta: speaker / venue / duration */}
          <div
            className="flex flex-wrap justify-center items-center gap-4 text-xs font-medium"
            style={{ color: TEXT_MUTED }}
          >
            {speakerName && (
              <span>
                {t("Presented by", "Presented by")}:{" "}
                <span className="font-semibold" style={{ color: TEXT_BODY }}>
                  {speakerName}
                </span>
              </span>
            )}
            {venueLocation && (
              <span>
                {t("Held at", "Held at")}:{" "}
                <span className="font-semibold" style={{ color: TEXT_BODY }}>
                  {venueLocation}
                </span>
              </span>
            )}
            {type !== "attended" && type !== "appreciation_org" && (
              <span className="font-semibold" style={{ color: BLUE_MID }}>
                {durationDays}{" "}
                {durationDays === 1 ? t("Day", "Day") : t("Days", "Days")}
                {" · "}
                {calculatedHours} {t("Training Hours", "Training Hours")}
              </span>
            )}
            {type === "completion" && completionStatus && (
              <div
                className="flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px]"
                style={{
                  background: "#e6f4ed",
                  color: "#2d7a50",
                  border: "1px solid #b8dfc9",
                }}
              >
                <CheckCircle2 className="w-3 h-3" />
                {completionStatus}
              </div>
            )}
          </div>

          {/* Dates */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono tracking-wide"
            style={{ color: TEXT_MUTED, opacity: 0.7 }}
          >
            <span>
              {t("Issued", "Issued")}: {displayIssueDate}
            </span>
            {type !== "attended" &&
              type !== "appreciation_org" &&
              startDateStr && (
                <>
                  <span style={{ opacity: 0.4 }}>|</span>
                  <span>
                    {t("Start", "Start")}: {displayStartDate}
                  </span>
                  <span style={{ opacity: 0.4 }}>|</span>
                  <span>
                    {t("End", "End")}: {displayEndDate}
                  </span>
                </>
              )}
            <div>
              <p className="text-[12px] uppercase tracking-widest font-bold text-primary">
                {cert.serial_number || `CERT-REF-${cert.id}`}
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer area ── */}
        <div>
          {/* thin separator */}
          <div
            className="mx-8 mb-4"
            style={{ height: 1, background: "#d0dff0" }}
          />

          {/* Stamp · QR · Signature row */}
          <div className="flex items-end justify-between px-8 pb-5">
            {/* Stamp */}
            <div className="flex flex-col items-center gap-1 w-28 text-center">
              {settings.stamp_image ? (
                <img
                  src={storageUrl(settings.stamp_image)}
                  alt="stamp"
                  className="h-14 w-14 object-contain"
                />
              ) : (
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center"
                  style={{ border: "1.5px dashed #a0bcd8" }}
                >
                  <Stamp className="w-5 h-5" style={{ color: "#a0bcd8" }} />
                </div>
              )}
              <p
                className="text-[9px] uppercase tracking-widest"
                style={{ color: TEXT_MUTED }}
              >
                {t("Official Stamp", "Official Stamp")}
              </p>
            </div>

            {/* QR */}
            <div className="flex flex-col items-center gap-1">
              <div
                className="rounded-xl p-1.5"
                style={{
                  background: "white",
                  border: "1px solid #d0dff0",
                  boxShadow: "0 2px 8px rgba(14,61,110,0.08)",
                }}
              >
                <QRCode
                  value={qrValue}
                  size={60}
                  bgColor="#fff"
                  fgColor={BLUE_DARK}
                />
              </div>
              <p
                className="text-[9px] uppercase tracking-widest"
                style={{ color: TEXT_MUTED }}
              >
                {t("Verify", "Verify")}
              </p>
            </div>

            {/* Signature */}
            <div className="flex flex-col items-center gap-1 w-36 text-center">
              {settings.signature_image ? (
                <img
                  src={storageUrl(settings.signature_image)}
                  alt="signature"
                  className="h-10 object-contain"
                />
              ) : (
                <div
                  className="h-10 w-28"
                  style={{ borderBottom: `1.5px solid #a0bcd8` }}
                />
              )}
              <div
                className="w-24 mt-1"
                style={{ height: 1, background: "#d0dff0" }}
              />
              <p className="text-xs font-bold" style={{ color: BLUE_DARK }}>
                {settings.chairman_name || t("رئيس الجمعية", "Chairman")}
              </p>
              <p
                className="text-[8px] leading-tight"
                style={{ color: TEXT_MUTED }}
              >
                {t(
                  "President, Saudi Physical Therapy Association",
                  "President, Saudi Physical Therapy Association",
                )}
              </p>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="flex items-stretch" style={{ height: 40 }}>
            {/* Blue section */}
            <div
              className="flex items-center px-8 gap-2"
              style={{
                background: BLUE_DARK,
                flex: "0 0 60%",
              }}
            >
              <span className="text-white text-xs font-semibold tracking-[0.18em] uppercase">
                Spta.sa
              </span>
            </div>

            {/* Green accent with inner highlight */}
            <div
              className="relative flex-1 overflow-hidden"
              style={{ background: GREEN_BAR }}
            >
              <div
                className="absolute inset-y-0 left-0 w-6"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0.15), transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateTemplate;
