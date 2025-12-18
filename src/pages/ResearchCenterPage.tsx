import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Microscope,
  Target,
  Eye,
  Users,
  Award,
  FileText,
  ArrowRight,
  CheckCircle,
  Building2,
  Handshake,
  BookOpen,
  TrendingUp,
  Globe,
  GraduationCap,
} from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";

const ResearchCenterPage = () => {
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    AOS.refresh();
  }, []);

  const stats = [
    { number: "250+", label: t("بحث منشور", "Published Research"), icon: FileText },
    { number: "50+", label: t("باحث نشط", "Active Researchers"), icon: Users },
    { number: "30+", label: t("شراكة بحثية", "Research Partnerships"), icon: Handshake },
    { number: "15", label: t("جائزة بحثية", "Research Awards"), icon: Award },
  ];

  const researchAreas = [
    {
      icon: Microscope,
      title: t("البحث السريري", "Clinical Research"),
      description: t(
        "أبحاث تطبيقية لتحسين نتائج العلاج وتطوير البروتوكولات السريرية",
        "Applied research to improve treatment outcomes and develop clinical protocols"
      ),
    },
    {
      icon: BookOpen,
      title: t("البحث التعليمي", "Educational Research"),
      description: t(
        "تطوير مناهج وأساليب تعليم العلاج الطبيعي",
        "Developing curricula and teaching methods in physical therapy"
      ),
    },
    {
      icon: TrendingUp,
      title: t("بحوث النتائج", "Outcomes Research"),
      description: t(
        "قياس فعالية التدخلات العلاجية وجودة الرعاية",
        "Measuring effectiveness of therapeutic interventions and quality of care"
      ),
    },
    {
      icon: Globe,
      title: t("الصحة العامة", "Public Health"),
      description: t(
        "أبحاث الوقاية وتعزيز الصحة المجتمعية",
        "Prevention research and community health promotion"
      ),
    },
  ];

  const organizationalStructure = [
    {
      title: t("مدير المركز", "Center Director"),
      description: t("الإشراف العام على أنشطة المركز البحثية", "Overall supervision of center research activities"),
      icon: GraduationCap,
    },
    {
      title: t("لجنة المراجعة العلمية", "Scientific Review Committee"),
      description: t("مراجعة وتقييم المقترحات البحثية", "Review and evaluation of research proposals"),
      icon: Users,
    },
    {
      title: t("وحدة الدعم البحثي", "Research Support Unit"),
      description: t("تقديم الدعم الإحصائي والتقني للباحثين", "Providing statistical and technical support to researchers"),
      icon: Building2,
    },
    {
      title: t("وحدة الشراكات", "Partnerships Unit"),
      description: t("تنسيق التعاون مع المؤسسات البحثية", "Coordinating collaboration with research institutions"),
      icon: Handshake,
    },
  ];

  const collaborations = [
    t("جامعة الملك سعود", "King Saud University"),
    t("جامعة الملك عبدالعزيز", "King Abdulaziz University"),
    t("مستشفى الملك فيصل التخصصي", "King Faisal Specialist Hospital"),
    t("الهيئة السعودية للتخصصات الصحية", "Saudi Commission for Health Specialties"),
    t("وزارة الصحة", "Ministry of Health"),
    t("جمعيات العلاج الطبيعي الدولية", "International PT Associations"),
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-primary to-navy" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-glow/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground mb-6">
                <Microscope className="w-4 h-4" />
                {t("البحث العلمي", "Scientific Research")}
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                {t("مركز الأبحاث", "Research Center")}
              </h1>
              
              <p className="text-xl text-primary-foreground/80 mb-8">
                {t(
                  "نسعى لتطوير البحث العلمي في مجال العلاج الطبيعي ودعم الباحثين لتحقيق التميز البحثي في المملكة",
                  "We strive to develop scientific research in physical therapy and support researchers to achieve research excellence in the Kingdom"
                )}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" className="gap-2">
                  {t("تقديم بحث", "Submit Research")}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                </Button>
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  {t("اعرف المزيد", "Learn More")}
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border-2 border-dashed border-primary-foreground/20"
                  />
                  <Microscope className="w-32 h-32 text-primary-foreground" />
                </div>
                
                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-lg"
                >
                  <span className="text-2xl font-bold text-primary block">250+</span>
                  <span className="text-sm text-muted-foreground">{t("بحث منشور", "Published")}</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg"
                >
                  <span className="text-2xl font-bold text-primary block">50+</span>
                  <span className="text-sm text-muted-foreground">{t("باحث", "Researchers")}</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background relative -mt-8 z-20">
        <div className="container-custom">
          <div className="bg-card rounded-3xl shadow-xl p-8 border border-border/50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className="text-3xl md:text-4xl font-bold text-foreground block mb-2"
                  >
                    {stat.number}
                  </motion.span>
                  <span className="text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Vision */}
            <motion.div
              data-aos="fade-up"
              className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-3xl p-8 md:p-12 border border-border/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("رؤيتنا", "Our Vision")}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(
                  "أن نكون مركزاً بحثياً رائداً في مجال العلاج الطبيعي على المستوى الإقليمي والدولي، ونسهم في تحقيق رؤية المملكة 2030 من خلال تطوير البحث العلمي والابتكار في الرعاية الصحية.",
                  "To be a leading research center in physical therapy at the regional and international levels, contributing to Saudi Vision 2030 through developing scientific research and innovation in healthcare."
                )}
              </p>
            </motion.div>
            
            {/* Mission */}
            <motion.div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-gradient-to-br from-accent/10 via-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 border border-border/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("رسالتنا", "Our Mission")}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(
                  "تعزيز البحث العلمي في العلاج الطبيعي من خلال دعم الباحثين وتوفير الموارد اللازمة وبناء شراكات استراتيجية مع المؤسسات البحثية المحلية والدولية.",
                  "Promoting scientific research in physical therapy by supporting researchers, providing necessary resources, and building strategic partnerships with local and international research institutions."
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Research Matters */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("أهمية البحث", "Why Research Matters")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("البحث العلمي في السياق السعودي", "Scientific Research in the Saudi Context")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t(
                "يلعب البحث العلمي دوراً محورياً في تحقيق رؤية المملكة 2030 وتطوير قطاع الرعاية الصحية",
                "Scientific research plays a pivotal role in achieving Saudi Vision 2030 and developing the healthcare sector"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-card rounded-2xl p-8 shadow-md border border-border/50 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <area.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{area.title}</h3>
                <p className="text-muted-foreground">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("الهيكل التنظيمي", "Organizational Structure")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("فريق العمل", "Our Team")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {organizationalStructure.map((item, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl p-6 shadow-md border border-border/50 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("شركاؤنا في البحث", "Our Research Partners")}
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              {t(
                "نتعاون مع أبرز المؤسسات البحثية والأكاديمية في المملكة والعالم",
                "We collaborate with leading research and academic institutions in the Kingdom and worldwide"
              )}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {collaborations.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground font-medium"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-3xl p-8 md:p-16 text-center border border-border/50" data-aos="zoom-in">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-primary flex items-center justify-center"
            >
              <FileText className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("هل لديك بحث للتقديم؟", "Have Research to Submit?")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t(
                "نرحب بمشاركاتكم البحثية ونقدم الدعم الكامل للباحثين في جميع مراحل البحث",
                "We welcome your research contributions and provide full support to researchers at all stages"
              )}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                {t("تقديم بحث", "Submit Research")}
                <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="gap-2">
                  {t("تواصل معنا", "Contact Us")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResearchCenterPage;
