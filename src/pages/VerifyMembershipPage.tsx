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
  certificate_settings: {
    chairman_name: string;
    signature: string;
  };
}

export default function VerifyMembershipPage() {
  const { code } = useParams();

  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [code]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/membership/verify/${code}`);

      setData(res.data);
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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-bold">Invalid Membership</h2>
          <p className="text-white/60 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  const { user, membership, certificate_settings } = data;

  const isActive = membership.status === "active";

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
              <Info icon={Hash} label="National ID" value={user.national_id} />
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
                value={membership.starts_at}
              />

              <Info
                icon={Calendar}
                label="Expiry Date"
                value={membership.ends_at}
              />

              <Info icon={Shield} label="Status" value={membership.status} />
            </div>
          </div>

          {/* CERTIFICATE FOOTER */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Chairman</p>
              <p className="font-bold">{certificate_settings?.chairman_name}</p>
            </div>

            {certificate_settings?.signature && (
              <img
                src={certificate_settings.signature}
                className="h-16 object-contain bg-white p-2 rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* SMALL COMPONENT */
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
