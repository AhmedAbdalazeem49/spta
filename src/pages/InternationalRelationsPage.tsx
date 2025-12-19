import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Award,
  Building2,
  MapPin,
  Calendar,
  ArrowRight,
  ExternalLink,
  Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";

const InternationalRelationsPage = () => {
  const { t, isRTL } = useLanguage();

  const worldPhysiotherapy = {
    title: t("الاتحاد العالمي للعلاج الطبيعي", "World Physiotherapy"),
    description: t(
      "الجمعية السعودية للعلاج الطبيعي عضو فعال في الاتحاد العالمي للعلاج الطبيعي منذ عام 1995. يضم الاتحاد أكثر من 125 منظمة عضو يمثلون أكثر من 660,000 أخصائي علاج طبيعي حول العالم.",
      "The Saudi Physical Therapy Association has been an active member of World Physiotherapy since 1995. The federation includes over 125 member organizations representing more than 660,000 physical therapists worldwide."
    ),
    stats: [
      { number: "125+", label: t("منظمة عضو", "Member Organizations") },
      { number: "660K+", label: t("أخصائي علاج طبيعي", "Physical Therapists") },
      { number: "1951", label: t("سنة التأسيس", "Year Founded") },
    ],
  };

  const representatives = [
    {
      name: t("د. أحمد محمد العمري", "Dr. Ahmed Mohammed Al-Omari"),
      role: t("المندوب الرئيسي للاتحاد العالمي", "Chief Delegate to World Physiotherapy"),
      period: "2020 - Present",
    },
    {
      name: t("د. فاطمة عبدالله الشمري", "Dr. Fatima Abdullah Al-Shammari"),
      role: t("عضو اللجنة العلمية الدولية", "International Scientific Committee Member"),
      period: "2021 - Present",
    },
    {
      name: t("د. خالد سعود القحطاني", "Dr. Khaled Saud Al-Qahtani"),
      role: t("منسق البرامج الدولية", "International Programs Coordinator"),
      period: "2022 - Present",
    },
  ];

  const partnerships = [
    {
      name: t("جمعية العلاج الطبيعي الأمريكية", "American Physical Therapy Association"),
      type: t("شراكة تعليمية", "Educational Partnership"),
      since: "2018",
    },
    {
      name: t("الجمعية الأوروبية للعلاج الطبيعي", "European Physiotherapy Association"),
      type: t("تبادل خبرات", "Knowledge Exchange"),
      since: "2019",
    },
    {
      name: t("جمعية العلاج الطبيعي البريطانية", "Chartered Society of Physiotherapy UK"),
      type: t("برامج تدريبية", "Training Programs"),
      since: "2020",
    },
    {
      name: t("الاتحاد الآسيوي للعلاج الطبيعي", "Asian Confederation for Physical Therapy"),
      type: t("تعاون إقليمي", "Regional Cooperation"),
      since: "2017",
    },
  ];

  const timeline = [
    { year: "1995", event: t("الانضمام للاتحاد العالمي للعلاج الطبيعي", "Joined World Physiotherapy") },
    { year: "2010", event: t("استضافة المؤتمر الإقليمي الأول", "Hosted First Regional Conference") },
    { year: "2015", event: t("توقيع اتفاقية التعاون مع APTA", "Signed cooperation agreement with APTA") },
    { year: "2018", event: t("المشاركة في المؤتمر العالمي بجنيف", "Participated in World Congress in Geneva") },
    { year: "2022", event: t("إطلاق برنامج التبادل الدولي", "Launched International Exchange Program") },
    { year: "2024", event: t("استضافة المؤتمر العالمي للعلاج الطبيعي", "Hosting World PT Congress") },
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
            <Globe className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("العلاقات الدولية", "International Relations")}
            </h1>
            <p className="text-xl text-white/80">
              {t(
                "شراكاتنا العالمية وتمثيلنا في المحافل الدولية",
                "Our global partnerships and representation in international forums"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* World Physiotherapy Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <span className="text-accent font-semibold text-lg mb-4 block">
                {t("شراكتنا الرئيسية", "Our Main Partnership")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {worldPhysiotherapy.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {worldPhysiotherapy.description}
              </p>
              <a
                href="https://world.physio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">
                  {t("زيارة الموقع", "Visit Website")}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>

            <div data-aos="fade-left">
              <div className="grid grid-cols-3 gap-4">
                {worldPhysiotherapy.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="bg-card rounded-2xl p-6 text-center border border-border/50"
                  >
                    <span className="text-3xl font-bold text-primary block mb-2">
                      {stat.number}
                    </span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* World Map Placeholder */}
              <div className="mt-8 bg-secondary/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <Globe className="w-full h-full" />
                </div>
                <div className="relative z-10 text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-foreground font-medium">
                    {t("تمثيل في أكثر من 125 دولة حول العالم", "Represented in over 125 countries worldwide")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saudi Representatives */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("ممثلو المملكة الدوليون", "Saudi International Representatives")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "يمثل هؤلاء الأعضاء المملكة العربية السعودية في المحافل الدولية",
                "These members represent Saudi Arabia in international forums"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {representatives.map((rep, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -10 }}
                className="bg-card rounded-2xl p-8 text-center border border-border/50 hover:shadow-xl transition-all"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{rep.name}</h3>
                <p className="text-primary text-sm mb-2">{rep.role}</p>
                <span className="text-muted-foreground text-sm">{rep.period}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <Handshake className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("شراكاتنا الدولية", "Our International Partnerships")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {partnerships.map((partner, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all flex items-center gap-6"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{partner.name}</h3>
                  <p className="text-primary text-sm mb-1">{partner.type}</p>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {t("منذ", "Since")} {partner.since}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("مسيرتنا الدولية", "Our International Journey")}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-border" />

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="relative flex items-start gap-8 mb-8 last:mb-0"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg z-10 flex-shrink-0"
                  >
                    {item.year}
                  </motion.div>
                  <div className="bg-card rounded-xl p-6 border border-border/50 flex-1 hover:shadow-lg transition-shadow">
                    <p className="text-foreground font-medium">{item.event}</p>
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
            {t("انضم لمجتمعنا الدولي", "Join Our Global Community")}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t(
              "كن جزءاً من شبكة عالمية من المتخصصين في العلاج الطبيعي",
              "Be part of a global network of physical therapy specialists"
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

export default InternationalRelationsPage;
