import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Maximize2, X } from "lucide-react";
import CertificateTemplate from "@/components/CertificateTemplate";

export const CertificatePreviewTab = () => {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock data matching the Cert interface
  const mockCert: any = {
    id: "MOCK-2026",
    serial_number: "SPTA-CONF-2026-001",
    recipient_name: name || (language === 'ar' ? 'الاسم هنا' : 'Your Name Here'),
    workshop_title: "Annual Conference 2026",
    workshop_title_ar: "المؤتمر السنوي 2026",
    issue_date: "2026-11-15T00:00:00Z",
    type: "attendance",
    payload: {
      type: "attendance",
      participant: {
        name: name || (language === 'ar' ? 'الاسم هنا' : 'Your Name Here'),
      },
      event: {
        title: "Annual Conference 2026",
        start_date: "2026-11-15T00:00:00Z",
        end_date: "2026-11-17T00:00:00Z",
      },
      venue: { location: "King Saud University" }
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-10 h-full pb-10">
      <div className="w-full xl:w-1/3 flex flex-col gap-6">
        <div>
          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            {language === 'ar' ? 'معاينة الشهادة' : 'Certificate Preview'}
          </h3>
          <p className="text-gray-500 font-medium">
            {language === 'ar' ? 'أدخل اسمك كما تريد أن يظهر في الشهادة' : 'Enter your name as you want it to appear on the certificate'}
          </p>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 rtl:mr-1">
            {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
          </label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={language === 'ar' ? 'أحمد محمد' : 'John Doe'}
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white font-medium" 
          />
        </div>

        <button 
          onClick={() => setIsFullscreen(true)}
          className="w-full mt-auto py-4 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-600 dark:hover:bg-blue-500 rounded-2xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg"
        >
          <Maximize2 className="w-5 h-5" />
          {language === 'ar' ? 'عرض في شاشة أكبر' : 'View in full screen'}
        </button>
      </div>

      <div className="w-full xl:w-2/3 bg-gray-50 dark:bg-gray-800/30 rounded-[2.5rem] p-4 md:p-8 flex items-center justify-center min-h-[500px] border border-gray-100 dark:border-gray-700 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full relative z-10 shadow-2xl rounded-2xl overflow-hidden pointer-events-none flex justify-center items-center"
        >
          <div className="transform origin-center scale-[0.4] sm:scale-[0.6] lg:scale-[0.8] xl:scale-[0.85]" style={{ width: '900px', flexShrink: 0 }}>
            <CertificateTemplate cert={mockCert} template="attendance" />
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsFullscreen(false)}
          >
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-white"
            >
              <div className="w-full h-full overflow-auto max-h-[85vh]">
                <div style={{ width: '100%', minWidth: '900px' }}>
                  <CertificateTemplate cert={mockCert} template="attendance" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
