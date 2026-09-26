import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Maximize2, X, Star, CheckCircle } from "lucide-react";
import CertificateTemplate from "@/components/CertificateTemplate";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { toast } from "sonner";

export const CertificatePreviewTab = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Evaluation State
  const [scores, setScores] = useState({
    organization_score: 0,
    content_score: 0,
    speakers_score: 0,
    venue_score: 0,
    recommendation_score: 0,
  });
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.first_name + " " + user.last_name);
      api.get("/conference/check-evaluation").then(res => {
        setHasEvaluated(res.data.has_evaluated);
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleStarClick = (field: string, value: number) => {
    setScores(prev => ({ ...prev, [field]: value }));
  };

  const submitEvaluation = async () => {
    if (!user) {
      toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Must login first');
      return;
    }
    const allScored = Object.values(scores).every(s => s > 0);
    if (!allScored) {
      toast.error(language === 'ar' ? 'يرجى تقييم جميع العناصر' : 'Please rate all items');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/conference/evaluate", {
        ...scores,
        feedback
      });
      setShowSuccessModal(true);
      setHasEvaluated(true);
    } catch (error) {
      toast.error(language === 'ar' ? 'حدث خطأ أثناء إرسال التقييم' : 'Error submitting evaluation');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const ratingFields = [
    { key: "organization_score", labelAr: "تنظيم المؤتمر", labelEn: "Conference Organization" },
    { key: "content_score", labelAr: "المحتوى العلمي", labelEn: "Scientific Content" },
    { key: "speakers_score", labelAr: "أداء المتحدثين", labelEn: "Speakers Performance" },
    { key: "venue_score", labelAr: "مكان ومرافق المؤتمر", labelEn: "Venue & Facilities" },
    { key: "recommendation_score", labelAr: "مدى التوصية بالحضور مستقبلاً", labelEn: "Likelihood to Recommend" },
  ];

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!hasEvaluated) {
    return (
      <div className="max-w-2xl mx-auto pb-10">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            {language === 'ar' ? 'تقييم المؤتمر' : 'Conference Evaluation'}
          </h3>
          <p className="text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg inline-block border border-blue-200 dark:border-blue-800">
            {language === 'ar' 
              ? 'التقييم مطلوب للحصول على شهادة حضور المؤتمر' 
              : 'Evaluation is required to obtain your attendance certificate'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 space-y-8">
          {ratingFields.map((field) => (
            <div key={field.key} className="space-y-3">
              <label className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {language === 'ar' ? field.labelAr : field.labelEn}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(field.key, star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-8 h-8 ${(scores as any)[field.key] >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="space-y-3">
            <label className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {language === 'ar' ? 'ملاحظات إضافية (اختياري)' : 'Additional Feedback (Optional)'}
            </label>
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:border-blue-500 outline-none min-h-[120px]"
              placeholder={language === 'ar' ? 'اكتب أي ملاحظات أو اقتراحات هنا...' : 'Write any feedback or suggestions...'}
            />
          </div>

          <button
            onClick={submitEvaluation}
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 text-lg"
          >
            {isSubmitting ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : (language === 'ar' ? 'إرسال التقييم' : 'Submit Evaluation')}
          </button>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5 text-green-500">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">
                  {language === 'ar' ? 'شكراً لتقييمك!' : 'Thank you!'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {language === 'ar' ? 'تم تسجيل تقييمك بنجاح، يمكنك الآن تحميل شهادة الحضور الخاصة بك.' : 'Evaluation recorded. You can now download your certificate.'}
                </p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  {language === 'ar' ? 'عرض الشهادة' : 'View Certificate'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Once Evaluated, show Certificate Preview
  return (
    <div className="flex flex-col xl:flex-row gap-10 h-full pb-10">
      <div className="w-full xl:w-1/3 flex flex-col gap-6">
        <div>
          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            {language === 'ar' ? 'معاينة الشهادة' : 'Certificate Preview'}
          </h3>
          <p className="text-gray-500 font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            {language === 'ar' ? 'تم التقييم بنجاح. أدخل اسمك كما تريد أن يظهر في الشهادة' : 'Evaluated successfully. Enter your name for the certificate'}
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

      <div className="w-full xl:w-2/3 bg-gray-50 dark:bg-gray-800/30 rounded-[2.5rem] p-4 md:p-8 flex items-center justify-center min-h-[500px] border border-gray-100 dark:border-gray-700 overflow-x-auto relative">
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
