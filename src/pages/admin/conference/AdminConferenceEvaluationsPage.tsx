import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { Star, MessageSquare, User, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Evaluation {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    title: string | null;
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

export const AdminConferenceEvaluationsPage = () => {
  const { language } = useLanguage();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      const res = await api.get("/conference-evaluations");
      setEvaluations(res.data.evaluations);
      setStats(res.data.stats);
    } catch (err: any) {
      toast.error("Failed to load evaluations");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (score: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} className={`w-4 h-4 ${s <= score ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'تقييمات المؤتمر' : 'Conference Evaluations'}
          </h2>
          <p className="text-gray-500 mt-1">
            {language === 'ar' ? 'عرض وتحليل آراء الحضور' : 'View and analyze attendee feedback'}
          </p>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <div className="text-3xl font-black text-blue-600 mb-1">{stats.total}</div>
            <div className="text-xs font-semibold text-gray-500 uppercase">{language === 'ar' ? 'إجمالي التقييمات' : 'Total Reviews'}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <div className="flex justify-center mb-1"><Star className="w-6 h-6 text-yellow-400 fill-yellow-400" /></div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.organization_avg} / 5</div>
            <div className="text-xs font-medium text-gray-500 mt-1">{language === 'ar' ? 'التنظيم' : 'Organization'}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <div className="flex justify-center mb-1"><Star className="w-6 h-6 text-yellow-400 fill-yellow-400" /></div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.content_avg} / 5</div>
            <div className="text-xs font-medium text-gray-500 mt-1">{language === 'ar' ? 'المحتوى' : 'Content'}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <div className="flex justify-center mb-1"><Star className="w-6 h-6 text-yellow-400 fill-yellow-400" /></div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.speakers_avg} / 5</div>
            <div className="text-xs font-medium text-gray-500 mt-1">{language === 'ar' ? 'المتحدثين' : 'Speakers'}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <div className="flex justify-center mb-1"><Star className="w-6 h-6 text-yellow-400 fill-yellow-400" /></div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.venue_avg} / 5</div>
            <div className="text-xs font-medium text-gray-500 mt-1">{language === 'ar' ? 'المكان' : 'Venue'}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <div className="flex justify-center mb-1"><Star className="w-6 h-6 text-yellow-400 fill-yellow-400" /></div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.recommendation_avg} / 5</div>
            <div className="text-xs font-medium text-gray-500 mt-1">{language === 'ar' ? 'التوصية' : 'Recommendation'}</div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'المستخدم' : 'User'}
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'التنظيم' : 'Organization'}
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'المحتوى' : 'Content'}
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'المتحدثين' : 'Speakers'}
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'المكان' : 'Venue'}
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'ملاحظات' : 'Feedback'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {evaluations.map((ev) => (
                <tr key={ev.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {ev.user?.title ? `${ev.user.title} ` : ''}{ev.user?.first_name} {ev.user?.last_name}
                        </div>
                        <div className="text-xs text-gray-500">{ev.user?.email}</div>
                        <div className="text-xs text-gray-400 mt-1">{new Date(ev.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{renderStars(ev.organization_score)}</td>
                  <td className="px-6 py-4">{renderStars(ev.content_score)}</td>
                  <td className="px-6 py-4">{renderStars(ev.speakers_score)}</td>
                  <td className="px-6 py-4">{renderStars(ev.venue_score)}</td>
                  <td className="px-6 py-4">
                    {ev.feedback ? (
                      <div className="flex items-start gap-2 max-w-xs">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 break-words">{ev.feedback}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-sm">-</span>
                    )}
                  </td>
                </tr>
              ))}
              
              {evaluations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <AlertCircle className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                    {language === 'ar' ? 'لا توجد تقييمات حتى الآن' : 'No evaluations found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
