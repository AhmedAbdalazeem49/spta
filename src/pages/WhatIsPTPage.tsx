import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Heart,
  Activity,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Stethoscope,
  Brain,
  Bone,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const WhatIsPTPage = () => {
  const { t, isRTL } = useLanguage();

  const benefits = [
    {
      icon: Activity,
      title: t("تحسين الحركة", "Improve Movement"),
      description: t(
        "استعادة القدرة على الحركة والتنقل بشكل طبيعي",
        "Restore the ability to move and navigate normally"
      ),
    },
    {
      icon: Heart,
      title: t("تخفيف الألم", "Pain Relief"),
      description: t(
        "تقليل الألم المزمن والحاد بدون أدوية",
        "Reduce chronic and acute pain without medication"
      ),
    },
    {
      icon: Bone,
      title: t("تقوية العضلات", "Strengthen Muscles"),
      description: t(
        "بناء القوة العضلية وتحسين التوازن",
        "Build muscle strength and improve balance"
      ),
    },
    {
      icon: Brain,
      title: t("إعادة التأهيل", "Rehabilitation"),
      description: t(
        "التعافي من الإصابات والعمليات الجراحية",
        "Recovery from injuries and surgeries"
      ),
    },
  ];

  const sections = [
    {
      title: t("ما هو العلاج الطبيعي؟", "What is Physical Therapy?"),
      content: t(
        "العلاج الطبيعي هو تخصص صحي يهدف إلى تحسين وظائف الجسم الحركية والوقاية من الإعاقة وتخفيف الألم. يستخدم أخصائيو العلاج الطبيعي مجموعة من التقنيات والتمارين العلاجية لمساعدة المرضى على استعادة قدراتهم الحركية وتحسين جودة حياتهم.",
        "Physical therapy is a healthcare specialty aimed at improving body motor functions, preventing disability, and relieving pain. Physical therapists use various techniques and therapeutic exercises to help patients restore their motor abilities and improve their quality of life."
      ),
      image: hero1,
      reverse: false,
    },
    {
      title: t("دور أخصائي العلاج الطبيعي", "The Role of a Physical Therapist"),
      content: t(
        "يقوم أخصائي العلاج الطبيعي بتقييم حالة المريض وتصميم برنامج علاجي مخصص يتضمن تمارين علاجية، تقنيات يدوية، واستخدام أجهزة متخصصة. يعمل الأخصائي مع المرضى من جميع الأعمار بدءاً من الأطفال حديثي الولادة وحتى كبار السن.",
        "A physical therapist evaluates the patient's condition and designs a customized treatment program that includes therapeutic exercises, manual techniques, and specialized equipment. The specialist works with patients of all ages, from newborns to the elderly."
      ),
      image: hero2,
      reverse: true,
    },
    {
      title: t("أهمية العلاج الطبيعي", "The Importance of Physical Therapy"),
      content: t(
        "يلعب العلاج الطبيعي دوراً حيوياً في النظام الصحي، حيث يساعد في تقليل الحاجة للأدوية المسكنة والعمليات الجراحية. كما يساهم في تسريع عملية التعافي وتحسين جودة الحياة للمرضى الذين يعانون من إصابات أو أمراض مزمنة.",
        "Physical therapy plays a vital role in the healthcare system, helping reduce the need for painkillers and surgeries. It also contributes to speeding up recovery and improving quality of life for patients with injuries or chronic conditions."
      ),
      image: hero3,
      reverse: false,
    },
  ];

  const conditions = [
    t("آلام الظهر والرقبة", "Back and Neck Pain"),
    t("إصابات الرياضة", "Sports Injuries"),
    t("ما بعد العمليات الجراحية", "Post-Surgery Recovery"),
    t("السكتة الدماغية", "Stroke"),
    t("التهاب المفاصل", "Arthritis"),
    t("إصابات العمل", "Work Injuries"),
    t("تأخر النمو الحركي", "Motor Development Delay"),
    t("أمراض القلب والرئة", "Heart and Lung Diseases"),
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-accent/20 flex items-center justify-center"
            >
              <Stethoscope className="w-12 h-12 text-accent" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("ما هو العلاج الطبيعي؟", "What is Physical Therapy?")}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {t(
                "اكتشف كيف يمكن للعلاج الطبيعي أن يحسن حياتك ويساعدك على استعادة صحتك وحركتك",
                "Discover how physical therapy can improve your life and help you regain your health and mobility"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Cards */}
      <section className="py-16 bg-background relative -mt-16 z-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section
          key={index}
          className={`section-padding ${index % 2 === 0 ? "bg-background" : "bg-secondary/30"}`}
        >
          <div className="container-custom">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${section.reverse ? "lg:flex-row-reverse" : ""}`}>
              <motion.div
                data-aos={section.reverse ? "fade-left" : "fade-right"}
                className={section.reverse ? "lg:order-2" : ""}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {section.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
              <motion.div
                data-aos={section.reverse ? "fade-right" : "fade-left"}
                className={section.reverse ? "lg:order-1" : ""}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Conditions We Treat */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("الحالات التي نعالجها", "Conditions We Treat")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "يمكن للعلاج الطبيعي المساعدة في مجموعة واسعة من الحالات الصحية",
                "Physical therapy can help with a wide range of health conditions"
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {conditions.map((condition, index) => (
              <motion.div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 50}
                whileHover={{ scale: 1.05 }}
                className="bg-card rounded-xl p-4 border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground text-sm font-medium">{condition}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center" data-aos="fade-up">
          <Award className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("هل تحتاج إلى علاج طبيعي؟", "Do You Need Physical Therapy?")}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t(
              "استشر أخصائي علاج طبيعي مرخص للحصول على تقييم شامل وخطة علاجية مناسبة",
              "Consult a licensed physical therapist for a comprehensive evaluation and appropriate treatment plan"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/specializations">
              <Button size="lg" className="btn-hero gap-2">
                {t("تعرف على التخصصات", "Explore Specializations")}
                <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="btn-hero-outline gap-2">
                {t("تواصل معنا", "Contact Us")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhatIsPTPage;
