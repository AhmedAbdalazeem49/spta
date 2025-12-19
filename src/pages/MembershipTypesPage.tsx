import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Award,
  UserPlus,
  CheckCircle,
  ChevronDown,
  Mail,
  ArrowRight,
  Star,
  Crown,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MembershipTypesPage = () => {
  const { t, isRTL } = useLanguage();
  const [expandedType, setExpandedType] = useState<string | null>("active");

  const membershipTypes = [
    {
      id: "active",
      icon: Users,
      badge: Shield,
      title: t("العضوية العاملة", "Active Membership"),
      subtitle: t("للممارسين المحترفين", "For Professional Practitioners"),
      color: "from-blue-500 to-indigo-600",
      features: [
        t("حق التصويت في الجمعية العمومية", "Voting rights in general assembly"),
        t("الترشح لمجلس الإدارة", "Eligibility for board positions"),
        t("خصومات حصرية على جميع الفعاليات", "Exclusive discounts on all events"),
        t("الوصول الكامل للمكتبة الإلكترونية", "Full access to digital library"),
        t("شهادة عضوية رسمية", "Official membership certificate"),
      ],
      requirements: [
        t("حاصل على شهادة بكالوريوس في العلاج الطبيعي أو ما يعادلها", "Bachelor's degree in Physical Therapy or equivalent"),
        t("مرخص لممارسة المهنة من الهيئة السعودية للتخصصات الصحية", "Licensed by Saudi Commission for Health Specialties"),
        t("يمارس المهنة بشكل فعلي في المملكة العربية السعودية", "Actively practicing in Saudi Arabia"),
      ],
      price: t("200 ريال سنوياً", "200 SAR/year"),
    },
    {
      id: "honorary",
      icon: Award,
      badge: Crown,
      title: t("العضوية الشرفية", "Honorary Membership"),
      subtitle: t("للشخصيات المميزة", "For Distinguished Individuals"),
      color: "from-amber-500 to-orange-600",
      features: [
        t("تكريم خاص في المناسبات", "Special recognition at events"),
        t("دعوات لجميع الفعاليات الرسمية", "Invitations to all official events"),
        t("شهادة تقدير خاصة", "Special appreciation certificate"),
        t("ذكر في المطبوعات الرسمية", "Mention in official publications"),
      ],
      requirements: [
        t("قدم خدمات جليلة للمهنة أو الجمعية", "Rendered distinguished services to the profession or association"),
        t("موافقة مجلس الإدارة", "Board approval required"),
        t("ترشيح من عضوين عاملين على الأقل", "Nomination by at least two active members"),
      ],
      price: t("مجاناً", "Free"),
    },
    {
      id: "associate",
      icon: UserPlus,
      badge: Star,
      title: t("عضوية الانتساب", "Associate Membership"),
      subtitle: t("للطلاب والمهتمين", "For Students & Enthusiasts"),
      color: "from-emerald-500 to-teal-600",
      features: [
        t("حضور الفعاليات بأسعار مخفضة", "Attend events at reduced prices"),
        t("الوصول للمكتبة الإلكترونية", "Access to digital library"),
        t("نشرة إخبارية دورية", "Regular newsletter"),
        t("شهادة انتساب", "Associate certificate"),
      ],
      requirements: [
        t("طالب في تخصص العلاج الطبيعي", "Physical Therapy student"),
        t("أو مهتم بمجال العلاج الطبيعي", "Or interested in Physical Therapy field"),
        t("أو ممارس خارج المملكة", "Or practitioner outside Saudi Arabia"),
      ],
      price: t("100 ريال سنوياً", "100 SAR/year"),
    },
  ];

  const generalConditions = [
    t("الالتزام بنظام الجمعية ولوائحها", "Commitment to the association's regulations"),
    t("سداد رسوم العضوية السنوية", "Payment of annual membership fees"),
    t("عدم الإساءة لسمعة المهنة أو الجمعية", "Not harming the profession's or association's reputation"),
    t("المشاركة الفعالة في أنشطة الجمعية", "Active participation in association activities"),
    t("تحديث البيانات بشكل دوري", "Regular data updates"),
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("أنواع العضوية", "Membership Types")}
            </h1>
            <p className="text-xl text-white/80">
              {t(
                "اختر نوع العضوية المناسب لك وانضم لمجتمع المتخصصين في العلاج الطبيعي",
                "Choose the right membership type and join the PT specialists community"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {membershipTypes.map((type, index) => (
              <motion.div
                key={type.id}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className={`relative bg-card rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                  expandedType === type.id
                    ? "border-primary shadow-2xl scale-[1.02]"
                    : "border-border/50 hover:border-primary/50"
                }`}
              >
                {/* Header */}
                <div className={`bg-gradient-to-br ${type.color} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-4 end-4">
                    <type.badge className="w-8 h-8 opacity-50" />
                  </div>
                  <type.icon className="w-16 h-16 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{type.title}</h3>
                  <p className="text-white/80">{type.subtitle}</p>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <span className="text-3xl font-bold">{type.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      {t("المميزات", "Features")}
                    </h4>
                    <ul className="space-y-3">
                      {type.features.map((feature, fIndex) => (
                        <motion.li
                          key={fIndex}
                          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: fIndex * 0.1 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Requirements */}
                  <div>
                    <button
                      onClick={() => setExpandedType(expandedType === type.id ? null : type.id)}
                      className="w-full flex items-center justify-between py-3 text-foreground font-medium border-t border-border"
                    >
                      <span>{t("شروط العضوية", "Requirements")}</span>
                      <motion.div
                        animate={{ rotate: expandedType === type.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedType === type.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2 py-4">
                            {type.requirements.map((req, rIndex) => (
                              <li
                                key={rIndex}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* CTA */}
                  <Link to="/contact">
                    <Button className={`w-full mt-6 bg-gradient-to-r ${type.color} text-white border-0 hover:opacity-90`}>
                      {t("تقدم للعضوية", "Apply Now")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* General Conditions */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("الشروط العامة للعضوية", "General Membership Conditions")}
              </h2>
              <p className="text-muted-foreground">
                {t(
                  "تنطبق هذه الشروط على جميع أنواع العضوية",
                  "These conditions apply to all membership types"
                )}
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border/50" data-aos="fade-up">
              <ul className="space-y-4">
                {generalConditions.map((condition, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 text-foreground"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </span>
                    {condition}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("هل أنت مستعد للانضمام؟", "Ready to Join?")}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t(
              "تواصل معنا للتسجيل أو لمزيد من المعلومات حول العضوية",
              "Contact us to register or for more membership information"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:spta@ksu.edu.sa">
              <Button size="lg" className="btn-hero gap-2">
                <Mail className="w-5 h-5" />
                spta@ksu.edu.sa
              </Button>
            </a>
            <Link to="/membership/count">
              <Button size="lg" variant="outline" className="btn-hero-outline gap-2">
                {t("عدد الأعضاء", "Members Count")}
                <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MembershipTypesPage;
