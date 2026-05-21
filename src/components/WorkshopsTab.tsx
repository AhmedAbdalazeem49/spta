import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Calendar, Clock, MapPin, MessageCircle, XCircle } from "lucide-react";
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
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description: err.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  const openWhatsApp = () => {
    const phone = "201234567890";
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
        {activeWorkshops.map((reg) => (
          <Card
            key={reg.id}
            className="rounded-2xl border border-border/60 hover:shadow-xl transition overflow-hidden"
          >
            <CardContent className="p-0">
              {/* HEADER IMAGE */}
              {reg.workshop.image && (
                <div className="h-60 w-full overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/storage/${reg.workshop.image}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-5 space-y-4">
                {/* TITLE + STATUS */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-bold text-base leading-snug">
                      {reg.workshop.title}
                    </h3>

                    {reg.workshop.doctor_name && (
                      <p className="text-xs text-muted-foreground mt-1">
                        👨‍⚕️ {reg.workshop.doctor_name}
                      </p>
                    )}
                  </div>

                  <Badge
                    className={
                      reg.status === "confirmed"
                        ? "bg-emerald-500/15 text-emerald-600"
                        : "bg-yellow-500/15 text-yellow-600"
                    }
                  >
                    {reg.status}
                  </Badge>
                </div>

                {/* DESCRIPTION */}
                {reg.workshop.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {reg.workshop.description}
                  </p>
                )}

                {/* META GRID */}
                <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                  {reg.workshop.date && (
                    <div>
                      📅 {new Date(reg.workshop.date).toLocaleDateString()}
                    </div>
                  )}

                  {reg.workshop.time && <div>⏰ {reg.workshop.time}</div>}

                  {reg.workshop.location && (
                    <div className="col-span-2">📍 {reg.workshop.location}</div>
                  )}



                  {reg.workshop.total_capacity && (
                    <div>👥 Capacity: {reg.workshop.total_capacity}</div>
                  )}
                </div>

                {/* PRICE */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {t("السعر المدفوع", "Paid Price")}
                  </div>

                  <div className="font-bold text-primary">
                    {reg.price === 0 ? "Free" : `${reg.price} SAR`}
                  </div>
                </div>

                {/* ATTENDANCE */}
                <div className="flex gap-2">
                  <Badge
                    className={
                      reg.attendance === "attended"
                        ? "bg-blue-500/10 text-blue-600"
                        : reg.attendance === "absent"
                        ? "bg-red-500/10 text-red-600"
                        : "bg-gray-500/10 text-gray-600"
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
                    className="flex-1"
                    onClick={() => setConfirmCancelId(reg.id)}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={openWhatsApp}
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= CANCEL CONFIRMATION MODAL ================= */}
      {confirmCancelId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-2xl w-[90%] max-w-sm space-y-4">
            <h2 className="text-lg font-bold">
              {t("تأكيد الإلغاء", "Confirm Cancellation")}
            </h2>

            <p className="text-sm text-muted-foreground">
              {t(
                "هل أنت متأكد من إلغاء التسجيل؟",
                "Are you sure you want to cancel?"
              )}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setConfirmCancelId(null)}
              >
                {t("رجوع", "Back")}
              </Button>

              <Button
                variant="destructive"
                className="flex-1"
                onClick={async () => {
                  await cancelRegistration(confirmCancelId);
                  setConfirmCancelId(null);
                  setShowWhatsApp(true);
                }}
              >
                {t("تأكيد", "Confirm")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= WHATSAPP MODAL ================= */}
      {showWhatsApp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-2xl w-[90%] max-w-sm space-y-4 text-center">
            <MessageCircle className="w-10 h-10 mx-auto text-green-500" />

            <h2 className="text-lg font-bold">
              {t("هل تحتاج مساعدة؟", "Need help?")}
            </h2>

            <p className="text-sm text-muted-foreground">
              {t(
                "يمكنك التواصل معنا لإعادة الحجز أو طلب استرجاع",
                "You can contact us for rebooking or refund support"
              )}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowWhatsApp(false)}
              >
                {t("لاحقاً", "Later")}
              </Button>

              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => {
                  const phone = "201234567890";
                  window.open(
                    `https://wa.me/${phone}?text=Hello%20I%20need%20help%20with%20my%20workshop%20cancellation`,
                    "_blank"
                  );
                  setShowWhatsApp(false);
                }}
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
