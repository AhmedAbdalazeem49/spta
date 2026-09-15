import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, X } from "lucide-react";

export const WorkshopsTab = () => {
  const { language } = useLanguage();
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  
  const workshops = [
    {
      id: 1,
      title: language === 'ar' ? 'ورشة عمل الجراحة المتقدمة' : 'Advanced Surgery Workshop',
      objective: language === 'ar' ? 'تعلم أحدث التقنيات في الجراحة الدقيقة والمناظير وتطبيقها عملياً.' : 'Learn and apply the latest techniques in microsurgery and laparoscopy.',
      color: 'from-emerald-400 to-teal-600',
      bgClass: 'bg-emerald-50 dark:bg-emerald-900/10',
      time: "09:00 AM - 12:00 PM",
      instructor: "Dr. Salem"
    },
    {
      id: 2,
      title: language === 'ar' ? 'الذكاء الاصطناعي في الطب' : 'AI in Medicine',
      objective: language === 'ar' ? 'تطبيقات الذكاء الاصطناعي في التشخيص المبكر للأمراض وتحليل البيانات.' : 'AI applications in early disease diagnosis and data analysis.',
      color: 'from-blue-400 to-indigo-600',
      bgClass: 'bg-blue-50 dark:bg-blue-900/10',
      time: "01:00 PM - 04:00 PM",
      instructor: "Eng. Tariq"
    },
    {
      id: 3,
      title: language === 'ar' ? 'إدارة الأزمات الصحية' : 'Health Crisis Management',
      objective: language === 'ar' ? 'استراتيجيات التعامل مع الأوبئة والطوارئ الطبية وتنظيم الفرق.' : 'Strategies for handling pandemics, medical emergencies, and team organization.',
      color: 'from-orange-400 to-red-600',
      bgClass: 'bg-orange-50 dark:bg-orange-900/10',
      time: "09:00 AM - 02:00 PM",
      instructor: "Dr. Maha"
    }
  ];

  return (
    <div className="pb-10">
      <div className="text-center mb-14">
        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          {language === 'ar' ? 'ورش العمل المصاحبة' : 'Accompanying Workshops'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'ar' ? 'تطوير مهاراتك من خلال ورش عمل تفاعلية يقدمها نخبة من المختصين.' : 'Develop your skills through interactive workshops presented by elite specialists.'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workshops.map((workshop, index) => (
          <motion.div
            key={workshop.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/50 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 flex flex-col h-full"
          >
            <div className={`h-56 bg-gradient-to-br ${workshop.color} relative overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0"></div>
              <BookOpen className="w-20 h-20 text-white opacity-40 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                {workshop.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 line-clamp-3 flex-1">
                {workshop.objective}
              </p>
              <button 
                onClick={() => setSelectedWorkshop(workshop)}
                className="w-full py-4 px-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-2xl font-bold transition-all border border-gray-200 dark:border-gray-700 group-hover:border-blue-500/30 group-hover:text-blue-600 dark:group-hover:text-blue-400"
              >
                {language === 'ar' ? 'تفاصيل الورشة' : 'Workshop Details'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedWorkshop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedWorkshop(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row"
            >
              <div className={`md:w-1/3 bg-gradient-to-br ${selectedWorkshop.color} p-8 flex flex-col items-center justify-center text-white relative`}>
                <BookOpen className="w-24 h-24 opacity-80 mb-4" />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              
              <div className="p-8 md:p-10 flex-1 relative">
                <button 
                  onClick={() => setSelectedWorkshop(null)}
                  className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>

                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 pr-8 rtl:pr-0 rtl:pl-8">
                  {selectedWorkshop.title}
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{language === 'ar' ? 'أهداف الورشة' : 'Workshop Objectives'}</h5>
                    <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                      {selectedWorkshop.objective}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div>
                      <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{language === 'ar' ? 'الوقت' : 'Time'}</h5>
                      <p className="text-gray-900 dark:text-white font-semibold">{selectedWorkshop.time}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{language === 'ar' ? 'المقدم' : 'Instructor'}</h5>
                      <p className="text-gray-900 dark:text-white font-semibold">{selectedWorkshop.instructor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
