import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { motion } from "framer-motion";
import { Loader2, Ticket, Calendar, CreditCard, CheckCircle, Clock, MapPin, Award, ExternalLink, Activity, Info, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ConferenceRegistrationProfileTab() {
  const { t } = useLanguage();
  const [registration, setRegistration] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReg = async () => {
      try {
        const res = await api.get("/conference/my-registration");
        setRegistration(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReg();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!registration) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-[2rem] p-10 border border-slate-100 dark:border-slate-800 shadow-2xl text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
        <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Ticket className="w-12 h-12" />
        </div>
        <h3 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">
          {t("لست مسجلاً بعد", "Not registered yet")}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto text-lg">
          {t("لم تقم بالتسجيل في مؤتمر 2026 بعد.", "You have not registered for the 2026 conference yet.")}
        </p>
        <Link to="/conference-2026" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-8 py-4 rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          {t("سجل الآن", "Register Now")} <ExternalLink className="w-5 h-5" />
        </Link>
      </motion.div>
    );
  }

  const WORKSHOP_MAP: Record<string, { title: string; speaker: string; time: 'morning' | 'evening'; slot: string }> = {
    m1: { title: 'Clinical Reasoning in Cervicothoracic Disorders', speaker: 'Dr. Terrence McGee', time: 'morning', slot: '08:00 – 12:00' },
    m2: { title: 'Speaking Up in Elite Sport', speaker: 'Dr. Sian Knott', time: 'morning', slot: '08:00 – 12:00' },
    m3: { title: 'From Rehabilitation to Performance: Integrating OPT', speaker: 'Ms. Tahani AlMahdi', time: 'morning', slot: '08:00 – 12:00' },
    m4: { title: 'Physiotherapy in Chronic Overlapping Pain Conditions', speaker: 'Dr. Ali Alatar', time: 'morning', slot: '08:00 – 12:00' },
    m5: { title: 'A Practical Approach to Acute Vertigo and BPPV', speaker: 'Dr. Doaa AlSharif', time: 'morning', slot: '08:00 – 12:00' },
    e1: { title: 'Aquatic Therapy Beyond the Pool', speaker: 'Mr. Mohamed Zedan', time: 'evening', slot: '13:00 – 17:00' },
    e2: { title: 'Using Musculoskeletal Ultrasound', speaker: 'Mr. Jaffar Alabdrabalrasol', time: 'evening', slot: '13:00 – 17:00' },
    e3: { title: 'From Physical Stimuli to Biological Adaptation', speaker: 'Dr. Philippe Germain', time: 'evening', slot: '13:00 – 17:00' },
    e4: { title: 'Better Teams, Better Care', speaker: 'Ms. Halah Aldhuaian', time: 'evening', slot: '13:00 – 17:00' },
    e5: { title: 'From Risk to Readiness', speaker: 'Dr. Mohammed Alshehri', time: 'evening', slot: '13:00 – 17:00' },
  };

  const workshops = registration.selected_workshops || [];
  const cmeHours = 13 + (workshops.length * 20);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden relative"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-white/30 backdrop-blur-md">
                2026 Edition
              </span>
              <span className="flex items-center gap-1 text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                <Calendar className="w-3.5 h-3.5" /> 12-14 Nov 2026
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight">6th Saudi International Physiotherapy Conference</h2>
            <div className="flex items-center gap-2 text-blue-100 mt-4">
              <MapPin className="w-4 h-4" />
              <span>Almoosa Rehabilitation Hospital, Al Ahsa</span>
            </div>
          </div>
          <div className="shrink-0 bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-md text-center">
            <div className="text-5xl font-black mb-1">{cmeHours}</div>
            <div className="text-sm font-medium text-blue-100 uppercase tracking-widest">Total CME Hours</div>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10 space-y-10">
        
        {/* Status Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${registration.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
              {registration.status === 'paid' ? <CheckCircle className="w-7 h-7" /> : <Clock className="w-7 h-7" />}
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{t("حالة الدفع", "Payment Status")}</p>
              <p className={`text-xl font-bold ${registration.status === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {registration.status === 'paid' ? t("تم الدفع بنجاح", "Paid Successfully") : t("قيد الانتظار", "Pending Payment")}
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <CreditCard className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{t("المبلغ الإجمالي", "Total Amount")}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {registration.amount} <span className="text-sm font-medium text-slate-500">SAR</span>
              </p>
            </div>
          </div>
        </div>

        {/* Workshops Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t("ورش العمل المسجلة", "Registered Workshops")}
            </h3>
          </div>

          {workshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {workshops.map((w: string, i: number) => {
                const info = WORKSHOP_MAP[w];
                const isMorning = info?.time === 'morning';
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={w}
                    className={`relative overflow-hidden rounded-2xl border-2 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group ${
                      isMorning
                        ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/40'
                        : 'bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800/40'
                    }`}
                  >
                    {/* Background glow */}
                    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity ${isMorning ? 'bg-amber-300' : 'bg-indigo-400'}`} />

                    {/* Top badges */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                        isMorning
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-800/30 dark:text-amber-300'
                          : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-800/30 dark:text-indigo-300'
                      }`}>
                        <Clock className="w-3 h-3" />
                        {info?.slot ?? w}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                        <Award className="w-3 h-3" /> +20 CME
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className={`font-extrabold text-base mb-2 leading-snug ${isMorning ? 'text-amber-900 dark:text-amber-200' : 'text-indigo-900 dark:text-indigo-200'}`}>
                      {info?.title ?? `Workshop ${w.toUpperCase()}`}
                    </h4>

                    {/* Speaker */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black text-white ${isMorning ? 'bg-amber-500' : 'bg-indigo-500'}`}>
                        {info?.speaker?.[0] ?? '?'}
                      </div>
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        {info?.speaker ?? 'Speaker'}
                      </span>
                    </div>

                    {/* Time label */}
                    <div className={`mt-4 pt-3 border-t text-xs font-bold uppercase tracking-wider ${isMorning ? 'border-amber-200/60 text-amber-600 dark:text-amber-400' : 'border-indigo-200/60 text-indigo-600 dark:text-indigo-400'}`}>
                      {isMorning ? '☀ Morning Session — Saturday, 14 Nov' : '🌙 Afternoon Session — Saturday, 14 Nov'}
                    </div>
                  </motion.div>
                );
              })}
            </div>
                      ) : (
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-900/40 rounded-3xl p-8 border border-blue-100 dark:border-blue-800/50 text-center flex flex-col items-center justify-center">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-sm mb-4 relative z-10">
                  <Sparkles className="w-8 h-8 text-blue-500" />
                </div>
                
                <h4 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white mb-2 relative z-10">
                  {t("عزز تجربتك في المؤتمر!", "Enhance Your Conference Experience!")}
                </h4>
                
                <p className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6 relative z-10">
                  {t(
                    "لم تقم بالتسجيل في أي ورش عمل بعد. أضف ورش عمل متخصصة الآن واحصل على المزيد من الساعات المعتمدة (CME).", 
                    "You haven't registered for any workshops yet. Add specialized workshops now to gain more CME hours and practical skills."
                  )}
                </p>

                <Link to="/conference-2026?tab=workshops" className="relative z-10 group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                  {t("استعرض ورش العمل", "Explore Workshops")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-center">
          <Link to="/conference-2026" className="group flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105">
            {t("زيارة صفحة المؤتمر", "Visit Full Conference Page")} 
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
