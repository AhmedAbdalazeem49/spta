import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Send,
  Check,
  Sparkles,
  Users,
  Mic2,
  Building2,
  LayoutGrid,
  Loader2,
  ArrowLeft,
  Award,
  Calendar,
  MapPin,
  ShieldCheck,
  ChevronRight,
  MessageSquareHeart
} from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import ConferenceLayout from "@/components/layout/ConferenceLayout";
import onesLogo from "@/assets/ones.png";

type CategoryKey = "overall" | "organization" | "speakers" | "venue" | "workshops";

interface Category {
  key: CategoryKey;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  gradient: string;
}

const CATEGORIES: Category[] = [
  {
    key: "overall",
    label: "Overall Conference Experience",
    sublabel: "Your comprehensive impression of the scientific sessions, themes, and value.",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-[#11517E] to-[#6FC4BC]",
  },
  {
    key: "organization",
    label: "Organization & Logistics",
    sublabel: "Registration flow, check-in, scheduling, timing, and staff hospitality.",
    icon: <LayoutGrid className="w-6 h-6" />,
    gradient: "from-[#11517E] to-cyan-600",
  },
  {
    key: "speakers",
    label: "Speakers & Scientific Content",
    sublabel: "Clinical relevance, depth of evidence-based practice, and presentation quality.",
    icon: <Mic2 className="w-6 h-6" />,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    key: "venue",
    label: "Venue & Facilities",
    sublabel: "Almoosa Rehabilitation Hospital halls, stage, seating comfort, and amenities.",
    icon: <Building2 className="w-6 h-6" />,
    gradient: "from-[#55AE47] to-teal-600",
  },
  {
    key: "workshops",
    label: "Specialized Workshops & Hands-on Training",
    sublabel: "Practical skills acquisition, instructor interaction, and educational impact.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-rose-500 to-indigo-600",
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
  const activeRating = hovered || value;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
      <div className="flex items-start sm:items-center gap-4">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shrink-0 shadow-md shadow-[#11517E]/10`}
        >
          {category.icon}
        </div>
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
            {category.label}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            {category.sublabel}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 self-start md:self-center bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
        <div className="flex items-center gap-1.5" onMouseLeave={onLeave}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRate(star)}
              onMouseEnter={() => onHover(star)}
              className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-transform active:scale-90"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`w-7 h-7 transition-all duration-150 ${
                  star <= activeRating
                    ? "text-amber-400 fill-amber-400 scale-110 drop-shadow-sm"
                    : "text-slate-300 dark:text-slate-600 hover:text-slate-400"
                }`}
              />
            </button>
          ))}
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 min-w-[75px] text-center">
          {activeRating > 0 ? STAR_LABELS[activeRating] : "Select"}
        </span>
      </div>
    </div>
  );
};

const ConferenceEvaluationPage = () => {
  const navigate = useNavigate();

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRate = (key: CategoryKey, v: number) =>
    setRatings((prev) => ({ ...prev, [key]: v }));
  const handleHover = (key: CategoryKey, v: number) =>
    setHovered((prev) => ({ ...prev, [key]: v }));
  const handleLeave = (key: CategoryKey) =>
    setHovered((prev) => ({ ...prev, [key]: 0 }));

  const canSubmit = ratings.overall > 0;

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
          feedback: feedback,
        });
        setSubmitted(true);
        toast.success("Evaluation submitted successfully! Certificate is now unlocked.");
      } catch (error: any) {
        console.error(error);
        if (error.response?.status === 401) {
          toast.error("Please log in to submit your evaluation.");
        } else {
          toast.error(error.response?.data?.message || "Failed to submit evaluation.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <ConferenceLayout>
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans" dir="ltr">
        
        {/* Full-width Top Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-[#11517E] via-[#0E446B] to-[#082840] pt-28 pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10">
          {/* Ambient lighting glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6FC4BC]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#55AE47]/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="w-full max-w-7xl mx-auto relative z-10">
            {/* Top Navigation Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link
                to="/conference-2026"
                className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md border border-white/15"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Conference</span>
              </Link>

              <Link
                to="/profile?tab=conference"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md border border-white/15"
              >
                <Award className="w-4 h-4" />
                <span>My Profile & Certificates</span>
              </Link>
            </div>

            {/* Main Hero Header */}
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8">
              <div className="max-w-3xl text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-emerald-300 text-xs font-black tracking-wider uppercase mb-4 backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Accredited 13 CME Hours • Official Evaluation</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-4">
                  Conference Evaluation &amp;{" "}
                  
                    Certificate Release
                  
                </h1>

                <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Please rate your experience at the <strong>6th Saudi International Physiotherapy Conference</strong>. Completing this evaluation immediately unlocks your official accredited Attendance Certificate for instant download and printing.
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-white/70 mt-6 pt-6 border-t border-white/10">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-300" /> 12 – 13 November 2026
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-300" /> Almoosa Rehabilitation Hospital, Al Ahsa
                  </span>
                </div>
              </div>

              {/* Official Brand Logo */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="shrink-0 w-44 h-44 sm:w-60 sm:h-60 rounded-3xl  p-4 border  shadow-2xl flex items-center justify-center"
              >
                <img
                  src={onesLogo}
                  alt="SPTA Conference 2026"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Full-width Evaluation Body Section */}
        <section className="w-full flex-1 py-12 px-6 sm:px-10 lg:px-16">
          <div className="w-full max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  onSubmit={handleSubmit}
                  className="space-y-10"
                >
                  {/* Category Ratings Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-5">
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                          Evaluation Categories
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          Select a score from 1 to 5 stars for each category below.
                        </p>
                      </div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg w-fit">
                        5 Required Areas
                      </div>
                    </div>

                    <div className="space-y-4">
                      {CATEGORIES.map((cat) => (
                        <StarRating
                          key={cat.key}
                          category={cat}
                          value={ratings[cat.key]}
                          hovered={hovered[cat.key]}
                          onRate={(v) => handleRate(cat.key, v)}
                          onHover={(v) => handleHover(cat.key, v)}
                          onLeave={() => handleLeave(cat.key)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Feedback Comments Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#11517E]/10 text-[#11517E] dark:text-[#6FC4BC] flex items-center justify-center">
                        <MessageSquareHeart className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">
                          Additional Comments &amp; Suggestions (Optional)
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Share your insights or topics you'd like to see in future SPTA editions.
                        </p>
                      </div>
                    </div>

                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Write any thoughts, compliments, or suggestions here..."
                      rows={4}
                      className="w-full p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-[#11517E] focus:border-transparent outline-none transition-all text-sm leading-relaxed text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                    />
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                      * Overall Experience rating is required to unlock your certificate.
                    </p>

                    <motion.button
                      whileHover={canSubmit && !isSubmitting ? { scale: 1.02, y: -2 } : {}}
                      whileTap={canSubmit && !isSubmitting ? { scale: 0.98 } : {}}
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className={`w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                        canSubmit && !isSubmitting
                          ? "bg-gradient-to-r from-[#11517E] via-[#0E446B] to-[#55AE47] hover:from-[#0d3f63] hover:to-[#439637] text-white shadow-[#11517E]/30 cursor-pointer"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300 dark:border-slate-700 shadow-none"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Submitting Evaluation...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>
                            {canSubmit
                              ? "Submit Evaluation & Unlock Certificate"
                              : "Rate Overall Experience to Proceed"}
                          </span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                /* Full-width Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 sm:p-16 border border-slate-200/80 dark:border-slate-800 shadow-2xl text-center max-w-3xl mx-auto my-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-[#55AE47] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30 text-white"
                  >
                    <Check className="w-12 h-12" strokeWidth={3} />
                  </motion.div>

                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
                    Thank You for Your Feedback! 🎉
                  </h2>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
                    Your conference evaluation has been recorded successfully. Your accredited Attendance Certificate (13 CME Hours) is now unlocked and available in your Profile and the Conference page.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      to="/profile?tab=certificates"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] hover:from-[#0d3f63] hover:to-[#55AE47] text-white rounded-2xl font-black text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <Award className="w-5 h-5" />
                      <span>Access Certificate in Profile</span>
                    </Link>

                    <Link
                      to="/conference-2026?tab=certificate"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white rounded-2xl font-bold transition-colors text-base"
                    >
                      <span>Return to Conference Page</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </ConferenceLayout>
  );
};

export default ConferenceEvaluationPage;
