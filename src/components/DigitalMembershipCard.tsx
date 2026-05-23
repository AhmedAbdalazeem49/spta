import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  Award,
  CheckCircle,
  Crown,
  Download,
  FileImage,
  FileText,
  GraduationCap,
  ScanLine,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

interface MemberData {
  fullName: string;
  fullNameEn: string;
  membershipNumber: string;
  membershipType: "active" | "affiliate" | "student" | "intern";
  expiryDate: string;
  workplace: string;
  workplaceEn: string;
  profileImage?: string;
}

interface CertificateSettings {
  chairman_name?: string;
  signature_image?: string;
}

interface CardStyle {
  id: string;
  name: string;
  nameAr: string;
  gradient: string;
  textColor: string;
}

const cardStyles: CardStyle[] = [
  {
    id: "royal",
    name: "Royal Navy",
    nameAr: "الملكي",
    gradient: "from-[#071B3B] via-[#0A234D] to-[#123A75]",
    textColor: "text-white",
  },
  {
    id: "emerald",
    name: "Emerald",
    nameAr: "الزمردي",
    gradient: "from-[#064E3B] via-[#065F46] to-[#0F766E]",
    textColor: "text-white",
  },
  {
    id: "gold",
    name: "Gold Elite",
    nameAr: "الذهبي",
    gradient: "from-[#7C5800] via-[#B88900] to-[#EAB308]",
    textColor: "text-white",
  },
];

const membershipIcons = {
  active: Crown,
  affiliate: Users,
  student: GraduationCap,
  intern: Star,
};

const membershipLabels = {
  active: { ar: "عضو عامل", en: "Active Member" },
  affiliate: { ar: "عضو منتسب", en: "Affiliate Member" },
  student: { ar: "طالب", en: "Student" },
  intern: { ar: "طالب امتياز", en: "Intern Student" },
};

interface DigitalMembershipCardProps {
  member: MemberData;
  certificateSettings?: CertificateSettings;
  showControls?: boolean;
  showSignature?: boolean;
  showStamp?: boolean;
}

const DigitalMembershipCard = ({
  member,
  certificateSettings,
  showControls = true,
}: DigitalMembershipCardProps) => {
  const { t, isRTL } = useLanguage();

  const cardRef = useRef<HTMLDivElement>(null);

  const [selectedStyle, setSelectedStyle] = useState(cardStyles[0]);
  const [isFlipped, setIsFlipped] = useState(false);

  const Icon = membershipIcons[member.membershipType];
  const membershipLabel = membershipLabels[member.membershipType];

  /* ============================= */
  /* DOWNLOAD IMAGE */
  /* ============================= */

  const downloadAsImage = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });

    const link = document.createElement("a");

    link.download = `membership-card-${member.membershipNumber}.png`;

    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  /* ============================= */
  /* DOWNLOAD PDF */
  /* ============================= */

  const downloadAsPDF = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [860, 540],
    });

    pdf.addImage(imgData, "PNG", 0, 0, 860, 540);

    pdf.save(`membership-card-${member.membershipNumber}.pdf`);
  };


  return (
    <div className="space-y-8">
      {/* STYLE SELECTOR */}
      {showControls && (
        <div className="flex flex-wrap justify-center gap-3">
          {cardStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style)}
              className={`group relative overflow-hidden rounded-2xl border px-5 py-3 transition-all duration-300 ${
                selectedStyle.id === style.id
                  ? "border-primary shadow-lg scale-105"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${style.gradient} opacity-10`}
              />

              <div className="relative flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full bg-gradient-to-r ${style.gradient}`}
                />

                <span className="font-medium text-sm">
                  {t(style.nameAr, style.name)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* CARD */}
      <div className="flex justify-center">
        <div
          className="perspective-[2000px]"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative cursor-pointer"
          >
            {/* FRONT */}
            <div
              ref={cardRef}
              style={{ backfaceVisibility: "hidden" }}
              className={`
                relative
                w-[860px]
                h-[540px]
                rounded-[36px]
                overflow-hidden
                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                bg-gradient-to-br
                ${selectedStyle.gradient}
                ${selectedStyle.textColor}
              `}
            >
              {/* BACKGROUND */}
              <div className="absolute inset-0">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />
              </div>

              {/* PATTERN */}
              <div className="absolute inset-0 opacity-[0.05]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 h-full p-10 flex flex-col">
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                        <Shield className="w-8 h-8" />
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold">
                          {t(
                            "الجمعية السعودية للعلاج الطبيعي",
                            "Saudi Physical Therapy Association"
                          )}
                        </h2>

                        <p className="text-white/70 mt-1">
                          {t(
                            "البطاقة الرقمية الرسمية",
                            "Official Digital Membership Card"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Badge className="bg-emerald-500/20 border border-emerald-300/20 text-white px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4 me-2" />
                    {t("عضوية موثقة", "Verified Membership")}
                  </Badge>
                </div>

                {/* CENTER */}
                <div className="flex-1 flex items-center justify-between gap-10">
                  {/* LEFT */}
                  <div className="flex items-center gap-6">
                    {/* IMAGE */}
                    {/* <div className="relative">
                      <div className="absolute inset-0 rounded-3xl bg-white/20 blur-xl" />

                      <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-white/10 backdrop-blur-xl">
                        {member.profileImage ? (
                          <img
                            src={member.profileImage}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl font-bold">
                            {member.fullName.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div> */}

                    {/* INFO */}
                    <div className="space-y-5">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-white/50 mb-2">
                          {t("اسم العضو", "Member")}
                        </p>

                        <h1 className="text-4xl font-black leading-tight">
                          {t(member.fullName, member.fullNameEn)}
                        </h1>
                      </div>

                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-white/50 mb-2">
                          {t("جهة العمل", "Workplace")}
                        </p>

                        <p className="text-xl text-white/90">
                          {t(member.workplace, member.workplaceEn)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge className="bg-white/10 border border-white/10 text-white px-5 py-2 rounded-full text-sm">
                          <Icon className="w-4 h-4 me-2" />
                          {t(membershipLabel.ar, membershipLabel.en)}
                        </Badge>

                        <Badge className="bg-primary/20 border border-primary/20 text-white px-5 py-2 rounded-full text-sm">
                          #{member.membershipNumber}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-center">
                    {/* QR */}
                    <div className="bg-white p-5 rounded-3xl shadow-2xl">
                      <QRCode
                        value={`${window.location.origin}/verify-membership/${member.membershipNumber}`}
                        size={180}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                      />
                    </div>

                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                        <ScanLine className="w-4 h-4" />

                        {t("امسح للتحقق من العضوية", "Scan to verify")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-end justify-between">
                  {/* LEFT */}
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                      {t("تاريخ الانتهاء", "Expiry Date")}
                    </p>

                    <p className="text-2xl font-bold">
                      {new Date(member.expiryDate).toLocaleDateString(
                        isRTL ? "ar-SA" : "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-end gap-8">
                    {/* SIGNATURE */}
                    <div className="text-center">
                      {certificateSettings?.signature_image && (
                        <div className=" px-5 py-2 shadow-xl mb-2">
                          <img
                            src={`https://spta.prower.store${certificateSettings.signature_image}`}
                            alt="signature"
                            className="h-16 object-contain"
                          />
                        </div>
                      )}

                      <p className="text-sm font-semibold">
                        {certificateSettings?.chairman_name || "Chairman"}
                      </p>

                      <p className="text-xs text-white/60 mt-1">
                        {t("رئيس مجلس الإدارة", "Chairman")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK SIDE */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className={`
                absolute
                inset-0
                w-[860px]
                h-[540px]
                rounded-[36px]
                overflow-hidden
                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                bg-gradient-to-br
                ${selectedStyle.gradient}
                ${selectedStyle.textColor}
              `}
            >
              <div className="relative h-full p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-black mb-3">
                    {t("التحقق الرقمي", "Digital Verification")}
                  </h2>

                  <p className="text-white/70 text-lg max-w-xl leading-relaxed">
                    {t(
                      "هذه البطاقة رقمية وموثقة ويمكن التحقق من صحتها عبر رمز QR أو نظام التحقق الإلكتروني الخاص بالجمعية.",
                      "This card is digitally verified and can be validated through QR verification."
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm text-white/50 uppercase tracking-[0.25em] mb-2">
                        {t("رقم العضوية", "Membership Number")}
                      </p>

                      <h3 className="text-4xl font-black tracking-widest">
                        {member.membershipNumber}
                      </h3>
                    </div>

                    <div>
                      <p className="text-sm text-white/50 uppercase tracking-[0.25em] mb-2">
                        {t("نوع العضوية", "Membership Type")}
                      </p>

                      <h3 className="text-2xl font-bold">
                        {t(membershipLabel.ar, membershipLabel.en)}
                      </h3>
                    </div>
                  </div>

                  <div className="w-28 h-20 flex items-center justify-center">
                    {certificateSettings?.signature_image ? (
                      <img
                        src={
                          certificateSettings.signature_image.startsWith("http")
                            ? certificateSettings.signature_image
                            : `${import.meta.env.VITE_API_URL.replace(
                                "/api",
                                ""
                              )}${certificateSettings.signature_image}`
                        }
                        alt="signature"
                        className="h-16 object-contain drop-shadow-lg"
                      />
                    ) : (
                      <div className="text-white/40 text-xs text-center">
                        No Signature
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="text-white/60">
                    © {new Date().getFullYear()} SPTA
                  </div>

                  <div className="flex items-center gap-2 text-white/60">
                    <Sparkles className="w-4 h-4" />
                    Secure Digital Card
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* HINT */}
      <p className="text-center text-muted-foreground">
        {t("اضغط على البطاقة لقلبها", "Click the card to flip")}
      </p>

      {/* ACTIONS */}
      {showControls && (
        <div className="flex-wrap justify-center gap-4 hidden">
          <Button
            onClick={downloadAsImage}
            variant="outline"
            className="rounded-2xl gap-2 h-12 px-6"
          >
            <FileImage className="w-4 h-4" />

            {t("تحميل كصورة", "Download Image")}
          </Button>

          <Button
            onClick={downloadAsPDF}
            className="rounded-2xl gap-2 h-12 px-6 shadow-xl"
          >
            <FileText className="w-4 h-4" />

            {t("تحميل PDF", "Download PDF")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DigitalMembershipCard;
