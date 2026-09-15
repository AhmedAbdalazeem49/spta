import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, MapPin, Sparkles } from "lucide-react";

export const HeroSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020817] text-white">
      {/* Elegant background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-black z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm font-medium tracking-wide text-blue-200 mb-8 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            {language === 'ar' ? 'الحدث الطبي الأبرز لهذا العام' : 'The Most Prominent Medical Event of the Year'}
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 drop-shadow-sm">
            {language === 'ar' ? 'المؤتمر السنوي 2026' : 'Annual Conference 2026'}
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-300/90 mb-14 max-w-3xl mx-auto font-light leading-relaxed">
            {language === 'ar' 
              ? 'تجمع استثنائي لنخبة من العقول والخبراء لرسم ملامح المستقبل الطبي.' 
              : 'An exceptional gathering of elite minds and experts to shape the medical future.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 shadow-xl transition-all"
            >
              <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-left rtl:text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{language === 'ar' ? 'التاريخ' : 'Date'}</p>
                <span className="text-xl font-semibold text-white">November 2026</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 shadow-xl transition-all"
            >
              <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-left rtl:text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{language === 'ar' ? 'الموقع' : 'Location'}</p>
                <span className="text-xl font-semibold text-white">{language === 'ar' ? 'جامعة الملك سعود' : 'King Saud University'}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
