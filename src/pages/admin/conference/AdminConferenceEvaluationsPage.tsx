import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { Star, MessageSquare, User, AlertCircle, Loader2, X, TrendingUp, BarChart3, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Evaluation {
  id: number;
  user: {
    name?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    title?: string | null;
  };
  organization_score: number;
  content_score: number;
  speakers_score: number;
  venue_score: number;
  recommendation_score: number;
  feedback: string | null;
  created_at: string;
}

interface Stats {
  total: number;
  organization_avg: number;
  content_avg: number;
  speakers_avg: number;
  venue_avg: number;
  recommendation_avg: number;
}

const CATEGORIES = [
  { key: "organization_score", label: "Organization", color: "blue" },
  { key: "content_score", label: "Content", color: "emerald" },
  { key: "speakers_score", label: "Speakers", color: "amber" },
  { key: "venue_score", label: "Venue", color: "purple" },
  { key: "recommendation_score", label: "Recommendation", color: "rose" },
];

function StarRow({ score, size = "sm" }: { score: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`${sz} ${s <= score ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"}`} />
      ))}
    </div>
  );
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const pct = (score / 5) * 100;
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500", emerald: "bg-emerald-500",
    amber: "bg-amber-500", purple: "bg-purple-500", rose: "bg-rose-500",
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-sm font-black text-slate-900 dark:text-white">{score}/5</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${colorMap[color]}`}
        />
      </div>
    </div>
  );
}

function ReviewModal({ ev, onClose }: { ev: Evaluation; onClose: () => void }) {
  const userName = ev.user?.name
    || `${ev.user?.title ? ev.user.title + " " : ""}${ev.user?.first_name ?? ""} ${ev.user?.last_name ?? ""}`.trim();
  const avgScore = (
    ev.organization_score + ev.content_score + ev.speakers_score + ev.venue_score + ev.recommendation_score
  ) / 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Gradient header */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 p-8 text-white rounded-t-3xl">
          <button onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white font-black text-xl flex items-center justify-center">
              {userName?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div>
              <div className="font-bold text-lg">{userName || "Anonymous"}</div>
              <div className="text-blue-200 text-sm">{ev.user?.email}</div>
              <div className="text-slate-400 text-xs mt-1">{new Date(ev.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Overall Score</div>
              <div className="text-4xl font-black">{avgScore.toFixed(1)}<span className="text-xl text-slate-400">/5</span></div>
            </div>
            <StarRow score={Math.round(avgScore)} size="lg" />
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Score breakdown */}
          <div>
            <h4 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Score Breakdown</h4>
            <div className="space-y-4">
              {CATEGORIES.map(cat => (
                <ScoreBar
                  key={cat.key}
                  label={cat.label}
                  score={(ev as any)[cat.key]}
                  color={cat.color}
                />
              ))}
            </div>
          </div>

          {/* Feedback */}
          {ev.feedback && (
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <h4 className="text-sm font-bold text-slate-600 dark:text-slate-300">Attendee Feedback</h4>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">"{ev.feedback}"</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export const AdminConferenceEvaluationsPage = () => {
  const { language } = useLanguage();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Evaluation | null>(null);

  useEffect(() => { fetchEvaluations(); }, []);

  const fetchEvaluations = async () => {
    try {
      const res = await api.get("/admin/conference-evaluations");
      setEvaluations(res.data.evaluations || []);
      setStats(res.data.stats || null);
    } catch {
      toast.error("Failed to load evaluations");
    } finally {
      setLoading(false);
    }
  };

  const overallAvg = stats
    ? ((stats.organization_avg + stats.content_avg + stats.speakers_avg + stats.venue_avg + stats.recommendation_avg) / 5).toFixed(1)
    : "—";

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
        <p className="text-slate-500 font-medium">Loading evaluations...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
          {language === "ar" ? "تقييمات المؤتمر" : "Conference Evaluations"}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {language === "ar" ? "عرض وتحليل آراء الحضور" : "View and analyze attendee feedback"}
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Total */}
          <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg shadow-blue-500/20">
            <div className="text-4xl font-black mb-1">{stats.total}</div>
            <div className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Total Reviews</div>
            <div className="mt-3 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold">{overallAvg} avg overall</span>
            </div>
          </div>
          {/* Category averages */}
          {CATEGORIES.map(cat => {
            const avg = (stats as any)[cat.key.replace("_score", "_avg")] ?? 0;
            return (
              <div key={cat.key} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm">
                <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">{avg}<span className="text-sm text-slate-400">/5</span></div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{cat.label}</div>
                <StarRow score={Math.round(avg)} />
              </div>
            );
          })}
        </div>
      )}

      {/* Review Cards Grid */}
      {evaluations.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 py-20 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-400 font-medium">No evaluations yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {evaluations.map((ev, i) => {
            const userName = ev.user?.name
              || `${ev.user?.title ? ev.user.title + " " : ""}${ev.user?.first_name ?? ""} ${ev.user?.last_name ?? ""}`.trim();
            const avgScore = (ev.organization_score + ev.content_score + ev.speakers_score + ev.venue_score + ev.recommendation_score) / 5;
            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Top accent bar based on avg */}
                <div className={`h-1.5 ${avgScore >= 4 ? "bg-gradient-to-r from-emerald-400 to-teal-500" : avgScore >= 3 ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-red-400 to-rose-500"}`} />

                <div className="p-5">
                  {/* User + date */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white font-black flex items-center justify-center text-sm shrink-0">
                        {userName?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{userName || "Anonymous"}</div>
                        <div className="text-xs text-slate-400">{new Date(ev.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900 dark:text-white">{avgScore.toFixed(1)}</div>
                      <StarRow score={Math.round(avgScore)} />
                    </div>
                  </div>

                  {/* Mini score bars */}
                  <div className="space-y-2 mb-4">
                    {CATEGORIES.slice(0, 3).map(cat => (
                      <div key={cat.key} className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 w-20 shrink-0">{cat.label}</span>
                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-${cat.color}-500`}
                            style={{ width: `${((ev as any)[cat.key] / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 w-5">{(ev as any)[cat.key]}</span>
                      </div>
                    ))}
                  </div>

                  {/* Feedback preview */}
                  {ev.feedback && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2 mb-4">
                      "{ev.feedback}"
                    </p>
                  )}

                  {/* View Button */}
                  <button
                    onClick={() => setSelected(ev)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors group-hover:shadow-sm"
                  >
                    View Full Review <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      <AnimatePresence>
        {selected && <ReviewModal ev={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
};
