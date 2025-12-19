import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Eye,
  Target,
  Flag,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  Globe,
  Award,
  BookOpen,
  Heart,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";

const VisionMissionPage = () => {
  const { t, isRTL } = useLanguage();

  const objectives = [
    {
      icon: BookOpen,
      title: t("التعليم المستمر", "Continuing Education"),
      description: t(
        "توفير برامج تعليم مستمر عالية الجودة للممارسين",
        "Provide high-quality continuing education programs for practitioners"
      ),
    },
    {
      icon: Target,
      title: t("تطوير المهنة", "Professional Development"),
      description: t(
        "رفع مستوى الممارسة المهنية وتطوير الكفاءات",
        "Elevate professional practice and develop competencies"
      ),
    },
    {
      icon: Users,
      title: t("بناء المجتمع", "Community Building"),
      description: t(
        "خلق مجتمع مهني متماسك ومتعاون",
        "Create a cohesive and collaborative professional community"
      ),
    },
    {
      icon: Globe,
      title: t("التمثيل الدولي", "International Representation"),
      description: t(
        "تمثيل المهنة في المحافل الدولية والإقليمية",
        "Represent the profession in international and regional forums"
      ),
    },
    {
      icon: Heart,
      title: t("خدمة المجتمع", "Community Service"),
      description: t(
        "المساهمة في تحسين صحة المجتمع من خلال التوعية",
        "Contribute to improving community health through awareness"
      ),
    },
    {
      icon: Lightbulb,
      title: t("الابتكار والبحث", "Innovation & Research"),
      description: t(
        "تشجيع البحث العلمي والابتكار في مجال العلاج الطبيعي",
        "Encourage scientific research and innovation in physical therapy"
      ),
    },
    {
      icon: Award,
      title: t("الجودة والتميز", "Quality & Excellence"),
      description: t(
        "السعي نحو التميز في جميع الخدمات والبرامج المقدمة",
        "Strive for excellence in all services and programs offered"
      ),
    },
    {
      icon: Flag,
      title: t("رؤية 2030", "Vision 2030"),
      description: t(
        "المساهمة في تحقيق أهداف رؤية المملكة 2030 الصحية",
        "Contribute to achieving Saudi Vision 2030 health objectives"
      ),
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          {/* Pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="absolute w-32 h-32 border border-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("الرؤية والرسالة والأهداف", "Vision, Mission & Objectives")}
            </h1>
            <p className="text-xl text-white/80">
              {t(
                "نسعى لتطوير مهنة العلاج الطبيعي وتحقيق التميز في خدمة المجتمع",
                "We strive to develop the PT profession and achieve excellence in serving the community"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background relative -mt-16 z-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 end-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{t("رؤيتنا", "Our Vision")}</h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  {t(
                    "أن تكون الجمعية السعودية للعلاج الطبيعي الكيان الرائد والمرجع الأول لمهنة العلاج الطبيعي في المملكة العربية السعودية والمنطقة العربية، محققةً أعلى معايير الجودة والتميز في خدمة المجتمع.",
                    "To be the leading entity and primary reference for the physical therapy profession in Saudi Arabia and the Arab region, achieving the highest standards of quality and excellence in serving the community."
                  )}
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-accent to-amber-600 text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 end-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{t("رسالتنا", "Our Mission")}</h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  {t(
                    "تمكين أخصائيي العلاج الطبيعي وتطوير كفاءاتهم من خلال التعليم المستمر والبحث العلمي، والمساهمة في رفع مستوى الخدمات الصحية في المملكة، وتعزيز الوعي المجتمعي بأهمية العلاج الطبيعي.",
                    "Empowering physical therapists and developing their competencies through continuing education and scientific research, contributing to raising the level of healthcare services in the Kingdom, and enhancing community awareness of the importance of physical therapy."
                  )}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <Flag className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("أهدافنا الاستراتيجية", "Our Strategic Objectives")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "نعمل على تحقيق مجموعة من الأهداف الاستراتيجية لخدمة المهنة والمجتمع",
                "We work to achieve a set of strategic objectives to serve the profession and community"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                whileHover={{ y: -10 }}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-xl transition-all group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <objective.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </motion.div>
                <h3 className="text-lg font-bold text-foreground mb-2">{objective.title}</h3>
                <p className="text-muted-foreground text-sm">{objective.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("قيمنا", "Our Values")}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: t("النزاهة", "Integrity"), desc: t("الالتزام بأعلى معايير الأخلاق المهنية", "Commitment to the highest professional ethical standards") },
                { title: t("التميز", "Excellence"), desc: t("السعي الدائم نحو الجودة والتميز", "Constant pursuit of quality and excellence") },
                { title: t("التعاون", "Collaboration"), desc: t("العمل الجماعي وروح الفريق", "Teamwork and team spirit") },
                { title: t("الابتكار", "Innovation"), desc: t("التطوير المستمر والتفكير الإبداعي", "Continuous development and creative thinking") },
                { title: t("الاحترام", "Respect"), desc: t("احترام الجميع والتنوع", "Respect for all and diversity") },
                { title: t("المسؤولية", "Responsibility"), desc: t("الالتزام بالمسؤولية تجاه المجتمع", "Commitment to social responsibility") },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="flex items-start gap-4 bg-secondary/30 rounded-xl p-6"
                >
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("كن جزءاً من رحلتنا", "Be Part of Our Journey")}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t(
              "انضم إلينا لتحقيق رؤيتنا في تطوير مهنة العلاج الطبيعي",
              "Join us to achieve our vision in developing the physical therapy profession"
            )}
          </p>
          <Link to="/membership/types">
            <Button size="lg" className="btn-hero gap-2">
              {t("انضم الآن", "Join Now")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default VisionMissionPage;
