import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Play, Clock, Eye, X, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const VideosPage = () => {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const categories = [
    { id: "all", name: t("الكل", "All") },
    { id: "education", name: t("تعليمي", "Educational") },
    { id: "exercises", name: t("تمارين", "Exercises") },
    { id: "awareness", name: t("توعية", "Awareness") },
    { id: "conferences", name: t("مؤتمرات", "Conferences") },
    { id: "interviews", name: t("مقابلات", "Interviews") },
  ];

  const videos = [
    {
      id: 1,
      title: t("مقدمة في العلاج الطبيعي", "Introduction to Physical Therapy"),
      description: t("فيديو تعريفي شامل عن مهنة العلاج الطبيعي وأهميتها", "A comprehensive introduction to the PT profession"),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "education",
      duration: "12:45",
      views: "15.2K",
      date: t("15 يناير 2024", "Jan 15, 2024"),
    },
    {
      id: 2,
      title: t("تمارين تقوية عضلات الظهر", "Back Strengthening Exercises"),
      description: t("مجموعة من التمارين الفعالة لتقوية عضلات الظهر", "Effective exercises for back muscle strengthening"),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "exercises",
      duration: "18:30",
      views: "28.5K",
      date: t("10 يناير 2024", "Jan 10, 2024"),
    },
    {
      id: 3,
      title: t("الوقاية من آلام الرقبة", "Neck Pain Prevention"),
      description: t("نصائح وتمارين للوقاية من آلام الرقبة المزمنة", "Tips and exercises for chronic neck pain prevention"),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "awareness",
      duration: "8:15",
      views: "42.1K",
      date: t("5 يناير 2024", "Jan 5, 2024"),
    },
    {
      id: 4,
      title: t("المؤتمر السنوي 2023", "Annual Conference 2023"),
      description: t("ملخص فعاليات المؤتمر السنوي للجمعية", "Summary of the association's annual conference events"),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "conferences",
      duration: "45:00",
      views: "8.7K",
      date: t("20 ديسمبر 2023", "Dec 20, 2023"),
    },
    {
      id: 5,
      title: t("لقاء مع رئيس الجمعية", "Interview with the President"),
      description: t("حوار مع رئيس الجمعية حول مستقبل العلاج الطبيعي", "Interview about the future of physical therapy"),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "interviews",
      duration: "25:00",
      views: "12.3K",
      date: t("15 ديسمبر 2023", "Dec 15, 2023"),
    },
    {
      id: 6,
      title: t("تمارين إعادة التأهيل", "Rehabilitation Exercises"),
      description: t("برنامج تمارين شامل لإعادة التأهيل بعد الإصابات", "Comprehensive exercise program for post-injury rehab"),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "exercises",
      duration: "22:10",
      views: "35.8K",
      date: t("10 ديسمبر 2023", "Dec 10, 2023"),
    },
  ];

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              {t("مكتبة الفيديو", "Video Library")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("الفيديوهات التعليمية", "Educational Videos")}
            </h1>
            <p className="text-xl text-white/80">
              {t(
                "مجموعة متنوعة من الفيديوهات التعليمية والتوعوية في مجال العلاج الطبيعي",
                "A diverse collection of educational videos in physical therapy"
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
                placeholder={t("ابحث في الفيديوهات...", "Search videos...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-12 pe-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute top-1/2 -translate-y-1/2 end-4">
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mb-8">
            <p className="text-muted-foreground">
              {t(`عرض ${filteredVideos.length} فيديو`, `Showing ${filteredVideos.length} videos`)}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group bg-card rounded-2xl overflow-hidden shadow-md border border-border/50 hover:shadow-xl transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div
                    className="relative aspect-video overflow-hidden cursor-pointer"
                    onClick={() => setSelectedVideo(video.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Play Button */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors shadow-lg">
                        <Play className="w-7 h-7 text-primary-foreground fill-current ms-1" />
                      </div>
                    </motion.div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 end-4">
                      <span className="bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 start-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {categories.find((c) => c.id === video.category)?.name}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {video.views}
                      </span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredVideos.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <Play className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("لا توجد نتائج", "No Results Found")}
              </h3>
              <p className="text-muted-foreground">
                {t("جرب تغيير معايير البحث", "Try changing your search criteria")}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 end-0 text-white hover:text-accent transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${videos.find((v) => v.id === selectedVideo)?.videoId}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default VideosPage;
