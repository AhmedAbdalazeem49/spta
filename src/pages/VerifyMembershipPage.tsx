import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/api";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Shield,
  BadgeCheck,
  Calendar,
  User,
  Building,
  Hash,
} from "lucide-react";
import Layout from "@/components/layout/Layout";

interface Membership {
  membership_number: string;
  membership_type: string;
  status: string;
  starts_at: string;
  ends_at: string;
}

interface User {
  name: string;
  email: string;
  employer: string;
  national_id: string;
}

interface ResponseData {
  user: User;
  membership: Membership;
}

export default function VerifyMembershipPage() {
  const { code } = useParams();

  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/membership/verify/${code}`);

      setData(res.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Membership not found or invalid code");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="animate-pulse text-center">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <p>Verifying membership...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-6 py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl"
          >
            <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-white/5 backdrop-blur-xl shadow-2xl">
              {/* TOP GLOW */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative p-8 md:p-10">
                {/* ICON */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <XCircle className="w-14 h-14 text-red-500" />
                  </div>
                </div>

                {/* TITLE */}
                <div className="text-center space-y-3" dir="rtl">
                  <h1 className="text-3xl font-bold tracking-tight">
                    تعذر التحقق من العضوية
                  </h1>

                  <p className="text-white/70 leading-relaxed max-w-md mx-auto">
                    لم نتمكن من التحقق من العضوية المطلوبة. قد يكون الرابط غير
                    صالح، أو منتهي الصلاحية، أو تم حذف العضوية، أو أن العضوية
                    غير نشطة حالياً في نظام التحقق الخاص بـ SPTA.
                  </p>
                </div>

                {/* ERROR BOX */}
                <div
                  className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-4"
                  dir="rtl"
                >
                  <p className="text-sm text-red-200 text-center">
                    {error ||
                      "لم يتم العثور على العضوية أو أن رمز التحقق غير صالح"}
                  </p>
                </div>

                {/* HELP TEXT */}
                <div
                  className="mt-6 space-y-2 text-sm text-white/50 text-center"
                  dir="rtl"
                >
                  <p>قد يحدث هذا للأسباب التالية:</p>

                  <div className="space-y-1">
                    <p>• رمز QR أو رابط التحقق غير صحيح</p>
                    <p>• انتهت صلاحية العضوية</p>
                    <p>• تم إيقاف العضوية أو تعطيلها</p>
                    <p>• لم تعد بيانات العضوية موجودة في النظام</p>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-10 grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="h-12 rounded-xl bg-primary hover:opacity-90 transition font-medium"
                  >
                    إعادة المحاولة
                  </button>

                  <button
                    onClick={() => (window.location.href = "/")}
                    className="h-12 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition font-medium"
                  >
                    العودة للرئيسية
                  </button>
                </div>

                {/* SUPPORT */}
                <div
                  className="mt-8 pt-6 border-t border-white/10 text-center"
                  dir="rtl"
                >
                  <p className="text-sm text-white/50">هل تحتاج إلى مساعدة؟</p>

                  <p className="text-sm text-white/80 mt-1 leading-relaxed">
                    يرجى التواصل مع إدارة الجمعية أو فريق الدعم الفني للمساعدة
                    في التحقق من العضوية.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const { user, membership } = data;

  const now = new Date();
  const startDate = membership.starts_at ? new Date(membership.starts_at) : null;
  const endDate = membership.ends_at ? new Date(membership.ends_at) : null;

  const isActive =
    membership.status === "active" &&
    (!startDate || startDate <= now) &&
    (!endDate || endDate >= now);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white py-28">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <Shield className="w-14 h-14 mx-auto text-primary" />
            <h1 className="text-3xl font-bold">Membership Verification</h1>
            <p className="text-white/60">
              Official SPTA Digital Verification System
            </p>
          </motion.div>

          {/* STATUS CARD */}
          <div
            className={`rounded-2xl p-6 border ${
              isActive
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isActive ? (
                  <CheckCircle className="text-emerald-400" />
                ) : (
                  <XCircle className="text-red-400" />
                )}

                <div>
                  <h2 className="text-lg font-bold">
                    {isActive ? "Valid Membership" : "Invalid / Expired"}
                  </h2>
                  <p className="text-white/60 text-sm">
                    {membership.membership_number}
                  </p>
                </div>
              </div>

              <BadgeCheck className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* MAIN INFO */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* MEMBER INFO */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold mb-4">Member Information</h3>

              <Info icon={User} label="Full Name" value={user.name} />
              <Info icon={Building} label="Employer" value={user.employer} />
            </div>

            {/* MEMBERSHIP INFO */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold mb-4">Membership Details</h3>

              <Info
                icon={Hash}
                label="Number"
                value={membership.membership_number}
              />

              <Info
                icon={Calendar}
                label="Start Date"
                value={membership.starts_at?.split("T")[0]}
              />

              <Info
                icon={Calendar}
                label="Expiry Date"
                value={membership.ends_at?.split("T")[0]}
              />

              <Info icon={Shield} label="Status" value={membership.status} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* SMALL COMPONENT */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Info({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 mt-1 text-white/60" />
      <div>
        <p className="text-xs text-white/50">{label}</p>
        <p className="font-medium">{value || "—"}</p>
      </div>
    </div>
  );
}
