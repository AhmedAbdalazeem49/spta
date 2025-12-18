import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  BookOpen,
  CheckCircle,
  Eye,
  Calendar,
  Tag,
  Search,
  Filter,
} from "lucide-react";
import { useState, useEffect } from "react";
import AOS from "aos";
import { toast } from "sonner";

interface Booklet {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: string;
  categoryEn: string;
  size: string;
  version: string;
  date: string;
  dateEn: string;
  downloads: number;
  pages: number;
}

const BookletsPage = () => {
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const categories = [
    { id: "all", label: t("الكل", "All") },
    { id: "clinical", label: t("سريري", "Clinical") },
    { id: "educational", label: t("تعليمي", "Educational") },
    { id: "research", label: t("بحثي", "Research") },
    { id: "guidelines", label: t("إرشادات", "Guidelines") },
  ];

  const booklets: Booklet[] = [
    {
      id: "1",
      title: "دليل الممارسة المبنية على الأدلة",
      titleEn: "Evidence-Based Practice Guide",
      description: "دليل شامل لتطبيق الممارسة المبنية على الأدلة في العلاج الطبيعي",
      descriptionEn: "Comprehensive guide to applying evidence-based practice in physical therapy",
      category: "clinical",
      categoryEn: "Clinical",
      size: "2.5 MB",
      version: "2.0",
      date: "يناير 2024",
      dateEn: "January 2024",
      downloads: 1250,
      pages: 45,
    },
    {
      id: "2",
      title: "التقييم الحركي المتقدم",
      titleEn: "Advanced Movement Assessment",
      description: "كتيب تعليمي حول تقنيات التقييم الحركي المتقدمة",
      descriptionEn: "Educational booklet on advanced movement assessment techniques",
      category: "educational",
      categoryEn: "Educational",
      size: "3.1 MB",
      version: "1.5",
      date: "ديسمبر 2023",
      dateEn: "December 2023",
      downloads: 890,
      pages: 62,
    },
    {
      id: "3",
      title: "إرشادات علاج آلام الظهر",
      titleEn: "Low Back Pain Treatment Guidelines",
      description: "إرشادات سريرية لعلاج آلام أسفل الظهر",
      descriptionEn: "Clinical guidelines for treating low back pain",
      category: "guidelines",
      categoryEn: "Guidelines",
      size: "1.8 MB",
      version: "3.0",
      date: "نوفمبر 2023",
      dateEn: "November 2023",
      downloads: 2100,
      pages: 38,
    },
    {
      id: "4",
      title: "منهجية البحث العلمي",
      titleEn: "Scientific Research Methodology",
      description: "دليل كتابة ونشر الأبحاث العلمية في العلاج الطبيعي",
      descriptionEn: "Guide to writing and publishing scientific research in physical therapy",
      category: "research",
      categoryEn: "Research",
      size: "4.2 MB",
      version: "2.1",
      date: "أكتوبر 2023",
      dateEn: "October 2023",
      downloads: 1560,
      pages: 78,
    },
    {
      id: "5",
      title: "التأهيل بعد الجراحة",
      titleEn: "Post-Surgical Rehabilitation",
      description: "بروتوكولات التأهيل بعد العمليات الجراحية الشائعة",
      descriptionEn: "Rehabilitation protocols after common surgical procedures",
      category: "clinical",
      categoryEn: "Clinical",
      size: "2.9 MB",
      version: "1.8",
      date: "سبتمبر 2023",
      dateEn: "September 2023",
      downloads: 1890,
      pages: 56,
    },
    {
      id: "6",
      title: "علاج كبار السن",
      titleEn: "Geriatric Physical Therapy",
      description: "أساليب وتقنيات العلاج الطبيعي لكبار السن",
      descriptionEn: "Techniques and methods of physical therapy for elderly patients",
      category: "educational",
      categoryEn: "Educational",
      size: "2.2 MB",
      version: "1.3",
      date: "أغسطس 2023",
      dateEn: "August 2023",
      downloads: 1120,
      pages: 42,
    },
    {
      id: "7",
      title: "إرشادات العلاج المائي",
      titleEn: "Aquatic Therapy Guidelines",
      description: "دليل شامل للعلاج المائي وتطبيقاته السريرية",
      descriptionEn: "Comprehensive guide to aquatic therapy and its clinical applications",
      category: "guidelines",
      categoryEn: "Guidelines",
      size: "3.5 MB",
      version: "2.2",
      date: "يوليو 2023",
      dateEn: "July 2023",
      downloads: 780,
      pages: 65,
    },
    {
      id: "8",
      title: "تحليل البيانات الإحصائية",
      titleEn: "Statistical Data Analysis",
      description: "دليل تحليل البيانات الإحصائية للأبحاث الصحية",
      descriptionEn: "Guide to statistical data analysis for health research",
      category: "research",
      categoryEn: "Research",
      size: "5.1 MB",
      version: "1.0",
      date: "يونيو 2023",
      dateEn: "June 2023",
      downloads: 950,
      pages: 92,
    },
  ];

  const filteredBooklets = booklets.filter((booklet) => {
    const matchesCategory = selectedCategory === "all" || booklet.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      booklet.title.includes(searchQuery) ||
      booklet.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (booklet: Booklet) => {
    setDownloadingId(booklet.id);
    setTimeout(() => {
      setDownloadingId(null);
      toast.success(t(
        `تم تحميل "${booklet.title}" بنجاح`,
        `"${booklet.titleEn}" downloaded successfully`
      ));
    }, 2000);
  };

  const totalDownloads = booklets.reduce((acc, b) => acc + b.downloads, 0);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-navy to-accent/80" />
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 0.5, y: -100 }}
              transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <FileText className="w-8 h-8 text-primary-foreground" />
            </motion.div>
          ))}
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center"
            >
              <BookOpen className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t("سلسلة الكتيبات التعليمية", "Educational Booklets Series")}
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t(
                "مجموعة من الكتيبات التعليمية المتخصصة في مجالات العلاج الطبيعي المختلفة",
                "A collection of specialized educational booklets in various physical therapy fields"
              )}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary-foreground block">{booklets.length}</span>
                <span className="text-primary-foreground/70 text-sm">{t("كتيب متاح", "Booklets Available")}</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary-foreground block">{totalDownloads.toLocaleString()}</span>
                <span className="text-primary-foreground/70 text-sm">{t("تحميل", "Downloads")}</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary-foreground block">{categories.length - 1}</span>
                <span className="text-primary-foreground/70 text-sm">{t("تصنيف", "Categories")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-background sticky top-16 z-30 border-b border-border/50 backdrop-blur-lg bg-background/95">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? "right-4" : "left-4"}`} />
              <input
                type="text"
                placeholder={t("ابحث في الكتيبات...", "Search booklets...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booklets Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {t(`عرض ${filteredBooklets.length} كتيب`, `Showing ${filteredBooklets.length} booklets`)}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Filter className="w-4 h-4" />
              {selectedCategory !== "all" && categories.find(c => c.id === selectedCategory)?.label}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredBooklets.map((booklet, index) => (
                <motion.div
                  key={booklet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-md border border-border/50 group"
                >
                  {/* Card Header */}
                  <div className="relative h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center"
                    >
                      <FileText className="w-8 h-8 text-primary" />
                    </motion.div>
                    
                    {/* Category Badge */}
                    <span className="absolute top-4 right-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                      {t(
                        booklet.category === "clinical" ? "سريري" :
                        booklet.category === "educational" ? "تعليمي" :
                        booklet.category === "research" ? "بحثي" : "إرشادات",
                        booklet.categoryEn
                      )}
                    </span>
                    
                    {/* Version Badge */}
                    <span className="absolute top-4 left-4 px-2 py-1 bg-card/90 backdrop-blur-sm text-foreground text-xs rounded-full">
                      v{booklet.version}
                    </span>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {t(booklet.title, booklet.titleEn)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {t(booklet.description, booklet.descriptionEn)}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {t(booklet.date, booklet.dateEn)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {booklet.pages} {t("صفحة", "pages")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {booklet.size}
                      </span>
                    </div>
                    
                    {/* Download Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span className="text-muted-foreground">
                        {booklet.downloads.toLocaleString()} {t("تحميل", "downloads")}
                      </span>
                    </div>
                    
                    {/* Download Button */}
                    <Button
                      onClick={() => handleDownload(booklet)}
                      disabled={downloadingId === booklet.id}
                      className="w-full gap-2 group/btn"
                    >
                      {downloadingId === booklet.id ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                          {t("جاري التحميل...", "Downloading...")}
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 group-hover/btn:animate-bounce" />
                          {t("تحميل الكتيب", "Download Booklet")}
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredBooklets.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FileText className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {t("لا توجد كتيبات مطابقة", "No matching booklets found")}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Download Success Features */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("مميزات الكتيبات", "Booklet Features")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "جميع كتيباتنا مصممة لتقديم أفضل تجربة تعليمية",
                "All our booklets are designed to provide the best educational experience"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: t("محتوى محدث", "Updated Content"),
                description: t("تحديثات دورية للمحتوى", "Regular content updates"),
              },
              {
                icon: Eye,
                title: t("سهولة القراءة", "Easy Reading"),
                description: t("تصميم مريح للعين", "Eye-friendly design"),
              },
              {
                icon: Download,
                title: t("تحميل مجاني", "Free Download"),
                description: t("جميع الكتيبات مجانية", "All booklets are free"),
              },
              {
                icon: BookOpen,
                title: t("محتوى علمي", "Scientific Content"),
                description: t("مراجع علمية موثوقة", "Reliable scientific references"),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl p-6 text-center shadow-md"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookletsPage;
