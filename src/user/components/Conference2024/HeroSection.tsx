import OnesImage from "@/assets/ones.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Calendar, MapPin, Award } from "lucide-react";
import { BrandPattern } from "./BrandPattern";

export const HeroSection = () => {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020817] text-white">
      <BrandPattern position="top-left" variant="primary" />
      <BrandPattern position="bottom-right" variant="secondary" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#11517E]/40 via-slate-900 to-[#0a1e35] z-0" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6FC4BC]/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#55AE47]/15 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      {/* Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0 pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center justify-center py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-6xl mx-auto"
        >
          {/* Conference Title */}
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 drop-shadow-sm leading-[1.15]">
              {language === "ar"
                ? "المؤتمر السعودي الدولي السادس للعلاج الطبيعي"
                : "The 6th Saudi International Physiotherapy Conference"}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-amber-400 mb-8 max-w-3xl mx-auto font-bold leading-relaxed tracking-wide drop-shadow-md">
              {language === "ar"
                ? "الارتقاء بالعلاج الطبيعي في المملكة العربية السعودية: القيادة والابتكار والأثر القائم على القيمة"
                : "Advancing Physiotherapy in Saudi Arabia: Leadership, Innovation & Value-Based Impact"}
            </p>
          </div>

          {/* Date & Location */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-7">
            {/* Date */}
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 sm:px-5 py-3 rounded-xl border border-white/10 shadow-xl transition-all"
            >
              <div className="p-2 bg-[#11517E]/20 rounded-lg text-[#6FC4BC]">
                <Calendar className="w-5 h-5" />
              </div>

              <div className="text-left rtl:text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                  {language === "ar" ? "التاريخ" : "Date"}
                </p>

                <span className="text-base sm:text-lg font-semibold text-white">
                  {language === "ar" ? "12 - 14 نوفمبر" : "November 12 - 14"}
                </span>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 sm:px-5 py-3 rounded-xl border border-white/10 shadow-xl transition-all"
            >
              <div className="p-2 bg-[#6FC4BC]/20 rounded-lg text-indigo-400">
                <MapPin className="w-5 h-5" />
              </div>

              <div className="text-left rtl:text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                  {language === "ar" ? "الموقع" : "Location"}
                </p>

                <span className="text-sm sm:text-base font-medium">
                  {language === "ar"
                    ? "مستشفى الموسى للتأهيل - مدينة الأحساء"
                    : "Almoosa Rehabilitation Hospital - Al-Ahsa City"}
                </span>
              </div>
            </motion.div>
          </div>

          {/* CME — Wide & Compact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="w-full max-w-5xl mx-auto mb-8"
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-md overflow-hidden">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* CME Label */}
                <div className="flex items-center justify-center lg:justify-start gap-3 px-5 py-4 lg:py-3 lg:min-w-[240px] border-b lg:border-b-0 lg:border-r rtl:lg:border-r-0 rtl:lg:border-l border-white/10">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>

                  <div className="text-left rtl:text-right">
                    <p className="text-xs font-semibold text-white whitespace-nowrap">
                      Continuing Medical Education
                    </p>

                    <p className="text-[10px] text-slate-500 mt-0.5">
                      CME Accredited Hours
                    </p>
                  </div>
                </div>

                {/* CME Items */}
                <div className="flex-1 grid grid-cols-3 divide-x divide-white/10 rtl:divide-x-reverse">
                  {/* Conference */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-5 py-3">
                    <span className="text-2xl sm:text-3xl font-bold text-amber-400 leading-none">
                      13
                    </span>

                    <div className="text-left rtl:text-right">
                      <p className="text-[10px] sm:text-xs font-semibold text-white">
                        CME Hours
                      </p>

                      <p className="text-[9px] sm:text-[10px] text-slate-400">
                        Conference
                      </p>

                      <p className="text-[8px] sm:text-[9px] text-slate-500">
                        12 - 13 Nov
                      </p>
                    </div>
                  </div>

                  {/* Workshops */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-5 py-3">
                    <span className="text-2xl sm:text-3xl font-bold text-orange-400 leading-none">
                      40
                    </span>

                    <div className="text-left rtl:text-right">
                      <p className="text-[10px] sm:text-xs font-semibold text-white">
                        CME Hours
                      </p>

                      <p className="text-[9px] sm:text-[10px] text-slate-400">
                        Workshops
                      </p>

                      <p className="text-[8px] sm:text-[9px] text-slate-500">
                        14 Nov
                      </p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-5 py-3 bg-white/[0.025]">
                    <span className="text-2xl sm:text-3xl font-bold text-white leading-none">
                      53
                    </span>

                    <div className="text-left rtl:text-right">
                      <p className="text-[10px] sm:text-xs font-semibold text-white">
                        CME Hours
                      </p>

                      <p className="text-[9px] sm:text-[10px] text-amber-300/80">
                        Total
                      </p>

                      <p className="text-[8px] sm:text-[9px] text-slate-500">
                        12 - 14 Nov
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Conference Image */}
          <div className="flex justify-center">
            <img
              src={OnesImage}
              alt="Conference"
              className="w-full max-w-3xl h-auto object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
