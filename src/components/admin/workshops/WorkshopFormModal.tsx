import { api } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Edit,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Plus,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { useRef, useState , useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line react-refresh/only-export-components
export const emptyWorkshopForm = {
  title: "",
  description: "",
  doctor_name: "",
  location: "",
  date: "",
  time: "",
  regular_price: "",
  member_price: "",
  total_capacity: "",
  status: "open" as "open" | "closed" | "completed" | "postponed",
  image: null as File | null,
};

export type WorkshopForm = typeof emptyWorkshopForm;
type FieldErrors = Partial<Record<keyof WorkshopForm, string>>;

interface WorkshopFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: WorkshopForm;
  setForm: (form: WorkshopForm) => void;
  editMode: boolean;
  isSaving: boolean;
  /** Receives a ready-to-send FormData — just call api.post/put inside */
  onSave: (formData: FormData) => void;

  changes: Record<string, { old: string; new: string }>;
  changeType: "postponed" | "date_changed" | "general";
  hasChanges: boolean;
  workshopId?: number;
  existingImage?: string | null;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(
  form: WorkshopForm,
  editMode: boolean,
  t: (ar: string, en: string) => string
): FieldErrors {
  const errors: FieldErrors = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!form.title.trim())
    errors.title = t("العنوان مطلوب", "Title is required");
  else if (form.title.length > 255)
    errors.title = t("الحد الأقصى 255 حرف", "Max 255 characters");

  if (!form.description.trim())
    errors.description = t("الوصف مطلوب", "Description is required");

  if (!form.doctor_name.trim())
    errors.doctor_name = t("اسم الطبيب مطلوب", "Doctor name is required");
  else if (form.doctor_name.length > 255)
    errors.doctor_name = t("الحد الأقصى 255 حرف", "Max 255 characters");

  if (!form.location.trim())
    errors.location = t("الموقع مطلوب", "Location is required");
  else if (form.location.length > 255)
    errors.location = t("الحد الأقصى 255 حرف", "Max 255 characters");

  if (!form.date) errors.date = t("التاريخ مطلوب", "Date is required");
  else {
    const d = new Date(form.date);
    if (!editMode && d < today)
      errors.date = t(
        "يجب أن يكون التاريخ اليوم أو بعده",
        "Date must be today or later"
      );
  }

  if (!form.time) errors.time = t("الوقت مطلوب", "Time is required");

  if (form.regular_price === "" || form.regular_price === null)
    errors.regular_price = t("السعر مطلوب", "Price is required");
  else if (Number(form.regular_price) < 0)
    errors.regular_price = t(
      "يجب أن يكون السعر 0 أو أكثر",
      "Price must be ≥ 0"
    );

  if (form.member_price === "" || form.member_price === null)
    errors.member_price = t("سعر الأعضاء مطلوب", "Member price is required");
  else if (Number(form.member_price) < 0)
    errors.member_price = t("يجب أن يكون السعر 0 أو أكثر", "Price must be ≥ 0");
  else if (
    form.regular_price !== "" &&
    Number(form.member_price) > Number(form.regular_price)
  )
    errors.member_price = t(
      "سعر الأعضاء يجب أن يكون أقل من أو يساوي السعر العادي",
      "Member price must be ≤ regular price"
    );

  if (!form.total_capacity)
    errors.total_capacity = t("عدد المقاعد مطلوب", "Capacity is required");
  else if (Number(form.total_capacity) < 1)
    errors.total_capacity = t(
      "يجب أن يكون عدد المقاعد 1 على الأقل",
      "Capacity must be ≥ 1"
    );


  if (form.image) {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(form.image.type))
      errors.image = t(
        "صيغة الصورة يجب أن تكون jpg, jpeg, png, أو webp",
        "Image must be jpg, jpeg, png, or webp"
      );
  }

  if (!editMode && !form.image)
    errors.image = t("الصورة التعريفية للورشة مطلوبة", "Image is required");

  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const inputBase =
  "w-full h-10 rounded-xl border bg-background px-3.5 py-2 text-sm outline-none transition-all duration-150 " +
  "placeholder:text-muted-foreground/50 " +
  "focus:ring-2 focus:ring-primary/30 focus:border-primary " +
  "disabled:opacity-50";

const inputError =
  "border-destructive/70 focus:ring-destructive/20 focus:border-destructive";
const inputOk = "border-border hover:border-border/80";

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Field = ({ label, error, required, children, icon }: FieldProps) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
      {icon && <span className="text-primary/70">{icon}</span>}
      {label}
      {required && <span className="text-destructive">*</span>}
    </label>
    {children}
    <AnimatePresence mode="wait">
      {error && (
        <motion.p
          key={error}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-[11px] text-destructive flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <span className="text-sm font-bold text-foreground">{title}</span>
      <div className="flex-1 h-px bg-border/60" />
    </div>
    {children}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

export const WorkshopFormModal = ({
  isOpen,
  onOpenChange,
  form,
  setForm,
  editMode,
  isSaving,
  onSave,
  changes,
  changeType,
  hasChanges,
  workshopId,
  existingImage,
}: WorkshopFormModalProps) => {
  const { t } = useLanguage();

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [isNotifying, setIsNotifying] = useState(false);
  const [notified, setNotified] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleNotifySubscribers = async () => {
    if (!workshopId) return;
    setIsNotifying(true);
    try {
      await api.post(`/workshops/${workshopId}/notify-subscribers`, {
        change_type: changeType,
        changes,
      });
      setNotified(true);
      setCooldown(60); // start 60-second cooldown

      // tick down every second
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setNotified(false); // re-enable button
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsNotifying(false);
    }
  };

  useEffect(() => {
    if (isOpen && editMode && existingImage) {
      setImagePreview(existingImage);
    }
    if (!isOpen) {
      setImagePreview(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const touch = (field: string) => setTouched((p) => new Set([...p, field]));

  const update = <K extends keyof WorkshopForm>(
    field: K,
    value: WorkshopForm[K],
  ) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (submitted || touched.has(field)) {
      const e = validate(next, editMode, t);
      setErrors((prev) => ({ ...prev, [field]: e[field] }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    update("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // ── Save: validate → build FormData → pass to parent ─────────────────────────

  const handleSave = () => {
    setSubmitted(true);
    const e = validate(form, editMode, t);
    setErrors(e);
    if (Object.keys(e).length > 0) return; // stop — show errors

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("doctor_name", form.doctor_name);
    fd.append("location", form.location);
    fd.append("date", form.date);
    fd.append("time", form.time);
    fd.append("regular_price", form.regular_price);
    fd.append("member_price", form.member_price);
    fd.append("total_capacity", form.total_capacity);
    fd.append("status", form.status);

    if (form.image instanceof File) {
      fd.append("image", form.image);
    }

    onSave(fd); // ← parent owns the API call
  };

  const handleClose = () => {
    setErrors({});
    setTouched(new Set());
    setSubmitted(false);
    onOpenChange(false);
  };

  const err = (f: keyof WorkshopForm) =>
    submitted || touched.has(f) ? errors[f] : undefined;

  const cls = (f: keyof WorkshopForm) =>
    `${inputBase} ${err(f) ? inputError : inputOk}`;

  const completedFields = [
    form.title,
    form.description,
    form.doctor_name,
    form.location,
    form.date,
    form.time,
    form.regular_price,
    form.member_price,
    form.total_capacity,
  ].filter(Boolean).length;
  const progress = Math.round((completedFields / 9) * 100);

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden rounded-2xl border border-border/60 shadow-2xl">
        {/* ── Header ── */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-primary/8 via-primary/4 to-transparent">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                {editMode ? (
                  <Edit className="w-5 h-5 text-primary" />
                ) : (
                  <Plus className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <DialogTitle className="text-base font-bold">
                  {editMode
                    ? t("تعديل الورشة", "Edit Workshop")
                    : t("إضافة ورشة جديدة", "Add New Workshop")}
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {editMode
                    ? t(
                        "عدّل بيانات الورشة أدناه",
                        "Update workshop details below",
                      )
                    : t(
                        "أدخل بيانات الورشة الجديدة",
                        "Fill in the workshop details below",
                      )}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-7 h-7 rounded-lg bg-muted/70 hover:bg-muted flex items-center justify-center transition-colors mt-0.5 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress bar — create mode only */}
          {!editMode && (
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{t("اكتمال النموذج", "Form completion")}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 30 }}
                />
              </div>
            </div>
          )}
        </DialogHeader>

        {/* ── Body ── */}
        <div className="overflow-y-auto max-h-[68vh] px-6 py-5 space-y-7">
          {/* 1 · Basic info */}
          <Section
            title={t("المعلومات الأساسية", "Basic Information")}
            icon={<BookOpen className="w-3.5 h-3.5" />}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label={t("عنوان الورشة", "Workshop Title")}
                error={err("title")}
                required
                icon={<BookOpen className="w-3 h-3" />}
              >
                <input
                  className={cls("title")}
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  onBlur={() => touch("title")}
                  placeholder={t("ادخل عنوان الورشة", "Enter workshop title")}
                  maxLength={255}
                />
              </Field>

              <Field
                label={t("الطبيب المسؤول", "Doctor Name")}
                error={err("doctor_name")}
                required
                icon={<Stethoscope className="w-3 h-3" />}
              >
                <input
                  className={cls("doctor_name")}
                  value={form.doctor_name}
                  onChange={(e) => update("doctor_name", e.target.value)}
                  onBlur={() => touch("doctor_name")}
                  placeholder={t("اسم الطبيب", "Doctor's full name")}
                  maxLength={255}
                />
              </Field>
            </div>

            <Field
              label={t("الوصف", "Description")}
              error={err("description")}
              required
            >
              <textarea
                className={`${cls("description")} !h-auto resize-none`}
                rows={3}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                onBlur={() => touch("description")}
                placeholder={t(
                  "وصف تفصيلي للورشة...",
                  "Detailed workshop description...",
                )}
              />
            </Field>
          </Section>

          {/* 2 · Location & Time */}
          <Section
            title={t("المكان والوقت", "Location & Time")}
            icon={<Calendar className="w-3.5 h-3.5" />}
          >
            <Field
              label={t("الموقع", "Location")}
              error={err("location")}
              required
              icon={<MapPin className="w-3 h-3" />}
            >
              <input
                className={cls("location")}
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                onBlur={() => touch("location")}
                placeholder={t("مكان إقامة الورشة", "Workshop venue")}
                maxLength={255}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field
                label={t("التاريخ", "Date")}
                error={err("date")}
                required
                icon={<Calendar className="w-3 h-3" />}
              >
                <input
                  type="date"
                  className={cls("date")}
                  value={form.date}
                  min={
                    editMode
                      ? undefined
                      : new Date().toISOString().split("T")[0]
                  }
                  onChange={(e) => update("date", e.target.value)}
                  onBlur={() => touch("date")}
                />
              </Field>

              <Field
                label={t("الوقت", "Time")}
                error={err("time")}
                required
                icon={<Clock className="w-3 h-3" />}
              >
                <input
                  type="time"
                  className={cls("time")}
                  value={form.time}
                  onChange={(e) => update("time", e.target.value)}
                  onBlur={() => touch("time")}
                />
              </Field>
            </div>
          </Section>

          {/* 3 · Pricing & Capacity */}
          <Section
            title={t("الأسعار والطاقة", "Pricing & Capacity")}
            icon={<DollarSign className="w-3.5 h-3.5" />}
          >
            <div className="grid grid-cols-3 gap-4">
              <Field
                label={t("السعر العادي (ر.س)", "Regular Price (SAR)")}
                error={err("regular_price")}
                required
                icon={<DollarSign className="w-3 h-3" />}
              >
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  className={cls("regular_price")}
                  value={form.regular_price}
                  onChange={(e) => update("regular_price", e.target.value)}
                  onBlur={() => touch("regular_price")}
                  placeholder="0.00"
                />
              </Field>

              <Field
                label={t("سعر الأعضاء (ر.س)", "Member Price (SAR)")}
                error={err("member_price")}
                required
                icon={<DollarSign className="w-3 h-3" />}
              >
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  className={cls("member_price")}
                  value={form.member_price}
                  onChange={(e) => update("member_price", e.target.value)}
                  onBlur={() => touch("member_price")}
                  placeholder="0.00"
                />
              </Field>

              <Field
                label={t("عدد المقاعد", "Capacity")}
                error={err("total_capacity")}
                required
                icon={<Users className="w-3 h-3" />}
              >
                <input
                  type="number"
                  min={1}
                  className={cls("total_capacity")}
                  value={form.total_capacity}
                  onChange={(e) => update("total_capacity", e.target.value)}
                  onBlur={() => touch("total_capacity")}
                  placeholder="30"
                />
              </Field>
            </div>

            {/* Live discount badge */}
            {form.regular_price &&
              form.member_price &&
              !errors.member_price && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  {t(
                    `خصم الأعضاء: ${Math.round(
                      (1 -
                        Number(form.member_price) /
                          Number(form.regular_price)) *
                        100,
                    )}%`,
                    `Member discount: ${Math.round(
                      (1 -
                        Number(form.member_price) /
                          Number(form.regular_price)) *
                        100,
                    )}%`,
                  )}
                </motion.div>
              )}
          </Section>

          {/* 4 · Cover image */}
          <Section
            title={t("الصورة التعريفية", "Cover Image")}
            icon={<ImageIcon className="w-3.5 h-3.5" />}
          >
            <Field
              label={t("صورة الورشة", "Workshop Image")}
              error={err("image")}
            >
              <div
                className={`
                  relative border-2 border-dashed rounded-xl transition-colors cursor-pointer
                  ${
                    err("image")
                      ? "border-destructive/50 bg-destructive/5"
                      : "border-border hover:border-primary/40 hover:bg-primary/3"
                  }
                `}
                onClick={() => fileRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        update("image", null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-7 text-muted-foreground">
                    <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
                    <div className="text-center">
                      <p className="text-sm font-medium">
                        {t("انقر لرفع صورة", "Click to upload image")}
                      </p>
                      <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                        JPG, PNG, WEBP
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpg,image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </Field>
          </Section>

          {/* 5 · Status */}
          <Section
            title={t("الحالة", "Status")}
            icon={<ChevronRight className="w-3.5 h-3.5" />}
          >
            <Field label={t("حالة الورشة", "Workshop Status")}>
              <div className="grid grid-cols-4 gap-2">
                {(
                  [
                    {
                      value: "open",
                      labelAr: "مفتوح",
                      labelEn: "Open",
                      color: "emerald",
                    },
                    {
                      value: "closed",
                      labelAr: "مغلق",
                      labelEn: "Closed",
                      color: "rose",
                    },
                    {
                      value: "completed",
                      labelAr: "مكتمل",
                      labelEn: "Completed",
                      color: "blue",
                    },
                    {
                      value: "postponed",
                      labelAr: "مؤجلة",
                      labelEn: "Postponed",
                      color: "amber",
                    },
                  ] as const
                ).map((s) => {
                  const active = form.status === s.value;
                  const colorMap: Record<string, string> = {
                    emerald: active
                      ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-400"
                      : "hover:bg-emerald-500/5 hover:border-emerald-500/30",
                    rose: active
                      ? "bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-400"
                      : "hover:bg-rose-500/5 hover:border-rose-500/30",
                    blue: active
                      ? "bg-blue-500/15 border-blue-500 text-blue-700 dark:text-blue-400"
                      : "hover:bg-blue-500/5 hover:border-blue-500/30",
                    amber: active
                      ? "bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-400"
                      : "hover:bg-amber-500/5 hover:border-amber-500/30",
                  };
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => update("status", s.value)}
                      className={`
                        text-xs font-semibold py-2.5 px-3 rounded-xl border transition-all duration-150
                        ${
                          active
                            ? colorMap[s.color]
                            : `border-border text-muted-foreground ${
                                colorMap[s.color]
                              }`
                        }
                      `}
                    >
                      {t(s.labelAr, s.labelEn)}
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* Postpone warning */}
            {/* Notify banner — shows whenever anything changed in edit mode */}
            <AnimatePresence>
              {editMode && hasChanges && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className={`
        border p-4 rounded-xl flex items-start justify-between gap-3
        ${
          changeType === "postponed"
            ? "bg-amber-500/10 border-amber-500/25"
            : "bg-blue-500/10 border-blue-500/25"
        }
      `}
                  >
                    <div className="flex-1">
                      <p
                        className={`font-semibold text-sm ${
                          changeType === "postponed"
                            ? "text-amber-700 dark:text-amber-400"
                            : "text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {changeType === "postponed"
                          ? t("تم تأجيل الورشة", "Workshop Postponed")
                          : changeType === "date_changed"
                            ? t("تم تغيير الموعد", "Schedule Changed")
                            : t("تم تحديث بيانات الورشة", "Workshop Updated")}
                      </p>

                      {/* List the actual changes */}
                      <ul className="mt-1.5 space-y-0.5">
                        {Object.entries(changes).map(
                          ([field, { old: o, new: n }]) => (
                            <li
                              key={field}
                              className="text-[11px] text-muted-foreground"
                            >
                              <span className="font-medium">{field}</span>: {o}{" "}
                              → {n}
                            </li>
                          ),
                        )}
                      </ul>

                      <p className="text-xs text-muted-foreground mt-1.5">
                        {t(
                          "يجب إشعار جميع المشتركين بالتغييرات",
                          "All subscribers should be notified of these changes",
                        )}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleNotifySubscribers}
                      disabled={isNotifying || notified}
                      className={`shrink-0 gap-1.5 text-xs ${
                        notified
                          ? "border-emerald-500/30 text-emerald-600"
                          : changeType === "postponed"
                            ? "border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
                            : "border-blue-500/30 text-blue-600 hover:bg-blue-500/10"
                      }`}
                    >
                      {isNotifying ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : notified ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Bell className="w-3.5 h-3.5" />
                      )}
                      {isNotifying
                        ? t("جاري الإرسال...", "Sending...")
                        : notified
                          ? t(
                              `إعادة الإرسال بعد ${cooldown}s`,
                              `Resend in ${cooldown}s`,
                            )
                          : t("إشعار المشتركين", "Notify Subscribers")}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Section>

          {/* Global error summary */}
          <AnimatePresence>
            {submitted && Object.keys(errors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2.5 bg-destructive/8 border border-destructive/25 rounded-xl p-3.5"
              >
                <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-destructive">
                    {t(
                      "يرجى تصحيح الأخطاء أدناه",
                      "Please fix the errors above",
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t(
                      `${Object.keys(errors).length} حقل يحتاج إلى مراجعة`,
                      `${Object.keys(errors).length} field${
                        Object.keys(errors).length > 1 ? "s need" : " needs"
                      } attention`,
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t bg-muted/20 flex items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground">
            {t("الحقول المطلوبة محددة بـ", "Required fields marked with")}{" "}
            <span className="text-destructive font-bold">*</span>
          </p>
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
              className="text-xs h-9"
            >
              {t("إلغاء", "Cancel")}
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="gap-1.5 text-xs h-9 min-w-[120px]"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : editMode ? (
                <Edit className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              {isSaving
                ? t("جاري الحفظ...", "Saving...")
                : editMode
                  ? t("حفظ التغييرات", "Save Changes")
                  : t("إنشاء الورشة", "Create Workshop")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
