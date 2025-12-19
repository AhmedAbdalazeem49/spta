import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Award,
  ArrowRight,
  ExternalLink,
  FileText,
  Globe,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import hero2 from "@/assets/hero-2.jpg";

const ScientificJournalPage = () => {
  const { t, isRTL } = useLanguage();

  const journalInfo = {
    name: t("المجلة السعودية للعلاج الطبيعي", "Saudi Journal of Physical Therapy"),
    issn: "1234-5678",
    frequency: t("ربع سنوية", "Quarterly"),
    language: t("عربي / إنجليزي", "Arabic / English"),
  };

  const features = [
    {
      icon: Globe,
      title: t("معترف بها دولياً", "Internationally Recognized"),
      description: t("مفهرسة في قواعد البيانات العالمية", "Indexed in global databases"),
    },
    {
      icon: Users,
      title: t("مراجعة الأقران", "Peer Reviewed"),
      description: t("عملية مراجعة صارمة من الخبراء", "Rigorous expert review process"),
    },
    {
      icon: BookOpen,
      title: t("الوصول المفتوح", "Open Access"),
      description: t("متاحة مجاناً للجميع", "Free access for everyone"),
    },
    {
      icon: Award,
      title: t("جودة عالية", "High Quality"),
      description: t("معايير نشر عالمية", "International publishing standards"),
    },
  ];

  const editorialBoard = {
    editor: {
      name: t("د. محمد عبدالله الفهد", "Dr. Mohammed Abdullah Al-Fahd"),
      role: t("رئيس التحرير", "Editor-in-Chief"),
    },
    deputies: [
      { name: t("د. سارة أحمد العتيبي", "Dr. Sara Ahmed Al-Otaibi"), role: t("نائب رئيس التحرير", "Deputy Editor") },
      { name: t("د. خالد سعود المالكي", "Dr. Khaled Saud Al-Malki"), role: t("مدير التحرير", "Managing Editor") },
    ],
  };

  const submissionTypes = [
    t("الأبحاث الأصلية", "Original Research"),
    t("المراجعات المنهجية", "Systematic Reviews"),
    t("دراسات الحالة", "Case Studies"),
    t("التقارير السريرية", "Clinical Reports"),
    t("الرسائل للمحرر", "Letters to Editor"),
  ];

  const latestIssues = [
    { volume: "15", issue: "4", date: t("أكتوبر 2024", "October 2024"), articles: 12 },
    { volume: "15", issue: "3", date: t("يوليو 2024", "July 2024"), articles: 10 },
    { volume: "15", issue: "2", date: t("أبريل 2024", "April 2024"), articles: 11 },
    { volume: "15", issue: "1", date: t("يناير 2024", "January 2024"), articles: 9 },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
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
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("المجلة العلمية", "Scientific Journal")}
            </h1>
            <p className="text-xl text-white/80 mb-8">
              {t(
                "منصة النشر العلمي للجمعية السعودية للعلاج الطبيعي",
                "The scientific publishing platform of the Saudi Physical Therapy Association"
              )}
            </p>
            <Button size="lg" className="btn-hero gap-2">
              {t("الذهاب إلى صفحة المجلة", "Go to Journal Page")}
              <ExternalLink className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Journal Info */}
      <section className="py-16 bg-background relative -mt-16 z-20">
        <div className="container-custom">
          <div className="bg-card rounded-3xl shadow-xl border border-border/50 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h2 className="text-3xl font-bold text-foreground mb-4">{journalInfo.name}</h2>
                <div className="space-y-3 mb-6">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">ISSN:</span> {journalInfo.issn}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{t("التكرار:", "Frequency:")}</span> {journalInfo.frequency}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{t("اللغة:", "Language:")}</span> {journalInfo.language}
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "المجلة السعودية للعلاج الطبيعي هي مجلة علمية محكمة تصدر عن الجمعية السعودية للعلاج الطبيعي. تهدف المجلة إلى نشر الأبحاث العلمية الأصيلة في مجال العلاج الطبيعي والتأهيل الطبي.",
                    "The Saudi Journal of Physical Therapy is a peer-reviewed scientific journal published by SPTA. The journal aims to publish original scientific research in physical therapy and medical rehabilitation."
                  )}
                </p>
              </div>
              <div data-aos="fade-left">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src={hero2} alt={journalInfo.name} className="w-full aspect-[4/3] object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -10 }}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-xl transition-all text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Board */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("هيئة التحرير", "Editorial Board")}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Editor in Chief */}
            <motion.div
              data-aos="fade-up"
              className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 mb-6 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">{editorialBoard.editor.name}</h3>
              <p className="text-white/80">{editorialBoard.editor.role}</p>
            </motion.div>

            {/* Deputies */}
            <div className="grid md:grid-cols-2 gap-6">
              {editorialBoard.deputies.map((deputy, index) => (
                <motion.div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-card rounded-2xl p-6 border border-border/50 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{deputy.name}</h3>
                  <p className="text-muted-foreground text-sm">{deputy.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Submission Types */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <FileText className="w-12 h-12 mb-4 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t("أنواع المخطوطات المقبولة", "Accepted Manuscript Types")}
              </h2>
              <div className="space-y-3">
                {submissionTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{type}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  {t("أحدث الأعداد", "Latest Issues")}
                </h3>
                <div className="space-y-4">
                  {latestIssues.map((issue, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: isRTL ? -5 : 5 }}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors"
                    >
                      <div>
                        <p className="font-bold text-foreground">
                          Vol. {issue.volume}, Issue {issue.issue}
                        </p>
                        <p className="text-muted-foreground text-sm">{issue.date}</p>
                      </div>
                      <span className="text-primary font-medium">
                        {issue.articles} {t("مقال", "articles")}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("هل لديك بحث جاهز للنشر؟", "Have Research Ready to Publish?")}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t(
              "أرسل بحثك للمجلة السعودية للعلاج الطبيعي وساهم في إثراء المعرفة العلمية",
              "Submit your research to the Saudi Journal of PT and contribute to scientific knowledge"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-hero gap-2">
              {t("إرسال بحث", "Submit Research")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
            <Link to="/research">
              <Button size="lg" variant="outline" className="btn-hero-outline gap-2">
                {t("إرشادات النشر", "Publishing Guidelines")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ScientificJournalPage;
