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
  status?: 'pending' | 'approved' | 'rejected' | 'active';
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

const AdminUsersPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Debounced server-side search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchUsers(1, searchQuery);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers(page, searchQuery);
  }, [page]);

  const fetchUsers = async (pageNumber: number = 1, search: string = "") => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: String(pageNumber) });
      if (search.trim()) params.append("search", search.trim());

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

    // Only send password if filled in
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

  const formatDate = (date?: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          {t("إدارة المستخدمين", "Users Management")}
        </h2>
        <p className="text-muted-foreground">
          {t("عرض وإدارة جميع المستخدمين", "View and manage all users")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg">
              {t("قائمة المستخدمين", "Users List")} ({users.length})
            </CardTitle>
          </div>
          <div className="relative mt-2">
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
                          <div className="flex items-center gap-1">
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
                              className="text-blue-500 hover:text-blue-600"
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
