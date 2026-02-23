import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Bell,
  Mail,
  GraduationCap,
  FileText,
  Megaphone,
  MessageSquare,
  CheckCircle,
  Save,
  RefreshCw,
  Shield,
  Clock,
  Palette,
  Globe,
  Server,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

// ── Types ─────────────────────────────────────────────────────────────────────

interface NotificationSettings {
  workshopReminders: boolean;
  certificateNotifications: boolean;
  newsletterSubscription: boolean;
  promotionalEmails: boolean;
  registrationAlerts: boolean;
  systemAlerts: boolean;
  couponExpiry: boolean;
  membershipRenewals: boolean;
}

interface EmailSettings {
  senderName: string;
  senderEmail: string;
  replyToEmail: string;
  emailFooter: string;
  reminderHoursBefore: string;
  defaultTemplate: string;
}

interface DeliverySettings {
  sendTime: string;
  timezone: string;
  maxEmailsPerDay: string;
  unsubscribeLink: boolean;
  trackOpens: boolean;
  trackClicks: boolean;
}

// ── Mock defaults ─────────────────────────────────────────────────────────────

const defaultNotificationSettings: NotificationSettings = {
  workshopReminders: true,
  certificateNotifications: true,
  newsletterSubscription: true,
  promotionalEmails: false,
  registrationAlerts: true,
  systemAlerts: true,
  couponExpiry: true,
  membershipRenewals: true,
};

const defaultEmailSettings: EmailSettings = {
  senderName: "SPTA",
  senderEmail: "noreply@spta.ksu.edu.sa",
  replyToEmail: "support@spta.ksu.edu.sa",
  emailFooter:
    "الجمعية السعودية للعلاج الطبيعي | Saudi Physical Therapy Association\nجامعة الملك سعود، الرياض، المملكة العربية السعودية",
  reminderHoursBefore: "24",
  defaultTemplate: "modern",
};

const defaultDeliverySettings: DeliverySettings = {
  sendTime: "09:00",
  timezone: "Asia/Riyadh",
  maxEmailsPerDay: "500",
  unsubscribeLink: true,
  trackOpens: true,
  trackClicks: false,
};

// ── Component ─────────────────────────────────────────────────────────────────

const AdminCommunicationSettings = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [notifSettings, setNotifSettings] = useState<NotificationSettings>({
    ...defaultNotificationSettings,
  });
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    ...defaultEmailSettings,
  });
  const [deliverySettings, setDeliverySettings] = useState<DeliverySettings>({
    ...defaultDeliverySettings,
  });

  // ── API (uncomment when backend is ready) ─────────────────────────────────
  // useEffect(() => { fetchSettings(); }, []);

  // const fetchSettings = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await api.get('/admin/settings/communications');
  //     const data = res.data?.data || res.data;
  //     if (data?.notifications) setNotifSettings(data.notifications);
  //     if (data?.email) setEmailSettings(data.email);
  //     if (data?.delivery) setDeliverySettings(data.delivery);
  //   } catch {
  //     // fallback to defaults
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      // ── API call (uncomment when backend ready) ──
      // await api.put('/admin/settings/communications', {
      //   notifications: notifSettings,
      //   email: emailSettings,
      //   delivery: deliverySettings,
      // });

      await new Promise((r) => setTimeout(r, 800));
      toast({
        title: t("تم الحفظ", "Saved"),
        description: t(
          "تم حفظ جميع الإعدادات بنجاح",
          "All settings saved successfully"
        ),
      });
    } catch {
      toast({
        title: t("حدث خطأ", "Error"),
        description: t("فشل حفظ الإعدادات", "Failed to save settings"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setNotifSettings({ ...defaultNotificationSettings });
    setEmailSettings({ ...defaultEmailSettings });
    setDeliverySettings({ ...defaultDeliverySettings });
    toast({
      title: t("تم الإعادة", "Reset"),
      description: t(
        "تمت إعادة الإعدادات إلى الافتراضية",
        "Settings reset to defaults"
      ),
    });
  };

  // ── Notification toggles config ───────────────────────────────────────────

  const notifToggles: {
    id: keyof NotificationSettings;
    icon: any;
    labelAr: string;
    labelEn: string;
    descAr: string;
    descEn: string;
    badgeAr?: string;
    badgeEn?: string;
  }[] = [
    {
      id: "workshopReminders",
      icon: Bell,
      labelAr: "تذكيرات الورش",
      labelEn: "Workshop Reminders",
      descAr: "إرسال تذكيرات تلقائية للمشاركين قبل موعد الورشة",
      descEn:
        "Send automatic reminders to participants before the workshop date",
    },
    {
      id: "certificateNotifications",
      icon: GraduationCap,
      labelAr: "إشعارات الشهادات",
      labelEn: "Certificate Notifications",
      descAr: "إشعار المشاركين عند جاهزية شهادتهم للتحميل",
      descEn: "Notify participants when their certificate is ready to download",
    },
    {
      id: "newsletterSubscription",
      icon: FileText,
      labelAr: "النشرة الإخبارية",
      labelEn: "Newsletter Subscription",
      descAr: "إرسال النشرة الإخبارية الشهرية لجميع المشتركين",
      descEn: "Send monthly newsletter to all subscribers",
    },
    {
      id: "promotionalEmails",
      icon: Megaphone,
      labelAr: "العروض والترويج",
      labelEn: "Promotional Emails",
      descAr: "إرسال عروض وأكواد خصم حصرية للمشتركين",
      descEn: "Send exclusive offers and discount codes to subscribers",
      badgeAr: "اختياري",
      badgeEn: "Optional",
    },
    {
      id: "registrationAlerts",
      icon: Bell,
      labelAr: "تنبيهات التسجيل",
      labelEn: "Registration Alerts",
      descAr: "تنبيه الادمن عند تسجيل مستخدم جديد في ورشة",
      descEn: "Alert admins when a new user registers for a workshop",
    },
    {
      id: "systemAlerts",
      icon: AlertCircle,
      labelAr: "تنبيهات النظام",
      labelEn: "System Alerts",
      descAr: "تنبيهات عن أخطاء النظام والتحديثات المهمة",
      descEn: "Alerts about system errors and important updates",
      badgeAr: "موصى به",
      badgeEn: "Recommended",
    },
    {
      id: "couponExpiry",
      icon: MessageSquare,
      labelAr: "انتهاء الكوبونات",
      labelEn: "Coupon Expiry",
      descAr: "إشعار عند انتهاء صلاحية أكواد الخصم",
      descEn: "Notify when discount codes are about to expire",
    },
    {
      id: "membershipRenewals",
      icon: Shield,
      labelAr: "تجديد العضويات",
      labelEn: "Membership Renewals",
      descAr: "تذكير الأعضاء قبل انتهاء صلاحية عضويتهم",
      descEn: "Remind members before their membership expires",
    },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            {t("إعدادات التواصل", "Communication Settings")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "تخصيص إعدادات البريد الإلكتروني والإشعارات",
              "Customize email and notification preferences"
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {t("إعادة التعيين", "Reset Defaults")}
          </Button>
          <Button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="gap-2 bg-green-accent hover:bg-green-light"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {t("حفظ الإعدادات", "Save Settings")}
          </Button>
        </div>
      </div>

      {/* ── Section 1: Notification Toggles ─────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            {t("إعدادات الإشعارات", "Notification Settings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading
            ? [1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))
            : notifToggles.map((setting, index) => {
                const Icon = setting.icon;
                return (
                  <motion.div
                    key={setting.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {t(setting.labelAr, setting.labelEn)}
                          </h4>
                          {setting.badgeAr && (
                            <Badge variant="outline" className="text-xs">
                              {t(setting.badgeAr, setting.badgeEn || "")}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t(setting.descAr, setting.descEn)}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifSettings[setting.id]}
                      onCheckedChange={(checked) =>
                        setNotifSettings((prev) => ({
                          ...prev,
                          [setting.id]: checked,
                        }))
                      }
                    />
                  </motion.div>
                );
              })}
        </CardContent>
      </Card>

      {/* ── Section 2: Email Sender Settings ─────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            {t("إعدادات المرسل", "Sender Settings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                {t("اسم المرسل", "Sender Name")}
              </Label>
              <Input
                value={emailSettings.senderName}
                onChange={(e) =>
                  setEmailSettings((p) => ({
                    ...p,
                    senderName: e.target.value,
                  }))
                }
                placeholder="SPTA"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                {t("بريد المرسل", "Sender Email")}
              </Label>
              <Input
                type="email"
                value={emailSettings.senderEmail}
                onChange={(e) =>
                  setEmailSettings((p) => ({
                    ...p,
                    senderEmail: e.target.value,
                  }))
                }
                placeholder="noreply@spta.ksu.edu.sa"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                {t("بريد الرد", "Reply-To Email")}
              </Label>
              <Input
                type="email"
                value={emailSettings.replyToEmail}
                onChange={(e) =>
                  setEmailSettings((p) => ({
                    ...p,
                    replyToEmail: e.target.value,
                  }))
                }
                placeholder="support@spta.ksu.edu.sa"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                {t(
                  "ساعات التذكير قبل الورشة",
                  "Reminder Hours Before Workshop"
                )}
              </Label>
              <Select
                value={emailSettings.reminderHoursBefore}
                onValueChange={(v) =>
                  setEmailSettings((p) => ({ ...p, reminderHoursBefore: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">{t("6 ساعات", "6 hours")}</SelectItem>
                  <SelectItem value="12">{t("12 ساعة", "12 hours")}</SelectItem>
                  <SelectItem value="24">
                    {t("24 ساعة (يوم)", "24 hours (1 day)")}
                  </SelectItem>
                  <SelectItem value="48">
                    {t("48 ساعة (يومان)", "48 hours (2 days)")}
                  </SelectItem>
                  <SelectItem value="72">
                    {t("72 ساعة (3 أيام)", "72 hours (3 days)")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              {t("تذييل البريد الإلكتروني", "Email Footer")}
            </Label>
            <Textarea
              value={emailSettings.emailFooter}
              onChange={(e) =>
                setEmailSettings((p) => ({ ...p, emailFooter: e.target.value }))
              }
              placeholder={t(
                "نص يظهر في نهاية كل رسالة...",
                "Text displayed at the end of every email..."
              )}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-muted-foreground" />
              {t("القالب الافتراضي", "Default Template")}
            </Label>
            <Select
              value={emailSettings.defaultTemplate}
              onValueChange={(v) =>
                setEmailSettings((p) => ({ ...p, defaultTemplate: v }))
              }
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">{t("عصري", "Modern")}</SelectItem>
                <SelectItem value="classic">
                  {t("كلاسيكي", "Classic")}
                </SelectItem>
                <SelectItem value="minimal">{t("بسيط", "Minimal")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ── Section 3: Delivery Settings ─────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            {t("إعدادات الإرسال", "Delivery Settings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                {t("وقت الإرسال المفضل", "Preferred Send Time")}
              </Label>
              <Input
                type="time"
                value={deliverySettings.sendTime}
                onChange={(e) =>
                  setDeliverySettings((p) => ({
                    ...p,
                    sendTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                {t("المنطقة الزمنية", "Timezone")}
              </Label>
              <Select
                value={deliverySettings.timezone}
                onValueChange={(v) =>
                  setDeliverySettings((p) => ({ ...p, timezone: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Riyadh">
                    {t("الرياض (UTC+3)", "Riyadh (UTC+3)")}
                  </SelectItem>
                  <SelectItem value="Asia/Dubai">
                    {t("دبي (UTC+4)", "Dubai (UTC+4)")}
                  </SelectItem>
                  <SelectItem value="Africa/Cairo">
                    {t("القاهرة (UTC+2)", "Cairo (UTC+2)")}
                  </SelectItem>
                  <SelectItem value="UTC">{t("UTC", "UTC")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-muted-foreground" />
                {t("الحد الأقصى للرسائل اليومية", "Max Emails Per Day")}
              </Label>
              <Input
                type="number"
                min="1"
                value={deliverySettings.maxEmailsPerDay}
                onChange={(e) =>
                  setDeliverySettings((p) => ({
                    ...p,
                    maxEmailsPerDay: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* Tracking toggles */}
          <div className="space-y-3 pt-2">
            {[
              {
                id: "unsubscribeLink" as keyof DeliverySettings,
                labelAr: "رابط إلغاء الاشتراك",
                labelEn: "Unsubscribe Link",
                descAr: "إضافة رابط إلغاء الاشتراك تلقائياً في نهاية كل رسالة",
                descEn:
                  "Automatically add unsubscribe link at the end of every email",
                badgeAr: "مطلوب قانونياً",
                badgeEn: "Legally Required",
              },
              {
                id: "trackOpens" as keyof DeliverySettings,
                labelAr: "تتبع فتح الرسائل",
                labelEn: "Track Email Opens",
                descAr: "تتبع من يفتح رسائل البريد الإلكتروني لقياس معدل الفتح",
                descEn: "Track who opens emails to measure open rate",
              },
              {
                id: "trackClicks" as keyof DeliverySettings,
                labelAr: "تتبع النقرات",
                labelEn: "Track Link Clicks",
                descAr: "تتبع النقرات على الروابط داخل البريد الإلكتروني",
                descEn: "Track clicks on links inside emails",
              },
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">
                      {t(item.labelAr, item.labelEn)}
                    </h4>
                    {item.badgeAr && (
                      <Badge
                        variant="outline"
                        className="text-xs text-yellow-600 border-yellow-500/30 bg-yellow-500/10"
                      >
                        {t(item.badgeAr, item.badgeEn || "")}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t(item.descAr, item.descEn)}
                  </p>
                </div>
                <Switch
                  checked={deliverySettings[item.id] as boolean}
                  onCheckedChange={(checked) =>
                    setDeliverySettings((prev) => ({
                      ...prev,
                      [item.id]: checked,
                    }))
                  }
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save bar (sticky) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky bottom-4 z-10"
      >
        <Card className="border-primary/20 bg-background/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                {t(
                  "لا تنسَ حفظ التغييرات قبل المغادرة",
                  "Don't forget to save changes before leaving"
                )}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  {t("إلغاء", "Cancel")}
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveAll}
                  disabled={isSaving}
                  className="bg-green-accent hover:bg-green-light gap-2"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {t("حفظ الإعدادات", "Save Settings")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminCommunicationSettings;
