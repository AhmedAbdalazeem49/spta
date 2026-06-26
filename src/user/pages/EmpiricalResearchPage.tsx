import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  BookOpen,
  ClipboardList,
  AlertCircle,
  ExternalLink,
  Loader2,
  CalendarDays,
  ArrowUpRight,
  Sparkles,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

interface ResearchItem {
  id: number;
  title: string;
  type: "research" | "questionnaire";
  link: string;
  created_at: string;
}

interface Stats {
  research_count: number;
  questionnaire_count: number;
}

const EmpiricalResearchPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [items, setItems] = useState<ResearchItem[]>([]);
  const [stats, setStats] = useState<Stats>({
    research_count: 0,
    questionnaire_count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "research" | "questionnaire"
  >("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (activeTab !== "all") params.append("type", activeTab);

        const response = await api.get(`/research-items?${params.toString()}`);
        setItems(response.data.items);
        setStats(response.data.stats);
      } catch (error) {
        toast({
          title: t("خطأ", "Error"),
          description: t("فشل في تحميل البيانات", "Failed to load data"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchItems();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeTab, toast, t]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy", {
        locale: isRTL ? arSA : undefined,
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Layout>
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-28 overflow-hidden">
        {/* layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-blue-500/5" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* decorative blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-blue-500/8 blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* eyebrow pill */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm tracking-wide">
                {t(
                  "الجمعية السعودية للعلاج الطبيعي",
                  "Saudi Physical Therapy Association",
                )}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              <span className="text-foreground">
                {t("المشاركة في ", "Participate in ")}
              </span>
              <span className="text-primary">
                {t("الأبحاث التجريبية", "Empirical Research")}
              </span>
              <br />
              <span className="text-foreground text-3xl md:text-4xl font-bold">
                {t("والاستبيانات البحثية", "& Research Questionnaires")}
              </span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t(
                "ساهم في تطوير مجال العلاج الطبيعي من خلال مشاركتك في الأبحاث والاستبيانات المعتمدة من لجنة الأخلاقيات البحثية.",
                "Advance physical therapy by contributing to ethics-approved research studies and questionnaires reviewed by our Research Ethics Committee.",
              )}
            </p>

            {/* ethics notice */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-start gap-3 px-5 py-4 bg-amber-500/8 text-amber-700 dark:text-amber-400 rounded-2xl border border-amber-500/20 max-w-2xl mx-auto text-start"
            >
              <Shield className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="font-medium text-sm leading-relaxed">
                {t(
                  "جميع الأبحاث والاستبيانات المعروضة هنا تخضع لموافقة لجنة الأخلاقيات البحثية وتلتزم بأعلى معايير البحث العلمي.",
                  "All research and questionnaires listed here have been reviewed and approved by the Research Ethics Committee and adhere to the highest scientific standards.",
                )}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats ───────────────────────────────────────────────────── */}
      <section className="py-6 -mt-10 relative z-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: BookOpen,
                value: stats.research_count,
                labelAr: "بحث تجريبي معتمد",
                labelEn: "Approved Research Studies",
                color: "blue",
                delay: 0.1,
              },
              {
                icon: ClipboardList,
                value: stats.questionnaire_count,
                labelAr: "استبيان بحثي",
                labelEn: "Research Questionnaires",
                color: "emerald",
                delay: 0.2,
              },
              {
                icon: Users,
                value: stats.research_count + stats.questionnaire_count,
                labelAr: "إجمالي الفرص",
                labelEn: "Total Opportunities",
                color: "violet",
                delay: 0.3,
              },
            ].map((stat) => {
              const Icon = stat.icon;
              const colorMap: Record<string, string> = {
                blue: "bg-blue-500/10 text-blue-500 ring-blue-500/20",
                emerald:
                  "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
                violet: "bg-violet-500/10 text-violet-500 ring-violet-500/20",
              };
              return (
                <motion.div
                  key={stat.labelEn}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  className="bg-card shadow-lg hover:shadow-xl rounded-2xl p-6 border hover:border-primary/30 transition-all duration-300 flex items-center gap-5 group cursor-default"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ring-1 transition-transform duration-300 group-hover:scale-110 ${colorMap[stat.color]}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <motion.h3
                      className="text-4xl font-black text-foreground tabular-nums"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: stat.delay + 0.2 }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-muted-foreground text-sm font-medium mt-0.5">
                      {isRTL ? stat.labelAr : stat.labelEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Main Content ────────────────────────────────────────────── */}
      <section className="py-14 pb-28">
        <div className="container-custom max-w-5xl mx-auto">
          {/* ── Controls ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-10"
          >
            {/* tab switcher */}
            <div className="flex bg-muted/60 p-1.5 rounded-2xl w-full md:w-auto gap-1 border">
              {[
                { id: "all", labelAr: "الكل", labelEn: "All" },
                { id: "research", labelAr: "الأبحاث", labelEn: "Research" },
                {
                  id: "questionnaire",
                  labelAr: "الاستبيانات",
                  labelEn: "Questionnaires",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-background text-primary shadow-sm border border-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-background rounded-xl shadow-sm border border-border"
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {isRTL ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>

            {/* search */}
            <div className="relative w-full md:w-80 group">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 ${
                  isRTL ? "right-3.5" : "left-3.5"
                } w-4.5 h-4.5 text-muted-foreground transition-colors group-focus-within:text-primary`}
              />
              <Input
                placeholder={t("ابحث بالاسم...", "Search by title...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`h-11 ${
                  isRTL ? "pr-10" : "pl-10"
                } rounded-xl bg-muted/40 border-transparent focus:bg-background focus:border-primary/40 transition-all duration-300`}
              />
            </div>
          </motion.div>

          {/* ── Result count label ── */}
          {!isLoading && items.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground mb-6"
            >
              {isRTL
                ? `عرض ${items.length} نتيجة`
                : `Showing ${items.length} result${items.length !== 1 ? "s" : ""}`}
            </motion.p>
          )}

          {/* ── List ── */}
          {isLoading ? (
            <div className="py-28 flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground text-sm animate-pulse">
                {t("جارٍ التحميل...", "Loading...")}
              </p>
            </div>
          ) : items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-muted/20 rounded-3xl border border-dashed"
            >
              <div className="w-20 h-20 rounded-3xl bg-muted/60 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {t("لا توجد نتائج", "No results found")}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {t(
                  "جرّب استخدام كلمات بحث مختلفة أو تغيير الفلتر",
                  "Try a different search term or switch the filter",
                )}
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence>
                {items.map((item, index) => {
                  const isResearch = item.type === "research";
                  const isHovered = hoveredId === item.id;

                  return (
                    <motion.a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.06, duration: 0.4 }}
                      onHoverStart={() => setHoveredId(item.id)}
                      onHoverEnd={() => setHoveredId(null)}
                      className="group relative block bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-primary/30"
                    >
                      {/* left accent bar */}
                      <div
                        className={`absolute ${isRTL ? "right-0" : "left-0"} top-0 bottom-0 w-1 transition-all duration-300 ${
                          isHovered
                            ? isResearch
                              ? "bg-blue-500"
                              : "bg-emerald-500"
                            : "bg-transparent"
                        }`}
                      />

                      {/* subtle hover glow */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                          isHovered ? "opacity-100" : "opacity-0"
                        } ${isResearch ? "bg-blue-500/3" : "bg-emerald-500/3"}`}
                      />

                      <div className="relative p-6 md:p-7">
                        <div className="flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center">
                          {/* left: content */}
                          <div className="flex-1 min-w-0 space-y-3">
                            {/* badge + date row */}
                            <div className="flex flex-wrap items-center gap-3">
                              <Badge
                                variant={isResearch ? "default" : "secondary"}
                                className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                                  isResearch
                                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 border"
                                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 border"
                                }`}
                              >
                                {isResearch ? (
                                  <>
                                    <BookOpen className="w-3 h-3 inline mx-1.5" />
                                    {t("بحث تجريبي", "Empirical Research")}
                                  </>
                                ) : (
                                  <>
                                    <ClipboardList className="w-3 h-3 inline mx-1.5" />
                                    {t(
                                      "استبيان بحثي",
                                      "Research Questionnaire",
                                    )}
                                  </>
                                )}
                              </Badge>

                              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <CalendarDays className="w-3.5 h-3.5" />
                                {formatDate(item.created_at)}
                              </span>
                            </div>

                            {/* title */}
                            <h3 className="text-lg md:text-xl font-bold leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2 pr-4">
                              {item.title}
                            </h3>

                            {/* type description */}
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {isResearch
                                ? t(
                                    "انقر للمشاركة في هذا البحث التجريبي المعتمد من لجنة الأخلاقيات",
                                    "Click to participate in this ethics-approved empirical study",
                                  )
                                : t(
                                    "أجب على أسئلة الاستبيان وساعد الباحثين في جمع البيانات",
                                    "Complete the questionnaire and help researchers gather valuable data",
                                  )}
                            </p>
                          </div>

                          {/* right: CTA */}
                          <div className="shrink-0">
                            <motion.div
                              animate={
                                isHovered ? { scale: 1.04 } : { scale: 1 }
                              }
                              transition={{ duration: 0.2 }}
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                                isResearch
                                  ? "bg-blue-500/8 text-blue-600 dark:text-blue-400 border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500"
                                  : "bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500"
                              }`}
                            >
                              <span>{t("شارك الآن", "Participate")}</span>
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* ── Bottom CTA ── */}
          {!isLoading && items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-blue-500/5 border border-primary/15 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t(
                  "هل لديك بحث تريد نشره؟",
                  "Want to publish your own research?",
                )}
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                {t(
                  "يمكنك تقديم طلب نشر بحثك أو استبيانك عبر منصة الجمعية بعد الحصول على موافقة لجنة الأخلاقيات البحثية.",
                  "You can submit a request to publish your study or questionnaire through the Association's platform after obtaining Research Ethics Committee approval.",
                )}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                <ExternalLink className="w-4 h-4" />
                {t("تواصل معنا", "Contact Us")}
              </a>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default EmpiricalResearchPage;
