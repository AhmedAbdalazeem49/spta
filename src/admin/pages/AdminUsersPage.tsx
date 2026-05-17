import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Users,
  Search,
  Eye,
  Trash2,
  Loader2,
  AlertTriangle,
  Mail,
  Phone,
  Shield,
  User,
  CreditCard,
  Briefcase,
  Building2,
  Pencil,
  CheckCircle2,
  XCircle,
  Clock,
  BadgeCheck,
  UserPlus,
  Lock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

interface UserItem {
  id: number;
  name: string;
  name_ar?: string;
  email: string;
  phone?: string;
  national_id?: string;
  specialization?: string;
  sub_specialization?: string;
  employer?: string;
  role?: string;
  is_admin?: boolean;
  status?: "pending" | "approved" | "rejected" | "active";
  classification_number?: string;
  membership_type?: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface EditForm {
  name: string;
  name_ar: string;
  email: string;
  phone: string;
  national_id: string;
  specialization: string;
  sub_specialization: string;
  employer: string;
  is_admin: boolean;
  password: string;
  password_confirmation: string;
}

interface AddForm {
  name: string;
  name_ar: string;
  email: string;
  phone: string;
  national_id: string;
  specialization: string;
  sub_specialization: string;
  employer: string;
  is_admin: boolean;
  password: string;
  password_confirmation: string;
}

const defaultAddForm: AddForm = {
  name: "",
  name_ar: "",
  email: "",
  phone: "",
  national_id: "",
  specialization: "",
  sub_specialization: "",
  employer: "",
  is_admin: false,
  password: "",
  password_confirmation: "",
};

const AdminUsersPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    name: "",
    name_ar: "",
    email: "",
    phone: "",
    national_id: "",
    specialization: "",
    sub_specialization: "",
    employer: "",
    is_admin: false,
    password: "",
    password_confirmation: "",
  });

  // Add User State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState<AddForm>(defaultAddForm);
  const [addStep, setAddStep] = useState<1 | 2>(1);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Debounced server-side search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchUsers(1, searchQuery, statusFilter);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    fetchUsers(page, searchQuery, statusFilter);
  }, [page]);

  const fetchUsers = async (
    pageNumber: number = 1,
    search: string = "",
    status: string = "all"
  ) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: String(pageNumber) });
      if (search.trim()) params.append("search", search.trim());
      if (status && status !== "all") params.append("status", status);

      const res = await api.get(`/admin/users?${params.toString()}`);
      const data = res.data?.data || res.data || [];
      setUsers(Array.isArray(data) ? data : []);
      setLastPage(res.data?.last_page || 1);
    } catch (err) {
      toast({
        title: t("خطأ", "Error"),
        description: t("فشل تحميل المستخدمين", "Failed to load users"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (
    userId: number,
    newStatus: "approved" | "rejected"
  ) => {
    setUpdatingId(userId);
    try {
      await api.patch(`/admin/users/${userId}/status`, { status: newStatus });
      toast({
        title: t("تم بنجاح", "Success"),
        description:
          newStatus === "approved"
            ? t("تم تفعيل المستخدم", "User approved & activated")
            : t("تم رفض المستخدم", "User rejected"),
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description:
          err.response?.data?.message || t("حدث خطأ", "Error occurred"),
        variant: "destructive",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const openEdit = (u: UserItem) => {
    setSelectedUser(u);
    setEditForm({
      name: u.name || "",
      name_ar: u.name_ar || "",
      email: u.email || "",
      phone: u.phone || "",
      national_id: u.national_id || "",
      specialization: u.specialization || "",
      sub_specialization: u.sub_specialization || "",
      employer: u.employer || "",
      is_admin: u.is_admin || false,
      password: "",
      password_confirmation: "",
    });
    setIsEditOpen(true);
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    setIsSaving(true);

    const payload: any = {
      name: editForm.name,
      name_ar: editForm.name_ar,
      email: editForm.email,
      phone: editForm.phone,
      national_id: editForm.national_id,
      specialization: editForm.specialization,
      sub_specialization: editForm.sub_specialization,
      employer: editForm.employer,
      is_admin: editForm.is_admin,
    };

    if (editForm.password.trim()) {
      payload.password = editForm.password;
      payload.password_confirmation = editForm.password_confirmation;
    }

    try {
      await api.put(`/admin/users/${selectedUser.id}`, payload);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم تحديث المستخدم", "User updated successfully"),
      });
      setIsEditOpen(false);
      setSelectedUser(null);
      fetchUsers(page, searchQuery);
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description:
          err.response?.data?.message || t("حدث خطأ", "Error occurred"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setIsDeleting(true);
    try {
      await api.delete(`/admin/users/${selectedUser.id}`);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم حذف المستخدم", "User deleted"),
      });
      setIsDeleteOpen(false);
      setSelectedUser(null);
      fetchUsers(page, searchQuery);
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description: err.response?.data?.message || t("حدث خطأ", "Error"),
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // ─── Add User ────────────────────────────────────────────────────────────────
  const openAdd = () => {
    setAddForm(defaultAddForm);
    setAddStep(1);
    setIsAddOpen(true);
  };

  const handleAdd = async () => {
    // Basic validation
    if (!addForm.name.trim() || !addForm.email.trim()) {
      toast({
        title: t("خطأ في البيانات", "Validation Error"),
        description: t(
          "الاسم والبريد الإلكتروني مطلوبان",
          "Name and email are required"
        ),
        variant: "destructive",
      });
      return;
    }
    if (!addForm.password.trim()) {
      toast({
        title: t("خطأ في البيانات", "Validation Error"),
        description: t("كلمة المرور مطلوبة", "Password is required"),
        variant: "destructive",
      });
      return;
    }
    if (addForm.password !== addForm.password_confirmation) {
      toast({
        title: t("خطأ في البيانات", "Validation Error"),
        description: t("كلمتا المرور غير متطابقتين", "Passwords do not match"),
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);
    try {
      await api.post("/admin/users", {
        name: addForm.name,
        name_ar: addForm.name_ar,
        email: addForm.email,
        phone: addForm.phone,
        national_id: addForm.national_id,
        specialization: addForm.specialization,
        sub_specialization: addForm.sub_specialization,
        employer: addForm.employer,
        is_admin: addForm.is_admin,
        password: addForm.password,
        password_confirmation: addForm.password_confirmation,
      });
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم إضافة المستخدم بنجاح", "User created successfully"),
      });
      setIsAddOpen(false);
      setAddForm(defaultAddForm);
      fetchUsers(1, searchQuery, statusFilter);
      setPage(1);
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      const firstError = errors
        ? Object.values(errors).flat().join(", ")
        : err.response?.data?.message || t("حدث خطأ", "Error occurred");
      toast({
        title: t("خطأ", "Error"),
        description: firstError,
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };
  // ─────────────────────────────────────────────────────────────────────────────

  const formatDate = (date?: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            {t("إدارة المستخدمين", "Users Management")}
          </h2>
          <p className="text-muted-foreground">
            {t("عرض وإدارة جميع المستخدمين", "View and manage all users")}
          </p>
        </div>

        {/* ── Add User Button ── */}
        <Button
          onClick={openAdd}
          className="gap-2 shrink-0 shadow-sm"
          size="default"
        >
          <UserPlus className="w-4 h-4" />
          {t("إضافة مستخدم", "Add User")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg">
              {t("قائمة المستخدمين", "Users List")} ({users.length})
            </CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <div className="relative flex-1">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 ${
                  isRTL ? "right-3" : "left-3"
                } w-4 h-4 text-muted-foreground`}
              />
              <Input
                placeholder={t(
                  "بحث بالاسم أو البريد...",
                  "Search by name or email..."
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={isRTL ? "pr-10" : "pl-10"}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("كل الحالات", "All Statuses")}
                </SelectItem>
                <SelectItem value="pending">
                  {t("قيد المراجعة", "Pending")}
                </SelectItem>
                <SelectItem value="approved">
                  {t("موافق عليه", "Approved")}
                </SelectItem>
                <SelectItem value="rejected">
                  {t("مرفوض", "Rejected")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-14 w-full bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                {t("لا يوجد مستخدمون", "No users found")}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-start p-4 font-semibold text-sm">#</th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("الاسم", "Name")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("البريد", "Email")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("الهاتف", "Phone")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("الهوية", "National ID")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("التخصص", "Specialization")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("التخصص الفرعي", "Sub-Spec")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("جهة العمل", "Employer")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("تاريخ التسجيل", "Registered")}
                    </th>
                    <th className="text-start p-4 font-semibold text-sm">
                      {t("الدور", "Role")}
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
                  <AnimatePresence>
                    {users.map((u, i) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-t border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4 text-sm text-muted-foreground">
                          {u.id}
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-sm">
                            {isRTL ? u.name_ar || u.name : u.name}
                          </p>
                          {u.name_ar && (
                            <p className="text-xs text-muted-foreground">
                              {isRTL ? u.name : u.name_ar}
                            </p>
                          )}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {u.email}
                        </td>
                        <td
                          className="p-4 text-sm text-muted-foreground"
                          dir="ltr"
                        >
                          {u.phone || "—"}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {u.national_id || "—"}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {u.specialization || "—"}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {u.sub_specialization || "—"}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {u.employer || "—"}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {formatDate(u.created_at)}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={u.is_admin ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {u.is_admin
                              ? t("مدير", "Admin")
                              : t("مستخدم", "User")}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {(() => {
                            const status =
                              u.status ||
                              (u.email_verified_at ? "approved" : "pending");
                            const config: Record<
                              string,
                              { label: string; cls: string; Icon: any }
                            > = {
                              pending: {
                                label: t("قيد المراجعة", "Pending"),
                                cls: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
                                Icon: Clock,
                              },
                              approved: {
                                label: t("موافق عليه", "Approved"),
                                cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
                                Icon: BadgeCheck,
                              },
                              active: {
                                label: t("نشط", "Active"),
                                cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
                                Icon: CheckCircle2,
                              },
                              rejected: {
                                label: t("مرفوض", "Rejected"),
                                cls: "bg-red-500/10 text-red-600 border-red-500/30",
                                Icon: XCircle,
                              },
                            };
                            const c = config[status] || config.pending;
                            const SI = c.Icon;
                            return (
                              <Badge
                                variant="outline"
                                className={`${c.cls} gap-1`}
                              >
                                <SI className="w-3 h-3" />
                                {c.label}
                              </Badge>
                            );
                          })()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 flex-wrap">
                            {(u.status === "pending" ||
                              (!u.status && !u.email_verified_at)) && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 gap-1 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10"
                                  onClick={() => updateStatus(u.id, "approved")}
                                  disabled={updatingId === u.id}
                                  title={t("تفعيل", "Verify & Approve")}
                                >
                                  {updatingId === u.id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <BadgeCheck className="w-3.5 h-3.5" />
                                  )}
                                  <span className="hidden md:inline text-xs">
                                    {t("تفعيل", "Verify")}
                                  </span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 gap-1 text-red-600 border-red-500/30 hover:bg-red-500/10"
                                  onClick={() => updateStatus(u.id, "rejected")}
                                  disabled={updatingId === u.id}
                                  title={t("رفض", "Reject")}
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span className="hidden md:inline text-xs">
                                    {t("رفض", "Reject")}
                                  </span>
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedUser(u);
                                setIsViewOpen(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-primary hover:text-primary/80"
                              onClick={() => openEdit(u)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              onClick={() => {
                                setSelectedUser(u);
                                setIsDeleteOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {/* Pagination */}
              {lastPage > 1 && (
                <div className="flex justify-end mt-3 gap-2 px-4 pb-4">
                  <Button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    {t("السابق", "Prev")}
                  </Button>
                  <span className="px-2 py-1">
                    {page} / {lastPage}
                  </span>
                  <Button
                    onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                    disabled={page === lastPage}
                  >
                    {t("التالي", "Next")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Add User Dialog ───────────────────────────────────────────────────── */}
      <Dialog
        open={isAddOpen}
        onOpenChange={(open) => {
          setIsAddOpen(open);
          if (!open) setAddStep(1);
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              {t("إضافة مستخدم جديد", "Add New User")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "أدخل بيانات المستخدم الجديد. الحقول المميزة بـ * إلزامية.",
                "Enter the new user's details. Fields marked * are required."
              )}
            </DialogDescription>
          </DialogHeader>

          {/* Step indicator */}
          <div className="flex items-center gap-2 pt-1 pb-2">
            <button
              type="button"
              onClick={() => setAddStep(1)}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                addStep === 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              {t("البيانات الأساسية", "Basic Info")}
            </button>
            <div className="h-px flex-1 bg-border" />
            <button
              type="button"
              onClick={() => setAddStep(2)}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                addStep === 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              {t("الأمان والصلاحيات", "Security & Role")}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {addStep === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2"
              >
                {/* Name EN */}
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1">
                    {t("الاسم (EN)", "Name (EN)")}
                    <span className="text-destructive text-xs">*</span>
                  </Label>
                  <Input
                    placeholder={t("الاسم بالإنجليزية", "Name in English")}
                    value={addForm.name}
                    onChange={(e) =>
                      setAddForm({ ...addForm, name: e.target.value })
                    }
                  />
                </div>

                {/* Name AR */}
                <div className="space-y-1.5">
                  <Label>{t("الاسم (AR)", "Name (AR)")}</Label>
                  <Input
                    placeholder={t("الاسم بالعربية", "الاسم بالعربية")}
                    value={addForm.name_ar}
                    onChange={(e) =>
                      setAddForm({ ...addForm, name_ar: e.target.value })
                    }
                    dir="rtl"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1">
                    {t("البريد الإلكتروني", "Email")}
                    <span className="text-destructive text-xs">*</span>
                  </Label>
                  <div className="relative">
                    <Mail
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "right-3" : "left-3"
                      } w-4 h-4 text-muted-foreground`}
                    />
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      value={addForm.email}
                      onChange={(e) =>
                        setAddForm({ ...addForm, email: e.target.value })
                      }
                      className={isRTL ? "pr-10" : "pl-10"}
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label>{t("الهاتف", "Phone")}</Label>
                  <div className="relative">
                    <Phone
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "right-3" : "left-3"
                      } w-4 h-4 text-muted-foreground`}
                    />
                    <Input
                      placeholder="+966 5x xxx xxxx"
                      value={addForm.phone}
                      onChange={(e) =>
                        setAddForm({ ...addForm, phone: e.target.value })
                      }
                      className={isRTL ? "pr-10" : "pl-10"}
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* National ID */}
                <div className="space-y-1.5">
                  <Label>{t("رقم الهوية", "National ID")}</Label>
                  <div className="relative">
                    <CreditCard
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "right-3" : "left-3"
                      } w-4 h-4 text-muted-foreground`}
                    />
                    <Input
                      placeholder={t(
                        "رقم الهوية الوطنية",
                        "National ID number"
                      )}
                      value={addForm.national_id}
                      onChange={(e) =>
                        setAddForm({ ...addForm, national_id: e.target.value })
                      }
                      className={isRTL ? "pr-10" : "pl-10"}
                    />
                  </div>
                </div>

                {/* Employer */}
                <div className="space-y-1.5">
                  <Label>{t("جهة العمل", "Employer")}</Label>
                  <div className="relative">
                    <Building2
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "right-3" : "left-3"
                      } w-4 h-4 text-muted-foreground`}
                    />
                    <Input
                      placeholder={t(
                        "اسم الجهة أو المؤسسة",
                        "Organization name"
                      )}
                      value={addForm.employer}
                      onChange={(e) =>
                        setAddForm({ ...addForm, employer: e.target.value })
                      }
                      className={isRTL ? "pr-10" : "pl-10"}
                    />
                  </div>
                </div>

                {/* Specialization */}
                <div className="space-y-1.5">
                  <Label>{t("التخصص", "Specialization")}</Label>
                  <div className="relative">
                    <Briefcase
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "right-3" : "left-3"
                      } w-4 h-4 text-muted-foreground`}
                    />
                    <Input
                      placeholder={t("التخصص الرئيسي", "Main specialization")}
                      value={addForm.specialization}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          specialization: e.target.value,
                        })
                      }
                      className={isRTL ? "pr-10" : "pl-10"}
                    />
                  </div>
                </div>

                {/* Sub-Specialization */}
                <div className="space-y-1.5">
                  <Label>{t("التخصص الفرعي", "Sub-Specialization")}</Label>
                  <div className="relative">
                    <Briefcase
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "right-3" : "left-3"
                      } w-4 h-4 text-muted-foreground`}
                    />
                    <Input
                      placeholder={t("التخصص الفرعي", "Sub-specialization")}
                      value={addForm.sub_specialization}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          sub_specialization: e.target.value,
                        })
                      }
                      className={isRTL ? "pr-10" : "pl-10"}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 py-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password */}
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1">
                      {t("كلمة المرور", "Password")}
                      <span className="text-destructive text-xs">*</span>
                    </Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={addForm.password}
                      onChange={(e) =>
                        setAddForm({ ...addForm, password: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("8 أحرف على الأقل", "At least 8 characters")}
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1">
                      {t("تأكيد كلمة المرور", "Confirm Password")}
                      <span className="text-destructive text-xs">*</span>
                    </Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={addForm.password_confirmation}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          password_confirmation: e.target.value,
                        })
                      }
                    />
                    {addForm.password_confirmation &&
                      addForm.password !== addForm.password_confirmation && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          {t(
                            "كلمتا المرور غير متطابقتين",
                            "Passwords do not match"
                          )}
                        </p>
                      )}
                    {addForm.password_confirmation &&
                      addForm.password === addForm.password_confirmation && (
                        <p className="text-xs text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {t("متطابقتان", "Passwords match")}
                        </p>
                      )}
                  </div>
                </div>

                {/* Admin Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {t("صلاحيات المدير", "Admin Privileges")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(
                          "منح المستخدم صلاحيات الإدارة الكاملة",
                          "Grant this user full admin access"
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setAddForm({ ...addForm, is_admin: !addForm.is_admin })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      addForm.is_admin ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        addForm.is_admin ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Summary card */}
                {(addForm.name || addForm.email) && (
                  <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("ملخص البيانات", "Summary")}
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      {addForm.name && (
                        <>
                          <span className="text-muted-foreground">
                            {t("الاسم", "Name")}
                          </span>
                          <span className="font-medium truncate">
                            {addForm.name}
                          </span>
                        </>
                      )}
                      {addForm.email && (
                        <>
                          <span className="text-muted-foreground">
                            {t("البريد", "Email")}
                          </span>
                          <span className="font-medium truncate">
                            {addForm.email}
                          </span>
                        </>
                      )}
                      {addForm.employer && (
                        <>
                          <span className="text-muted-foreground">
                            {t("جهة العمل", "Employer")}
                          </span>
                          <span className="font-medium truncate">
                            {addForm.employer}
                          </span>
                        </>
                      )}
                      <span className="text-muted-foreground">
                        {t("الدور", "Role")}
                      </span>
                      <span className="font-medium">
                        {addForm.is_admin
                          ? t("مدير", "Admin")
                          : t("مستخدم", "User")}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <DialogFooter className="gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsAddOpen(false)}
              disabled={isAdding}
            >
              {t("إلغاء", "Cancel")}
            </Button>

            {addStep === 1 ? (
              <Button
                onClick={() => setAddStep(2)}
                disabled={!addForm.name.trim() || !addForm.email.trim()}
                className="gap-2"
              >
                {t("التالي", "Next")}
                <Lock className="w-4 h-4" />
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setAddStep(1)}
                  disabled={isAdding}
                >
                  {t("السابق", "Back")}
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={
                    isAdding ||
                    !addForm.password.trim() ||
                    addForm.password !== addForm.password_confirmation
                  }
                  className="gap-2"
                >
                  {isAdding ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  {t("إضافة المستخدم", "Create User")}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* ───────────────────────────────────────────────────────────────────────── */}

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("تفاصيل المستخدم", "User Details")}</DialogTitle>
            <DialogDescription>{selectedUser?.email}</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-3 py-4">
              {[
                {
                  icon: User,
                  label: t("الاسم", "Name"),
                  value: isRTL
                    ? selectedUser.name_ar || selectedUser.name
                    : selectedUser.name,
                },
                {
                  icon: Mail,
                  label: t("البريد", "Email"),
                  value: selectedUser.email,
                },
                {
                  icon: Phone,
                  label: t("الهاتف", "Phone"),
                  value: selectedUser.phone || "—",
                },
                {
                  icon: CreditCard,
                  label: t("الهوية", "National ID"),
                  value: selectedUser.national_id || "—",
                },
                {
                  icon: Briefcase,
                  label: t("التخصص", "Specialization"),
                  value: selectedUser.specialization || "—",
                },
                {
                  icon: Briefcase,
                  label: t("التخصص الفرعي", "Sub-Spec"),
                  value: selectedUser.sub_specialization || "—",
                },
                {
                  icon: Building2,
                  label: t("جهة العمل", "Employer"),
                  value: selectedUser.employer || "—",
                },
                {
                  icon: Shield,
                  label: t("الدور", "Role"),
                  value: selectedUser.is_admin
                    ? t("مدير", "Admin")
                    : t("مستخدم", "User"),
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
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="w-5 h-5 text-primary" />
              {t("تعديل المستخدم", "Edit User")}
            </DialogTitle>
            <DialogDescription>{selectedUser?.email}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="space-y-1">
              <Label>{t("الاسم (EN)", "Name (EN)")}</Label>
              <Input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <Label>{t("الاسم (AR)", "Name (AR)")}</Label>
              <Input
                value={editForm.name_ar}
                onChange={(e) =>
                  setEditForm({ ...editForm, name_ar: e.target.value })
                }
                dir="rtl"
              />
            </div>

            <div className="space-y-1">
              <Label>{t("البريد الإلكتروني", "Email")}</Label>
              <Input
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <Label>{t("الهاتف", "Phone")}</Label>
              <Input
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                dir="ltr"
              />
            </div>

            <div className="space-y-1">
              <Label>{t("رقم الهوية", "National ID")}</Label>
              <Input
                value={editForm.national_id}
                onChange={(e) =>
                  setEditForm({ ...editForm, national_id: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <Label>{t("جهة العمل", "Employer")}</Label>
              <Input
                value={editForm.employer}
                onChange={(e) =>
                  setEditForm({ ...editForm, employer: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <Label>{t("التخصص", "Specialization")}</Label>
              <Input
                value={editForm.specialization}
                onChange={(e) =>
                  setEditForm({ ...editForm, specialization: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <Label>{t("التخصص الفرعي", "Sub-Specialization")}</Label>
              <Input
                value={editForm.sub_specialization}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    sub_specialization: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-1">
              <Label>
                {t("كلمة المرور الجديدة", "New Password")}{" "}
                <span className="text-xs text-muted-foreground">
                  ({t("اتركه فارغاً للإبقاء", "leave blank to keep")})
                </span>
              </Label>
              <Input
                type="password"
                value={editForm.password}
                onChange={(e) =>
                  setEditForm({ ...editForm, password: e.target.value })
                }
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1">
              <Label>{t("تأكيد كلمة المرور", "Confirm Password")}</Label>
              <Input
                type="password"
                value={editForm.password_confirmation}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    password_confirmation: e.target.value,
                  })
                }
                placeholder="••••••••"
              />
            </div>

            {/* Admin Toggle */}
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">
                      {t("صلاحيات المدير", "Admin Privileges")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(
                        "منح المستخدم صلاحيات الإدارة الكاملة",
                        "Grant this user full admin access"
                      )}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditForm({ ...editForm, is_admin: !editForm.is_admin })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    editForm.is_admin ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editForm.is_admin ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              {t("إلغاء", "Cancel")}
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Pencil className="w-4 h-4" />
              )}
              {t("حفظ التغييرات", "Save Changes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              {t("تأكيد الحذف", "Confirm Delete")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "هل أنت متأكد من حذف هذا المستخدم؟",
                "Are you sure you want to delete this user?"
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              {t("إلغاء", "Cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="gap-2"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              {t("حذف", "Delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsersPage;
