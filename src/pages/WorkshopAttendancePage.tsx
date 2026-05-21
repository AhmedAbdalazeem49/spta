import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Shield,
  User,
  XCircle,
} from "lucide-react";

import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WorkshopAttendancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();

  const [workshop, setWorkshop] = useState<any>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setStatus("loading");

        // 1. get workshop
        const res = await api.get(`/workshops/${id}`);
        const workshopData = res.data?.data || res.data;
        setWorkshop(workshopData);

        // 2. send attendance (IMPORTANT FIXED PAYLOAD)
        await api.post(`/workshops/${id}/attendance`, {
          user_id: user?.id,
          attendance: "attended",
          type: "qr_scan",
        });

        setStatus("success");
        setShowSuccessModal(true);
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    if (id && user?.id) run();
  }, [id, user]);

  // ================= LOADING =================
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/30 to-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-center"
        >
          <Loader2 className="w-10 h-10 mx-auto text-primary animate-spin" />
          <p className="mt-3 text-muted-foreground">
            {t("جاري تسجيل الحضور...", "Recording attendance...")}
          </p>
        </motion.div>
      </div>
    );
  }

  // ================= ERROR =================
  if (status === "error") {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-background p-4">
          <Card className="max-w-md w-full border-red-200">
            <CardContent className="p-8 text-center space-y-4">
              <XCircle className="w-14 h-14 mx-auto text-red-500" />

              <h2 className="text-xl font-bold">
                {t("فشل تسجيل الحضور", "Attendance Failed")}
              </h2>

              <p className="text-sm text-muted-foreground">
                {t(
                  "تأكد من صحة الرابط أو أنك مشترك في هذه الورشة",
                  "Please ensure the QR is valid or you are enrolled in this workshop"
                )}
              </p>

              <div className="flex gap-2 justify-center pt-4">
                <Button onClick={() => navigate("/workshops")}>
                  <ArrowLeft className="w-4 h-4 me-2" />
                  {t("العودة", "Back")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // ================= SUCCESS =================
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-background to-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-6">
          {/* HEADER SUCCESS */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <h1 className="text-2xl font-bold mt-4">
              {t("تم تسجيل الحضور بنجاح", "Attendance Recorded")}
            </h1>

            <p className="text-muted-foreground mt-1">{workshop?.title}</p>
          </motion.div>

          {/* USER INFO */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <User className="w-4 h-4" />
                {t("بيانات المستخدم", "User Info")}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">{t("الاسم", "Name")}</p>
                  <p>{user?.name}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    {t("البريد", "Email")}
                  </p>
                  <p className="truncate">{user?.email}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    {t("الهاتف", "Phone")}
                  </p>
                  <p>{user?.phone || "-"}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    {t("العضوية", "Membership")}
                  </p>
                  <Badge className="bg-emerald-100 text-emerald-700">
                    {user?.membership_status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WORKSHOP INFO */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <GraduationCap className="w-4 h-4" />
                {t("تفاصيل الورشة", "Workshop Details")}
              </div>

              <p className="font-medium">{workshop?.title}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {workshop?.date}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                QR Attendance Verified
              </div>
            </CardContent>
          </Card>

          {/* ACTIONS */}
          <div className="flex gap-3">
            <Button className="w-full" onClick={() => navigate("/workshops")}>
              {t("العودة للورش", "Back to Workshops")}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              {t("تحديث", "Refresh")}
            </Button>
          </div>
        </div>

        {/* ================= SUCCESS MODAL ================= */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4"
              >
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />

                <h3 className="text-lg font-bold">
                  {t("تم التأكيد", "Confirmed")}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {t(
                    "تم تسجيل حضورك بنجاح لهذه الورشة",
                    "Your attendance has been successfully recorded"
                  )}
                </p>

                <Button
                  className="w-full"
                  onClick={() => setShowSuccessModal(false)}
                >
                  OK
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default WorkshopAttendancePage;
