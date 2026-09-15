import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, User, X } from "lucide-react";

export const AgendaTab = () => {
  const { language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const schedule = [
    { id: 1, time: "08:00 AM", duration: "1h", titleAr: "التسجيل واستقبال الضيوف", titleEn: "Registration & Reception", speaker: "", role: "", descAr: "استقبال الضيوف وتسليم البطاقات وتناول القهوة الصباحية.", descEn: "Guest reception, badge distribution, and morning coffee." },
    { id: 2, time: "09:00 AM", duration: "1.5h", titleAr: "الكلمة الافتتاحية", titleEn: "Opening Keynote", speaker: "Dr. Ahmed", role: "Conference Chairman", descAr: "الترحيب بالحضور واستعراض أهداف المؤتمر وأهم المحاور.", descEn: "Welcoming attendees and presenting conference goals and main topics." },
    { id: 3, time: "10:30 AM", duration: "30m", titleAr: "استراحة قهوة", titleEn: "Coffee Break", speaker: "", role: "", descAr: "وقت للراحة والتواصل مع الزملاء.", descEn: "Time to rest and network with colleagues." },
    { id: 4, time: "11:00 AM", duration: "2h", titleAr: "مستقبل الطب الحديث", titleEn: "Future of Modern Medicine", speaker: "Prof. Sarah", role: "Head of Medical Research", descAr: "جلسة نقاشية حول التقنيات الحديثة وأثرها في تطور الرعاية الصحية.", descEn: "Panel discussion on modern technologies and their impact on healthcare evolution." },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-10">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          {language === 'ar' ? 'جدول فعاليات المؤتمر' : 'Conference Agenda'}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 font-semibold mt-3 text-lg">November 2026</p>
      </div>

      <div className="relative border-l-4 border-blue-500/30 ml-4 rtl:ml-0 rtl:mr-4 rtl:border-l-0 rtl:border-r-4 space-y-8 pl-8 rtl:pl-0 rtl:pr-8">
        {schedule.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute w-5 h-5 bg-blue-600 rounded-full -left-[2.35rem] rtl:-left-auto rtl:-right-[2.35rem] top-1 border-4 border-white dark:border-gray-900 shadow-sm z-10"></div>
            
            <motion.div 
              whileHover={{ scale: 1.02, x: language === 'ar' ? -5 : 5 }}
              onClick={() => setSelectedItem(item)}
              className="bg-white dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700/50 cursor-pointer group transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full w-fit">
                  <Clock className="w-5 h-5" />
                  <span>{item.time}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full">{item.duration}</span>
                </div>
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {language === 'ar' ? item.titleAr : item.titleEn}
              </h4>
              
              {item.speaker && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium">
                  <User className="w-4 h-4" />
                  <span>{item.speaker}</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none"></div>
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-bold mb-6 mt-2">
                <Clock className="w-6 h-6" />
                <span className="text-xl">{selectedItem.time}</span>
              </div>
              
              <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                {language === 'ar' ? selectedItem.titleAr : selectedItem.titleEn}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                {language === 'ar' ? selectedItem.descAr : selectedItem.descEn}
              </p>

              {selectedItem.speaker && (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-md">
                    <User className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{selectedItem.speaker}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedItem.role}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
