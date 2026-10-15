import ConferenceLogo from "@/assets/ones.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ConferenceSubmissionBanner = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="relative overflow-hidden rounded-[32px] border border-[#6FC4BC]/30 bg-gradient-to-br from-[#11517E] via-[#0E446B] to-[#0A3352] shadow-2xl shadow-[#11517E]/20 text-white">
        {/* Decorative glowing gradient orbs */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 grid grid-cols-1  gap-8 md:gap-12 items-center p-6 sm:p-10 md:p-14">
          {/* Image / Visual Column */}
          <div className="flex justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-full rounded-2xl  p-6 sm:p-8 shadow-2xl border border-white/40 backdrop-blur-sm group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#11517E]/5 via-[#6FC4BC]/10 to-[#55AE47]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={ConferenceLogo}
                alt={t(
                  "المؤتمر السعودي الدولي السادس للعلاج الطبيعي",
                  "The 6th Saudi International Physiotherapy Conference",
                )}
                className="w-full h-auto max-h-64 sm:max-h-80 object-contain mx-auto relative z-10 drop-shadow-md"
              />
            </motion.div>
          </div>
          {/* Content Column */}
          <div className="space-y-6 text-center lg:text-start">
            {/* Call to Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/conference-2026"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#55AE47] to-[#6FC4BC] text-white font-black text-base sm:text-lg shadow-xl shadow-[#55AE47]/25 hover:shadow-2xl hover:shadow-[#6FC4BC]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <span>
                  {t("استكشف المؤتمر وسجّل الآن", "Explore Conference")}
                </span>
                <ArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:rtl:-translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceSubmissionBanner;
