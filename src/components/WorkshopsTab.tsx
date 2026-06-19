import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import {
  Calendar,
  MessageCircle,
  CreditCard,
  User,
  Clock,
  MapPin,
  Users,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";

interface WorkshopRegistration {
  id: number;
  status: "pending" | "confirmed" | "cancelled";
  price: number;
  attendance?: "attended" | "absent" | "pending";

  workshop: {
    id: number;
    title: string;
    description?: string;
    doctor_name?: string;
    location?: string;
    date?: string;
    end_date?: string;
    time?: string;
    regular_price?: string;
    member_price?: string;
    total_capacity?: number;
    status?: string;
    image?: string;
  };
}

export default function WorkshopsTab() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [workshops, setWorkshops] = useState<WorkshopRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  const [confirmCancelId, setConfirmCancelId] = useState<number | null>(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const fetchWorkshops = async () => {
    try {
      const res = await api.get("/my-workshops");
      setWorkshops(res.data.data || []);
    } catch {
      setWorkshops([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const cancelRegistration = async (id: number) => {
    try {
      await api.post(`/workshops/${id}/cancel`);

      toast({
        title: t("تم الإلغاء", "Cancelled"),
        description: t(
          "تم إلغاء التسجيل ويمكنك التواصل معنا",
          "Registration cancelled, contact us on WhatsApp"
        ),
      });

      fetchWorkshops();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description: err.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  const openWhatsApp = () => {
    const phone = "9661234567899";
    window.open(
      `https://wa.me/${phone}?text=I%20need%20help%20with%20my%20workshop%20registration`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-40 bg-muted rounded-lg" />

        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 rounded-2xl border border-border/60 bg-muted/40"
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {t("جاري تحميل ورش العمل...", "Loading your workshops...")}
        </p>
      </div>
    );
  }

  // ❌ hide cancelled workshops
  const activeWorkshops = workshops.filter((reg) => reg.status !== "cancelled");

  if (activeWorkshops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 border border-dashed rounded-2xl bg-muted/20">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Calendar className="w-6 h-6 text-primary" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold mb-2">
          {t("لا توجد ورش مسجلة", "No Workshops Found")}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground max-w-md mb-6">
          {t(
            "لم تقم بالتسجيل في أي ورشة بعد. يمكنك تصفح الورش المتاحة والتسجيل بسهولة.",
            "You are not registered in any workshops yet. Browse available workshops and join easily."
          )}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={() => (window.location.href = "/workshops")}
            className="gap-2"
          >
            <Calendar className="w-4 h-4" />
            {t("تصفح الورش", "Browse Workshops")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {activeWorkshops.map((reg) => {
          const attendanceUrl = `${window.location.origin}/workshop/${reg.workshop.id}/attendance`;

          return (
            <Card className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                {/* IMAGE SECTION */}
                {reg.workshop.image && (
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_Storage_URL}/storage/${reg.workshop.image}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* status floating badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={
                          reg.status === "confirmed"
                            ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 backdrop-blur-md"
                            : "bg-yellow-500/20 text-yellow-200 border border-yellow-400/30 backdrop-blur-md"
                        }
                      >
                        {reg.status}
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-5">
                  {/* TITLE BLOCK */}
                  <div className="rounded-2xl bg-muted/40 border border-border/40 p-4 transition-all duration-300 hover:bg-muted/60 hover:shadow-md">
                    <h3 className="text-lg font-bold leading-snug line-clamp-2">
                      {reg.workshop.title}
                    </h3>

                    {reg.workshop.doctor_name && (
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {reg.workshop.doctor_name}
                      </p>
                    )}
                  </div>

                  {/* DESCRIPTION PANEL */}
                  {reg.workshop.description && (
                    <div className="rounded-2xl bg-muted/30 border border-border/40 p-4 transition-all duration-300 hover:bg-muted/50 hover:shadow-sm">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {reg.workshop.description}
                      </p>
                    </div>
                  )}

                  {/* META GRID */}
                  <div className="grid grid-cols-2 gap-3">
                    {reg.workshop.date && (
                      <div className="rounded-xl bg-background border border-border/40 p-3 hover:shadow-md hover:bg-muted/30 transition-all flex items-center gap-2 text-xs">
                        <Calendar className="w-4 h-4 text-primary" />
                        {new Date(reg.workshop.date).toLocaleDateString(
                          "en-US",
                        )}
                      </div>
                    )}

                    {reg.workshop.end_date && (
                      <div className="rounded-xl bg-background border border-border/40 p-3 hover:shadow-md hover:bg-muted/30 transition-all flex items-center gap-2 text-xs">
                        <Calendar className="w-4 h-4 text-primary" />
                        {new Date(reg.workshop.end_date).toLocaleDateString(
                          "en-US",
                        )}
                      </div>
                    )}

                    {reg.workshop.time && (
                      <div className="rounded-xl bg-background border border-border/40 p-3 hover:shadow-md hover:bg-muted/30 transition-all flex items-center gap-2 text-xs">
                        <Clock className="w-4 h-4 text-primary" />
                        {reg.workshop.time}
                      </div>
                    )}

                    {reg.workshop.total_capacity && (
                      <div className="rounded-xl bg-background border border-border/40 p-3 hover:shadow-md hover:bg-muted/30 transition-all flex items-center gap-2 text-xs">
                        <Users className="w-4 h-4 text-primary" />
                        {reg.workshop.total_capacity} seats
                      </div>
                    )}

                    {reg.workshop.location && (
                      <div className="col-span-2 rounded-xl bg-background border border-border/40 p-3 hover:shadow-md hover:bg-muted/30 transition-all flex items-center gap-2 text-xs">
                        <MapPin className="w-4 h-4 text-primary" />
                        {reg.workshop.location}
                      </div>
                    )}
                  </div>

                  {/* PRICE + ATTENDANCE */}
                  <div className="flex items-center justify-between rounded-2xl bg-muted/30 border border-border/40 p-4 hover:bg-muted/50 transition">
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {t("السعر", "Price")}:
                      </span>
                      <span className="font-bold text-primary">
                        {reg.price === 0 ? "Free" : `${reg.price} SAR`}
                      </span>
                    </div>

                    <Badge
                      className={
                        reg.attendance === "attended"
                          ? "bg-blue-500/15 text-blue-600"
                          : reg.attendance === "absent"
                            ? "bg-red-500/15 text-red-600"
                            : "bg-gray-500/15 text-gray-600"
                      }
                    >
                      {reg.attendance || "pending"}
                    </Badge>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 rounded-xl gap-2 hover:scale-[1.03] transition"
                      onClick={() => setConfirmCancelId(reg.id)}
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl gap-2 hover:bg-green-500/10 transition"
                      onClick={openWhatsApp}
                    >
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ================= CANCEL CONFIRMATION MODAL ================= */}
      {confirmCancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-[92%] max-w-md overflow-hidden rounded-[24px] border border-red-200/30 bg-background shadow-2xl">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white p-5">
              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />

              <h2 className="text-xl font-black">
                {t("تأكيد إلغاء التسجيل", "Confirm Cancellation")}
              </h2>

              <p className="text-sm text-red-100 mt-1">
                {t(
                  "هذا الإجراء سيؤدي إلى إلغاء تسجيلك في الورشة",
                  "This will cancel your workshop registration"
                )}
              </p>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              {/* Warning box */}
              <div className="flex items-start gap-3 rounded-2xl border border-amber-200/40 bg-amber-50 p-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  ⚠️
                </div>

                <div>
                  <p className="font-semibold text-amber-800">
                    {t("تنبيه مهم", "Important Notice")}
                  </p>

                  <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                    {t(
                      "يمكنك التواصل معنا عبر WhatsApp بعد الإلغاء إذا احتجت مساعدة إضافية",
                      "You can contact us on WhatsApp after cancellation if needed"
                    )}
                  </p>
                </div>
              </div>

              {/* Action hint */}
              <div className="text-xs text-muted-foreground text-center">
                {t(
                  "لن يتم احتساب هذه الورشة ضمن سجل حضورك بعد الإلغاء",
                  "This workshop will be removed from your attendance record"
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => setConfirmCancelId(null)}
                >
                  {t("رجوع", "Back")}
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1 rounded-xl shadow-lg"
                  onClick={async () => {
                    await cancelRegistration(confirmCancelId);
                    setConfirmCancelId(null);
                    setShowWhatsApp(true);
                  }}
                >
                  {t("تأكيد الإلغاء", "Confirm Cancel")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= WHATSAPP MODAL ================= */}
      {showWhatsApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-[92%] max-w-md overflow-hidden rounded-[24px] border border-emerald-200/30 bg-background shadow-2xl">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white p-6">
              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-200" />
                </div>

                <div>
                  <h2 className="text-xl font-black">
                    {t("نحن هنا لمساعدتك", "We're here to help")}
                  </h2>

                  <p className="text-sm text-emerald-100 mt-1">
                    {t(
                      "دعم سريع لإعادة الحجز",
                      "Quick support for rebooking"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 text-center">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <MessageCircle className="w-8 h-8 text-emerald-600" />
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-lg font-bold mb-2">
                  {t("هل تحتاج إلى مساعدة؟", "Do you need assistance?")}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(
                    "يمكنك التواصل معنا مباشرة عبر واتساب للحصول على دعم فوري بخصوص الإلغاء أو إعادة الحجز ",
                    "You can contact us directly on WhatsApp for instant support regarding cancellation, rebooking"
                  )}
                </p>
              </div>

              {/* Info pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-xs text-emerald-700">
                ⚡{" "}
                {t("استجابة سريعة خلال دقائق", "Fast response within minutes")}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => setShowWhatsApp(false)}
                >
                  {t("لاحقاً", "Later")}
                </Button>

                <Button
                  className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg gap-2"
                  onClick={() => {
                    const phone = "201234567890";
                    window.open(
                      `https://wa.me/${phone}?text=Hello%20I%20need%20help%20with%20my%20workshop%20cancellation`,
                      "_blank"
                    );
                    setShowWhatsApp(false);
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
