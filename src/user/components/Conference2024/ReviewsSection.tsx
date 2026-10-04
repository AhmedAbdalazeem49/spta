import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Send,
  Check,
  Sparkles,
  MessageSquare,
  Users,
  Mic2,
  Building2,
  LayoutGrid,
  Heart,
  Loader2
} from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────
type CategoryKey = "overall" | "organization" | "speakers" | "venue" | "workshops";

interface Category {
  key: CategoryKey;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  gradient: string;
  starColor: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    key: "overall",
    label: "Overall Experience",
    sublabel: "How was your overall impression?",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-purple-500 to-[#6FC4BC]",
    starColor: "text-purple-400 fill-purple-400",
  },
  {
    key: "organization",
    label: "Organization & Management",
    sublabel: "Scheduling, communication, logistics",
    icon: <LayoutGrid className="w-6 h-6" />,
    gradient: "from-[#11517E] to-cyan-500",
    starColor: "text-[#6FC4BC] fill-[#6FC4BC]",
  },
  {
    key: "speakers",
    label: "Speakers & Content",
    sublabel: "Quality of presentations & sessions",
    icon: <Mic2 className="w-6 h-6" />,
    gradient: "from-amber-500 to-orange-500",
    starColor: "text-amber-400 fill-amber-400",
  },
  {
    key: "venue",
    label: "Venue & Facilities",
    sublabel: "Location, halls, comfort & amenities",
    icon: <Building2 className="w-6 h-6" />,
    gradient: "from-[#55AE47] to-teal-500",
    starColor: "text-emerald-400 fill-emerald-400",
  },
  {
    key: "workshops",
    label: "Workshops",
    sublabel: "Session - Speakers - Hands-on learning",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-rose-500 to-pink-500",
    starColor: "text-rose-400 fill-rose-400",
  },
];

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

// ─── StarRating ───────────────────────────────────────────────────────────────
const StarRating = ({
  category,
  value,
  hovered,
  onRate,
  onHover,
  onLeave,
}: {
  category: Category;
  value: number;
  hovered: number;
  onRate: (v: number) => void;
  onHover: (v: number) => void;
  onLeave: () => void;
}) => {
  const display = hovered || value;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={onLeave}
            className="focus:outline-none"
          >
            <Star
              className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-150 ${
                display >= star
                  ? category.starColor
                  : "text-gray-200 dark:text-gray-700"
              }`}
            />
          </motion.button>
        ))}
      </div>
      {/* Live label */}
      <AnimatePresence mode="wait">
        {display > 0 && (
          <motion.span
            key={display}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wide"
          >
            {STAR_LABELS[display]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const ReviewsSection = () => {
  const [ratings, setRatings] = useState<Record<CategoryKey, number>>({
    overall: 0,
    organization: 0,
    speakers: 0,
    venue: 0,
    workshops: 0,
  });

  const [hovered, setHovered] = useState<Record<CategoryKey, number>>({
    overall: 0,
    organization: 0,
    speakers: 0,
    venue: 0,
    workshops: 0,
  });

  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRate = (key: CategoryKey, v: number) =>
    setRatings((prev) => ({ ...prev, [key]: v }));
  const handleHover = (key: CategoryKey, v: number) =>
    setHovered((prev) => ({ ...prev, [key]: v }));
  const handleLeave = (key: CategoryKey) =>
    setHovered((prev) => ({ ...prev, [key]: 0 }));

  const avgRating =
    Object.values(ratings).filter(Boolean).length > 0
      ? (
          Object.values(ratings).reduce((a, b) => a + b, 0) /
          Object.values(ratings).filter(Boolean).length
        ).toFixed(1)
      : null;

  const canSubmit = ratings.overall > 0;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.post("/conference/evaluate", {
          organization_score: ratings.organization || ratings.overall,
          content_score: ratings.workshops || ratings.overall,
          speakers_score: ratings.speakers || ratings.overall,
          venue_score: ratings.venue || ratings.overall,
          recommendation_score: ratings.overall,
          feedback: feedback
        });
        setSubmitted(true);
        setShowModal(true);
      } catch (error: any) {
        console.error(error);
        if (error.response?.status === 401) {
          toast.error("يرجى تسجيل الدخول أولاً لتقييم المؤتمر");
        } else {
          toast.error(error.response?.data?.message || "حدث خطأ أثناء إرسال التقييم");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#11517E]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 text-sm font-bold mb-6">
            <MessageSquare className="w-4 h-4" />
            Conference Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
            Share Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Experience
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Your honest feedback shapes the future of the Saudi International
            Physiotherapy Conference. It takes less than a minute!
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* ── Rating Cards Grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORIES.map((cat, i) => (
                  <motion.div
                    key={cat.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className={`group relative bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border-2 transition-all duration-300 overflow-hidden ${
                      ratings[cat.key] > 0
                        ? "border-gray-200 dark:border-gray-700 shadow-lg"
                        : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md"
                    }`}
                  >
                    {/* coloured top accent line */}
                    <div
                      className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${cat.gradient} rounded-t-2xl`}
                    />

                    {/* icon + label */}
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-md shrink-0`}
                      >
                        {cat.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base leading-tight">
                          {cat.label}
                        </h4>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">
                          {cat.sublabel}
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <StarRating
                      category={cat}
                      value={ratings[cat.key]}
                      hovered={hovered[cat.key]}
                      onRate={(v) => handleRate(cat.key, v)}
                      onHover={(v) => handleHover(cat.key, v)}
                      onLeave={() => handleLeave(cat.key)}
                    />

                    {/* rated badge */}
                    <AnimatePresence>
                      {ratings[cat.key] > 0 && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Average score card */}
                {avgRating && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 sm:p-6 border-2 border-slate-700/50 flex flex-col items-center justify-center text-center"
                  >
                    <Star className="w-8 h-8 text-amber-400 fill-amber-400 mb-3" />
                    <div className="text-5xl font-black text-white mb-1">{avgRating}</div>
                    <div className="text-slate-400 text-sm font-medium">Average Score</div>
                    <div className="flex gap-1 mt-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-5 h-5 ${
                            parseFloat(avgRating) >= s
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* ── Comments ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-8 border-2 border-gray-100 dark:border-gray-800 shadow-sm"
              >
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-bold text-base mb-4">
                  <MessageSquare className="w-5 h-5 text-[#11517E]" />
                  Additional Comments{" "}
                  <span className="text-gray-400 font-normal text-sm">(optional)</span>
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  placeholder="Share your thoughts, suggestions, or highlight what you loved most about the conference..."
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-[#11517E]/20 focus:border-[#11517E] outline-none transition-all resize-none text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm sm:text-base leading-relaxed"
                />
              </motion.div>

              {/* ── Submit ── */}
              <motion.button
                whileHover={canSubmit && !isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={canSubmit && !isSubmitting ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className={`w-full py-4 sm:py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                  canSubmit && !isSubmitting
                    ? "bg-gradient-to-r from-[#11517E] to-[#6FC4BC] hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/30 cursor-pointer"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className={`w-5 h-5 ${canSubmit ? "text-white" : ""}`} />
                    {canSubmit ? "Submit My Feedback" : "Please rate at least Overall Experience"}
                  </>
                )}
              </motion.button>

              {!canSubmit && (
                <p className="text-center text-sm text-gray-400 dark:text-gray-600">
                  * Overall Experience rating is required to submit.
                </p>
              )}
            </motion.form>
          ) : (
            /* ── Thank You ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-center bg-white dark:bg-gray-900 rounded-3xl p-10 sm:p-16 shadow-2xl border-2 border-gray-100 dark:border-gray-800 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10 pointer-events-none" />

              <div className="relative z-10">
                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/40"
                >
                  <Check className="w-12 h-12 sm:w-14 sm:h-14 text-white" strokeWidth={3} />
                </motion.div>

                {/* Score display */}
                {avgRating && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-full mb-6"
                  >
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="text-2xl font-black text-amber-700 dark:text-amber-400">{avgRating}</span>
                    <span className="text-sm text-amber-600 dark:text-amber-500 font-medium">/ 5.0 — Your Rating</span>
                  </motion.div>
                )}

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4"
                >
                  Thank You! 🎉
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto leading-relaxed"
                >
                  Your feedback is invaluable. It helps the{" "}
                  <span className="font-bold text-[#11517E] dark:text-[#6FC4BC]">
                    Saudi Physical Therapy Association
                  </span>{" "}
                  deliver even better conferences in the future. We truly
                  appreciate you taking the time to share your thoughts.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 flex items-center justify-center gap-2 text-gray-400"
                >
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                  <span className="text-sm font-medium">We look forward to seeing you at the next conference</span>
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

