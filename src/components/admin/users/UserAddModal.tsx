import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { AddForm } from "@/types/user";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Building2, CheckCircle2, CreditCard, Lock, Mail, Phone, Shield, User, UserPlus, XCircle, Loader2 } from "lucide-react";

interface UserAddModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  addForm: AddForm;
  setAddForm: (form: AddForm) => void;
  addStep: 1 | 2;
  setAddStep: (step: 1 | 2) => void;
  isAdding: boolean;
  onAdd: () => void;
}

export const UserAddModal = ({
  isOpen,
  onOpenChange,
  addForm,
  setAddForm,
  addStep,
  setAddStep,
  isAdding,
  onAdd,
}: UserAddModalProps) => {
  const { t, isRTL } = useLanguage();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
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

              <div className="space-y-1.5">
                <Label>{t("رقم الهوية", "National ID")}</Label>
                <div className="relative">
                  <CreditCard
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? "right-3" : "left-3"
                    } w-4 h-4 text-muted-foreground`}
                  />
                  <Input
                    placeholder={t("رقم الهوية الوطنية", "National ID number")}
                    value={addForm.national_id}
                    onChange={(e) =>
                      setAddForm({ ...addForm, national_id: e.target.value })
                    }
                    className={isRTL ? "pr-10" : "pl-10"}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>{t("جهة العمل", "Employer")}</Label>
                <div className="relative">
                  <Building2
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? "right-3" : "left-3"
                    } w-4 h-4 text-muted-foreground`}
                  />
                  <Input
                    placeholder={t("اسم الجهة أو المؤسسة", "Organization name")}
                    value={addForm.employer}
                    onChange={(e) =>
                      setAddForm({ ...addForm, employer: e.target.value })
                    }
                    className={isRTL ? "pr-10" : "pl-10"}
                  />
                </div>
              </div>

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

              {/* Role Select */}
              <div className="space-y-1.5 mt-2">
                <Label>{t("الصلاحية والدور", "Role")}</Label>
                <div className="relative">
                  <Select
                    value={addForm.role}
                    onValueChange={(val) => setAddForm({ ...addForm, role: val })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{t("عضو", "Member")}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="branch_manager">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-500" />
                          <span>{t("مدير فرع", "Branch Manager")}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="system_admin">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span>{t("مدير النظام", "System Admin")}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      {addForm.role === "system_admin"
                        ? t("مدير النظام", "System Admin")
                        : addForm.role === "branch_manager"
                        ? t("مدير فرع", "Branch Manager")
                        : t("عضو", "Member")}
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
            onClick={() => onOpenChange(false)}
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
                onClick={onAdd}
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
  );
};
