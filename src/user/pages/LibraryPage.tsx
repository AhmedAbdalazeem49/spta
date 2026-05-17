import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Database,
  Download,
  ExternalLink,
  FileText,
  Library,
  Lock,
  Search,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import hero2 from "@/assets/hero-2.jpg";

const LibraryPage = () => {
  const { t, isRTL } = useLanguage();

  const databases = [
    {
      name: "PubMed",
      description: t(
        "أكبر قاعدة بيانات للأبحاث الطبية والصحية",
        "Largest database for medical and health research"
      ),
      access: "free",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
    },
    {
      name: "Cochrane Library",
      description: t(
        "مراجعات منهجية عالية الجودة",
        "High-quality systematic reviews"
      ),
      access: "members",
      url: "#",
    },
    {
      name: "PEDro",
      description: t(
        "قاعدة بيانات متخصصة في العلاج الطبيعي",
        "Specialized physical therapy database"
      ),
      access: "free",
      url: "https://pedro.org.au/",
    },
    {
      name: "RehabMeasures",
      description: t(
        "أدوات قياس إعادة التأهيل",
        "Rehabilitation measurement tools"
      ),
      access: "free",
      url: "https://www.sralab.org/rehabilitation-measures",
    },
    {
      name: "TRIP Database",
      description: t(
        "محرك بحث للأدلة السريرية",
        "Clinical evidence search engine"
      ),
      access: "free",
      url: "https://www.tripdatabase.com/",
    },
    {
      name: "CINAHL",
      description: t(
        "قاعدة بيانات التمريض والصحة المتحالفة",
        "Nursing and allied health database"
      ),
      access: "members",
      url: "#",
    },
  ];

  const resources = [
    {
      title: t("كتب إلكترونية", "E-Books"),
      count: "500+",
      icon: BookOpen,
    },
    {
      title: t("مجلات علمية", "Scientific Journals"),
      count: "100+",
      icon: FileText,
    },
    {
      title: t("أبحاث ودراسات", "Research Papers"),
      count: "2000+",
      icon: Database,
    },
    {
      title: t("ملفات قابلة للتحميل", "Downloadable Files"),
      count: "350+",
      icon: Download,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-primary">
        <div className="absolute inset-0">
          <img
            src={hero2}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        </div>
        <div className="container-custom relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`max-w-3xl ${isRTL ? "text-right" : "text-left"}`}
          >
            <span className="text-primary-foreground/80 font-medium text-lg mb-4 block">
              {t("المكتبة الإلكترونية", "E-Library")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t(
                "مكتبتك الرقمية الشاملة",
                "Your Comprehensive Digital Library"
              )}
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              {t(
                "وصول مجاني للأعضاء إلى آلاف المراجع والأبحاث العلمية في مجال العلاج الطبيعي",
                "Free access for members to thousands of references and scientific research in physical therapy"
              )}
            </p>

            {/* Search Bar */}
            <div className="flex gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    isRTL ? "right-4" : "left-4"
                  } w-5 h-5 text-muted-foreground`}
                />
                <Input
                  placeholder={t("ابحث في المكتبة...", "Search the library...")}
                  className={`bg-primary-foreground h-14 text-lg ${
                    isRTL ? "pr-12" : "pl-12"
                  }`}
                />
              </div>
              <Button size="lg" variant="secondary" className="h-14 px-8">
                {t("بحث", "Search")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background -mt-16 relative z-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="bg-card rounded-2xl p-6 shadow-lg text-center card-hover"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <resource.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-3xl font-bold text-foreground block mb-2">
                  {resource.count}
                </span>
                <span className="text-muted-foreground">{resource.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Databases Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("قواعد البيانات", "Databases")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("قواعد البيانات المتاحة", "Available Databases")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                "استمتع بالوصول إلى أهم قواعد البيانات العلمية في مجال العلاج الطبيعي والطب",
                "Enjoy access to the most important scientific databases in physical therapy and medicine"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {databases.map((db, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl p-6 shadow-sm card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Library className="w-6 h-6 text-primary" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      db.access === "free"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {db.access === "free"
                      ? t("مجاني", "Free")
                      : t("للأعضاء", "Members Only")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {db.name}
                </h3>
                <p className="text-muted-foreground mb-6">{db.description}</p>
                {db.access === "free" ? (
                  <a
                    href={db.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
                  >
                    {t("زيارة الموقع", "Visit Website")}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-muted-foreground font-semibold hover:text-primary transition-colors"
                  >
                    <Lock className="w-4 h-4" />
                    {t("تسجيل الدخول للوصول", "Login to Access")}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Instructions */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-up">
              <span className="text-accent font-semibold text-lg mb-4 block">
                {t("كيفية الوصول", "How to Access")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t("خطوات الوصول للمكتبة", "Steps to Access the Library")}
              </h2>
              <div className="space-y-6">
                {[
                  t(
                    "سجل كعضو في الجمعية السعودية للعلاج الطبيعي",
                    "Register as a member of SPTA"
                  ),
                  t(
                    "سجل دخولك باستخدام بريدك الإلكتروني وكلمة المرور",
                    "Log in using your email and password"
                  ),
                  t(
                    "انتقل إلى قسم المكتبة الإلكترونية",
                    "Navigate to the E-Library section"
                  ),
                  t(
                    "اختر قاعدة البيانات التي ترغب في الوصول إليها",
                    "Choose the database you want to access"
                  ),
                  t(
                    "ابدأ بالبحث والاستفادة من الموارد",
                    "Start searching and benefiting from resources"
                  ),
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-foreground pt-2">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LibraryPage;
