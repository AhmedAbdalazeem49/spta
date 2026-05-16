import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  Hash,
  Loader2,
  Plus,
  Printer,
  QrCode,
  Search,
  Settings,
  Shield,
  Signature,
  Sparkles,
  Stamp,
  User,
  UserSearch,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Certificate {
  id: string | number;
  recipient_name?: string;
  recipientNameAr?: string;
  recipientNameEn?: string;
  workshop_title?: string;
  workshopTitleAr?: string;
  workshopTitleEn?: string;
  workshop_date?: string;
  workshopDate?: string;
  issue_date?: string;
  issueDate?: string;
  hours?: number;
  status?: string;
  verification_url?: string;
  verificationUrl?: string;
}

interface Workshop {
  id: string | number;
  title?: string;
  titleAr?: string;
  titleEn?: string;
  date?: string;
  hours?: number;
}

interface Recipient {
  id: string | number;
  name?: string;
  nameAr?: string;
  nameEn?: string;
  email?: string;
}

const EMPTY_FORM = {
  // Selectors
  workshopId: "",
  recipientId: "",
  // Manual overrides / extras
  manualRecipientName: "",
  manualWorkshopTitle: "",
  issueDate: "",
  hours: "",
  status: "pending",
};

const AdminCertificatesPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  // Data state
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // View / preview dialog
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Quick verify
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyResult, setVerifyResult] = useState<"success" | "error" | null>(
    null
  );

  // Certificate settings dialog
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [certificateSettings, setCertificateSettings] = useState({
    signatureImageUrl: "",
    stampImageUrl: "",
    customText: "",
    template: "modern",
  });

  // ── Add Certificate dialog ────────────────────────────────────────────────
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [addStep, setAddStep] = useState<"form" | "preview">("form");

  // Workshops & recipients for selectors
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [workshopsLoading, setWorkshopsLoading] = useState(false);
  const [recipientsLoading, setRecipientsLoading] = useState(false);
  const [workshopSearch, setWorkshopSearch] = useState("");
  const [recipientSearch, setRecipientSearch] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Fetch workshops & recipients when add dialog opens
  useEffect(() => {
    if (!isAddOpen) return;
    fetchWorkshops();
    fetchRecipients();
  }, [isAddOpen]);

  const fetchCertificates = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/certificates");
      const data = res.data?.data || res.data || [];
      setCertificates(Array.isArray(data) ? data : []);
    } catch {
      setCertificates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWorkshops = async () => {
    setWorkshopsLoading(true);
    try {
      const res = await api.get("/admin/workshops");
      const data = res.data?.data || res.data || [];
      setWorkshops(Array.isArray(data) ? data : []);
    } catch {
      setWorkshops([]);
    } finally {
      setWorkshopsLoading(false);
    }
  };

  const fetchRecipients = async () => {
    setRecipientsLoading(true);
    try {
      const res = await api.get("/admin/users");
      const data = res.data?.data || res.data || [];
      setRecipients(Array.isArray(data) ? data : []);
    } catch {
      setRecipients([]);
    } finally {
      setRecipientsLoading(false);
    }
  };

  // Derived helpers for the add form
  const selectedWorkshop = workshops.find(
    (w) => String(w.id) === form.workshopId
  );
  const selectedRecipient = recipients.find(
    (r) => String(r.id) === form.recipientId
  );

  const getWorkshopName = (w: Workshop) =>
    w.title || t(w.titleAr || "", w.titleEn || "");

  const getRecipientName = (r: Recipient) =>
    r.name || t(r.nameAr || "", r.nameEn || "");

  const filteredWorkshops = workshops.filter((w) =>
    getWorkshopName(w).toLowerCase().includes(workshopSearch.toLowerCase())
  );

  const filteredRecipients = recipients.filter(
    (r) =>
      getRecipientName(r)
        .toLowerCase()
        .includes(recipientSearch.toLowerCase()) ||
      (r.email || "").toLowerCase().includes(recipientSearch.toLowerCase())
  );

  // Resolved preview values (selector takes priority, manual is fallback)
  const previewName =
    (selectedRecipient ? getRecipientName(selectedRecipient) : "") ||
    form.manualRecipientName ||
    t("— اسم المستلم —", "— Recipient Name —");

  const previewWorkshop =
    (selectedWorkshop ? getWorkshopName(selectedWorkshop) : "") ||
    form.manualWorkshopTitle ||
    t("— اسم الورشة —", "— Workshop Title —");

  const previewDate = form.issueDate || (selectedWorkshop?.date ?? "") || "—";

  const previewHours =
    form.hours ||
    (selectedWorkshop?.hours ? String(selectedWorkshop.hours) : "");

  const handleAddOpen = () => {
    setForm({ ...EMPTY_FORM });
    setAddStep("form");
    setWorkshopSearch("");
    setRecipientSearch("");
    setIsAddOpen(true);
  };

  const handleSubmitCertificate = async () => {
    if (!previewName || !previewWorkshop) {
      toast({
        title: t("بيانات ناقصة", "Missing data"),
        description: t(
          "يرجى اختيار المستلم والورشة على الأقل",
          "Please select at least a recipient and workshop"
        ),
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post("/admin/certificates", {
        workshop_id: form.workshopId || undefined,
        recipient_id: form.recipientId || undefined,
        recipient_name: form.manualRecipientName || undefined,
        workshop_title: form.manualWorkshopTitle || undefined,
        issue_date: previewDate !== "—" ? previewDate : undefined,
        hours: previewHours ? Number(previewHours) : undefined,
        status: form.status,
      });
      toast({
        title: t("تم إنشاء الشهادة", "Certificate Created"),
        description: t(
          "تمت إضافة الشهادة بنجاح",
          "Certificate added successfully"
        ),
      });
      setIsAddOpen(false);
      fetchCertificates();
    } catch {
      toast({
        title: t("حدث خطأ", "Error"),
        description: t("فشل إنشاء الشهادة", "Failed to create certificate"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const getName = (c: Certificate) =>
    c.recipient_name || t(c.recipientNameAr || "", c.recipientNameEn || "");

  const getWorkshop = (c: Certificate) =>
    c.workshop_title || t(c.workshopTitleAr || "", c.workshopTitleEn || "");

  const getDate = (c: Certificate) =>
    c.issue_date || c.issueDate || c.workshop_date || c.workshopDate || "—";

  const getVerificationUrl = (c: Certificate) =>
    c.verification_url || c.verificationUrl || "";

  const getStatusBadge = (status?: string) => {
    const configs: Record<
      string,
      { color: string; icon: any; labelAr: string; labelEn: string }
    > = {
      verified: {
        color: "bg-green-accent/10 text-green-accent border-green-accent/30",
        icon: CheckCircle,
        labelAr: "موثقة",
        labelEn: "Verified",
      },
      pending: {
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
        icon: Clock,
        labelAr: "قيد المعالجة",
        labelEn: "Pending",
      },
      revoked: {
        color: "bg-destructive/10 text-destructive border-destructive/30",
        icon: XCircle,
        labelAr: "ملغاة",
        labelEn: "Revoked",
      },
    };
    const config = configs[status || "pending"] || configs.pending;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1 text-xs`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  // ── Filtered list ─────────────────────────────────────────────────────────────

  const filtered = certificates.filter((c) => {
    const name = getName(c).toLowerCase();
    const workshop = getWorkshop(c).toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      name.includes(q) ||
      workshop.includes(q) ||
      String(c.id).toLowerCase().includes(q);
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // ── Actions ───────────────────────────────────────────────────────────────────

  const handleVerify = () => {
    const found = certificates.find(
      (c) => String(c.id).toUpperCase() === verifyCode.toUpperCase()
    );
    if (found && found.status === "verified") {
      setVerifyResult("success");
      setSelected(found);
    } else {
      setVerifyResult("error");
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: t("تم النسخ", "Copied"),
      description: t("تم نسخ رابط التحقق", "Verification link copied"),
    });
  };

  const openPreview = (cert: Certificate) => {
    setSelected(cert);
    setIsPreviewOpen(true);
  };

  const openDetails = (cert: Certificate) => {
    setSelected(cert);
    setIsViewOpen(true);
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            {t("إدارة الشهادات", "Certificates Management")}
          </h2>
          <p className="text-muted-foreground">
            {t("عرض وإدارة جميع الشهادات", "View and manage all certificates")}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={handleAddOpen}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            {t("إضافة شهادة", "Add Certificate")}
          </Button>
          <Button
            onClick={() => setIsSettingsOpen(true)}
            variant="outline"
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            {t("إعدادات الشهادة", "Certificate Settings")}
          </Button>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <Tabs defaultValue="certificates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="certificates" className="gap-2">
            <Award className="w-4 h-4" />
            {t("الشهادات", "Certificates")}
          </TabsTrigger>
          {/* <TabsTrigger value="verify" className="gap-2">
            <Shield className="w-4 h-4" />
            {t("التحقق السريع", "Quick Verify")}
          </TabsTrigger> */}
          {/* <TabsTrigger value="templates" className="gap-2">
            <FileText className="w-4 h-4" />
            {t("القوالب", "Templates")}
          </TabsTrigger> */}
        </TabsList>

        {/* ══ Certificates Tab ══════════════════════════════════════════════ */}
        <TabsContent value="certificates" className="space-y-6">
          {/* Search & Filter */}
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
                    placeholder={t(
                      "بحث بالاسم أو رقم الشهادة...",
                      "Search by name or certificate number..."
                    )}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={isRTL ? "pr-10" : "pl-10"}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="w-4 h-4 me-2" />
                    <SelectValue placeholder={t("الحالة", "Status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                    <SelectItem value="verified">
                      {t("موثقة", "Verified")}
                    </SelectItem>
                    <SelectItem value="pending">
                      {t("قيد المعالجة", "Pending")}
                    </SelectItem>
                    <SelectItem value="revoked">
                      {t("ملغاة", "Revoked")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Grid Cards */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                {t("لا توجد شهادات", "No certificates found")}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden group h-full hover:shadow-md transition-shadow">
                      <div className="h-2 bg-gradient-to-r from-primary to-green-accent" />
                      <CardContent className="p-6">
                        {/* Mini cert preview header */}
                        <div className="relative bg-gradient-to-br from-midnight to-dark-navy p-4 rounded-xl mb-4 overflow-hidden">
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5l5 3.5-5 3.5z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                            }}
                          />
                          <div className="relative z-10 text-center text-primary-foreground">
                            <Award className="w-10 h-10 mx-auto mb-2 text-mint" />
                            <h4 className="font-bold text-sm">
                              {t("شهادة حضور", "Certificate of Attendance")}
                            </h4>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-bold">{getName(cert)}</p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {cert.id}
                              </p>
                            </div>
                            {getStatusBadge(cert.status)}
                          </div>

                          <div className="text-sm space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                              <span className="truncate">
                                {getWorkshop(cert)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary shrink-0" />
                              {getDate(cert)}
                            </div>
                            {cert.hours && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4 text-primary shrink-0" />
                                {cert.hours}{" "}
                                {t("ساعات تدريبية", "training hours")}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1"
                            onClick={() => openDetails(cert)}
                          >
                            <Eye className="w-4 h-4" />
                            {t("التفاصيل", "Details")}
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 gap-1 bg-green-accent hover:bg-green-light"
                            onClick={() => openPreview(cert)}
                          >
                            <Award className="w-4 h-4" />
                            {t("معاينة", "Preview")}
                          </Button>
                          {getVerificationUrl(cert) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleCopyLink(getVerificationUrl(cert))
                              }
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Table view below the grid for quick scanning */}
          {!isLoading && filtered.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t("عرض الجدول", "Table View")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-start p-4 font-semibold text-sm">
                          {t("الرقم", "ID")}
                        </th>
                        <th className="text-start p-4 font-semibold text-sm">
                          {t("المستلم", "Recipient")}
                        </th>
                        <th className="text-start p-4 font-semibold text-sm">
                          {t("الورشة", "Workshop")}
                        </th>
                        <th className="text-start p-4 font-semibold text-sm">
                          {t("التاريخ", "Date")}
                        </th>
                        <th className="text-start p-4 font-semibold text-sm">
                          {t("الحالة", "Status")}
                        </th>
                        <th className="text-start p-4 font-semibold text-sm">
                          {t("الإجراءات", "Actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((c, i) => (
                        <motion.tr
                          key={c.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.02 }}
                          className="border-t border-border hover:bg-muted/30 transition-colors"
                        >
                          <td className="p-4 text-sm font-mono text-muted-foreground">
                            {c.id}
                          </td>
                          <td className="p-4 text-sm font-medium">
                            {getName(c)}
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {getWorkshop(c)}
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {getDate(c)}
                          </td>
                          <td className="p-4">{getStatusBadge(c.status)}</td>
                          <td className="p-4 flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openDetails(c)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openPreview(c)}
                            >
                              <Award className="w-4 h-4" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ══ Quick Verify Tab ═════════════════════════════════════════════ */}
        <TabsContent value="verify">
          <Card className="max-w-2xl mx-auto overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary via-blue-light to-green-accent" />
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {t("التحقق من الشهادة", "Verify Certificate")}
                </h2>
                <p className="text-muted-foreground">
                  {t(
                    "أدخل رقم الشهادة للتحقق من صحتها",
                    "Enter certificate number to verify its authenticity"
                  )}
                </p>
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <QrCode className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder={t(
                      "مثال: CERT-2024-001",
                      "e.g., CERT-2024-001"
                    )}
                    value={verifyCode}
                    onChange={(e) => {
                      setVerifyCode(e.target.value);
                      setVerifyResult(null);
                    }}
                    className="ps-12 h-12 text-lg"
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  />
                </div>
                <Button
                  onClick={handleVerify}
                  className="h-12 px-8 bg-green-accent hover:bg-green-light gap-2"
                >
                  <Search className="w-5 h-5" />
                  {t("تحقق", "Verify")}
                </Button>
              </div>

              <AnimatePresence>
                {verifyResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-6 p-4 rounded-xl ${
                      verifyResult === "success"
                        ? "bg-green-accent/10 border border-green-accent/30"
                        : "bg-destructive/10 border border-destructive/30"
                    }`}
                  >
                    {verifyResult === "success" && selected ? (
                      <div className="flex items-start gap-4">
                        <CheckCircle className="w-8 h-8 text-green-accent flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-bold text-green-accent mb-2">
                            {t("شهادة موثقة ✓", "Certificate Verified ✓")}
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-2 text-sm">
                            <p>
                              <strong>{t("الاسم:", "Name:")}</strong>{" "}
                              {getName(selected)}
                            </p>
                            <p>
                              <strong>{t("الورشة:", "Workshop:")}</strong>{" "}
                              {getWorkshop(selected)}
                            </p>
                            <p>
                              <strong>{t("التاريخ:", "Date:")}</strong>{" "}
                              {getDate(selected)}
                            </p>
                            {selected.hours && (
                              <p>
                                <strong>{t("الساعات:", "Hours:")}</strong>{" "}
                                {selected.hours}
                              </p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-3 gap-1"
                            onClick={() => openPreview(selected)}
                          >
                            <Eye className="w-4 h-4" />
                            {t("معاينة الشهادة", "Preview Certificate")}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-destructive">
                            {t("شهادة غير موجودة", "Certificate Not Found")}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t(
                              "تأكد من صحة رقم الشهادة المدخل",
                              "Please check the certificate number and try again"
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══ Templates Tab ════════════════════════════════════════════════ */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {(["modern", "classic", "elegant"] as const).map(
              (template, index) => (
                <motion.div
                  key={template}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      certificateSettings.template === template
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() =>
                      setCertificateSettings({
                        ...certificateSettings,
                        template,
                      })
                    }
                  >
                    <CardContent className="p-6">
                      <div className="aspect-[1.4/1] bg-gradient-to-br from-midnight to-dark-navy rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage:
                              template === "modern"
                                ? `linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 50%, transparent 52%)`
                                : template === "classic"
                                ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)`
                                : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E")`,
                          }}
                        />
                        <Award className="w-16 h-16 text-green-accent/50" />
                        {certificateSettings.template === template && (
                          <div className="absolute top-2 end-2">
                            <CheckCircle className="w-6 h-6 text-green-accent" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-center">
                        {template === "modern" && t("عصري", "Modern")}
                        {template === "classic" && t("كلاسيكي", "Classic")}
                        {template === "elegant" && t("أنيق", "Elegant")}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Details Dialog ───────────────────────────────────────────────────── */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t("تفاصيل الشهادة", "Certificate Details")}
            </DialogTitle>
            <DialogDescription>#{selected?.id}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 py-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-midnight to-dark-navy text-center text-white">
                <Award className="w-10 h-10 mx-auto mb-2 text-mint" />
                <p className="font-bold">
                  {t("شهادة حضور", "Certificate of Attendance")}
                </p>
              </div>
              {[
                {
                  icon: User,
                  label: t("المستلم", "Recipient"),
                  value: getName(selected),
                },
                {
                  icon: GraduationCap,
                  label: t("الورشة", "Workshop"),
                  value: getWorkshop(selected),
                },
                {
                  icon: Calendar,
                  label: t("التاريخ", "Date"),
                  value: getDate(selected),
                },
                {
                  icon: Clock,
                  label: t("الساعات", "Hours"),
                  value: selected.hours
                    ? `${selected.hours} ${t("ساعات", "hours")}`
                    : "—",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/40"
                >
                  <item.icon className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
              <div className="pt-2 flex items-center gap-3">
                {getStatusBadge(selected.status)}
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 ms-auto"
                  onClick={() => {
                    setIsViewOpen(false);
                    openPreview(selected);
                  }}
                >
                  <Award className="w-4 h-4" />
                  {t("معاينة", "Preview")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Certificate Preview Dialog ───────────────────────────────────────── */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              {t("معاينة الشهادة", "Certificate Preview")}
            </DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="relative">
              <div className="aspect-[1.4/1] bg-gradient-to-br from-midnight via-dark-navy to-navy-light rounded-2xl p-8 text-primary-foreground overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0l50 50-50 50L0 50z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative h-full flex flex-col">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                        <Award className="w-8 h-8 text-green-accent" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">
                      {t("شهادة حضور", "Certificate of Attendance")}
                    </h2>
                    <p className="text-blue-pale">
                      {t(
                        "الجمعية السعودية للعلاج الطبيعي",
                        "Saudi Physical Therapy Association"
                      )}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <p className="text-lg mb-4">
                      {t("تشهد الجمعية بأن", "This is to certify that")}
                    </p>
                    <h3 className="text-4xl font-bold mb-4 text-green-accent">
                      {getName(selected)}
                    </h3>
                    <p className="text-lg mb-2">
                      {t("قد أتم بنجاح حضور", "has successfully completed")}
                    </p>
                    <h4 className="text-2xl font-semibold mb-4">
                      {getWorkshop(selected)}
                    </h4>
                    <p className="text-blue-pale">
                      {t("بتاريخ", "on")} {getDate(selected)}
                      {selected.hours
                        ? ` • ${selected.hours} ${t(
                            "ساعات تدريبية",
                            "training hours"
                          )}`
                        : ""}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-end justify-between">
                    <div className="text-center">
                      <div className="w-24 h-16 border-b-2 border-blue-pale/50 mb-2 flex items-end justify-center">
                        <Signature className="w-8 h-8 text-blue-pale/50" />
                      </div>
                      <p className="text-sm text-blue-pale">
                        {t("التوقيع", "Signature")}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-lg p-2 mb-2">
                        <QrCode className="w-full h-full text-navy" />
                      </div>
                      <p className="text-xs text-blue-pale">{selected.id}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-16 border-b-2 border-blue-pale/50 mb-2 flex items-end justify-center">
                        <Stamp className="w-8 h-8 text-blue-pale/50" />
                      </div>
                      <p className="text-sm text-blue-pale">
                        {t("الختم", "Stamp")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              {t("طباعة", "Print")}
            </Button>
            <Button className="bg-green-accent hover:bg-green-light gap-2">
              <Download className="w-4 h-4" />
              {t("تحميل PDF", "Download PDF")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add Certificate Dialog ───────────────────────────────────────────── */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              {t("إضافة شهادة جديدة", "Add New Certificate")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "اختر المستلم والورشة من القوائم أو أدخل البيانات يدوياً",
                "Select recipient and workshop from the lists or enter data manually"
              )}
            </DialogDescription>
          </DialogHeader>

          {/* Step indicator */}
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => setAddStep("form")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                addStep === "form"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {t("البيانات", "Data")}
            </button>
            <div className="h-px flex-1 bg-border" />
            <button
              onClick={() => setAddStep("preview")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                addStep === "preview"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t("معاينة", "Preview")}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {addStep === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6 py-2"
              >
                {/* Recipient Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">
                      {t("المستلم", "Recipient")}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {t("مطلوب", "Required")}
                    </Badge>
                  </div>

                  <div className="relative">
                    <UserSearch
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "right-3" : "left-3"
                      } w-4 h-4 text-muted-foreground`}
                    />
                    <Input
                      placeholder={t("ابحث عن مستخدم...", "Search users...")}
                      value={recipientSearch}
                      onChange={(e) => setRecipientSearch(e.target.value)}
                      className={isRTL ? "pr-10" : "pl-10"}
                    />
                    {recipientsLoading && (
                      <Loader2
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          isRTL ? "left-3" : "right-3"
                        } w-4 h-4 animate-spin text-muted-foreground`}
                      />
                    )}
                  </div>

                  {!recipientsLoading && filteredRecipients.length > 0 && (
                    <div className="border rounded-lg overflow-hidden max-h-36 overflow-y-auto">
                      {filteredRecipients.map((r) => (
                        <button
                          key={r.id}
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              recipientId: String(r.id),
                              manualRecipientName: "",
                            }))
                          }
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-start transition-colors hover:bg-muted/50 border-b last:border-0 ${
                            form.recipientId === String(r.id)
                              ? "bg-primary/5 border-l-2 border-l-primary"
                              : ""
                          }`}
                        >
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {getRecipientName(r)}
                            </p>
                            {r.email && (
                              <p className="text-xs text-muted-foreground truncate">
                                {r.email}
                              </p>
                            )}
                          </div>
                          {form.recipientId === String(r.id) && (
                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">
                      {t("أو أدخل الاسم يدوياً", "Or enter name manually")}
                    </Label>
                    <Input
                      placeholder={t("الاسم الكامل", "Full name")}
                      value={form.manualRecipientName}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          manualRecipientName: e.target.value,
                          recipientId: "",
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Workshop Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">
                      {t("الورشة", "Workshop")}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {t("مطلوب", "Required")}
                    </Badge>
                  </div>

                  <div className="relative">
                    <Search
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "right-3" : "left-3"
                      } w-4 h-4 text-muted-foreground`}
                    />
                    <Input
                      placeholder={t("ابحث عن ورشة...", "Search workshops...")}
                      value={workshopSearch}
                      onChange={(e) => setWorkshopSearch(e.target.value)}
                      className={isRTL ? "pr-10" : "pl-10"}
                    />
                    {workshopsLoading && (
                      <Loader2
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          isRTL ? "left-3" : "right-3"
                        } w-4 h-4 animate-spin text-muted-foreground`}
                      />
                    )}
                  </div>

                  {!workshopsLoading && filteredWorkshops.length > 0 && (
                    <div className="border rounded-lg overflow-hidden max-h-36 overflow-y-auto">
                      {filteredWorkshops.map((w) => (
                        <button
                          key={w.id}
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              workshopId: String(w.id),
                              manualWorkshopTitle: "",
                              hours: w.hours ? String(w.hours) : f.hours,
                              issueDate: f.issueDate || w.date || "",
                            }))
                          }
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-start transition-colors hover:bg-muted/50 border-b last:border-0 ${
                            form.workshopId === String(w.id)
                              ? "bg-primary/5 border-l-2 border-l-primary"
                              : ""
                          }`}
                        >
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {getWorkshopName(w)}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {w.date && <span>{w.date}</span>}
                              {w.hours && <span>• {w.hours}h</span>}
                            </div>
                          </div>
                          {form.workshopId === String(w.id) && (
                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">
                      {t(
                        "أو أدخل اسم الورشة يدوياً",
                        "Or enter workshop title manually"
                      )}
                    </Label>
                    <Input
                      placeholder={t("اسم الورشة", "Workshop title")}
                      value={form.manualWorkshopTitle}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          manualWorkshopTitle: e.target.value,
                          workshopId: "",
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Extra Fields */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Hash className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">
                      {t("تفاصيل إضافية", "Additional Details")}
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {t("تاريخ الإصدار", "Issue Date")}
                      </Label>
                      <Input
                        type="date"
                        value={form.issueDate}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, issueDate: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {t("عدد الساعات", "Hours")}
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={form.hours}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, hours: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {t("الحالة", "Status")}
                      </Label>
                      <Select
                        value={form.status}
                        onValueChange={(v) =>
                          setForm((f) => ({ ...f, status: v }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            {t("قيد المعالجة", "Pending")}
                          </SelectItem>
                          <SelectItem value="verified">
                            {t("موثقة", "Verified")}
                          </SelectItem>
                          <SelectItem value="revoked">
                            {t("ملغاة", "Revoked")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => setAddStep("preview")}
                >
                  <Sparkles className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-sm text-primary font-medium">
                    {t(
                      "انقر لمعاينة الشهادة قبل الحفظ ←",
                      "Click to preview the certificate before saving →"
                    )}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4 py-2"
              >
                {/* Live certificate preview */}
                <div className="relative aspect-[1.6/1] bg-gradient-to-br from-midnight via-dark-navy to-navy-light rounded-2xl p-6 text-primary-foreground overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0l50 50-50 50L0 50z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <div className="relative h-full flex flex-col">
                    <div className="text-center mb-4">
                      <Award className="w-8 h-8 mx-auto mb-1 text-green-accent" />
                      <h2 className="text-xl font-bold">
                        {t("شهادة حضور", "Certificate of Attendance")}
                      </h2>
                      <p className="text-xs text-blue-pale">
                        {t(
                          "الجمعية السعودية للعلاج الطبيعي",
                          "Saudi Physical Therapy Association"
                        )}
                      </p>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <p className="text-sm mb-2 text-blue-pale">
                        {t("تشهد الجمعية بأن", "This is to certify that")}
                      </p>
                      <h3
                        className={`text-2xl font-bold mb-2 ${
                          previewName.startsWith("—")
                            ? "text-white/30 italic text-base"
                            : "text-green-accent"
                        }`}
                      >
                        {previewName}
                      </h3>
                      <p className="text-sm mb-1 text-blue-pale">
                        {t("قد أتم بنجاح حضور", "has successfully completed")}
                      </p>
                      <h4
                        className={`text-lg font-semibold mb-2 ${
                          previewWorkshop.startsWith("—")
                            ? "text-white/30 italic text-sm"
                            : ""
                        }`}
                      >
                        {previewWorkshop}
                      </h4>
                      <p className="text-xs text-blue-pale">
                        {previewDate !== "—" &&
                          `${t("بتاريخ", "on")} ${previewDate}`}
                        {previewHours &&
                          ` • ${previewHours} ${t("ساعات", "hours")}`}
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-center">
                        <div className="w-16 h-10 border-b border-blue-pale/40 mb-1 flex items-end justify-center">
                          <Signature className="w-5 h-5 text-blue-pale/40" />
                        </div>
                        <p className="text-xs text-blue-pale">
                          {t("التوقيع", "Signature")}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded p-1 mb-1">
                          <QrCode className="w-full h-full text-navy" />
                        </div>
                        <p className="text-xs text-blue-pale">
                          {t("رمز التحقق", "QR")}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-10 border-b border-blue-pale/40 mb-1 flex items-end justify-center">
                          <Stamp className="w-5 h-5 text-blue-pale/40" />
                        </div>
                        <p className="text-xs text-blue-pale">
                          {t("الختم", "Stamp")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: User,
                      label: t("المستلم", "Recipient"),
                      value: previewName,
                    },
                    {
                      icon: GraduationCap,
                      label: t("الورشة", "Workshop"),
                      value: previewWorkshop,
                    },
                    {
                      icon: Calendar,
                      label: t("التاريخ", "Date"),
                      value: previewDate,
                    },
                    {
                      icon: Clock,
                      label: t("الساعات", "Hours"),
                      value: previewHours
                        ? `${previewHours} ${t("ساعات", "h")}`
                        : "—",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/40"
                    >
                      <item.icon className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium truncate">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(form.status)}
                  <button
                    onClick={() => setAddStep("form")}
                    className="text-xs text-muted-foreground underline ms-auto"
                  >
                    {t("← تعديل البيانات", "← Edit data")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <DialogFooter className="gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              {t("إلغاء", "Cancel")}
            </Button>
            {addStep === "form" ? (
              <Button onClick={() => setAddStep("preview")} className="gap-2">
                <Sparkles className="w-4 h-4" />
                {t("معاينة", "Preview")}
              </Button>
            ) : (
              <Button
                onClick={handleSubmitCertificate}
                disabled={isSubmitting}
                className="bg-green-accent hover:bg-green-light gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                {t("حفظ الشهادة", "Save Certificate")}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Settings Dialog ──────────────────────────────────────────────────── */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              {t("إعدادات الشهادة", "Certificate Settings")}
            </DialogTitle>
            <DialogDescription>
              {t("تخصيص مظهر الشهادات", "Customize certificate appearance")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Signature className="w-4 h-4" />
                {t("صورة التوقيع", "Signature Image")}
              </Label>
              <Input type="file" accept="image/*" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Stamp className="w-4 h-4" />
                {t("صورة الختم", "Stamp Image")}
              </Label>
              <Input type="file" accept="image/*" />
            </div>

            <div className="space-y-2">
              <Label>{t("نص إضافي", "Custom Text")}</Label>
              <Textarea
                placeholder={t(
                  "نص يظهر في الشهادة...",
                  "Text to display on certificate..."
                )}
                value={certificateSettings.customText}
                onChange={(e) =>
                  setCertificateSettings({
                    ...certificateSettings,
                    customText: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              {t("إلغاء", "Cancel")}
            </Button>
            <Button className="bg-green-accent hover:bg-green-light gap-2">
              <CheckCircle className="w-4 h-4" />
              {t("حفظ الإعدادات", "Save Settings")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCertificatesPage;
