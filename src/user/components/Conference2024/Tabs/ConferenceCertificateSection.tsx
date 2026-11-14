import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ConferenceCertificateCard } from "@/components/ConferenceCertificateCard";
import { Award, ShieldCheck, Calendar, Building, Sparkles } from "lucide-react";

export const ConferenceCertificateSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full space-y-6">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#11517E]/10 text-[#11517E]">
              <Award className="w-3.5 h-3.5" />
              {t("الشهادات والاعتماد", "Certificates & Accreditation")}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              13 CME Hours
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t(
              "شهادة حضور المؤتمر الدولي السادس",
              "6th International Conference Attendance Certificate"
            )}
          </h2>

          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            {t(
              "يمكن لجميع المشاركين الذين أكدوا حضورهم في المؤتمر استلام شهادة الحضور المعتمدة بـ 13 ساعة تعليم طبي مستمر (CME) مباشرة بصيغة PDF قابلة للتحميل والطباعة.",
              "All verified attendees of the conference can receive their accredited 13 CME hours certificate directly in downloadable and printable PDF format."
            )}
          </p>
        </div>
      </div>

      {/* Main Integrated Certificate Card */}
      <ConferenceCertificateCard />
    </div>
  );
};
