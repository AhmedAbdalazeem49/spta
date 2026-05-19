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
import {
  AlertCircle,
  Award,
  BadgeCheck,
  Ban,
  Calendar,
  CheckCircle,
  Clock,
  Crown,
  Edit,
  Eye,
  GraduationCap,
  Hash,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MembershipItem {
  id: number;
  user_id: number;
  membership_type: string;
  membership_number: string;
  starts_at: string;
  ends_at: string;
  status: "pending" | "active" | "expired" | "cancelled";
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    name_ar?: string;
    email: string;
    phone?: string;
    employer?: string;
    specialization?: string;
  };
}

interface AddMembershipForm {
  user_id: string;
  membership_type: string;
  membership_number: string;
  starts_at: string;
  ends_at: string;
  status: string;
}

interface EditMembershipForm {
  membership_type: string;
  membership_number: string;
  starts_at: string;
  ends_at: string;
  status: string;
}

const defaultAddForm: AddMembershipForm = {
  user_id: "",
  membership_type: "active",
  membership_number: "",
  starts_at: "",
  ends_at: "",
  status: "active",
};

const MEMBERSHIP_TYPES = [
  { value: "active", labelAr: "عضو عامل", labelEn: "Active Member" },
  { value: "affiliate", labelAr: "عضو منتسب", labelEn: "Affiliate Member" },
  { value: "student", labelAr: "طالب", labelEn: "Student" },
  { value: "intern", labelAr: "طالب امتياز", labelEn: "Intern" },
];

const STATUS_OPTIONS = [
  { value: "pending", labelAr: "قيد الانتظار", labelEn: "Pending" },
  { value: "active", labelAr: "نشط", labelEn: "Active" },
  { value: "expired", labelAr: "منتهي", labelEn: "Expired" },
  { value: "cancelled", labelAr: "ملغي", labelEn: "Cancelled" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getStatusConfig = (status: string) => {
  const map: Record<
    string,
    { color: string; icon: any; ar: string; en: string }
  > = {
    active: {
      color: "bg-green-500/10 text-green-600 border-green-500/30",
      icon: CheckCircle,
      ar: "نشط",
      en: "Active",
    },
    expired: {
      color: "bg-red-500/10 text-red-600 border-red-500/30",
      icon: XCircle,
      ar: "منتهي",
      en: "Expired",
    },
    pending: {
      color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
      icon: AlertCircle,
      ar: "قيد الانتظار",
      en: "Pending",
    },
    cancelled: {
      color: "bg-slate-500/10 text-slate-600 border-slate-500/30",
      icon: Ban,
      ar: "ملغي",
      en: "Cancelled",
    },
  };
  return map[status] || map.pending;
};

const getMembershipTypeIcon = (type: string) => {
  const icons: Record<string, any> = {
    active: Crown,
    affiliate: Users,
    student: GraduationCap,
    intern: Award,
  };
  return icons[type] || Shield;
};

const getMembershipTypeLabel = (type: string, isRTL: boolean) => {
  const found = MEMBERSHIP_TYPES.find((t) => t.value === type);
  return found ? (isRTL ? found.labelAr : found.labelEn) : type;
};

const formatDate = (dateStr: string, isRTL: boolean) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const toInputDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().slice(0, 10);
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status, t }: { status: string; t: any }) => {
  const cfg = getStatusConfig(status);
  const Icon = cfg.icon;
  return (
    <Badge
      variant="outline"
      className={`${cfg.color} gap-1.5 px-2.5 py-0.5 text-xs font-medium`}
    >
      <Icon className="w-3 h-3" />
      {t(cfg.ar, cfg.en)}
    </Badge>
  );
};

// ─── View Modal ───────────────────────────────────────────────────────────────

const MembershipViewModal = ({
  isOpen,
  onOpenChange,
  membership,
}: {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  membership: MembershipItem | null;
}) => {
  const { t, isRTL } = useLanguage();
  if (!membership) return null;
  const TypeIcon = getMembershipTypeIcon(membership.membership_type);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Eye className="w-5 h-5 text-primary" />
            {t("تفاصيل العضوية", "Membership Details")}
          </DialogTitle>
        </DialogHeader>

        {/* Hero card */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-xl p-5 text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <TypeIcon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-white/70 text-sm">
                {getMembershipTypeLabel(membership.membership_type, isRTL)}
              </p>
              <p className="font-mono font-bold text-lg tracking-wider">
                {membership.membership_number}
              </p>
            </div>
            <div className="ms-auto">
              <StatusBadge status={membership.status} t={t} />
            </div>
          </div>
        </div>

        {/* User info */}
        {membership.user && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {membership.user.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-semibold text-sm">{membership.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {membership.user.email}
              </p>
            </div>
          </div>
        )}

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: Calendar,
              label: t("تاريخ البداية", "Start Date"),
              value: formatDate(membership.starts_at, isRTL),
            },
            {
              icon: Clock,
              label: t("تاريخ الانتهاء", "End Date"),
              value: formatDate(membership.ends_at, isRTL),
            },
            {
              icon: Hash,
              label: t("رقم العضوية", "Membership No."),
              value: membership.membership_number,
              mono: true,
            },
            {
              icon: BadgeCheck,
              label: t("نوع العضوية", "Type"),
              value: getMembershipTypeLabel(membership.membership_type, isRTL),
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p
                    className={`text-sm font-medium ${
                      item.mono ? "font-mono" : ""
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ─── Edit Modal ───────────────────────────────────────────────────────────────

const MembershipEditModal = ({
  isOpen,
  onOpenChange,
  membership,
  editForm,
  setEditForm,
  isSaving,
  onSave,
}: {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  membership: MembershipItem | null;
  editForm: EditMembershipForm;
  setEditForm: (f: EditMembershipForm) => void;
  isSaving: boolean;
  onSave: () => void;
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-primary" />
            {t("تعديل العضوية", "Edit Membership")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Membership Number */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              {t("رقم العضوية", "Membership Number")}
            </Label>
            <Input
              value={editForm.membership_number}
              onChange={(e) =>
                setEditForm({ ...editForm, membership_number: e.target.value })
              }
              dir="ltr"
              className="font-mono"
            />
          </div>

          {/* Type + Status row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                {t("نوع العضوية", "Membership Type")}
              </Label>
              <Select
                value={editForm.membership_type}
                onValueChange={(v) =>
                  setEditForm({ ...editForm, membership_type: v })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MEMBERSHIP_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {isRTL ? type.labelAr : type.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                {t("الحالة", "Status")}
              </Label>
              <Select
                value={editForm.status}
                onValueChange={(v) => setEditForm({ ...editForm, status: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {isRTL ? s.labelAr : s.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                {t("تاريخ البداية", "Start Date")}
              </Label>
              <Input
                type="date"
                value={editForm.starts_at}
                onChange={(e) =>
                  setEditForm({ ...editForm, starts_at: e.target.value })
                }
                dir="ltr"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                {t("تاريخ الانتهاء", "End Date")}
              </Label>
              <Input
                type="date"
                value={editForm.ends_at}
                onChange={(e) =>
                  setEditForm({ ...editForm, ends_at: e.target.value })
                }
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="gap-2 min-w-[100px]"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            {t("حفظ", "Save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Add Modal ────────────────────────────────────────────────────────────────

const MembershipAddModal = ({
  isOpen,
  onOpenChange,
  addForm,
  setAddForm,
  isAdding,
  onAdd,
  userSuggestions,
  userSearch,
  setUserSearch,
  onSearchUsers,
}: {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  addForm: AddMembershipForm;
  setAddForm: (f: AddMembershipForm) => void;
  isAdding: boolean;
  onAdd: () => void;
  userSuggestions: any[];
  userSearch: string;
  setUserSearch: (v: string) => void;
  onSearchUsers: (q: string) => void;
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            {t("إضافة عضوية جديدة", "Add New Membership")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* User search */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              {t("المستخدم", "User")}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 ${
                  isRTL ? "right-3" : "left-3"
                } w-4 h-4 text-muted-foreground`}
              />
              <Input
                placeholder={t(
                  "ابحث بالاسم أو البريد...",
                  "Search by name or email..."
                )}
                value={userSearch}
                onChange={(e) => {
                  setUserSearch(e.target.value);
                  onSearchUsers(e.target.value);
                }}
                className={isRTL ? "pr-9" : "pl-9"}
              />
            </div>
            {/* Suggestions dropdown */}
            {userSuggestions.length > 0 && (
              <div className="border border-border rounded-xl overflow-hidden shadow-md bg-background max-h-40 overflow-y-auto">
                {userSuggestions.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/60 transition-colors text-start"
                    onClick={() => {
                      setAddForm({ ...addForm, user_id: String(u.id) });
                      setUserSearch(`${u.name}`);
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                      {u.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {addForm.user_id && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {t("تم اختيار المستخدم", "User selected")} (ID:{" "}
                {addForm.user_id})
              </p>
            )}
          </div>

          <Separator />

          {/* Type + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                {t("نوع العضوية", "Membership Type")}
              </Label>
              <Select
                value={addForm.membership_type}
                onValueChange={(v) =>
                  setAddForm({ ...addForm, membership_type: v })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MEMBERSHIP_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {isRTL ? type.labelAr : type.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                {t("الحالة", "Status")}
              </Label>
              <Select
                value={addForm.status}
                onValueChange={(v) => setAddForm({ ...addForm, status: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {isRTL ? s.labelAr : s.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Membership Number */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              {t("رقم العضوية", "Membership Number")}
              <span className="text-muted-foreground text-xs ms-1">
                {t(
                  "(اختياري - سيُولَّد تلقائياً)",
                  "(optional – auto-generated)"
                )}
              </span>
            </Label>
            <Input
              value={addForm.membership_number}
              onChange={(e) =>
                setAddForm({ ...addForm, membership_number: e.target.value })
              }
              dir="ltr"
              className="font-mono"
              placeholder="SPTA-2024-XXXXX"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                {t("تاريخ البداية", "Start Date")}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                value={addForm.starts_at}
                onChange={(e) =>
                  setAddForm({ ...addForm, starts_at: e.target.value })
                }
                dir="ltr"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                {t("تاريخ الانتهاء", "End Date")}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                value={addForm.ends_at}
                onChange={(e) =>
                  setAddForm({ ...addForm, ends_at: e.target.value })
                }
                dir="ltr"
              />
            </div>
          </div>

          {/* Paid note */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400">
            <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed">
              {t(
                "إضافة عضوية من هنا تعني أن الدفع قد تمّ بالفعل. سيتم تفعيل العضوية فور الحفظ وفق الحالة المختارة.",
                "Adding a membership here means payment has already been made. The membership will be activated upon saving based on the selected status."
              )}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>
          <Button
            onClick={onAdd}
            disabled={isAdding}
            className="gap-2 min-w-[120px]"
          >
            {isAdding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {t("إضافة العضوية", "Add Membership")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Delete Modal ─────────────────────────────────────────────────────────────

const MembershipDeleteModal = ({
  isOpen,
  onOpenChange,
  onDelete,
  isDeleting,
  membership,
}: {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  onDelete: () => void;
  isDeleting: boolean;
  membership: MembershipItem | null;
}) => {
  const { t } = useLanguage();

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            {t("حذف العضوية", "Delete Membership")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            {t(
              "هل أنت متأكد من حذف هذه العضوية؟ لا يمكن التراجع عن هذا الإجراء.",
              "Are you sure you want to delete this membership? This action cannot be undone."
            )}
            {membership && (
              <span className="block mt-2 font-mono font-semibold text-foreground">
                {membership.membership_number}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>{t("إلغاء", "Cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90 gap-2"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {t("حذف", "Delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// ─── Memberships Table ────────────────────────────────────────────────────────

const MembershipsTable = ({
  memberships,
  page,
  lastPage,
  updatingId,
  onPageChange,
  onUpdateStatus,
  onOpenView,
  onOpenEdit,
  onOpenDelete,
}: {
  memberships: MembershipItem[];
  page: number;
  lastPage: number;
  updatingId: number | null;
  onPageChange: (p: number) => void;
  onUpdateStatus: (
    id: number,
    status: "active" | "expired" | "cancelled"
  ) => void;
  onOpenView: (m: MembershipItem) => void;
  onOpenEdit: (m: MembershipItem) => void;
  onOpenDelete: (m: MembershipItem) => void;
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-start p-4 font-semibold text-muted-foreground">
                #
              </th>
              <th className="text-start p-4 font-semibold text-muted-foreground">
                {t("المستخدم", "User")}
              </th>
              <th className="text-start p-4 font-semibold text-muted-foreground">
                {t("رقم العضوية", "Membership No.")}
              </th>
              <th className="text-start p-4 font-semibold text-muted-foreground">
                {t("النوع", "Type")}
              </th>
              <th className="text-start p-4 font-semibold text-muted-foreground">
                {t("الفترة", "Period")}
              </th>
              <th className="text-start p-4 font-semibold text-muted-foreground">
                {t("الحالة", "Status")}
              </th>
              <th className="text-start p-4 font-semibold text-muted-foreground">
                {t("الإجراءات", "Actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {memberships.map((m, index) => {
              const TypeIcon = getMembershipTypeIcon(m.membership_type);
              return (
                <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-muted-foreground text-xs">
                    {(page - 1) * 15 + index + 1}
                  </td>

                  {/* User */}
                  <td className="p-4">
                    {m.user ? (
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                          {m.user.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{m.user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {m.user.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>

                  {/* Membership number */}
                  <td className="p-4">
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded-md">
                      {m.membership_number}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm">
                      <TypeIcon className="w-3.5 h-3.5 text-primary" />
                      {getMembershipTypeLabel(m.membership_type, isRTL)}
                    </div>
                  </td>

                  {/* Period */}
                  <td className="p-4">
                    <div className="text-xs space-y-0.5">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(m.starts_at, isRTL)}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatDate(m.ends_at, isRTL)}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <StatusBadge status={m.status} t={t} />
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 text-muted-foreground hover:text-primary"
                        onClick={() => onOpenView(m)}
                        title={t("عرض", "View")}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 text-muted-foreground hover:text-blue-600"
                        onClick={() => onOpenEdit(m)}
                        title={t("تعديل", "Edit")}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {m.status !== "active" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8 text-muted-foreground hover:text-green-600"
                          onClick={() => onUpdateStatus(m.id, "active")}
                          disabled={updatingId === m.id}
                          title={t("تفعيل", "Activate")}
                        >
                          {updatingId === m.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                      {m.status === "active" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8 text-muted-foreground hover:text-yellow-600"
                          onClick={() => onUpdateStatus(m.id, "cancelled")}
                          disabled={updatingId === m.id}
                          title={t("إلغاء", "Cancel")}
                        >
                          {updatingId === m.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Ban className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 text-muted-foreground hover:text-destructive"
                        onClick={() => onOpenDelete(m)}
                        title={t("حذف", "Delete")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {lastPage > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {t("الصفحة", "Page")} {page} {t("من", "of")} {lastPage}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              {t("السابق", "Previous")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page + 1)}
              disabled={page === lastPage}
            >
              {t("التالي", "Next")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};



// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminMembershipsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [memberships, setMemberships] = useState<MembershipItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    expired: 0,
  });

  const [selectedMembership, setSelectedMembership] =
    useState<MembershipItem | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // View
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState<EditMembershipForm>({
    membership_type: "active",
    membership_number: "",
    starts_at: "",
    ends_at: "",
    status: "active",
  });

  // Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Add
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState<AddMembershipForm>(defaultAddForm);
  const [userSearch, setUserSearch] = useState("");
  const [userSuggestions, setUserSuggestions] = useState<any[]>([]);

  // ── Fetch ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchMemberships(1, searchQuery, statusFilter, typeFilter);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchQuery, statusFilter, typeFilter]);

  useEffect(() => {
    fetchMemberships(page, searchQuery, statusFilter, typeFilter);
  }, [page]);

  const fetchMemberships = async (
    pageNumber = 1,
    search = "",
    status = "all",
    type = "all"
  ) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: String(pageNumber) });
      if (search.trim()) params.append("search", search.trim());
      if (status && status !== "all") params.append("status", status);
      if (type && type !== "all") params.append("membership_type", type);

      const res = await api.get(`/admin/memberships`);
      const data = res.data?.data || [];
      setMemberships(Array.isArray(data) ? data : []);
      setLastPage(res.data?.last_page || 1);

      // Compute stats from meta or locally
      const meta = res.data?.meta;
      if (meta) {
        setStats({
          total: meta.total || 0,
          active: meta.active || 0,
          pending: meta.pending || 0,
          expired: meta.expired || 0,
        });
      }
    } catch {
      toast({
        title: t("خطأ", "Error"),
        description: t("فشل تحميل العضويات", "Failed to load memberships"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setUserSuggestions([]);
      return;
    }
    try {
      const res = await api.get(
        `/admin/users?search=${encodeURIComponent(query)}&page=1`
      );
      const data = res.data?.data || [];
      setUserSuggestions(Array.isArray(data) ? data.slice(0, 6) : []);
    } catch {
      setUserSuggestions([]);
    }
  };

  // ── Actions ────────────────────────────────────────────────────────────────

  const updateStatus = async (
    id: number,
    status: "active" | "expired" | "cancelled"
  ) => {
    setUpdatingId(id);
    try {
      await api.patch(`/admin/memberships/${id}/status`, { status });
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم تحديث حالة العضوية", "Membership status updated"),
      });
      setMemberships((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
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

  const openEdit = (m: MembershipItem) => {
    setSelectedMembership(m);
    setEditForm({
      membership_type: m.membership_type,
      membership_number: m.membership_number,
      starts_at: toInputDate(m.starts_at),
      ends_at: toInputDate(m.ends_at),
      status: m.status,
    });
    setIsEditOpen(true);
  };

  const handleSave = async () => {
    if (!selectedMembership) return;
    setIsSaving(true);
    try {
      await api.put(`/admin/memberships/${selectedMembership.id}`, editForm);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم تحديث العضوية", "Membership updated successfully"),
      });
      setIsEditOpen(false);
      fetchMemberships(page, searchQuery, statusFilter, typeFilter);
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
    if (!selectedMembership) return;
    setIsDeleting(true);
    try {
      await api.delete(`/admin/memberships/${selectedMembership.id}`);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم حذف العضوية", "Membership deleted"),
      });
      setIsDeleteOpen(false);
      setSelectedMembership(null);
      fetchMemberships(1, searchQuery, statusFilter, typeFilter);
      setPage(1);
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description:
          err.response?.data?.message || t("حدث خطأ", "Error occurred"),
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const openAdd = () => {
    setAddForm(defaultAddForm);
    setUserSearch("");
    setUserSuggestions([]);
    setIsAddOpen(true);
  };

  const handleAdd = async () => {
    if (!addForm.user_id) {
      toast({
        title: t("خطأ في البيانات", "Validation Error"),
        description: t("يجب اختيار مستخدم", "Please select a user"),
        variant: "destructive",
      });
      return;
    }
    if (!addForm.starts_at || !addForm.ends_at) {
      toast({
        title: t("خطأ في البيانات", "Validation Error"),
        description: t(
          "تاريخا البداية والنهاية مطلوبان",
          "Start and end dates are required"
        ),
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);
    try {
      await api.post("/admin/memberships", {
        user_id: Number(addForm.user_id),
        membership_type: addForm.membership_type,
        membership_number: addForm.membership_number || undefined,
        starts_at: addForm.starts_at,
        ends_at: addForm.ends_at,
        status: addForm.status,
      });
      toast({
        title: t("تم بنجاح", "Success"),
        description: t(
          "تم إضافة العضوية بنجاح",
          "Membership added successfully"
        ),
      });
      setIsAddOpen(false);
      fetchMemberships(1, searchQuery, statusFilter, typeFilter);
      setPage(1);
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      const msg = errors
        ? Object.values(errors).flat().join(", ")
        : err.response?.data?.message || t("حدث خطأ", "Error occurred");
      toast({
        title: t("خطأ", "Error"),
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            {t("إدارة العضويات", "Memberships Management")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "عرض وإدارة جميع اشتراكات العضوية",
              "View and manage all membership subscriptions"
            )}
          </p>
        </div>
        <Button onClick={openAdd} className="gap-2 shrink-0 shadow-sm">
          <Plus className="w-4 h-4" />
          {t("إضافة عضوية", "Add Membership")}
        </Button>
      </div>



      {/* Table card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg">
              {t("قائمة العضويات", "Memberships List")} ({memberships.length})
            </CardTitle>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <div className="relative flex-1">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 ${
                  isRTL ? "right-3" : "left-3"
                } w-4 h-4 text-muted-foreground`}
              />
              <Input
                placeholder={t(
                  "بحث بالاسم أو رقم العضوية...",
                  "Search by name or membership number..."
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={isRTL ? "pr-10" : "pl-10"}
              />
            </div>


{/* 
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder={t("النوع", "Type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("كل الأنواع", "All Types")}
                </SelectItem>
                {MEMBERSHIP_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {isRTL ? type.labelAr : type.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-14 w-full bg-muted rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : memberships.length === 0 ? (
            <div className="p-12 text-center">
              <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                {t("لا توجد عضويات", "No memberships found")}
              </p>
            </div>
          ) : (
            <MembershipsTable
              memberships={memberships}
              page={page}
              lastPage={lastPage}
              updatingId={updatingId}
              onPageChange={setPage}
              onUpdateStatus={updateStatus}
              onOpenView={(m) => {
                setSelectedMembership(m);
                setIsViewOpen(true);
              }}
              onOpenEdit={openEdit}
              onOpenDelete={(m) => {
                setSelectedMembership(m);
                setIsDeleteOpen(true);
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <MembershipViewModal
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        membership={selectedMembership}
      />

      <MembershipEditModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        membership={selectedMembership}
        editForm={editForm}
        setEditForm={setEditForm}
        isSaving={isSaving}
        onSave={handleSave}
      />

      <MembershipAddModal
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        addForm={addForm}
        setAddForm={setAddForm}
        isAdding={isAdding}
        onAdd={handleAdd}
        userSuggestions={userSuggestions}
        userSearch={userSearch}
        setUserSearch={setUserSearch}
        onSearchUsers={searchUsers}
      />

      <MembershipDeleteModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onDelete={handleDelete}
        isDeleting={isDeleting}
        membership={selectedMembership}
      />
    </div>
  );
};

export default AdminMembershipsPage;
