import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  Award,
  CheckCircle2,
  Sparkles,
  Loader2,
  AlertCircle,
  FileText,
  User,
  ArrowRight,
  ArrowLeft,
  Download,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { toast } from "sonner";
import { CertificatePreviewModal } from "@/components/admin/certificates/CertificatePreviewModal";

interface WorkshopEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: {
    code: string;
    title: string;
    speaker: string;
    time?: string;
  };
  onSuccess: (certificate: any) => void;
}

export const WorkshopEvaluationModal: React.FC<WorkshopEvaluationModalProps> = ({
  isOpen,
  onClose,
  workshop,
  onSuccess,
}) => {
  const { t, isRTL } = useLanguage();

  const [formData, setFormData] = useState({
    // Section 1: Activity Content (rated 5 to 1)
    content_q1: 5,
    content_q2: 5,
    content_q3: 5,
    content_q4: 5,
    content_q4_explanation: "",
    content_q5: 5,
    content_q6: 5,

    // Section 2: Speaker (rated 5 to 1)
    speaker_q1: 5,
    speaker_q2: 5,
    speaker_q3: 5,
    speaker_q4: 5,
    speaker_q5: 5,
    speaker_q6: 5,
    speaker_q7: 5,

    // Optional comments
    comments: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issuedCert, setIssuedCert] = useState<any | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  if (!isOpen) return null;

  const contentQuestions = [
    {
      id: "content_q1",
      ar: "النشاط لبى احتياجاتي التعليمية",
      en: "The activity met my educational needs",
    },
    {
      id: "content_q2",
      ar: "مستوى النشاط كان مناسباً للجمهور المستهدف",
      en: "The activity level was appropriate to the target audience",
    },
    {
      id: "content_q3",
      ar: "استراتيجيات التعلم النشط (طرح الأسئلة، استخدام الحالات العملية / التمارين أثناء النشاط)",
      en: "The active learning strategies (asking questions, using practical cases/exercises during the activity)",
    },
    {
      id: "content_q4",
      ar: "تضمن النشاط إفصاحاً كاملاً، وكان عادلاً وخالياً من المواد الترويجية لأدوية محددة",
      en: "The activity has full disclosure, was fair and free of promotional material of specific medication",
      hasExplanationIfLow: true,
    },
    {
      id: "content_q5",
      ar: "كانت أسئلة / حالات تقييم التعلم مناسبة وفعالة",
      en: "The learning assessment questions / cases were appropriate and effective",
    },
    {
      id: "content_q6",
      ar: "كان المحتوى ذا صلة بممارستك المهنية والعملية",
      en: "The content was relevant to your practices",
    },
  ];

  const speakerQuestions = [
    {
      id: "speaker_q1",
      ar: "كان المتحدثون منظمين",
      en: "The speakers were organized",
    },
    {
      id: "speaker_q2",
      ar: "أظهر المتحدثون استيعاباً وتمكناً من الموضوع",
      en: "The speakers demonstrated comprehension of topic",
    },
    {
      id: "speaker_q3",
      ar: "غطى المتحدثون قدراً مناسباً من المعلومات",
      en: "The speakers covered appropriate amount of information",
    },
    {
      id: "speaker_q4",
      ar: "أجاب المتحدثون على الأسئلة بشكل مناسب",
      en: "The speakers answered the questions appropriately",
    },
    {
      id: "speaker_q5",
      ar: "أظهر المتحدثون تواصلاً بصرياً جيداً",
      en: "The speakers displayed good eye contact",
    },
    {
      id: "speaker_q6",
      ar: "كان حديث المتحدثين واضحاً وبمستوى صوت وسرعة مناسبين",
      en: "The speakers speech was clear and at appropriate volume and speed",
    },
    {
      id: "speaker_q7",
      ar: "لخّص المتحدثون / راجعوا النقاط الرئيسية",
      en: "The speakers summarized / reviewed key points",
    },
  ];

  const handleScoreChange = (field: string, score: number) => {
    setFormData((prev) => ({ ...prev, [field]: score }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        workshop_code: workshop.code,
        ...formData,
      };

      const res = await api.post("/conference/workshops/evaluate", payload);
      const data = res.data?.data;

      toast.success(
        t(
          "تم إرسال التقييم وإصدار شهادة الحضور بنجاح!",
          "Evaluation submitted and certificate issued successfully!"
        )
      );

      setIssuedCert(data?.certificate);
      onSuccess(data?.certificate);
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        t("حدث خطأ أثناء إرسال التقييم", "Failed to submit evaluation");
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRatingScale = (field: string, currentVal: number) => {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5].map((num) => {
          const isSelected = currentVal === num;
          return (
            <button
              type="button"
              key={num}
              onClick={() => handleScoreChange(field, num)}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? "bg-gradient-to-r from-[#11517E] to-[#6FC4BC] text-white shadow-md shadow-[#11517E]/30 scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={!isSubmitting ? onClose : undefined}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden z-10 border border-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#11517E] to-[#6FC4BC] p-6 sm:p-8 text-white relative shrink-0">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
                SCFHS Evaluation Model
              </span>
              <span className="px-3 py-1 rounded-full bg-[#55AE47] text-white text-xs font-bold">
                4 CME Hours
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black leading-tight mb-2">
              {workshop.title}
            </h3>
            <p className="text-white/80 text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-[#6FC4BC]" />
              <span>{workshop.speaker}</span>
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {issuedCert ? (
              /* Success & Certificate Screen */
              <div className="py-8 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-[#55AE47] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-800 mb-2">
                    {t("شكراً لتقييمك!", "Thank you for your feedback!")}
                  </h4>
                  <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base">
                    {t(
                      "تم تسجيل تقييمك للورشة بنجاح، وتم إصدار شهادة الحضور المعتمدة الخاصة بك فوراً.",
                      "Your evaluation has been successfully recorded, and your accredited certificate has been issued instantly."
                    )}
                  </p>
                </div>

                <div className="p-5 bg-gradient-to-br from-[#11517E]/5 to-[#6FC4BC]/5 rounded-2xl border border-[#11517E]/10 max-w-md mx-auto text-start">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t("رقم الشهادة", "Certificate Serial")}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-black rounded-md">
                      VERIFIED
                    </span>
                  </div>
                  <p className="font-mono font-bold text-[#11517E] text-base">
                    {issuedCert.serial_number}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPreviewModal(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] text-white font-bold rounded-xl shadow-lg shadow-[#11517E]/20 hover:scale-105 transition-all"
                  >
                    <Award className="w-5 h-5" />
                    <span>{t("عرض وتحميل الشهادة", "View & Download Certificate")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    {t("إغلاق", "Close")}
                  </button>
                </div>
              </div>
            ) : (
              /* Evaluation Form */
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Scale Guide */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {t("مقياس التقييم المعتمد:", "Evaluation Scale:")}
                  </span>
                  <div className="flex items-center gap-4">
                    <span>
                      <strong className="text-[#11517E]">5</strong> = {t("ممتاز / أوافق بشدة", "Strongly Agree")}
                    </span>
                    <span>
                      <strong className="text-slate-400">1</strong> = {t("ضعيف / أعارض بشدة", "Strongly Disagree")}
                    </span>
                  </div>
                </div>

                {/* Section 1: Activity Content */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-1.5 h-5 bg-[#55AE47] rounded-full" />
                    <h4 className="font-black text-slate-900 text-base sm:text-lg">
                      {t("القسم الأول: محتوى النشاط", "Section 1: Activity Content")}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {contentQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#6FC4BC]/40 transition-colors space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-slate-800 leading-snug">
                            <span className="font-bold text-[#11517E] me-1.5">{idx + 1}.</span>
                            {t(q.ar, q.en)}
                          </span>
                          <div className="shrink-0">
                            {renderRatingScale(
                              q.id,
                              (formData as any)[q.id]
                            )}
                          </div>
                        </div>

                        {q.hasExplanationIfLow && (formData as any)[q.id] <= 2 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="pt-2"
                          >
                            <label className="block text-xs font-bold text-slate-600 mb-1">
                              {t(
                                "يرجى توضيح السبب (إذا كان التقييم غير موافق أو غير موافق بشدة):",
                                "Please explain if you disagree or strongly disagree:"
                              )}
                            </label>
                            <input
                              type="text"
                              value={formData.content_q4_explanation}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  content_q4_explanation: e.target.value,
                                }))
                              }
                              placeholder={t("اكتب توضيحك هنا...", "Enter explanation...")}
                              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#11517E]"
                            />
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2: Speaker */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-1.5 h-5 bg-[#6FC4BC] rounded-full" />
                    <h4 className="font-black text-slate-900 text-base sm:text-lg">
                      {t("القسم الثاني: المتحدث / المدرب", "Section 2: Speaker")}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {speakerQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#6FC4BC]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <span className="text-sm font-semibold text-slate-800 leading-snug">
                          <span className="font-bold text-[#11517E] me-1.5">{idx + 1}.</span>
                          {t(q.ar, q.en)}
                        </span>
                        <div className="shrink-0">
                          {renderRatingScale(
                            q.id,
                            (formData as any)[q.id]
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final comments */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    {t(
                      "هل لديك أي تعليقات أو اقتراحات إضافية للتطوير المستقبلي؟ (اختياري)",
                      "Do you have any additional comments, suggestions, or feedback you would like to share for future development?"
                    )}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.comments}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, comments: e.target.value }))
                    }
                    placeholder={t("ملاحظاتك تهمنا...", "Your feedback is valuable to us...")}
                    className="w-full p-3.5 text-sm rounded-2xl border border-slate-200 focus:outline-none focus:border-[#11517E] transition"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#11517E] via-[#0E446B] to-[#6FC4BC] hover:from-[#0E446B] hover:to-[#55AE47] text-white font-black text-lg shadow-xl shadow-[#11517E]/25 hover:shadow-[#6FC4BC]/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>{t("جارٍ حفظ التقييم وإصدار الشهادة...", "Submitting & Generating Certificate...")}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-[#55AE47]" />
                        <span>{t("إرسال التقييم واستلام الشهادة فوراً", "Submit Evaluation & Get Certificate")}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Certificate Preview Modal */}
      {issuedCert && (
        <CertificatePreviewModal
          isOpen={showPreviewModal}
          onOpenChange={setShowPreviewModal}
          certificate={issuedCert}
        />
      )}
    </AnimatePresence>
  );
};
