import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, Mail, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

const RESEARCH_CONTACT_EMAIL = "spta@spta.sa";

const ResearchPublishModal = () => {
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Open shortly after mount for a smoother entrance feel
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsOpen(false);

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      t("طلب نشر بحث / استبيان", "Research / Questionnaire Publishing Request"),
    );
    const body = encodeURIComponent(
      t(
        "السلام عليكم،\n\nأرغب في تقديم طلب لنشر بحث/استبيان عبر منصة الجمعية.\n\nالاسم:\nالتخصص:\nعنوان البحث:\n",
        "Hello,\n\nI would like to submit a request to publish a research study / questionnaire through the Association's platform.\n\nName:\nSpecialty:\nStudy Title:\n",
      ),
    );
    window.location.href = `mailto:${RESEARCH_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />

          {/* modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-full max-w-md bg-card border border-primary/15 rounded-3xl shadow-2xl overflow-hidden text-center"
          >
            {/* decorative glow */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-primary/15 via-primary/5 to-blue-500/10 pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            {/* close button */}
            <button
              onClick={handleClose}
              aria-label={t("إغلاق", "Close")}
              className={`absolute top-4 ${
                isRTL ? "left-4" : "right-4"
              } w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors z-10`}
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="relative pt-10 px-8 pb-8">
              {/* icon */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="w-16 h-16 rounded-2xl bg-primary/15 ring-1 ring-primary/20 flex items-center justify-center mx-auto mb-5"
              >
                <FlaskConical className="w-8 h-8 text-primary" />
              </motion.div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                <Sparkles className="w-3 h-3" />
                {t("فرصة بحثية", "Research Opportunity")}
              </div>

              <h2 className="text-2xl font-bold mb-3 leading-snug">
                {t("لديك بحث أو استبيان؟", "Have a study or questionnaire?")}
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed mb-7">
                {t(
                  "شارك بحثك التجريبي أو استبيانك مع مجتمع العلاج الطبيعي في المملكة. أرسل لنا تفاصيل بحثك وسنتواصل معك بعد مراجعة لجنة الأخلاقيات البحثية.",
                  "Share your empirical research or questionnaire with the physical therapy community in the Kingdom. Send us your study details and we'll follow up after Research Ethics Committee review.",
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSendEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  <Mail className="w-4 h-4" />
                  {t("راسلنا الآن", "Email Us Now")}
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold border hover:bg-muted/50 transition-all duration-300"
                >
                  {t("لاحقاً", "Maybe Later")}
                </button>
              </div>

              <p className="text-xs text-muted-foreground mt-5" dir="ltr">
                {RESEARCH_CONTACT_EMAIL}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResearchPublishModal;
