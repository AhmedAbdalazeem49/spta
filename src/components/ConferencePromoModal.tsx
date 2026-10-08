import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import onesLogo from "@/assets/ones.png";

export default function ConferencePromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    // Do not show on the conference page or admin pages
    if (location.pathname.includes("/conference-2026") || location.pathname.includes("/admin")) {
      return;
    }

    // Check if it was already shown in this session
    const hasBeenShown = sessionStorage.getItem("conference_promo_shown");
    
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("conference_promo_shown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        dir="ltr"
      >
        <div 
          className="absolute inset-0 bg-[#11517E]/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-lg border border-[#6FC4BC]/30"
          dir={t("rtl", "ltr")}
        >
          {/* Header Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-[#11517E] to-[#6FC4BC]" />
          
          <button
            onClick={() => setIsOpen(false)}
            className={`absolute top-4 ${t("left-4", "right-4")} z-10 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative pt-12 px-8 pb-8 text-center flex flex-col items-center">
            {/* Logo */}
            <div className="bg-white p-5 rounded-2xl  mb-6 border border-slate-100 relative group">
              <div className="absolute inset-0  bg-[#55AE47] rounded-2xl opacity-100" />
              <img src={onesLogo} alt="SPTA Conference" className="h-16 object-contain relative z-10" />
            </div>


            <h3 className="text-2xl font-black text-[#11517E] mb-3 leading-snug">
              {t(
                "المؤتمر السعودي الدولي السادس للعلاج الطبيعي",
                "The 6th Saudi International Physiotherapy Conference"
              )}
            </h3>

            <p className="text-slate-600 mb-8 leading-relaxed">
              {t(
                "انضم إلينا في أكبر تجمع لخبراء العلاج الطبيعي. احجز مقعدك الآن واستفد من الخصم المبكر!",
                "Join us at the largest gathering of physiotherapy experts. Secure your seat now and benefit from the early bird discount!"
              )}
            </p>

            <Link
              to="/conference-2026"
              onClick={() => setIsOpen(false)}
              className="group relative flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#11517E] to-[#6FC4BC] text-white py-4 rounded-xl font-bold text-lg overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">{t("سجل الآن", "Register Now")}</span>
              <ArrowRight className={`w-5 h-5 relative z-10 group-hover:${t("-translate-x-1", "translate-x-1")} transition-transform ${t("rotate-180", "")}`} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
