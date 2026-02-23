import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Send,
  Search,
  Filter,
  Plus,
  Eye,
  Clock,
  Users,
  Calendar,
  FileText,
  Inbox,
  Archive,
  Trash2,
  RefreshCw,
  MailCheck,
  MailX,
  Sparkles,
  MessageSquare,
  Megaphone,
  GraduationCap,
  Bell,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Email {
  id: number;
  subject: string;
  subjectEn: string;
  type:
    | "reminder"
    | "newsletter"
    | "certificate"
    | "promotion"
    | "notification";
  status: "sent" | "scheduled" | "draft" | "failed";
  recipientType: "all" | "members" | "workshop";
  workshopId: number | null;
  recipientCount: number;
  sentAt: string | null;
  openRate: number;
  template: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockEmails: Email[] = [
  {
    id: 1,
    subject: "تذكير: ورشة التأهيل الحركي المتقدم",
    subjectEn: "Reminder: Advanced Motor Rehabilitation Workshop",
    type: "reminder",
    status: "sent",
    recipientType: "workshop",
    workshopId: 1,
    recipientCount: 35,
    sentAt: "2024-03-14T10:00:00",
    openRate: 78,
    template: "reminder",
  },
  {
    id: 2,
    subject: "النشرة الإخبارية الشهرية - مارس 2024",
    subjectEn: "Monthly Newsletter - March 2024",
    type: "newsletter",
    status: "sent",
    recipientType: "all",
    workshopId: null,
    recipientCount: 1250,
    sentAt: "2024-03-01T09:00:00",
    openRate: 45,
    template: "newsletter",
  },
  {
    id: 3,
    subject: "شهادتك جاهزة للتحميل",
    subjectEn: "Your Certificate is Ready",
    type: "certificate",
    status: "sent",
    recipientType: "workshop",
    workshopId: 2,
    recipientCount: 40,
    sentAt: "2024-04-21T14:30:00",
    openRate: 92,
    template: "certificate",
  },
  {
    id: 4,
    subject: "دعوة للتسجيل في ورشة جديدة",
    subjectEn: "Invitation to Register for New Workshop",
    type: "promotion",
    status: "scheduled",
    recipientType: "members",
    workshopId: 3,
    recipientCount: 850,
    sentAt: "2024-05-05T10:00:00",
    openRate: 0,
    template: "promotion",
  },
  {
    id: 5,
    subject: "تحديث بيانات العضوية",
    subjectEn: "Membership Data Update",
    type: "notification",
    status: "draft",
    recipientType: "members",
    workshopId: null,
    recipientCount: 0,
    sentAt: null,
    openRate: 0,
    template: "notification",
  },
];

const EMPTY_COMPOSE = {
  subject: "",
  recipientType: "all",
  workshopId: "",
  template: "custom",
  content: "",
};

// ── Component ─────────────────────────────────────────────────────────────────

const AdminNewsletter = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [newEmail, setNewEmail] = useState({ ...EMPTY_COMPOSE });

  // ── API (uncomment when backend is ready) ─────────────────────────────────
  // useEffect(() => { fetchEmails(); }, []);

  // const fetchEmails = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await api.get('/admin/emails');
  //     const data = res.data?.data || res.data || [];
  //     setEmails(Array.isArray(data) ? data : []);
  //   } catch {
  //     setEmails(mockEmails);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // ── Stats ─────────────────────────────────────────────────────────────────

  const sentEmails = emails.filter((e) => e.status === "sent");
  const stats = {
    totalSent: sentEmails.length,
    scheduled: emails.filter((e) => e.status === "scheduled").length,
    drafts: emails.filter((e) => e.status === "draft").length,
    avgOpenRate:
      sentEmails.length > 0
        ? Math.round(
            sentEmails.reduce((acc, e) => acc + e.openRate, 0) /
              sentEmails.length
          )
        : 0,
  };

  // ── Filtered ──────────────────────────────────────────────────────────────

  const filtered = emails.filter((email) => {
    const matchesSearch =
      email.subject.includes(searchQuery) ||
      email.subjectEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || email.type === filterType;
    const matchesStatus =
      filterStatus === "all" || email.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // ── Badges ────────────────────────────────────────────────────────────────

  const getTypeBadge = (type: string) => {
    const configs: Record<
      string,
      { color: string; icon: any; labelAr: string; labelEn: string }
    > = {
      reminder: {
        color: "bg-blue-light/10 text-blue-light border-blue-light/30",
        icon: Bell,
        labelAr: "تذكير",
        labelEn: "Reminder",
      },
      newsletter: {
        color: "bg-primary/10 text-primary border-primary/30",
        icon: FileText,
        labelAr: "نشرة",
        labelEn: "Newsletter",
      },
      certificate: {
        color: "bg-green-accent/10 text-green-accent border-green-accent/30",
        icon: GraduationCap,
        labelAr: "شهادة",
        labelEn: "Certificate",
      },
      promotion: {
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
        icon: Megaphone,
        labelAr: "ترويج",
        labelEn: "Promotion",
      },
      notification: {
        color: "bg-purple-500/10 text-purple-600 border-purple-500/30",
        icon: MessageSquare,
        labelAr: "إشعار",
        labelEn: "Notification",
      },
    };
    const config = configs[type] || configs.notification;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<
      string,
      { color: string; icon: any; labelAr: string; labelEn: string }
    > = {
      sent: {
        color: "bg-green-accent/10 text-green-accent border-green-accent/30",
        icon: MailCheck,
        labelAr: "مرسل",
        labelEn: "Sent",
      },
      scheduled: {
        color: "bg-blue-light/10 text-blue-light border-blue-light/30",
        icon: Clock,
        labelAr: "مجدول",
        labelEn: "Scheduled",
      },
      draft: {
        color: "bg-muted text-muted-foreground border-border",
        icon: FileText,
        labelAr: "مسودة",
        labelEn: "Draft",
      },
      failed: {
        color: "bg-destructive/10 text-destructive border-destructive/30",
        icon: MailX,
        labelAr: "فشل",
        labelEn: "Failed",
      },
    };
    const config = configs[status] || configs.draft;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  // ── Actions ───────────────────────────────────────────────────────────────

  const handleSend = async () => {
    setIsSending(true);
    try {
      // ── API call (uncomment when backend ready) ──
      // await api.post('/admin/emails/send', {
      //   subject: newEmail.subject,
      //   recipient_type: newEmail.recipientType,
      //   workshop_id: newEmail.workshopId || null,
      //   template: newEmail.template,
      //   content: newEmail.content,
      // });

      // ── Mock fallback ──
      await new Promise((r) => setTimeout(r, 1500));
      const created: Email = {
        id: emails.length + 1,
        subject: newEmail.subject || t("(بدون موضوع)", "(No subject)"),
        subjectEn: newEmail.subject || "(No subject)",
        type: newEmail.template as Email["type"],
        status: "sent",
        recipientType: newEmail.recipientType as Email["recipientType"],
        workshopId: newEmail.workshopId ? parseInt(newEmail.workshopId) : null,
        recipientCount:
          newEmail.recipientType === "all"
            ? 1250
            : newEmail.recipientType === "members"
            ? 850
            : 35,
        sentAt: new Date().toISOString(),
        openRate: 0,
        template: newEmail.template,
      };
      setEmails((prev) => [created, ...prev]);
      setIsComposeOpen(false);
      setNewEmail({ ...EMPTY_COMPOSE });
      toast({
        title: t("تم الإرسال", "Sent"),
        description: t(
          "تم إرسال البريد الإلكتروني بنجاح",
          "Email sent successfully"
        ),
      });
    } catch {
      toast({
        title: t("حدث خطأ", "Error"),
        description: t("فشل إرسال الرسالة", "Failed to send email"),
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveAsDraft = async () => {
    try {
      // ── API call (uncomment when backend ready) ──
      // await api.post('/admin/emails/draft', { ... });

      const draft: Email = {
        id: emails.length + 1,
        subject:
          newEmail.subject || t("(مسودة بدون موضوع)", "(Draft no subject)"),
        subjectEn: newEmail.subject || "(Draft no subject)",
        type: "notification",
        status: "draft",
        recipientType: newEmail.recipientType as Email["recipientType"],
        workshopId: null,
        recipientCount: 0,
        sentAt: null,
        openRate: 0,
        template: newEmail.template,
      };
      setEmails((prev) => [...prev, draft]);
      setIsComposeOpen(false);
      setNewEmail({ ...EMPTY_COMPOSE });
      toast({
        title: t("تم الحفظ", "Saved"),
        description: t("تم حفظ الرسالة كمسودة", "Email saved as draft"),
      });
    } catch {
      toast({ title: t("حدث خطأ", "Error"), variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // await api.delete(`/admin/emails/${id}`);
      setEmails((prev) => prev.filter((e) => e.id !== id));
      toast({
        title: t("تم الحذف", "Deleted"),
        description: t("تم حذف الرسالة", "Email deleted"),
      });
    } catch {
      toast({ title: t("حدث خطأ", "Error"), variant: "destructive" });
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" />
            {t("البريد الإلكتروني والنشرات", "Email & Newsletter")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "إدارة التواصل مع المستخدمين والمشاركين في الورش",
              "Manage communication with users and workshop participants"
            )}
          </p>
        </div>
        <Button
          onClick={() => setIsComposeOpen(true)}
          className="gap-2 bg-green-accent hover:bg-green-light"
        >
          <Plus className="w-4 h-4" />
          {t("رسالة جديدة", "New Email")}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? [1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))
          : [
              {
                icon: MailCheck,
                value: stats.totalSent,
                label: t("رسائل مرسلة", "Emails Sent"),
                color: "text-green-accent",
              },
              {
                icon: Clock,
                value: stats.scheduled,
                label: t("مجدولة", "Scheduled"),
                color: "text-blue-light",
              },
              {
                icon: FileText,
                value: stats.drafts,
                label: t("مسودات", "Drafts"),
                color: "text-muted-foreground",
              },
              {
                icon: Eye,
                value: `${stats.avgOpenRate}%`,
                label: t("معدل الفتح", "Open Rate"),
                color: "text-primary",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <stat.icon
                      className={`w-8 h-8 mx-auto mb-2 ${stat.color}`}
                    />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 ${
                  isRTL ? "right-3" : "left-3"
                } w-4 h-4 text-muted-foreground`}
              />
              <Input
                placeholder={t("بحث في الرسائل...", "Search emails...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={isRTL ? "pr-10" : "pl-10"}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Filter className="w-4 h-4 me-2" />
                <SelectValue placeholder={t("النوع", "Type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                <SelectItem value="reminder">
                  {t("تذكير", "Reminder")}
                </SelectItem>
                <SelectItem value="newsletter">
                  {t("نشرة", "Newsletter")}
                </SelectItem>
                <SelectItem value="certificate">
                  {t("شهادة", "Certificate")}
                </SelectItem>
                <SelectItem value="promotion">
                  {t("ترويج", "Promotion")}
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder={t("الحالة", "Status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                <SelectItem value="sent">{t("مرسل", "Sent")}</SelectItem>
                <SelectItem value="scheduled">
                  {t("مجدول", "Scheduled")}
                </SelectItem>
                <SelectItem value="draft">{t("مسودة", "Draft")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Emails List */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              <AnimatePresence>
                {filtered.map((email, index) => (
                  <motion.div
                    key={email.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.04 }}
                    className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                    onClick={() => {
                      setSelectedEmail(email);
                      setIsPreviewOpen(true);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          email.status === "sent"
                            ? "bg-green-accent/10"
                            : email.status === "scheduled"
                            ? "bg-blue-light/10"
                            : "bg-muted"
                        }`}
                      >
                        <Mail
                          className={`w-5 h-5 ${
                            email.status === "sent"
                              ? "text-green-accent"
                              : email.status === "scheduled"
                              ? "text-blue-light"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {getTypeBadge(email.type)}
                          {getStatusBadge(email.status)}
                        </div>
                        <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                          {t(email.subject, email.subjectEn)}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {email.recipientCount} {t("مستلم", "recipients")}
                          </span>
                          {email.sentAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(email.sentAt).toLocaleDateString(
                                isRTL ? "ar-SA" : "en-US"
                              )}
                            </span>
                          )}
                          {email.status === "sent" && (
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              {email.openRate}% {t("فتح", "opened")}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEmail(email);
                            setIsPreviewOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Archive className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(email.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <Inbox className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    {t("لا توجد رسائل", "No emails found")}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Compose Dialog ─────────────────────────────────────────────────── */}
      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              {t("إنشاء رسالة جديدة", "Compose New Email")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "أرسل رسالة إلى المشتركين أو المشاركين في ورشة",
                "Send an email to subscribers or workshop participants"
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t("الموضوع", "Subject")}</Label>
              <Input
                value={newEmail.subject}
                onChange={(e) =>
                  setNewEmail({ ...newEmail, subject: e.target.value })
                }
                placeholder={t(
                  "أدخل موضوع الرسالة...",
                  "Enter email subject..."
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("المستلمون", "Recipients")}</Label>
                <Select
                  value={newEmail.recipientType}
                  onValueChange={(v) =>
                    setNewEmail({ ...newEmail, recipientType: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("جميع المشتركين", "All Subscribers")}
                    </SelectItem>
                    <SelectItem value="members">
                      {t("الأعضاء فقط", "Members Only")}
                    </SelectItem>
                    <SelectItem value="workshop">
                      {t("مشاركو ورشة", "Workshop Participants")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t("القالب", "Template")}</Label>
                <Select
                  value={newEmail.template}
                  onValueChange={(v) =>
                    setNewEmail({ ...newEmail, template: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">
                      {t("مخصص", "Custom")}
                    </SelectItem>
                    <SelectItem value="reminder">
                      {t("تذكير", "Reminder")}
                    </SelectItem>
                    <SelectItem value="newsletter">
                      {t("نشرة إخبارية", "Newsletter")}
                    </SelectItem>
                    <SelectItem value="certificate">
                      {t("شهادة", "Certificate")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("المحتوى", "Content")}</Label>
              <Textarea
                value={newEmail.content}
                onChange={(e) =>
                  setNewEmail({ ...newEmail, content: e.target.value })
                }
                placeholder={t(
                  "اكتب محتوى الرسالة هنا...",
                  "Write email content here..."
                )}
                className="min-h-[200px]"
              />
            </div>

            {/* Preview panel */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">
                  {t("معاينة", "Preview")}
                </span>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="border-b pb-3 mb-3">
                  <p className="text-sm text-muted-foreground">
                    {t("من:", "From:")} SPTA &lt;noreply@spta.ksu.edu.sa&gt;
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("الموضوع:", "Subject:")}{" "}
                    {newEmail.subject || t("(بدون موضوع)", "(No subject)")}
                  </p>
                </div>
                <p className="text-sm whitespace-pre-wrap">
                  {newEmail.content || t("(بدون محتوى)", "(No content)")}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleSaveAsDraft}>
              {t("حفظ كمسودة", "Save as Draft")}
            </Button>
            <Button
              onClick={handleSend}
              className="bg-green-accent hover:bg-green-light gap-2"
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {t("جاري الإرسال...", "Sending...")}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t("إرسال", "Send")}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Preview Dialog ─────────────────────────────────────────────────── */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              {t("معاينة الرسالة", "Email Preview")}
            </DialogTitle>
          </DialogHeader>

          {selectedEmail && (
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                {getTypeBadge(selectedEmail.type)}
                {getStatusBadge(selectedEmail.status)}
              </div>
              <h3 className="text-xl font-bold">
                {t(selectedEmail.subject, selectedEmail.subjectEn)}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedEmail.recipientCount} {t("مستلم", "recipients")}
                </span>
                {selectedEmail.sentAt && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedEmail.sentAt).toLocaleString(
                      isRTL ? "ar-SA" : "en-US"
                    )}
                  </span>
                )}
              </div>

              {selectedEmail.status === "sent" && (
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MailCheck className="w-8 h-8 mx-auto mb-2 text-green-accent" />
                      <p className="text-2xl font-bold">
                        {selectedEmail.recipientCount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("مرسل", "Delivered")}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Eye className="w-8 h-8 mx-auto mb-2 text-blue-light" />
                      <p className="text-2xl font-bold">
                        {selectedEmail.openRate}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("معدل الفتح", "Open Rate")}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">
                        {Math.round(
                          (selectedEmail.recipientCount *
                            selectedEmail.openRate) /
                            100
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("فتحوا الرسالة", "Opened")}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              {t("إغلاق", "Close")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNewsletter;
