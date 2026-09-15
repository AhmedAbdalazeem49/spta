import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Sparkles, User, Mail, Phone, Briefcase, Building } from "lucide-react";

export const RegistrationTab = () => {
  const { language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // For RTL layout support (Arabic)
  const isAr = language === 'ar';
  
  const inputClassesRTL = isAr 
    ? "w-full pr-14 pl-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white font-medium text-lg shadow-sm"
    : "w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white font-medium text-lg shadow-sm";
    
  const iconClassesRTL = isAr 
    ? "absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-blue-500 transition-colors"
    : "absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-blue-500 transition-colors";

  return (
    <div className="w-full h-full min-h-[70vh] flex flex-col pb-10">
      <div className="text-center mb-10">
        <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 mb-4">
          {isAr ? 'التسجيل في المؤتمر' : 'Conference Registration'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {isAr ? 'يرجى تعبئة بياناتك بدقة لضمان تسجيلك بنجاح في أكبر حدث طبي لهذا العام' : 'Please fill in your details accurately to ensure successful registration in the biggest medical event of the year'}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(10px)" }}
              onSubmit={handleSubmit}
              className="w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-8 md:p-14 lg:p-16 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 dark:shadow-black/60 border-4 border-white dark:border-gray-800/80 ring-1 ring-black/5 dark:ring-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-10">
                {/* First Name */}
                <div className="space-y-3 relative group">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mx-2 flex items-center gap-2">
                    {isAr ? 'الاسم الأول' : 'First Name'}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className={iconClassesRTL} />
                    <input required type="text" placeholder={isAr ? 'أحمد' : 'Ahmed'} className={inputClassesRTL} />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-3 relative group">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mx-2 flex items-center gap-2">
                    {isAr ? 'اسم العائلة' : 'Last Name'}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className={iconClassesRTL} />
                    <input required type="text" placeholder={isAr ? 'محمد' : 'Mohammed'} className={inputClassesRTL} />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-3 relative group">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mx-2 flex items-center gap-2">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className={iconClassesRTL} />
                    <input required type="email" placeholder="example@email.com" className={inputClassesRTL} />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-3 relative group">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mx-2 flex items-center gap-2">
                    {isAr ? 'رقم الهاتف' : 'Phone Number'}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className={iconClassesRTL} />
                    <input required type="tel" placeholder="+966 5X XXX XXXX" className={inputClassesRTL} />
                  </div>
                </div>

                {/* Profession */}
                <div className="space-y-3 relative group md:col-span-2 lg:col-span-1">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mx-2 flex items-center gap-2">
                    {isAr ? 'المهنة / التخصص' : 'Profession / Specialty'}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className={iconClassesRTL} />
                    <input required type="text" placeholder={isAr ? 'أخصائي علاج طبيعي' : 'Physical Therapist'} className={inputClassesRTL} />
                  </div>
                </div>

                {/* Organization */}
                <div className="space-y-3 relative group md:col-span-2 lg:col-span-1">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mx-2 flex items-center gap-2">
                    {isAr ? 'جهة العمل / الدراسة' : 'Organization / University'}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className={iconClassesRTL} />
                    <input required type="text" placeholder={isAr ? 'مستشفى ... / جامعة ...' : 'Hospital / University...'} className={inputClassesRTL} />
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800/60 rounded-3xl flex items-start gap-5 mb-10 transition-colors hover:border-blue-400 dark:hover:border-blue-600 shadow-sm">
                <div className="mt-1 flex-shrink-0">
                  <input 
                    type="checkbox" 
                    required 
                    id="disclaimer"
                    className="w-7 h-7 rounded-lg border-2 border-blue-300 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-blue-700 cursor-pointer shadow-sm transition-all hover:scale-110" 
                  />
                </div>
                <label htmlFor="disclaimer" className="text-blue-950 dark:text-blue-100 font-extrabold text-lg md:text-xl cursor-pointer leading-snug">
                  {isAr 
                    ? 'التزام ان البيانات المرفقه صحيحه وتحت مسؤليتي' 
                    : 'I commit that the attached data is correct and under my responsibility'}
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full md:w-auto min-w-[300px] mx-auto py-5 px-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-black text-xl md:text-2xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3 border border-white/20"
              >
                <span>{isAr ? 'تأكيد التسجيل' : 'Confirm Registration'}</span>
                <Check className="w-7 h-7" />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl p-16 md:p-24 lg:p-32 rounded-[3rem] shadow-2xl shadow-emerald-900/20 dark:shadow-black/50 border-4 border-white dark:border-gray-800/80 w-full flex flex-col items-center justify-center min-h-[500px]"
            >
              <div className="relative mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                  className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)] relative z-10 border-4 border-white dark:border-gray-800"
                >
                  <Check className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={3} />
                </motion.div>
                
                {/* Floating sparkles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0, 1, 0], 
                      scale: [0, 1.5, 0],
                      x: (Math.random() - 0.5) * 250,
                      y: (Math.random() - 0.5) * 250,
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400 z-0"
                  >
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
                  </motion.div>
                ))}
              </div>
              
              <h4 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                {isAr ? 'تم التسجيل بنجاح!' : 'Registration Successful!'}
              </h4>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
                {isAr 
                  ? 'شكراً لك. لقد استلمنا طلب تسجيلك في المؤتمر وسنوافيك بالتفاصيل قريباً عبر بريدك الإلكتروني المرفق.' 
                  : 'Thank you. We have received your conference registration request and will send details to your email soon.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
