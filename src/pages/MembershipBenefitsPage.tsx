import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Gift,
  Percent,
  BookOpen,
  Award,
  Users,
  Globe,
  Briefcase,
  GraduationCap,
  Heart,
  Building2,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const MembershipBenefitsPage = () => {
  const { t, isRTL } = useLanguage();

  const benefits = [
    {
      icon: Percent,
      title: t("خصومات حصرية", "Exclusive Discounts"),
      description: t(
        "احصل على خصومات تصل إلى 50% على المؤتمرات وورش العمل والدورات التدريبية",
        "Get up to 50% discount on conferences, workshops, and training courses"
      ),
      highlights: [
        t("خصم 50% على رسوم المؤتمرات", "50% off conference fees"),
        t("خصم 30% على الدورات التدريبية", "30% off training courses"),
        t("خصم 25% على المطبوعات", "25% off publications"),
      ],
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: BookOpen,
      title: t("المكتبة الإلكترونية", "Digital Library Access"),
      description: t(
        "وصول مجاني لقواعد البيانات العلمية والمراجع المتخصصة",
        "Free access to scientific databases and specialized references"
      ),
      highlights: [
        t("قواعد بيانات PubMed و Cochrane", "PubMed & Cochrane databases"),
        t("أكثر من 10,000 مرجع علمي", "Over 10,000 scientific references"),
        t("تحديثات دورية للمحتوى", "Regular content updates"),
      ],
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Award,
      title: t("الشهادات المهنية", "Professional Certificates"),
      description: t(
        "شهادات معتمدة وساعات تعليم مستمر معترف بها من هيئة التخصصات الصحية",
        "Accredited certificates and CME hours recognized by SCFHS"
      ),
      highlights: [
        t("شهادات حضور معتمدة", "Accredited attendance certificates"),
        t("ساعات تعليم طبي مستمر", "CME credit hours"),
        t("اعتراف مهني محلي ودولي", "Local and international recognition"),
      ],
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Users,
      title: t("شبكة مهنية", "Professional Network"),
      description: t(
        "انضم لمجتمع من المتخصصين وتواصل مع الخبراء في المجال",
        "Join a community of specialists and connect with field experts"
      ),
      highlights: [
        t("أكثر من 5000 عضو", "Over 5000 members"),
        t("فعاليات networking دورية", "Regular networking events"),
        t("مجموعات تخصصية", "Specialized groups"),
      ],
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Globe,
      title: t("التمثيل الدولي", "International Representation"),
      description: t(
        "تمثيل في المحافل الدولية والاتحاد العالمي للعلاج الطبيعي",
        "Representation in international forums and World Physiotherapy"
      ),
      highlights: [
        t("عضوية الاتحاد العالمي", "World Physiotherapy membership"),
        t("مؤتمرات دولية", "International conferences"),
        t("تبادل الخبرات العالمية", "Global knowledge exchange"),
      ],
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: GraduationCap,
      title: t("فرص التطوير المهني", "Career Development"),
      description: t(
        "فرص للتدريب والتطوير والمشاركة في البرامج البحثية",
        "Opportunities for training, development, and research programs"
      ),
      highlights: [
        t("منح دراسية", "Scholarships"),
        t("برامج تدريبية متقدمة", "Advanced training programs"),
        t("فرص بحثية", "Research opportunities"),
      ],
      color: "from-rose-500 to-red-600",
    },
  ];

  const partners = [
    { name: t("المستشفيات الحكومية", "Government Hospitals"), discount: "20%" },
    { name: t("مراكز العلاج الطبيعي", "PT Centers"), discount: "30%" },
    { name: t("المعاهد التدريبية", "Training Institutes"), discount: "25%" },
    { name: t("المكتبات العلمية", "Scientific Libraries"), discount: "15%" },
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-accent/20 flex items-center justify-center"
            >
              <Gift className="w-10 h-10 text-accent" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("مميزات العضوية", "Membership Benefits")}
            </h1>
            <p className="text-xl text-white/80 mb-8">
              {t(
                "استمتع بمزايا حصرية وخدمات متميزة كعضو في الجمعية السعودية للعلاج الطبيعي",
                "Enjoy exclusive benefits and premium services as an SPTA member"
              )}
            </p>
            <Link to="/membership/types">
              <Button size="lg" className="btn-hero gap-2">
                {t("انضم الآن", "Join Now")}
                <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("استفد من عضويتك", "Make the Most of Your Membership")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("مزايا العضوية الحصرية", "Exclusive Member Benefits")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -10 }}
                className="group bg-card rounded-2xl p-8 border border-border/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {benefit.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {benefit.highlights.map((highlight, hIndex) => (
                    <motion.li
                      key={hIndex}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: hIndex * 0.1 }}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("شركاؤنا", "Our Partners")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("خصومات الشركاء", "Partner Discounts")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "استفد من خصومات حصرية مع شركائنا الاستراتيجيين",
                "Enjoy exclusive discounts with our strategic partners"
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                whileHover={{ scale: 1.05 }}
                className="bg-card rounded-2xl p-6 text-center border border-border/50 hover:shadow-lg transition-all"
              >
                <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-foreground mb-2">{partner.name}</h3>
                <span className="text-2xl font-bold text-accent">{partner.discount}</span>
                <p className="text-sm text-muted-foreground">{t("خصم", "discount")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2" />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("للاستفادة من مميزات العضوية", "To Benefit from Membership")}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              {t(
                "تواصل معنا للتسجيل أو للحصول على مزيد من المعلومات",
                "Contact us to register or get more information"
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:spta@ksu.edu.sa">
                <Button size="lg" className="btn-hero gap-2 w-full sm:w-auto">
                  <Mail className="w-5 h-5" />
                  spta@ksu.edu.sa
                </Button>
              </a>
              <Link to="/membership/types">
                <Button size="lg" variant="outline" className="btn-hero-outline gap-2 w-full sm:w-auto">
                  {t("أنواع العضوية", "Membership Types")}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MembershipBenefitsPage;
