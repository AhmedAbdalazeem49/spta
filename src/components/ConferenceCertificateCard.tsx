import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  attendanceCertificateService,
  ConferenceCertificateStatusResponse,
} from "@/services/attendanceCertificateService";
import { Button } from "@/components/ui/button";
import {
  Award,
  Download,
  Printer,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  Loader2,
  FileText,
  Building,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const ConferenceCertificateCard: React.FC<{
  onRefreshParent?: () => void;
  className?: string;
}> = ({ onRefreshParent, className = "" }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const [certStatus, setCertStatus] =
    useState<ConferenceCertificateStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<"generate" | "download" | "print" | null>(null);

  const fetchStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const data = await attendanceCertificateService.getStatus();
      setCertStatus(data);
    } catch (error: any) {
      console.error("Error fetching conference certificate status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [user]);

  const handleGenerate = async () => {
    setActionLoading("generate");
    try {
      await attendanceCertificateService.generate();
      toast({
        title: t("تم بنجاح", "Success"),
        description: t(
          "تم إصدار شهادة الحضور بنجاح! يمكنك الآن تحميلها أو طباعتها.",
          "Attendance certificate generated successfully! You can now download or print it."
        ),
      });
      await fetchStatus();
      if (onRefreshParent) onRefreshParent();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: t("خطأ", "Error"),
        description:
          err.response?.data?.message ||
          t("فشل في إصدار الشهادة", "Failed to generate certificate"),
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDownload = async () => {
    setActionLoading("download");
    try {
      await attendanceCertificateService.downloadCertificate(
        certStatus?.participant_name || user?.name
      );
      toast({
        title: t("تم التحميل", "Downloaded"),
        description: t("تم بدء تحميل ملف الشهادة بنجاح.", "Certificate PDF download started."),
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: t("خطأ في التحميل", "Download Error"),
        description:
          err.response?.data?.message ||
          t("تعذر تحميل الشهادة. يرجى المحاولة مرة أخرى.", "Unable to download certificate."),
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handlePrint = async () => {
    setActionLoading("print");
    try {
      await attendanceCertificateService.printCertificate();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: t("خطأ في الطباعة", "Print Error"),
        description: t("تعذر إرسال الشهادة للطباعة.", "Unable to print certificate."),
      });
    } finally {
      setActionLoading(null);
    }
  };

  if (!user) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center">
        <Award className="w-12 h-12 text-[#11517E] mx-auto mb-3 opacity-60" />
        <h4 className="text-xl font-bold text-slate-800 mb-2">
          {t("شهادة حضور المؤتمر", "Conference Attendance Certificate")}
        </h4>
        <p className="text-slate-500 mb-5 max-w-md mx-auto">
          {t(
            "يرجى تسجيل الدخول بحسابك لعرض شهادة الحضور الخاصة بك.",
            "Please log in to your account to view and access your attendance certificate."
          )}
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-[#11517E] text-white font-bold px-6 py-2.5 rounded-full hover:bg-[#0d3f63] transition-colors"
        >
          {t("تسجيل الدخول", "Log In")}
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-8 flex items-center justify-center min-h-[220px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#11517E]" />
      </div>
    );
  }

  const isIssued = certStatus?.status === "issued" || !!certStatus?.certificate;
  const isReady = certStatus?.status === "ready_to_generate";
  const needsEvaluation = certStatus?.status === "needs_evaluation" || (certStatus?.has_reviewed === false && !isIssued && certStatus?.status !== "not_registered");
  const isNotAttended = certStatus?.status === "not_attended";
  const isNotRegistered = certStatus?.status === "not_registered";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 rounded-3xl border-2 border-slate-200/80 shadow-xl p-6 sm:p-8 ${className}`}
    >
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#11517E] via-[#6FC4BC] to-[#55AE47]" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#11517E] to-[#6FC4BC] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#11517E]/20">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#11517E]/10 text-[#11517E]">
                {t("شهادة رسمية معتمدة", "Official Accredited Certificate")}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 13 CME Hours
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {t(
                "شهادة حضور المؤتمر الدولي السادس للعلاج الطبيعي",
                "6th Saudi International Physiotherapy Conference Attendance Certificate",
              )}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {t("المستفيد:", "Issued to:")}{" "}
              <strong className="text-[#11517E]">
                {certStatus?.participant_name || user?.name}
              </strong>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#55AE47]" /> 12-13 Nov
                2026
              </span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#11517E]" /> Almoosa
                Rehabilitation Hospital
              </span>
              {certStatus?.certificate?.serial_number && (
                <span className="font-mono text-slate-400">
                  #{certStatus.certificate.serial_number}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons & Status */}
        <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
          {isIssued ? (
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={handleDownload}
                disabled={actionLoading !== null}
                className="bg-[#11517E] hover:bg-[#0d3f63] text-white font-bold px-6 py-2.5 rounded-xl shadow-md gap-2"
              >
                {actionLoading === "download" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {t("تحميل PDF", "Download PDF")}
              </Button>

              <Button
                onClick={handlePrint}
                disabled={actionLoading !== null}
                variant="outline"
                className="border-slate-300 hover:bg-slate-100 font-bold px-5 py-2.5 rounded-xl gap-2 text-slate-700"
              >
                {actionLoading === "print" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Printer className="w-4 h-4" />
                )}
                {t("طباعة", "Print")}
              </Button>
            </div>
          ) : needsEvaluation ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                disabled
                className="bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold px-5 py-3 rounded-xl cursor-not-allowed border border-slate-300 dark:border-slate-700 shadow-none gap-2 opacity-70"
                title={t(
                  "يجب تقييم المؤتمر أولاً لتفعيل استلام الشهادة",
                  "You must evaluate the conference first to unlock the certificate",
                )}
              >
                <Award className="w-4 h-4 text-slate-400" />
                {t("الشهادة مقفلة", "Certificate Locked")}
              </Button>

              <Link
                to="/conference-evaluation"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#55AE47] to-[#11517E] hover:from-[#439637] hover:to-[#0e446b] text-white font-black px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-sm text-center"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>
                  {t(
                    "تقييم المؤتمر واستلام الشهادة",
                    "Evaluate & Unlock Certificate",
                  )}
                </span>
              </Link>
            </div>
          ) : isReady ? (
            <Button
              onClick={handleGenerate}
              disabled={actionLoading !== null}
              className="bg-gradient-to-r from-[#55AE47] to-[#11517E] hover:from-[#439637] hover:to-[#0e446b] text-white font-bold px-6 py-3 rounded-xl shadow-lg gap-2"
            >
              {actionLoading === "generate" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {t("إصدار واستلام الشهادة", "Get Certificate")}
            </Button>
          ) : isNotAttended ? (
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-4 py-3 rounded-xl">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {t(
                  "الشهادة تتطلب تسجيل الحضور الفعلي في المؤتمر",
                  "Attendance verification required at venue",
                )}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold px-4 py-3 rounded-xl">
              <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                {t("غير مسجل في المؤتمر", "Not registered for conference")}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
