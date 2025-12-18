import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Library,
  BookOpen,
  Users,
  GraduationCap,
  ExternalLink,
  Lock,
  Info,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Globe,
  Database,
} from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";

const ELibraryPage = () => {
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    AOS.refresh();
  }, []);

  const libraryStats = [
    { number: "2,000,000+", label: t("مرجع إلكتروني", "Electronic References") },
    { number: "500+", label: t("تخصص علمي", "Scientific Disciplines") },
    { number: "100,000+", label: t("كتاب إلكتروني", "E-Books") },
    { number: "50,000+", label: t("دورية علمية", "Scientific Journals") },
  ];

  const accessRequirements = [
    {
      title: t("طلاب الدراسات العليا", "Postgraduate Students"),
      description: t(
        "الوصول الكامل لجميع الموارد الإلكترونية",
        "Full access to all electronic resources"
      ),
      icon: GraduationCap,
      access: true,
    },
    {
      title: t("المتدربون", "Trainees"),
      description: t(
        "الوصول للمكتبة الرقمية السعودية",
        "Access to Saudi Digital Library"
      ),
      icon: Users,
      access: true,
    },
    {
      title: t("أعضاء هيئة التدريس", "Faculty Members"),
      description: t(
        "وصول مميز لجميع قواعد البيانات",
        "Premium access to all databases"
      ),
      icon: BookOpen,
      access: true,
    },
  ];

  const importantNotices = [
    t(
      "يجب تسجيل الدخول للوصول إلى المحتوى الكامل",
      "Login required to access full content"
    ),
    t(
      "بعض الموارد متاحة فقط من شبكة الجامعة",
      "Some resources available only from university network"
    ),
    t(
      "يرجى احترام حقوق الملكية الفكرية",
      "Please respect intellectual property rights"
    ),
    t(
      "للدعم الفني تواصل مع إدارة المكتبة",
      "For technical support contact library administration"
    ),
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-primary to-navy" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center"
            >
              <Library className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t("المكتبة الإلكترونية", "Electronic Library")}
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              {t(
                "بوابتك للوصول إلى أحدث المراجع والمصادر العلمية في مجال العلاج الطبيعي والعلوم الصحية",
                "Your gateway to access the latest references and scientific resources in physical therapy and health sciences"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 bg-background relative -mt-16 z-20">
        <div className="container-custom">
          <div className="bg-card rounded-3xl shadow-xl p-8 md:p-12 border border-border/50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {libraryStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className="text-3xl md:text-4xl font-bold text-primary block mb-2"
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

      {/* SCFHS Library Access */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-up">
              <span className="text-accent font-semibold text-lg mb-4 block">
                {t("مكتبة الهيئة السعودية للتخصصات الصحية", "SCFHS Library")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t(
                  "الوصول لمكتبة الهيئة السعودية للتخصصات الصحية",
                  "Access SCFHS Digital Library"
                )}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t(
                  "توفر مكتبة الهيئة السعودية للتخصصات الصحية وصولاً مجانياً لمجموعة واسعة من الموارد الإلكترونية للممارسين الصحيين والمتدربين.",
                  "SCFHS library provides free access to a wide range of electronic resources for healthcare practitioners and trainees."
                )}
              </p>
              
              <div className="bg-secondary/50 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-accent" />
                  <h3 className="font-semibold text-foreground">
                    {t("متطلبات الوصول", "Access Requirements")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    t("رقم التسجيل في الهيئة", "SCFHS Registration Number"),
                    t("البريد الإلكتروني المسجل", "Registered Email"),
                    t("كلمة مرور حساب الممارس", "Practitioner Account Password"),
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <a href="https://library.scfhs.org/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  {t("الدخول للمكتبة", "Access Library")}
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </a>
            </div>
            
            <div data-aos="fade-left" data-aos-delay="200">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-8 border border-border/50 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6">
                    <GraduationCap className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {t("للطلاب والمتدربين", "For Students & Trainees")}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {t(
                      "إذا كنت طالب دراسات عليا أو متدرب في برامج الهيئة، يمكنك الوصول للمكتبة باستخدام بيانات حساب الممارس الخاص بك.",
                      "If you are a postgraduate student or trainee in SCFHS programs, you can access the library using your practitioner account credentials."
                    )}
                  </p>
                  
                  <div className="flex items-center gap-3 text-accent font-semibold">
                    <Info className="w-5 h-5" />
                    {t("تحتاج حساب ممارس مفعّل", "Active practitioner account required")}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Saudi Digital Library */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("المكتبة الرقمية السعودية", "Saudi Digital Library")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t(
                "أكبر مكتبة رقمية أكاديمية في الشرق الأوسط",
                "The Largest Academic Digital Library in the Middle East"
              )}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t(
                "توفر المكتبة الرقمية السعودية وصولاً لملايين المراجع العلمية عبر مئات التخصصات الأكاديمية",
                "The Saudi Digital Library provides access to millions of scientific references across hundreds of academic disciplines"
              )}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Database, number: "310+", label: t("قاعدة بيانات", "Databases") },
              { icon: BookOpen, number: "800,000+", label: t("كتاب إلكتروني", "E-Books") },
              { icon: Globe, number: "180+", label: t("ناشر عالمي", "Global Publishers") },
              { icon: Users, number: "1,000,000+", label: t("مستخدم", "Users") },
            ].map((stat, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl p-6 text-center shadow-md"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl font-bold text-foreground block mb-1">{stat.number}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Access Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {accessRequirements.map((req, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-card rounded-2xl p-8 shadow-md border border-border/50 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <req.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{req.title}</h3>
                  <p className="text-muted-foreground mb-4">{req.description}</p>
                  
                  {req.access && (
                    <div className="flex items-center gap-2 text-accent font-medium">
                      <CheckCircle className="w-5 h-5" />
                      {t("متاح", "Available")}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12" data-aos="fade-up">
            <a href="https://sdl.edu.sa/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                {t("زيارة المكتبة الرقمية السعودية", "Visit Saudi Digital Library")}
                <ExternalLink className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Important Notices */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent/10 rounded-2xl p-8 border border-accent/20" data-aos="fade-up">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-accent" />
                <h3 className="text-2xl font-bold text-foreground">
                  {t("ملاحظات هامة", "Important Notices")}
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {importantNotices.map((notice, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-card rounded-lg"
                  >
                    <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground">{notice}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto" data-aos="zoom-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("هل تحتاج مساعدة في الوصول؟", "Need Help with Access?")}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              {t(
                "فريقنا متاح لمساعدتك في الوصول للمكتبة الإلكترونية والاستفادة من جميع الموارد المتاحة",
                "Our team is available to help you access the electronic library and utilize all available resources"
              )}
            </p>
            <Button variant="secondary" size="lg" className="gap-2">
              {t("تواصل معنا", "Contact Us")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ELibraryPage;
