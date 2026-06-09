import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";

import {
  CheckCircle,
  Crown,
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
  showControls = true,
}: DigitalMembershipCardProps) => {
  const { t, isRTL } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedStyle, setSelectedStyle] = useState(cardStyles[0]);
  const [isFlipped, setIsFlipped] = useState(false);

  const Icon = membershipIcons[member.membershipType];
  const membershipLabel = membershipLabels[member.membershipType];

  const CardFace = ({ back = false }: { back?: boolean }) => (
    <div
      className={`
        absolute inset-0 rounded-2xl md:rounded-[28px] overflow-hidden
        bg-gradient-to-br ${selectedStyle.gradient} ${selectedStyle.textColor}
        shadow-[0_20px_60px_rgba(0,0,0,0.4)]
      `}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: back ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-12 -right-12 w-48 h-48 md:w-72 md:h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {!back ? (
        /* ── FRONT ── */
        <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-8 gap-3 md:gap-4">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <div className="shrink-0 w-9 h-9 md:w-12 md:h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                <Shield className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm md:text-base font-bold leading-tight truncate">
                  {t(
                    "الجمعية السعودية للعلاج الطبيعي",
                    "Saudi Physical Therapy Association",
                  )}
                </h2>
                <p className="text-white/60 text-[10px] md:text-xs mt-0.5">
                  {t(
                    "البطاقة الرقمية الرسمية",
                    "Official Digital Membership Card",
                  )}
                </p>
              </div>
            </div>
            {/* <Badge className="shrink-0 bg-emerald-500/20 border border-emerald-300/20 text-white px-2 py-1 rounded-full text-[9px] md:text-xs whitespace-nowrap">
              <CheckCircle className="w-3 h-3 me-1" />
              {t("موثقة", "Verified")}
            </Badge> */}
          </div>

          {/* Center — name + qr */}
          <div className="flex-1 flex items-center justify-between gap-3 md:gap-6 min-h-0">
            {/* Left: name & details */}
            <div className="flex flex-col  min-w-0 flex-1">
              <div>
                <h1 className="text-sm sm:text-xl md:text-3xl font-black leading-tight line-clamp-2">
                  {t(member.fullName, member.fullNameEn)}
                </h1>
              </div>
              <div>
                <p className="text-[9px] md:text-xs uppercase tracking-widest text-white/50 mb-0.5">
                  {t("جهة العمل", "Workplace")}
                </p>
                <p className="text-xs md:text-base text-white/85 line-clamp-2  mb-1">
                  {t(member.workplace, member.workplaceEn)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge className="text-white text-[9px] md:text-xs">
                  <Icon className="w-3 h-3 me-1" />
                  {t(membershipLabel.ar, membershipLabel.en)}
                </Badge>
                <Badge className=" text-white  text-[9px] md:text-xs">
                  #{member.membershipNumber}
                </Badge>
              </div>
            </div>

            {/* Right: QR */}
            <div className="shrink-0 flex flex-col items-center gap-1.5">
              <div className="bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl">
                <QRCode
                  value={`${window.location.origin}/verify-membership/${member.membershipNumber}`}
                  size={72}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  style={{ display: "block" }}
                  className="w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] md:w-[130px] md:h-[130px]"
                />
              </div>
              {/* <div className="flex items-center gap-1 text-white/60 text-[9px] md:text-xs">
                <ScanLine className="w-3 h-3" />
                {t("امسح للتحقق", "Scan to verify")}
              </div> */}
            </div>
          </div>

          {/* Footer */}
          <div>
            {/* <p className="text-[9px] md:text-xs uppercase tracking-widest text-white/50 mb-0.5">
              {t("تاريخ الانتهاء", "Expiry Date")}
            </p> */}
            <p className="text-sm md:text-xl font-bold">
              {new Date(member.expiryDate).toLocaleDateString(
                isRTL ? "ar-SA" : "en-US",
                { year: "numeric", month: "long", day: "numeric" },
              )}
            </p>
          </div>
        </div>
      ) : (
        /* ── BACK ── */
        <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-8 justify-between">
          <div>
            <h2 className="text-xl md:text-4xl font-black mb-2">
              {t("التحقق الرقمي", "Digital Verification")}
            </h2>
            <p className="text-white/70 text-xs md:text-base max-w-sm leading-relaxed">
              {t(
                "هذه البطاقة رقمية وموثقة ويمكن التحقق من صحتها عبر رمز QR.",
                "This card is digitally verified and can be validated through QR verification.",
              )}
            </p>
          </div>

          <div className="space-y-3 md:space-y-5">
            <div>
              <p className="text-[10px] md:text-sm text-white/50 uppercase tracking-widest mb-1">
                {t("رقم العضوية", "Membership Number")}
              </p>
              <h3 className="text-2xl md:text-4xl font-black tracking-widest">
                {member.membershipNumber}
              </h3>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-white/50 uppercase tracking-widest mb-1">
                {t("نوع العضوية", "Membership Type")}
              </p>
              <h3 className="text-lg md:text-2xl font-bold">
                {t(membershipLabel.ar, membershipLabel.en)}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="text-white/50 text-xs">
              © {new Date().getFullYear()} SPTA
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Sparkles className="w-3 h-3" />
              Secure Digital Card
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-5 md:space-y-8 w-full">
      {/* Style selector */}
      {showControls && (
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {cardStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style)}
              className={`group relative overflow-hidden rounded-xl md:rounded-2xl border px-3 py-2 md:px-5 md:py-3 transition-all duration-300 ${
                selectedStyle.id === style.id
                  ? "border-primary shadow-lg scale-105"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${style.gradient} opacity-10`}
              />
              <div className="relative flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${style.gradient}`}
                />
                <span className="font-medium text-xs md:text-sm">
                  {t(style.nameAr, style.name)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Card with true aspect-ratio container */}
      <div
        ref={cardRef}
        className="w-full max-w-[860px] mx-auto"
        style={{ perspective: "2000px" }}
      >
        {/* aspect-ratio box: 860/540 ≈ 1.593 */}
        <div
          className="relative w-full cursor-pointer"
          style={{ paddingBottom: "62.8%" }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-0"
          >
            <CardFace />
            <CardFace back />
          </motion.div>
        </div>
      </div>

      <p className="text-center text-xs md:text-sm text-muted-foreground">
        {t("اضغط على البطاقة لقلبها", "Click the card to flip")}
      </p>
    </div>
  );
};

export default DigitalMembershipCard;
