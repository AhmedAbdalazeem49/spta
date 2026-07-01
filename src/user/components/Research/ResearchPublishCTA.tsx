import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";

const ResearchPublishCTA = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-blue-500/5 border border-primary/15 text-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
        <TrendingUp className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">
        {t("هل لديك بحث تريد نشره؟", "Want to publish your own research?")}
      </h3>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
        {t(
          "يمكنك تقديم طلب نشر بحثك أو استبيانك عبر منصة الجمعية بعد الحصول على موافقة لجنة الأخلاقيات البحثية.",
          "You can submit a request to publish your study or questionnaire through the Association's platform after obtaining Research Ethics Committee approval.",
        )}
      </p>
      <a
        href="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
      >
        <ExternalLink className="w-4 h-4" />
        {t("تواصل معنا", "Contact Us")}
      </a>
    </motion.div>
  );
};

export default ResearchPublishCTA;
