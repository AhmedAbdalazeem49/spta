import { CertificateDeleteModal } from "@/components/admin/certificates/CertificateDeleteModal";
import { CertificateEditModal } from "@/components/admin/certificates/CertificateEditModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Certificate, Recipient, Workshop } from "@/types/certificate";
import {
  getCertificateName,
  getCertificateWorkshop,
} from "@/utils/certificateUtils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";

// Components
import {
  CertificateAddModal,
  EMPTY_FORM,
} from "@/components/admin/certificates/CertificateAddModal";
import { CertificateCard } from "@/components/admin/certificates/CertificateCard";
import { CertificateDetailsModal } from "@/components/admin/certificates/CertificateDetailsModal";
import { CertificateFilters } from "@/components/admin/certificates/CertificateFilters";
import { CertificatePreviewModal } from "@/components/admin/certificates/CertificatePreviewModal";
import { CertificateQuickVerify } from "@/components/admin/certificates/CertificateQuickVerify";
import { CertificateSettingsModal } from "@/components/admin/certificates/CertificateSettingsModal";
import { CertificatesTable } from "@/components/admin/certificates/CertificatesTable";
import { CertificateStatusBadge } from "@/components/admin/certificates/CertificateStatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Eye, X } from "lucide-react";
import { certificateService } from "@/services";

const AdminCertificatesPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
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

  // Certificate settings dialog
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [certificateSettings, setCertificateSettings] = useState({
    signature_image: null as File | string | null,
    stamp_image: null as File | string | null,
    chairman_name: "",
    custom_text: "",
    partner_logo: null as File | string | null,
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedForDelete, setSelectedForDelete] =
    useState<Certificate | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

const handleDelete = async () => {
  if (!selectedForDelete) return;
  setIsDeleting(true);
  try {
    await certificateService.remove(selectedForDelete.id);
    toast({
      title: t("تم بنجاح", "Success"),
      description: t("تم حذف الشهادة", "Certificate deleted"),
    });
    setIsDeleteOpen(false);
    setSelectedForDelete(null);
    await fetchCertificates();
  } catch {
    toast({ title: t("خطأ", "Error"), variant: "destructive" });
  } finally {
    setIsDeleting(false);
  }
};

  const fetchCertificateSettings = async () => {
    try {
      const res = await api.get("/certificate-settings");

      // ✅ handle both { data: { ... } } and { id, signature_image, ... } shapes
      const data = res.data?.data ?? res.data;

      setCertificateSettings({
        signature_image: data?.signature_image || null,
        stamp_image: data?.stamp_image || null,
        chairman_name: data?.chairman_name || "",
        custom_text: data?.custom_text || "",
        partner_logo: data?.partner_logo ?? null,
      });
    } catch (err) {
      console.error("Failed loading settings", err);
    }
  };

  useEffect(() => {
    fetchCertificates();
    fetchCertificateSettings();
  }, []);

  // Add Certificate dialog
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
  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);
  const [duplicateCert, setDuplicateCert] = useState<Certificate | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Certificate>>({});

  // ─── Workshop Sync State ─────────────────────────────────────────────────────
  const [syncWorkshops, setSyncWorkshops] = useState<Workshop[]>([]);
  const [syncWorkshopsLoading, setSyncWorkshopsLoading] = useState(false);
  const [syncSearch, setSyncSearch] = useState("");
  const [syncingWorkshopId, setSyncingWorkshopId] = useState<number | null>(
    null,
  );
  const [syncResults, setSyncResults] = useState<
    Record<number, { synced: number; skipped: number; ts: number }>
  >({});

  const fetchSyncWorkshops = async () => {
    setSyncWorkshopsLoading(true);
    try {
      const res = await api.get("/admin/workshops");
      const data = res.data?.data || res.data || [];
      setSyncWorkshops(Array.isArray(data) ? data : []);
    } catch {
      setSyncWorkshops([]);
    } finally {
      setSyncWorkshopsLoading(false);
    }
  };

  const handleWorkshopSync = async (workshop: Workshop) => {
    setSyncingWorkshopId(workshop.id);
    try {
      const res = await api.post(
        `/admin/workshops/${workshop.id}/sync-certificates`,
      );
      const { synced, skipped } = res.data;
      setSyncResults((prev) => ({
        ...prev,
        [workshop.id]: { synced, skipped, ts: Date.now() },
      }));
      toast({
        title: t("تمت المزامنة", "Sync Complete"),
        description: t(
          `تم تحديث ${synced} شهادة لورشة: ${workshop.title}`,
          `${synced} certificate${synced !== 1 ? "s" : ""} synced for: ${workshop.title}`,
        ),
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: t("خطأ في المزامنة", "Sync Failed"),
        description:
          err.response?.data?.message || t("حدث خطأ", "An error occurred"),
        variant: "destructive",
      });
    } finally {
      setSyncingWorkshopId(null);
    }
  };

  const handleUpdate = async () => {
    if (!editForm?.id) return;

    try {
      const { data } = await api.put(`/certificates/${editForm.id}/update`, {
        type: editForm.type,
        template: editForm.template,
        recipient_name: editForm.recipient_name,
        recipient_name_ar: editForm.recipient_name_ar,
        workshop_title: editForm.workshop_title,
        status: editForm.status,
        issue_date: editForm.issue_date || editForm.issueDate,
        start_date: editForm.start_date,
        end_date: editForm.end_date,
        hours: editForm.hours ? Number(editForm.hours) : undefined,
        speaker: editForm.speaker,
        venue: editForm.venue,
        role: editForm.role,
        organization_name: editForm.organization_name,
        contribution_description: editForm.contribution_description,
        completion_status: editForm.completion_status,
        duration: editForm.duration,
      });

      console.log("Updated:", data);
      toast({
        title: t("تم التحديث", "Updated"),
        description: t(
          "تم تحديث بيانات الشهادة بنجاح",
          "Certificate updated successfully",
        ),
      });

      setEditOpen(false);
      fetchCertificates();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Update failed:", error?.response?.data || error.message);
      toast({
        title: t("حدث خطأ", "Error"),
        description: t("فشل تحديث الشهادة", "Failed to update certificate"),
        variant: "destructive",
      });
    }
  };

  const handleOpenEdit = (cert: Certificate) => {
    setEditForm(cert);
    setEditOpen(true);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

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

  const selectedWorkshop = workshops.find(
    (w) => String(w.id) === form.workshopId,
  );
  const selectedRecipient = recipients.find(
    (r) => String(r.id) === form.recipientId,
  );

  const getWorkshopName = (w: Workshop) =>
    w.title || t(w.titleAr || "", w.titleEn || "");
  const getRecipientName = (r: Recipient) =>
    r.name || t(r.nameAr || "", r.nameEn || "");

  const filteredWorkshops = workshops.filter((w) =>
    getWorkshopName(w).toLowerCase().includes(workshopSearch.toLowerCase()),
  );

  const filteredRecipients = recipients.filter(
    (r) =>
      getRecipientName(r)
        .toLowerCase()
        .includes(recipientSearch.toLowerCase()) ||
      (r.email || "").toLowerCase().includes(recipientSearch.toLowerCase()),
  );

  const previewName =
    (selectedRecipient ? getRecipientName(selectedRecipient) : "") ||
    form.manualRecipientName ||
    t("— اسم المستلم —", "— Recipient Name —");

  const previewWorkshop =
    (selectedWorkshop ? getWorkshopName(selectedWorkshop) : "") ||
    form.manualWorkshopTitle ||
    t("— اسم الورشة —", "— Workshop Title —");

  const previewDate = form.issueDate || (selectedWorkshop?.date ?? "") || "—";

  const handleAddOpen = () => {
    setForm({ ...EMPTY_FORM });
    setAddStep("form");
    setWorkshopSearch("");
    setRecipientSearch("");
    setIsAddOpen(true);
  };

  const handleSubmitCertificate = async () => {
    if (
      form.type !== "appreciation_org" &&
      !form.recipientId &&
      !form.manualRecipientName
    ) {
      toast({
        title: t("بيانات ناقصة", "Missing data"),
        description: t(
          "يرجى اختيار المستلم أو إدخال الاسم يدوياً",
          "Please select recipient or enter a name manually",
        ),
        variant: "destructive",
      });
      return;
    }

    if (form.type === "appreciation_org" && !form.organization_name) {
      toast({
        title: t("بيانات ناقصة", "Missing data"),
        description: t(
          "يرجى إدخال اسم الجهة / المنظمة",
          "Please enter organization name",
        ),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/admin/certificates", {
        type: form.type,
        template: form.template || "modern",
        status: form.status,
        workshop_id: form.workshopId || undefined,
        recipient_id: form.recipientId || undefined,
        recipient_name: form.manualRecipientName || undefined,
        recipient_name_ar: form.recipient_name_ar || undefined,
        workshop_title: form.manualWorkshopTitle || undefined,
        issue_date: form.issueDate || undefined,
        start_date: form.start_date || undefined,
        end_date: form.end_date || undefined,
        hours: form.hours ? Number(form.hours) : undefined,
        speaker: form.speaker || undefined,
        venue: form.venue || undefined,
        role: form.role || undefined,
        event_name: form.manualWorkshopTitle || undefined,
        contribution_description: form.contribution_description || undefined,
        completion_status: form.completion_status || undefined,
        duration: form.duration || undefined,
        organization_name: form.organization_name || undefined,
      });

      toast({
        title: t("تم إنشاء الشهادة", "Certificate Created"),
        description: t(
          "تمت إضافة الشهادة بنجاح",
          "Certificate added successfully",
        ),
      });
      setIsAddOpen(false);
      fetchCertificates();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // ✅ 409 = duplicate certificate
      if (error?.response?.status === 409) {
        setDuplicateCert(error.response.data.data);
        setIsDuplicateOpen(true);
        setIsAddOpen(false);
        return;
      }
      toast({
        title: t("حدث خطأ", "Error"),
        description: t("فشل إنشاء الشهادة", "Failed to create certificate"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = certificates.filter((c) => {
    const name = getCertificateName(c, t).toLowerCase();
    const workshop = getCertificateWorkshop(c, t).toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      name.includes(q) ||
      workshop.includes(q) ||
      String(c.id).toLowerCase().includes(q);
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
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
          {user?.role === "system_admin" && (
            <Button
              onClick={() => setIsSettingsOpen(true)}
              variant="outline"
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              {t("إعدادات الشهادة", "Certificate Settings")}
            </Button>
          )}
        </div>
      </div>
      <Tabs defaultValue="certificates" className="space-y-6" dir="rtl">
        <TabsList>
          <TabsTrigger value="certificates" className="gap-2">
            <Award className="w-4 h-4" />
            {t("الشهادات", "Certificates")}
          </TabsTrigger>
          <TabsTrigger value="verify" className="gap-2">
            <Shield className="w-4 h-4" />
            {t("التحقق السريع", "Quick Verify")}
          </TabsTrigger>
          <TabsTrigger
            value="sync"
            className="gap-2"
            onClick={fetchSyncWorkshops}
          >
            <RefreshCw className="w-4 h-4" />
            {t("مزامنة الشهادات", "Certificate Sync")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-6">
          <CertificateFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

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
            <div className="md:grid-cols-2 lg:grid-cols-3 gap-6 hidden">
              <AnimatePresence>
                {filtered.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CertificateCard
                      cert={cert}
                      onOpenDetails={openDetails}
                      onOpenPreview={openPreview}
                      onCopyLink={handleCopyLink}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filtered.length > 0 && (
            <CertificatesTable
              certificates={filtered}
              onOpenDetails={openDetails}
              onOpenPreview={openPreview}
              onOpenEdit={handleOpenEdit}
              onOpenDelete={(c) => {
                setSelectedForDelete(c);
                setIsDeleteOpen(true);
              }}
            />
          )}
        </TabsContent>

        <TabsContent value="verify">
          <CertificateQuickVerify
            verifyCode={verifyCode}
            setVerifyCode={setVerifyCode}
          />
        </TabsContent>

        {/* ─── Workshop Certificate Sync Panel ─── */}
        <TabsContent value="sync" className="space-y-6">
          <div className="rounded-2xl border bg-card p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  {t("مركز مزامنة الشهادات", "Certificate Sync Control")}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(
                    "تحديث بيانات الشهادات من بيانات الورشة — العنوان والتاريخ والمتحدث والموقع",
                    "Push workshop data into all linked certificates — title, dates, speaker, venue",
                  )}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchSyncWorkshops}
                disabled={syncWorkshopsLoading}
                className="gap-2 shrink-0"
              >
                {syncWorkshopsLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {t("تحديث القائمة", "Refresh List")}
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("بحث عن ورشة...", "Search workshops...")}
                value={syncSearch}
                onChange={(e) => setSyncSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Workshop List */}
            {syncWorkshopsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : syncWorkshops.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <RefreshCw className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>
                  {t(
                    "اضغط 'تحديث القائمة' لتحميل الورش",
                    "Click 'Refresh List' to load workshops",
                  )}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {syncWorkshops
                  .filter(
                    (w) =>
                      !syncSearch ||
                      w.title
                        ?.toLowerCase()
                        .includes(syncSearch.toLowerCase()) ||
                      w.doctor_name
                        ?.toLowerCase()
                        .includes(syncSearch.toLowerCase()),
                  )
                  .map((w) => {
                    const result = syncResults[w.id];
                    const isSyncing = syncingWorkshopId === w.id;
                    return (
                      <motion.div
                        key={w.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between gap-4 rounded-xl border bg-muted/30 px-4 py-3 hover:bg-muted/50 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">
                            {w.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {w.doctor_name && (
                              <span className="mr-2">🏥 {w.doctor_name}</span>
                            )}
                            {w.date && <span>📅 {w.date}</span>}
                          </p>
                        </div>

                        {/* Sync result badge */}
                        {result && !isSyncing && (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>
                              {result.synced} {t("شهادة", "cert")}
                            </span>
                          </div>
                        )}

                        <Button
                          size="sm"
                          variant={result ? "outline" : "default"}
                          onClick={() => handleWorkshopSync(w)}
                          disabled={isSyncing || !!syncingWorkshopId}
                          className="gap-2 shrink-0"
                        >
                          {isSyncing ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              {t("جاري...", "Syncing...")}
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-3.5 h-3.5" />
                              {result
                                ? t("إعادة مزامنة", "Re-sync")
                                : t("مزامنة", "Sync")}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    );
                  })}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <CertificateDetailsModal
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        certificate={selected}
        onPreview={openPreview}
      />
      <CertificateAddModal
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        form={form}
        setForm={setForm}
        addStep={addStep}
        setAddStep={setAddStep}
        recipients={recipients}
        recipientsLoading={recipientsLoading}
        recipientSearch={recipientSearch}
        setRecipientSearch={setRecipientSearch}
        filteredRecipients={filteredRecipients}
        workshops={workshops}
        workshopsLoading={workshopsLoading}
        workshopSearch={workshopSearch}
        setWorkshopSearch={setWorkshopSearch}
        filteredWorkshops={filteredWorkshops}
        onSubmit={handleSubmitCertificate}
        isSubmitting={isSubmitting}
        getRecipientName={getRecipientName}
        getWorkshopName={getWorkshopName}
        previewName={previewName}
        previewWorkshop={previewWorkshop}
        previewDate={previewDate}
      />
      <CertificateEditModal
        isOpen={editOpen}
        onOpenChange={setEditOpen}
        form={editForm}
        setForm={setEditForm}
        onSave={handleUpdate}
      />
      <CertificateSettingsModal
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        settings={certificateSettings}
        setSettings={setCertificateSettings}
      />
      <CertificatePreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        certificate={selected}
      />
      <Dialog open={isDuplicateOpen} onOpenChange={setIsDuplicateOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-lg">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              {t("شهادة موجودة مسبقاً", "Certificate Already Exists")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "يمتلك هذا المستخدم شهادة لهذه الورشة بالفعل. لا يمكن إنشاء شهادة مكررة.",
                "This user already has a certificate for this workshop. Duplicate certificates are not allowed.",
              )}
            </DialogDescription>
          </DialogHeader>

          {duplicateCert && (
            <div className="rounded-xl border bg-muted/30 p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("المستلم", "Recipient")}
                </span>
                <span className="font-medium">
                  {duplicateCert.recipient_name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("الورشة", "Workshop")}
                </span>
                <span className="font-medium text-end max-w-[60%] truncate">
                  {duplicateCert.workshop_title}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("رقم الشهادة", "Serial")}
                </span>
                <span className="font-mono text-xs text-primary">
                  {duplicateCert.serial_number}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("الحالة", "Status")}
                </span>
                <CertificateStatusBadge status={duplicateCert.status} />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDuplicateOpen(false)}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              {t("إغلاق", "Close")}
            </Button>
            {duplicateCert && (
              <Button
                onClick={() => {
                  setIsDuplicateOpen(false);
                  openPreview(duplicateCert);
                }}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                {t("عرض الشهادة", "View Certificate")}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CertificateDeleteModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selected={selectedForDelete}
        onDelete={handleDelete}
        isSaving={isDeleting}
      />
    </div>
  );
};

export default AdminCertificatesPage;
