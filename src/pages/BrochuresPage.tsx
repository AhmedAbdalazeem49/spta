import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
  Tag,
  X,
} from "lucide-react";
import { useState } from "react";

const BrochuresPage = () => {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [hoveredBrochure, setHoveredBrochure] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const categories = [
    { id: "all", name: t("الكل", "All") },
    { id: "education", name: t("تعليمي", "Educational") },
    { id: "health", name: t("صحي", "Health") },
    { id: "research", name: t("بحثي", "Research") },
    { id: "awareness", name: t("توعوي", "Awareness") },
  ];

  const years = ["all", "2024", "2023", "2022", "2021"];

  const brochures = [
    {
      id: 1,
      title: t(
        "دليل العلاج الطبيعي الشامل",
        "Comprehensive Physical Therapy Guide"
      ),
      description: t(
        "دليل شامل للمرضى والممارسين حول أساسيات العلاج الطبيعي",
        "A comprehensive guide for patients and practitioners on PT basics"
      ),
      image: hero1,
      category: "education",
      year: "2024",
      pages: 48,
      size: "5.2 MB",
    },
    {
      id: 2,
      title: t(
        "إعادة التأهيل بعد السكتة الدماغية",
        "Stroke Rehabilitation Guide"
      ),
      description: t(
        "برنامج متكامل لإعادة التأهيل بعد السكتة الدماغية",
        "Integrated rehabilitation program after stroke"
      ),
      image: hero2,
      category: "health",
      year: "2024",
      pages: 36,
      size: "4.1 MB",
    },
    {
      id: 3,
      title: t("الممارسة المبنية على الأدلة", "Evidence-Based Practice Guide"),
      description: t(
        "دليل تطبيقي للممارسة المبنية على الأدلة العلمية",
        "Practical guide for evidence-based practice"
      ),
      image: hero3,
      category: "research",
      year: "2023",
      pages: 64,
      size: "7.8 MB",
    },
    {
      id: 4,
      title: t("صحة العمود الفقري", "Spinal Health Guide"),
      description: t(
        "نصائح وإرشادات للحفاظ على صحة العمود الفقري",
        "Tips and guidelines for maintaining spinal health"
      ),
      image: hero4,
      category: "awareness",
      year: "2023",
      pages: 24,
      size: "2.9 MB",
    },
    {
      id: 5,
      title: t("العلاج الطبيعي للأطفال", "Pediatric Physical Therapy"),
      description: t(
        "دليل شامل للعلاج الطبيعي للأطفال وذوي الاحتياجات الخاصة",
        "Complete guide to pediatric PT and special needs"
      ),
      image: hero1,
      category: "education",
      year: "2024",
      pages: 52,
      size: "6.4 MB",
    },
    {
      id: 6,
      title: t("إصابات الملاعب والرياضيين", "Sports Injuries Guide"),
      description: t(
        "الوقاية والعلاج من إصابات الملاعب الرياضية",
        "Prevention and treatment of sports injuries"
      ),
      image: hero2,
      category: "health",
      year: "2022",
      pages: 40,
      size: "4.8 MB",
    },
  ];

  const filteredBrochures = brochures.filter((brochure) => {
    const matchesSearch =
      brochure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brochure.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || brochure.category === selectedCategory;
    const matchesYear =
      selectedYear === "all" || brochure.year === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  });

  const handleDownload = (id: number) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-3xl ${isRTL ? "text-right" : "text-left"}`}
          >
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("مكتبة البروشورات", "Brochures Library")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("البروشورات والمطبوعات", "Brochures & Publications")}
            </h1>
            <p className="text-xl text-white/80">
              {t(
                "مجموعة شاملة من البروشورات التعليمية والتوعوية في مجال العلاج الطبيعي",
                "A comprehensive collection of educational and awareness brochures in physical therapy"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-b border-border sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("ابحث في البروشورات...", "Search brochures...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-12 pe-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 -translate-y-1/2 end-4"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
                >
                  <option value="all">{t("كل السنوات", "All Years")}</option>
                  {years.slice(1).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brochures Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mb-8">
            <p className="text-muted-foreground">
              {t(
                `عرض ${filteredBrochures.length} بروشور`,
                `Showing ${filteredBrochures.length} brochures`
              )}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedYear}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredBrochures.map((brochure, index) => (
                <motion.div
                  key={brochure.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  onHoverStart={() => setHoveredBrochure(brochure.id)}
                  onHoverEnd={() => setHoveredBrochure(null)}
                  className="group relative bg-card rounded-2xl overflow-hidden shadow-md border border-border/50 hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={brochure.image}
                      alt={brochure.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredBrochure === brochure.id ? 1 : 0,
                      }}
                      className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent flex items-end justify-center pb-8"
                    >
                      <div className="flex gap-4">
                        <Button size="lg" variant="secondary" className="gap-2">
                          <Eye className="w-5 h-5" />
                          {t("عرض", "View")}
                        </Button>
                        <Button
                          size="lg"
                          onClick={() => handleDownload(brochure.id)}
                          className="gap-2"
                          disabled={downloadingId === brochure.id}
                        >
                          {downloadingId === brochure.id ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            <Download className="w-5 h-5" />
                          )}
                          {downloadingId === brochure.id
                            ? t("جاري التحميل...", "Downloading...")
                            : t("تحميل", "Download")}
                        </Button>
                      </div>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-4 start-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {
                          categories.find((c) => c.id === brochure.category)
                            ?.name
                        }
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 end-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {brochure.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {brochure.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {brochure.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {brochure.pages} {t("صفحة", "pages")}
                      </span>
                      <span>{brochure.size}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredBrochures.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("لا توجد نتائج", "No Results Found")}
              </h3>
              <p className="text-muted-foreground">
                {t(
                  "جرب تغيير معايير البحث",
                  "Try changing your search criteria"
                )}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BrochuresPage;
