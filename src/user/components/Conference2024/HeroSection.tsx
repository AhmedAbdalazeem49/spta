import OnesImage from "@/assets/ones.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, MapPin } from "lucide-react";

export const HeroSection = () => {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#11517E]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#11517E] via-[#0d4068] to-[#0a3252] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[#6FC4BC]/10 rounded-bl-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[45%] bg-[#55AE47]/8 rounded-tr-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#6FC4BC]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-[#55AE47]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center justify-center py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-6xl mx-auto"
        >
          {/* Conference Image */}
          <div className="flex justify-center">
            <img
              src={OnesImage}
              alt="Conference"
              className="w-full max-w-3xl h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Conference Title */}
          <div className="text-center max-w-5xl mx-auto mt-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight text-white drop-shadow-sm leading-[1.15]">
              {language === "ar"
                ? "المؤتمر السعودي الدولي السادس للعلاج الطبيعي"
                : "The 6th Saudi International Physiotherapy Conference"}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#55AE47] mb-8 max-w-3xl mx-auto font-bold leading-relaxed tracking-wide drop-shadow-sm">
              {language === "ar"
                ? "العلاج الطبيعي في المملكة العربية السعودية: القيادة والابتكار والتأثير القائم على القيمة"
                : "Advancing Physiotherapy in Saudi Arabia: Leadership, Innovation & Value-Based Impact"}
            </p>
          </div>

          {/* Date & Location */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-8">
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-3 rounded-xl shadow-lg transition-all"
            >
              <div className="p-2 bg-[#6FC4BC]/20 rounded-lg text-[#6FC4BC]">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left rtl:text-right">
                <p className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">
                  {language === "ar" ? "التاريخ" : "Date"}
                </p>
                <span className="text-base sm:text-lg font-semibold text-white">
                  {language === "ar" ? "12 - 14 نوفمبر" : "November 12 - 14"}
                </span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-3 rounded-xl shadow-lg transition-all"
            >
              <div className="p-2 bg-[#6FC4BC]/20 rounded-lg text-[#6FC4BC]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left rtl:text-right">
                <p className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">
                  {language === "ar" ? "المكان" : "Venue"}
                </p>
                <span className="text-base sm:text-lg font-semibold text-white">
                  {language === "ar"
                    ? "مستشفى الموسى للتأهيل، الأحساء"
                    : "Almoosa Rehabilitation Hospital, Al Ahsa"}
                </span>
              </div>
            </motion.div>
          </div>

          {/* CME Breakdown Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="bg-white/8 backdrop-blur-md border border-white/12 rounded-2xl overflow-hidden flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {/* Label */}
              <div className="flex items-center gap-3 px-6 py-4 sm:w-64 shrink-0">
                <div className="p-2 bg-[#55AE47]/20 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-[#55AE47]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">
                    Continuing Medical Education
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">CME Accredited Hours</p>
                </div>
              </div>

              {/* 13 */}
              <div className="flex items-center gap-3 px-6 py-4 flex-1">
                <span className="text-4xl font-black text-[#55AE47] leading-none">13</span>
                <div>
                  <p className="text-white font-bold text-sm">CME Hours</p>
                  <p className="text-white/60 text-xs">Conference</p>
                  <p className="text-white/40 text-xs">12 - 13 Nov</p>
                </div>
              </div>

              {/* 40 */}
              <div className="flex items-center gap-3 px-6 py-4 flex-1">
                <span className="text-4xl font-black text-[#55AE47] leading-none">40</span>
                <div>
                  <p className="text-white font-bold text-sm">CME Hours</p>
                  <p className="text-white/60 text-xs">Workshops</p>
                  <p className="text-white/40 text-xs">14 Nov</p>
                </div>
              </div>

              {/* 53 Total */}
              <div className="flex items-center gap-3 px-6 py-4 flex-1 bg-white/5">
                <span className="text-4xl font-black text-[#55AE47] leading-none">53</span>
                <div>
                  <p className="text-white font-bold text-sm">CME Hours</p>
                  <p className="text-[#55AE47] text-xs font-bold">Total</p>
                  <p className="text-white/40 text-xs">12 - 14 Nov</p>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
