import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Award } from "lucide-react";

export const StrategicPartner = () => {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0f1c] relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            {language === 'ar' ? 'الشريك الاستراتيجي' : 'Strategic Partner'}
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl shadow-blue-900/5 dark:shadow-black/50 border border-gray-100 dark:border-gray-700/50 w-full max-w-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden"
          >
            {/* Hover flare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-white/40 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <motion.div 
              className="relative w-40 h-40 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-full flex items-center justify-center mb-8 shadow-inner border border-gray-200 dark:border-gray-600 group-hover:shadow-blue-500/20 group-hover:border-blue-300 dark:group-hover:border-blue-500/50 transition-all duration-500"
            >
              <Building2 className="w-16 h-16 text-blue-600/40 dark:text-blue-400/40 absolute" />
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-indigo-900 dark:from-blue-300 dark:to-indigo-100 relative z-10">
                LOGO
              </span>
              
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-full shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Premium Healthcare Co.
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center text-lg leading-relaxed">
              {language === 'ar' ? 'شريكنا الاستراتيجي الأبرز في دعم وتطوير هذا الحدث الطبي الضخم.' : 'Our most prominent strategic partner in supporting and developing this massive medical event.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
