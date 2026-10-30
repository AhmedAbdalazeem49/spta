import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import {
  Star,
  MessageSquare,
  User,
  AlertCircle,
  Loader2,
  X,
  TrendingUp,
  BarChart3,
  ChevronRight,
  Award,
  Layers,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface WorkshopSummary {
  code: string;
  title: string;
  speaker: string;
  time: string;
  total_evaluations: number;
  content_avg: number;
  speaker_avg: number;
  overall_avg: number;
}

interface WorkshopEvaluation {
  id: number;
  workshop_code: string;
  user?: {
    name?: string;
    email: string;
    phone?: string;
  };
  content_q1: number;
  content_q2: number;
  content_q3: number;
  content_q4: number;
  content_q4_explanation?: string | null;
  content_q5: number;
  content_q6: number;
  speaker_q1: number;
  speaker_q2: number;
  speaker_q3: number;
  speaker_q4: number;
  speaker_q5: number;
  speaker_q6: number;
  speaker_q7: number;
  comments?: string | null;
  certificate?: {
    id: number;
    serial_number: string;
    status: string;
  } | null;
  created_at: string;
}

export const AdminWorkshopsEvaluationsView: React.FC = () => {
  const { t, language } = useLanguage();
  const [summaries, setSummaries] = useState<Record<string, WorkshopSummary>>({});
  const [evaluations, setEvaluations] = useState<WorkshopEvaluation[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEval, setSelectedEval] = useState<WorkshopEvaluation | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const url =
        selectedWorkshop === "all"
          ? "/admin/conference-workshops-evaluations"
          : `/admin/conference-workshops-evaluations?workshop_code=${selectedWorkshop}`;
      const res = await api.get(url);
      setSummaries(res.data?.data?.summary_by_workshop || {});
      setEvaluations(res.data?.data?.evaluations || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load workshop evaluations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedWorkshop]);

  return (
    <div className="space-y-8 mt-6">
      {/* Top Filter and Highlights */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 text-[#55AE47] rounded-xl flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-lg">
              {t("تقييمات ورش العمل المستقلة", "Workshops Evaluations Breakdown")}
            </h3>
            <p className="text-xs text-slate-500">
              {t(
                "نموذج تقييم الهيئة السعودية للتخصصات الصحية (SCFHS)",
                "Saudi Commission for Health Specialties (SCFHS) Evaluation Model"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedWorkshop}
            onChange={(e) => setSelectedWorkshop(e.target.value)}
            className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none font-semibold text-slate-700 dark:text-slate-200"
          >
            <option value="all">{t("جميع الورش", "All Workshops")}</option>
            {Object.values(summaries).map((ws) => (
              <option key={ws.code} value={ws.code}>
                [{ws.code.toUpperCase()}] {ws.title.substring(0, 35)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Workshop Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.values(summaries).map((ws) => {
          const isSelected = selectedWorkshop === ws.code;
          return (
            <motion.div
              key={ws.code}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedWorkshop(isSelected ? "all" : ws.code)}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? "bg-gradient-to-br from-[#11517E]/10 to-[#6FC4BC]/10 border-[#11517E] shadow-md"
                  : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-[#6FC4BC]/50"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="px-2.5 py-1 bg-[#11517E]/10 text-[#11517E] text-xs font-black rounded-lg uppercase">
                  {ws.code} • {ws.time}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{ws.overall_avg}/5</span>
                </span>
              </div>

              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1 line-clamp-2">
                {ws.title}
              </h4>
              <p className="text-xs text-slate-500 mb-4">{ws.speaker}</p>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                  <div className="text-base font-black text-slate-900 dark:text-white">
                    {ws.total_evaluations}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Reviews
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                  <div className="text-base font-black text-[#11517E]">
                    {ws.content_avg}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Content
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                  <div className="text-base font-black text-[#55AE47]">
                    {ws.speaker_avg}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Speaker
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Evaluations Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#11517E]" />
            <span>
              {t("تفاصيل إجابات المشاركين", "Attendee Evaluation Records")} (
              {evaluations.length})
            </span>
          </h4>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#11517E] mx-auto mb-2" />
            <p className="text-xs text-slate-400">Loading reviews...</p>
          </div>
        ) : evaluations.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="font-medium text-sm">No workshop evaluations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-3 text-right">Participant</th>
                  <th className="px-5 py-3 text-right">Workshop</th>
                  <th className="px-5 py-3 text-center">Content Avg</th>
                  <th className="px-5 py-3 text-center">Speaker Avg</th>
                  <th className="px-5 py-3 text-center">Certificate Serial</th>
                  <th className="px-5 py-3 text-center">Feedback</th>
                  <th className="px-5 py-3 text-center">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {evaluations.map((ev) => {
                  const contentScore =
                    (ev.content_q1 +
                      ev.content_q2 +
                      ev.content_q3 +
                      ev.content_q4 +
                      ev.content_q5 +
                      ev.content_q6) /
                    6;
                  const speakerScore =
                    (ev.speaker_q1 +
                      ev.speaker_q2 +
                      ev.speaker_q3 +
                      ev.speaker_q4 +
                      ev.speaker_q5 +
                      ev.speaker_q6 +
                      ev.speaker_q7) /
                    7;

                  return (
                    <tr
                      key={ev.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-800 dark:text-white">
                          {ev.user?.name || "Attendee"}
                        </div>
                        <div className="text-xs text-slate-400">
                          {ev.user?.email}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-[#11517E]/10 text-[#11517E]">
                          {ev.workshop_code}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center font-bold text-slate-800">
                        {contentScore.toFixed(1)} / 5
                      </td>

                      <td className="px-5 py-4 text-center font-bold text-[#55AE47]">
                        {speakerScore.toFixed(1)} / 5
                      </td>

                      <td className="px-5 py-4 text-center">
                        {ev.certificate?.serial_number ? (
                          <span className="font-mono text-xs font-bold text-[#11517E] bg-blue-50 px-2 py-1 rounded">
                            {ev.certificate.serial_number}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-center max-w-[200px]">
                        {ev.comments ? (
                          <p className="text-xs text-slate-600 truncate">
                            {ev.comments}
                          </p>
                        ) : (
                          <span className="text-xs text-slate-300 italic">No notes</span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-center text-xs text-slate-400 whitespace-nowrap">
                        {new Date(ev.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
