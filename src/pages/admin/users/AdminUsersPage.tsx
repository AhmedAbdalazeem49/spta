import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { AddForm, defaultAddForm, EditForm, UserItem } from "@/types/user";
import { Search, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";

// Components
import { UserAddModal } from "@/components/admin/users/UserAddModal";
import { UserDeleteModal } from "@/components/admin/users/UserDeleteModal";
import { UserEditModal } from "@/components/admin/users/UserEditModal";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { UserViewModal } from "@/components/admin/users/UserViewModal";

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
    role: "user",
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
      role: u.role || "user",
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
      role: editForm.role,
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

  const openAdd = () => {
    setAddForm(defaultAddForm);
    setAddStep(1);
    setIsAddOpen(true);
  };

  const handleAdd = async () => {
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
        role: addForm.role,
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
                  {t("موافق", "Approved")}
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
            <UsersTable
              users={users}
              page={page}
              lastPage={lastPage}
              updatingId={updatingId}
              onPageChange={setPage}
              onUpdateStatus={updateStatus}
              onOpenView={(u) => {
                setSelectedUser(u);
                setIsViewOpen(true);
              }}
              onOpenEdit={openEdit}
              onOpenDelete={(u) => {
                setSelectedUser(u);
                setIsDeleteOpen(true);
              }}
            />
          )}
        </CardContent>
      </Card>

      <UserAddModal
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        addForm={addForm}
        setAddForm={setAddForm}
        addStep={addStep}
        setAddStep={setAddStep}
        isAdding={isAdding}
        onAdd={handleAdd}
      />

      <UserViewModal
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        user={selectedUser}
      />

      <UserEditModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        selectedUser={selectedUser}
        editForm={editForm}
        setEditForm={setEditForm}
        isSaving={isSaving}
        onSave={handleSave}
      />

      <UserDeleteModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onDelete={handleDelete}
        isDeleting={isDeleting}
        selected={selectedUser}
      />
    </div>
  );
};

export default AdminUsersPage;
