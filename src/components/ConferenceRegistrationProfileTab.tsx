import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";
import { Loader2, Ticket, Calendar, CreditCard, CheckCircle } from "lucide-react";

export default function ConferenceRegistrationProfileTab() {
  const { t } = useLanguage();
  const [registration, setRegistration] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReg = async () => {
      try {
        const res = await api.get("/conference/my-registration");
        setRegistration(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReg();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="bg-card rounded-3xl p-8 border border-border shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Ticket className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">
          {t("لست مسجلاً بعد", "Not registered yet")}
        </h3>
        <p className="text-muted-foreground mb-6">
          {t("لم تقم بالتسجيل في مؤتمر 2026 بعد.", "You have not registered for the 2026 conference yet.")}
        </p>
        <a href="/conference-2026#registration" className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
          {t("سجل الآن", "Register Now")}
        </a>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          <Ticket className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{t("حجز مؤتمر 2026", "Conference 2026 Registration")}</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4" />
            {new Date(registration.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-xl">
            <span className="text-sm text-muted-foreground block mb-1">{t("حالة الدفع", "Payment Status")}</span>
            <div className="flex items-center gap-2 font-bold">
              {registration.status === 'paid' ? (
                <><CheckCircle className="w-5 h-5 text-green-500" /> <span className="text-green-600">{t("مدفوع", "Paid")}</span></>
              ) : (
                <><CreditCard className="w-5 h-5 text-amber-500" /> <span className="text-amber-600">{t("قيد الانتظار", "Pending")}</span></>
              )}
            </div>
          </div>
          <div className="bg-muted/50 p-4 rounded-xl">
            <span className="text-sm text-muted-foreground block mb-1">{t("المبلغ الإجمالي", "Total Amount")}</span>
            <div className="font-bold text-xl">{registration.amount} SAR</div>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-xl">
          <span className="text-sm text-muted-foreground block mb-2">{t("ورش العمل المختارة", "Selected Workshops")}</span>
          {registration.selected_workshops && registration.selected_workshops.length > 0 ? (
            <ul className="space-y-2">
              {registration.selected_workshops.map((w: string) => (
                <li key={w} className="flex items-center gap-2 bg-background p-2 rounded-lg border border-border text-sm font-semibold">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  {w.toUpperCase()}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-muted-foreground bg-background p-3 rounded-lg border border-border">
              {t("لم يتم اختيار أي ورش عمل إضافية.", "No additional workshops selected.")}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <a href="/conference-2026" className="text-blue-600 font-semibold hover:underline">
          {t("الذهاب لصفحة المؤتمر", "Go to Conference Page")} &rarr;
        </a>
      </div>
    </div>
  );
}
