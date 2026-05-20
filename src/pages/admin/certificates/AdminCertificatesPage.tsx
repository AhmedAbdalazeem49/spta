import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Certificate, Recipient, Workshop } from "@/types/certificate";
import {
  getCertificateDate,
  getCertificateName,
  getCertificateVerificationUrl,
  getCertificateWorkshop,
} from "@/utils/certificateUtils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Award,
  FileText,
  Plus,
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

const AdminCertificatesPage = () => {
  const { t } = useLanguage();
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

      <Tabs defaultValue="certificates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="certificates" className="gap-2">
            <Award className="w-4 h-4" />
            {t("الشهادات", "Certificates")}
          </TabsTrigger>
          <TabsTrigger value="verify" className="gap-2">
            <Shield className="w-4 h-4" />
            {t("التحقق السريع", "Quick Verify")}
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
            />
          )}
        </TabsContent>

        <TabsContent value="verify">
          <CertificateQuickVerify
            verifyCode={verifyCode}
            setVerifyCode={setVerifyCode}
            verifyResult={verifyResult}
            setVerifyResult={setVerifyResult}
            selected={selected}
            onVerify={handleVerify}
            onPreview={openPreview}
          />
        </TabsContent>
      </Tabs>

      <CertificateDetailsModal
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        certificate={selected}
        onPreview={openPreview}
      />

      <CertificatePreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        certificate={selected}
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
        previewHours={previewHours}
      />

      {/* <CertificateSettingsModal
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        settings={certificateSettings}
        setSettings={setCertificateSettings}
        onSave={() => setIsSettingsOpen(false)}
      /> */}
    </div>
  );
};

export default AdminCertificatesPage;
