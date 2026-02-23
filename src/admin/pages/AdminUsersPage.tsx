import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
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
  role?: string;
  is_admin?: boolean;
  created_at?: string;
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

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNumber: number = 1) => {
    setIsLoading(true);
    try {
      const res = await api.get(`/admin/users?page=${pageNumber}`);
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
      fetchUsers(page);
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

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.name_ar && u.name_ar.includes(searchQuery))
  );

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
              {t("قائمة المستخدمين", "Users List")} ({filtered.length})
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
          ) : filtered.length === 0 ? (
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
                      {t("التخصص", "Specialization")}
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
                    {filtered.map((u, i) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-t border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <p className="font-medium text-sm">
                            {t(u.name_ar || u.name, u.name)}
                          </p>
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
                          {u.specialization || "—"}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={
                              u.is_admin || u.role === "admin"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {u.is_admin || u.role === "admin"
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
                <div className="flex justify-end mt-3 gap-2">
                  <Button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Prev
                  </Button>
                  <span className="px-2 py-1">
                    {page} / {lastPage}
                  </span>
                  <Button
                    onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                    disabled={page === lastPage}
                  >
                    Next
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
                  icon: Shield,
                  label: t("الاسم", "Name"),
                  value: selectedUser.name,
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
                  icon: Shield,
                  label: t("الهوية", "National ID"),
                  value: selectedUser.national_id || "—",
                },
                {
                  icon: Shield,
                  label: t("التخصص", "Specialization"),
                  value: selectedUser.specialization || "—",
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
