import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const SponsorsSlider = () => {
  const { language } = useLanguage();

  const sponsorTiers = [
    { 
      title: language === 'ar' ? 'الراعي الذهبي' : 'Gold Sponsors', 
      color: 'from-amber-100 to-yellow-50 dark:from-yellow-900/30 dark:to-amber-900/10', 
      borderColor: 'border-yellow-300/50 dark:border-yellow-700/50', 
      textColor: 'text-yellow-700 dark:text-yellow-500',
      shadow: 'shadow-yellow-500/10'
    },
    { 
      title: language === 'ar' ? 'الراعي الفضي' : 'Silver Sponsors', 
      color: 'from-gray-100 to-slate-50 dark:from-gray-800/50 dark:to-slate-900/30', 
      borderColor: 'border-gray-300/50 dark:border-gray-600/50', 
      textColor: 'text-gray-600 dark:text-gray-400',
      shadow: 'shadow-gray-500/10'
    },
    { 
      title: language === 'ar' ? 'الراعي البرونزي' : 'Bronze Sponsors', 
      color: 'from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-900/10', 
      borderColor: 'border-orange-300/50 dark:border-orange-700/50', 
      textColor: 'text-orange-700 dark:text-orange-500',
      shadow: 'shadow-orange-500/10'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="py-24 bg-white dark:bg-[#050a14] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            {language === 'ar' ? 'رعاة المؤتمر' : 'Conference Sponsors'}
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {sponsorTiers.map((tier, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className={`text-2xl font-bold mb-8 uppercase tracking-widest ${tier.textColor}`}>{tier.title}</h3>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full max-w-5xl">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`group w-48 h-36 bg-gradient-to-br ${tier.color} border ${tier.borderColor} rounded-3xl flex items-center justify-center shadow-lg ${tier.shadow} cursor-pointer relative overflow-hidden backdrop-blur-sm transition-all duration-300`}
                  >
                    <div className="absolute inset-0 bg-white/40 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="font-bold opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 relative z-10 text-xl text-gray-800 dark:text-gray-200">
                      LOGO {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
