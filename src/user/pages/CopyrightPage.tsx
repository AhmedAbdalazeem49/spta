import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Mail,
  Shield,
} from "lucide-react";

const CopyrightPage = () => {
  const { t, isRTL } = useLanguage();

  const notices = [
    {
      icon: Shield,
      title: t("حقوق الملكية", "Ownership Rights"),
      content: t(
        "جميع المحتويات المنشورة على هذا الموقع، بما في ذلك النصوص والصور والرسومات والشعارات والفيديوهات، هي ملك للجمعية السعودية للعلاج الطبيعي ومحمية بموجب قوانين حقوق النشر.",
        "All content published on this website, including text, images, graphics, logos, and videos, is owned by the Saudi Physical Therapy Association and protected under copyright laws."
      ),
    },
    {
      icon: FileText,
      title: t("الاستخدام المسموح", "Permitted Use"),
      content: t(
        "يُسمح باستخدام محتوى الموقع للأغراض الشخصية والتعليمية غير التجارية فقط، مع وجوب ذكر المصدر وعدم تعديل المحتوى. أي استخدام تجاري يتطلب إذناً كتابياً مسبقاً من الجمعية.",
        "Website content may be used for personal and non-commercial educational purposes only, with proper attribution and without modification. Any commercial use requires prior written permission from the association."
      ),
    },
    {
      icon: AlertTriangle,
      title: t("الاستخدام المحظور", "Prohibited Use"),
      content: t(
        "يُحظر نسخ أو توزيع أو نشر أو بيع أو تعديل أي جزء من محتوى هذا الموقع دون الحصول على إذن كتابي مسبق من الجمعية السعودية للعلاج الطبيعي. كما يُحظر استخدام الشعار أو العلامات التجارية بأي شكل.",
        "It is prohibited to copy, distribute, publish, sell, or modify any part of this website's content without prior written permission from SPTA. Use of logos or trademarks in any form is also prohibited."
      ),
    },
  ];

  const guidelines = [
    t("ذكر المصدر بشكل واضح عند الاقتباس", "Clear attribution when quoting"),
    t("عدم تعديل المحتوى الأصلي", "No modification of original content"),
    t("الاستخدام للأغراض التعليمية فقط", "Educational purposes only"),
    t("عدم الاستخدام التجاري بدون إذن", "No commercial use without permission"),
    t("الحفاظ على حقوق المؤلفين الأصليين", "Preserve original authors' rights"),
    t("الإشارة لرابط المصدر الأصلي", "Reference to original source link"),
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Shield className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("حقوق استخدام النشر", "Copyright Policy")}
            </h1>
            <p className="text-xl text-white/80">
              {t(
                "سياسة حماية حقوق الملكية الفكرية وقواعد استخدام المحتوى",
                "Intellectual property protection policy and content usage rules"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="py-8 bg-destructive/10 border-y border-destructive/20">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4 text-destructive">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium text-center">
              {t(
                "تحذير: أي انتهاك لحقوق النشر قد يعرضك للمساءلة القانونية",
                "Warning: Any copyright violation may result in legal action"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Notices */}
            <div className="space-y-8 mb-16">
              {notices.map((notice, index) => (
                <motion.div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-card rounded-2xl p-8 border border-border/50"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <notice.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        {notice.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {notice.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Guidelines */}
            <div data-aos="fade-up">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {t("إرشادات الاستخدام الصحيح", "Proper Usage Guidelines")}
              </h2>
              <div className="bg-secondary/30 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {guidelines.map((guideline, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{guideline}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <motion.div
              data-aos="fade-up"
              className="mt-12 bg-primary/5 rounded-2xl p-8 text-center border border-primary/20"
            >
              <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t("للحصول على إذن استخدام", "To Obtain Usage Permission")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t(
                  "للحصول على إذن لاستخدام أي محتوى من هذا الموقع، يرجى التواصل معنا عبر البريد الإلكتروني",
                  "To obtain permission to use any content from this website, please contact us via email"
                )}
              </p>
              <a
                href="mailto:spta@ksu.edu.sa"
                className="text-primary font-bold text-lg hover:underline"
              >
                spta@ksu.edu.sa
              </a>
            </motion.div>

            {/* Legal Notice */}
            <div
              className="mt-12 text-center text-sm text-muted-foreground"
              data-aos="fade-up"
            >
              <p>
                {t(
                  "© 2024 الجمعية السعودية للعلاج الطبيعي. جميع الحقوق محفوظة.",
                  "© 2024 Saudi Physical Therapy Association. All rights reserved."
                )}
              </p>
              <p className="mt-2">
                {t(
                  "تخضع هذه السياسة للقوانين المعمول بها في المملكة العربية السعودية",
                  "This policy is subject to the laws applicable in Saudi Arabia"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CopyrightPage;
