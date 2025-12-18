import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Search,
  ExternalLink,
  BookOpen,
  FileText,
  Heart,
  Filter,
  ChevronRight,
  Globe,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import AOS from "aos";

interface DatabaseItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: string;
  categoryEn: string;
  coverage: string;
  coverageEn: string;
  scope: string;
  scopeEn: string;
  url: string;
  icon: typeof Database;
  featured?: boolean;
}

const DatabasesPage = () => {
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AOS.refresh();
  }, []);

  const categories = [
    { id: "all", label: t("الكل", "All"), icon: Database },
    { id: "bibliographic", label: t("القواعد الببليوغرافية", "Bibliographic Databases"), icon: BookOpen },
    { id: "guidelines", label: t("الإرشادات السريرية", "Clinical Guidelines"), icon: FileText },
    { id: "rehabilitation", label: t("قواعد التأهيل", "Rehabilitation Databases"), icon: Heart },
  ];

  const databases: DatabaseItem[] = [
    {
      id: "pubmed",
      name: "PubMed / MEDLINE",
      nameEn: "PubMed / MEDLINE",
      description: "قاعدة بيانات المكتبة الوطنية الأمريكية للطب، تحتوي على أكثر من 35 مليون مرجع في العلوم الطبية والحيوية",
      descriptionEn: "US National Library of Medicine database with over 35 million references in biomedical sciences",
      category: "bibliographic",
      categoryEn: "Bibliographic",
      coverage: "1946 - حتى الآن",
      coverageEn: "1946 - Present",
      scope: "الطب والعلوم الصحية",
      scopeEn: "Medicine & Health Sciences",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      icon: BookOpen,
      featured: true,
    },
    {
      id: "cochrane",
      name: "Cochrane Library",
      nameEn: "Cochrane Library",
      description: "مجموعة من قواعد البيانات تحتوي على مراجعات منهجية عالية الجودة للأدلة في الرعاية الصحية",
      descriptionEn: "Collection of databases containing high-quality systematic reviews of evidence in healthcare",
      category: "guidelines",
      categoryEn: "Guidelines",
      coverage: "1995 - حتى الآن",
      coverageEn: "1995 - Present",
      scope: "المراجعات المنهجية",
      scopeEn: "Systematic Reviews",
      url: "https://www.cochranelibrary.com/",
      icon: FileText,
      featured: true,
    },
    {
      id: "pedro",
      name: "PEDro",
      nameEn: "PEDro",
      description: "قاعدة بيانات الأدلة في العلاج الطبيعي، تحتوي على تجارب عشوائية ومراجعات منهجية وإرشادات",
      descriptionEn: "Physiotherapy Evidence Database containing randomized trials, systematic reviews, and guidelines",
      category: "rehabilitation",
      categoryEn: "Rehabilitation",
      coverage: "1929 - حتى الآن",
      coverageEn: "1929 - Present",
      scope: "العلاج الطبيعي",
      scopeEn: "Physical Therapy",
      url: "https://pedro.org.au/",
      icon: Heart,
      featured: true,
    },
    {
      id: "cinahl",
      name: "CINAHL",
      nameEn: "CINAHL",
      description: "قاعدة بيانات شاملة للتمريض والعلوم الصحية المساعدة",
      descriptionEn: "Comprehensive database for nursing and allied health sciences",
      category: "bibliographic",
      categoryEn: "Bibliographic",
      coverage: "1981 - حتى الآن",
      coverageEn: "1981 - Present",
      scope: "التمريض والصحة المساعدة",
      scopeEn: "Nursing & Allied Health",
      url: "https://www.ebsco.com/products/research-databases/cinahl",
      icon: BookOpen,
    },
    {
      id: "embase",
      name: "Embase",
      nameEn: "Embase",
      description: "قاعدة بيانات طبية حيوية من Elsevier تركز على الأدوية والصيدلة",
      descriptionEn: "Biomedical database from Elsevier focusing on drugs and pharmacology",
      category: "bibliographic",
      categoryEn: "Bibliographic",
      coverage: "1947 - حتى الآن",
      coverageEn: "1947 - Present",
      scope: "الصيدلة والطب",
      scopeEn: "Pharmacology & Medicine",
      url: "https://www.embase.com/",
      icon: BookOpen,
    },
    {
      id: "nice",
      name: "NICE Guidelines",
      nameEn: "NICE Guidelines",
      description: "إرشادات المعهد الوطني للتميز في الرعاية الصحية في المملكة المتحدة",
      descriptionEn: "National Institute for Health and Care Excellence guidelines from the UK",
      category: "guidelines",
      categoryEn: "Guidelines",
      coverage: "1999 - حتى الآن",
      coverageEn: "1999 - Present",
      scope: "الإرشادات السريرية",
      scopeEn: "Clinical Guidelines",
      url: "https://www.nice.org.uk/guidance",
      icon: FileText,
    },
    {
      id: "sign",
      name: "SIGN Guidelines",
      nameEn: "SIGN Guidelines",
      description: "شبكة الإرشادات الاسكتلندية للتوصيات السريرية المبنية على الأدلة",
      descriptionEn: "Scottish Intercollegiate Guidelines Network for evidence-based clinical recommendations",
      category: "guidelines",
      categoryEn: "Guidelines",
      coverage: "1993 - حتى الآن",
      coverageEn: "1993 - Present",
      scope: "الممارسة السريرية",
      scopeEn: "Clinical Practice",
      url: "https://www.sign.ac.uk/",
      icon: FileText,
    },
    {
      id: "rehab",
      name: "RehabMeasures",
      nameEn: "RehabMeasures",
      description: "قاعدة بيانات لأدوات القياس في إعادة التأهيل مع معلومات السيكومتري",
      descriptionEn: "Database of rehabilitation measurement instruments with psychometric information",
      category: "rehabilitation",
      categoryEn: "Rehabilitation",
      coverage: "شامل",
      coverageEn: "Comprehensive",
      scope: "أدوات القياس",
      scopeEn: "Measurement Tools",
      url: "https://www.sralab.org/rehabilitation-measures",
      icon: Heart,
    },
    {
      id: "trip",
      name: "TRIP Database",
      nameEn: "TRIP Database",
      description: "محرك بحث للأدلة السريرية يبحث في مصادر متعددة",
      descriptionEn: "Clinical evidence search engine that searches across multiple sources",
      category: "bibliographic",
      categoryEn: "Bibliographic",
      coverage: "متعدد المصادر",
      coverageEn: "Multi-source",
      scope: "الأدلة السريرية",
      scopeEn: "Clinical Evidence",
      url: "https://www.tripdatabase.com/",
      icon: Search,
    },
    {
      id: "otseeker",
      name: "OTseeker",
      nameEn: "OTseeker",
      description: "قاعدة بيانات الأدلة في العلاج الوظيفي",
      descriptionEn: "Occupational Therapy Systematic Evaluation of Evidence",
      category: "rehabilitation",
      categoryEn: "Rehabilitation",
      coverage: "1980 - حتى الآن",
      coverageEn: "1980 - Present",
      scope: "العلاج الوظيفي",
      scopeEn: "Occupational Therapy",
      url: "http://www.otseeker.com/",
      icon: Heart,
    },
    {
      id: "eric",
      name: "ERIC",
      nameEn: "ERIC",
      description: "مركز معلومات الموارد التعليمية - قاعدة بيانات للأبحاث التعليمية",
      descriptionEn: "Education Resources Information Center - database for educational research",
      category: "bibliographic",
      categoryEn: "Bibliographic",
      coverage: "1966 - حتى الآن",
      coverageEn: "1966 - Present",
      scope: "التعليم",
      scopeEn: "Education",
      url: "https://eric.ed.gov/",
      icon: BookOpen,
    },
    {
      id: "psychinfo",
      name: "PsycINFO",
      nameEn: "PsycINFO",
      description: "قاعدة بيانات APA للعلوم السلوكية وعلم النفس",
      descriptionEn: "APA database for behavioral sciences and psychology",
      category: "bibliographic",
      categoryEn: "Bibliographic",
      coverage: "1800s - حتى الآن",
      coverageEn: "1800s - Present",
      scope: "علم النفس",
      scopeEn: "Psychology",
      url: "https://www.apa.org/pubs/databases/psycinfo",
      icon: BookOpen,
    },
  ];

  const filteredDatabases = databases.filter((db) => {
    const matchesCategory = activeCategory === "all" || db.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.description.includes(searchQuery) ||
      db.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredDatabases = databases.filter((db) => db.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-navy to-navy-dark" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-glow rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`max-w-4xl mx-auto text-center ${isRTL ? "text-right md:text-center" : "text-left md:text-center"}`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center"
            >
              <Database className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t("القواعد الإلكترونية", "Electronic Databases")}
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t(
                "مجموعة منتقاة من قواعد البيانات الإلكترونية لدعم الممارسة المبنية على الأدلة والبحث العلمي",
                "A curated collection of electronic databases to support evidence-based practice and scientific research"
              )}
            </p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl mx-auto"
            >
              <div className="relative">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? "right-4" : "left-4"}`} />
                <input
                  type="text"
                  placeholder={t("ابحث في القواعد...", "Search databases...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-4 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Databases */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("قواعد مميزة", "Featured Databases")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("أهم القواعد الموصى بها", "Top Recommended Databases")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDatabases.map((db, index) => (
              <motion.div
                key={db.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative bg-card rounded-2xl p-8 shadow-lg border-2 border-primary/20 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {t("مميز", "Featured")}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <db.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{t(db.name, db.nameEn)}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {t(db.description, db.descriptionEn)}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">{t(db.coverage, db.coverageEn)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">{t(db.scope, db.scopeEn)}</span>
                    </div>
                  </div>
                  
                  <a href={db.url} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2 group/btn">
                      {t("الوصول للقاعدة", "Access Database")}
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Databases with Filters */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-foreground hover:bg-secondary"
                }`}
              >
                <category.icon className="w-5 h-5" />
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {t(
                `عرض ${filteredDatabases.length} قاعدة بيانات`,
                `Showing ${filteredDatabases.length} databases`
              )}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              {activeCategory !== "all" && (
                <span className="text-sm">{categories.find(c => c.id === activeCategory)?.label}</span>
              )}
            </div>
          </div>

          {/* Database Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDatabases.map((db, index) => (
                <motion.div
                  key={db.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <db.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-foreground truncate">{t(db.name, db.nameEn)}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          db.category === "bibliographic" ? "bg-blue-pale text-blue-primary" :
                          db.category === "guidelines" ? "bg-secondary text-accent" :
                          "bg-primary/10 text-primary"
                        }`}>
                          {t(
                            db.category === "bibliographic" ? "ببليوغرافي" :
                            db.category === "guidelines" ? "إرشادات" : "تأهيل",
                            db.categoryEn
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {t(db.description, db.descriptionEn)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {t(db.coverage, db.coverageEn)}
                        </div>
                        <a
                          href={db.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
                        >
                          {t("وصول", "Access")}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredDatabases.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {t("لا توجد نتائج", "No results found")}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Quick Access Tips */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("نصائح للوصول الفعال", "Tips for Effective Access")}
              </h2>
              <div className="space-y-4">
                {[
                  t("استخدم المصطلحات الطبية المعيارية (MeSH) للبحث الدقيق", "Use standard medical terms (MeSH) for precise searching"),
                  t("جرب استخدام المعاملات المنطقية (AND, OR, NOT)", "Try using Boolean operators (AND, OR, NOT)"),
                  t("راجع المراجعات المنهجية أولاً للحصول على صورة شاملة", "Check systematic reviews first for a comprehensive overview"),
                  t("استخدم أدوات التقييم النقدي لتقييم جودة الأدلة", "Use critical appraisal tools to evaluate evidence quality"),
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-blue-glow shrink-0" />
                    <span>{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div data-aos="fade-left" data-aos-delay="200">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">
                  {t("هل تحتاج مساعدة؟", "Need Help?")}
                </h3>
                <p className="text-primary-foreground/80 mb-6">
                  {t(
                    "تواصل معنا للحصول على دعم في استخدام قواعد البيانات أو البحث العلمي",
                    "Contact us for support with database usage or scientific research"
                  )}
                </p>
                <Button variant="secondary" className="w-full">
                  {t("تواصل معنا", "Contact Us")}
                  <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DatabasesPage;
