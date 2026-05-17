import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";

interface CertificateTemplatesProps {
  currentTemplate: string;
  onSelectTemplate: (template: string) => void;
}

export const CertificateTemplates = ({ currentTemplate, onSelectTemplate }: CertificateTemplatesProps) => {
  const { t } = useLanguage();

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {(["modern", "classic", "elegant"] as const).map((template, index) => (
        <motion.div
          key={template}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              currentTemplate === template ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectTemplate(template)}
          >
            <CardContent className="p-6">
              <div className="aspect-[1.4/1] bg-gradient-to-br from-midnight to-dark-navy rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      template === "modern"
                        ? `linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 50%, transparent 52%)`
                        : template === "classic"
                        ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)`
                        : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E")`,
                  }}
                />
                <Award className="w-16 h-16 text-green-accent/50" />
                {currentTemplate === template && (
                  <div className="absolute top-2 end-2">
                    <CheckCircle className="w-6 h-6 text-green-accent" />
                  </div>
                )}
              </div>
              <h3 className="font-bold text-center">
                {template === "modern" && t("عصري", "Modern")}
                {template === "classic" && t("كلاسيكي", "Classic")}
                {template === "elegant" && t("أنيق", "Elegant")}
              </h3>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
