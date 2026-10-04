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
  Loader2,
  ArrowLeft
} from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import ConferenceLayout from "@/components/layout/ConferenceLayout";

type CategoryKey = "overall" | "organization" | "speakers" | "venue" | "workshops";

interface Category {
  key: CategoryKey;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  gradient: string;
  starColor: string;
}

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

const ConferenceEvaluationPage = () => {
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
    <ConferenceLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-16 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6FC4BC]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#11517E]/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
          <div className="mb-8">
            <Link
              to="/conference-2026"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#11517E] dark:hover:text-[#6FC4BC] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Conference
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            {/* Header Area */}
            <div className="relative py-12 px-6 sm:px-12 bg-gradient-to-br from-[#11517E] to-[#0A304C] text-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-6 backdrop-blur-sm">
                  <MessageSquare className="w-4 h-4" />
                  Conference Feedback
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  Share Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6FC4BC] to-emerald-300">
                    Experience
                  </span>
                </h1>
              </div>
            </div>

            <div className="p-6 sm:p-12">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit}
                    className="space-y-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {CATEGORIES.map((cat, i) => (
                        <motion.div
                          key={cat.key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`group relative bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border-2 transition-all duration-300 ${
                            ratings[cat.key] > 0
                              ? "border-[#6FC4BC] dark:border-[#6FC4BC] shadow-md bg-white dark:bg-gray-800"
                              : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                          }`}
                        >
                          <div className="flex items-start gap-4 mb-6">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-sm shrink-0`}>
                              {cat.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1">
                                {cat.label}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {cat.sublabel}
                              </p>
                            </div>
                          </div>

                          <StarRating
                            category={cat}
                            value={ratings[cat.key]}
                            hovered={hovered[cat.key]}
                            onRate={(v) => handleRate(cat.key, v)}
                            onHover={(v) => handleHover(cat.key, v)}
                            onLeave={() => handleLeave(cat.key)}
                          />

                          <AnimatePresence>
                            {ratings[cat.key] > 0 && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}

                      {avgRating && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-slate-700/50 flex flex-col items-center justify-center text-center shadow-lg"
                        >
                          <Star className="w-10 h-10 text-amber-400 fill-amber-400 mb-4" />
                          <div className="text-6xl font-black text-white mb-2">{avgRating}</div>
                          <div className="text-slate-400 text-base font-medium mb-4">Average Score</div>
                          <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-6 h-6 ${
                                  parseFloat(avgRating) >= s
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-slate-700"
                                }`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/30 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
                      <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold text-lg mb-4">
                        <MessageSquare className="w-5 h-5 text-[#11517E] dark:text-[#6FC4BC]" />
                        Additional Comments
                        <span className="text-gray-400 font-normal text-sm ml-2">(optional)</span>
                      </label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={5}
                        placeholder="Share your thoughts, suggestions, or highlight what you loved most..."
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-[#11517E]/10 focus:border-[#11517E] dark:focus:border-[#6FC4BC] outline-none transition-all resize-none text-gray-800 dark:text-white placeholder:text-gray-400 text-base"
                      />
                    </div>

                    <div className="pt-4">
                      <motion.button
                        whileHover={canSubmit && !isSubmitting ? { scale: 1.01, y: -2 } : {}}
                        whileTap={canSubmit && !isSubmitting ? { scale: 0.98 } : {}}
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                          canSubmit && !isSubmitting
                            ? "bg-gradient-to-r from-[#11517E] to-[#0A304C] hover:from-[#0f4469] hover:to-[#07253b] text-white shadow-xl shadow-blue-900/20 cursor-pointer"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className={`w-5 h-5 ${canSubmit ? "text-white" : ""}`} />
                            {canSubmit ? "Submit Evaluation" : "Please rate Overall Experience to submit"}
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 px-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-[#55AE47] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30"
                    >
                      <Check className="w-14 h-14 text-white" strokeWidth={3} />
                    </motion.div>
                    
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                      Thank You! 🎉
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-8">
                      Your feedback has been successfully submitted. We appreciate you taking the time to help us improve.
                    </p>
                    
                    <Link
                      to="/conference-2026"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Return to Conference Page
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </ConferenceLayout>
  );
};

export default ConferenceEvaluationPage;
