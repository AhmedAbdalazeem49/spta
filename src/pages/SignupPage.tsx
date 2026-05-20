import AuthHero from "@/components/auth/AuthHero";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  IdCard,
  Info,
  Loader2,
  Lock,
  Mail,
  Microscope,
  Phone,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  User,
  UserCheck,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────
type FormData = {
  fullNameAr: string;
  fullNameEn: string;
  nationalId: string;
  email: string;
  phone: string;
  classificationNumber: string;
  specialization: string;
  subSpecialization: string;
  workplace: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

// ─── Validators matching Laravel RegisterRequest ──────────
const RULES = {
  fullNameAr: (v: string) => {
    if (!v.trim()) return "الاسم الكامل بالعربي مطلوب";
    if (v.trim().split(/\s+/).length < 2)
      return "يرجى إدخال الاسم الثلاثي على الأقل";
    if (v.length > 255) return "الاسم طويل جداً (الحد الأقصى 255 حرف)";
    if (/[a-zA-Z]/.test(v)) return "يرجى استخدام الأحرف العربية فقط";
    return null;
  },
  fullNameEn: (v: string) => {
    if (!v.trim()) return "Full name in English is required";
    if (v.trim().split(/\s+/).length < 2)
      return "Please enter at least first and last name";
    if (v.length > 255) return "Name is too long (max 255 characters)";
    if (/[\u0600-\u06FF]/.test(v)) return "Please use English characters only";
    return null;
  },
  nationalId: (v: string) => {
    if (!v.trim()) return "رقم الهوية الوطنية مطلوب";
    if (!/^\d{10}$/.test(v)) return "رقم الهوية يجب أن يكون 10 أرقام بالضبط";
    return null;
  },
  email: (v: string) => {
    if (!v.trim()) return "البريد الإلكتروني مطلوب";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "صيغة البريد الإلكتروني غير صحيحة";
    if (v.length > 255) return "البريد الإلكتروني طويل جداً";
    return null;
  },
  phone: (v: string) => {
    if (!v.trim()) return "رقم الجوال مطلوب";
    if (!/^\+?[0-9\s\-()]{7,20}$/.test(v))
      return "رقم الجوال غير صحيح (يشمل رمز الدولة)";
    return null;
  },
  specialization: (v: string) => {
    if (!v.trim()) return "التخصص مطلوب";
    if (v.length > 255) return "النص طويل جداً";
    return null;
  },
  workplace: (v: string) => {
    if (!v.trim()) return "جهة العمل مطلوبة";
    if (v.length > 255) return "النص طويل جداً";
    return null;
  },
  subSpecialization: (v: string) => {
    if (v.length > 255) return "النص طويل جداً";
    return null;
  },
  classificationNumber: (_v: string) => null,
  password: (v: string) => {
    if (!v) return "كلمة المرور مطلوبة";
    if (v.length < 8) return "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    if (!/[A-Za-z]/.test(v)) return "يجب أن تحتوي على حرف واحد على الأقل";
    if (!/[0-9]/.test(v)) return "يجب أن تحتوي على رقم واحد على الأقل";
    return null;
  },
  confirmPassword: (v: string, formData?: FormData) => {
    if (!v) return "تأكيد كلمة المرور مطلوب";
    if (formData && v !== formData.password)
      return "كلمتا المرور غير متطابقتين";
    return null;
  },
};

// ─── Password Strength ──────────────────────────────────
const getPasswordStrength = (pw: string) => {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "ضعيفة", color: "#ef4444" };
  if (score <= 2) return { score, label: "مقبولة", color: "#f97316" };
  if (score <= 3) return { score, label: "جيدة", color: "#eab308" };
  if (score <= 4) return { score, label: "قوية", color: "#22c55e" };
  return { score, label: "ممتازة", color: "#10b981" };
};

// ─── Field Component ────────────────────────────────────
const Field = ({
  label,
  labelEn,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  labelEn?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="group">
    <label className="block mb-1.5">
      <span className="text-sm font-semibold text-foreground">
        {label}
        {labelEn && (
          <span className="text-muted-foreground font-normal text-xs mr-1">
            {" "}
            / {labelEn}
          </span>
        )}
        {required && <span className="text-red-500 mr-1">*</span>}
      </span>
    </label>
    {children}
    <AnimatePresence mode="wait">
      {error ? (
        <motion.p
          key="error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </motion.p>
      ) : hint ? (
        <motion.p
          key="hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-start gap-1.5 mt-1.5 text-xs text-muted-foreground"
        >
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          {hint}
        </motion.p>
      ) : null}
    </AnimatePresence>
  </div>
);

// ─── Section Header ─────────────────────────────────────
const SectionHeader = ({
  icon: Icon,
  titleAr,
  titleEn,
  step,
}: {
  icon: React.ElementType;
  titleAr: string;
  titleEn: string;
  step: number;
}) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="relative">
      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
        {step}
      </span>
    </div>
    <div>
      <h3 className="font-bold text-base leading-tight">{titleAr}</h3>
      <p className="text-xs text-muted-foreground">{titleEn}</p>
    </div>
  </div>
);

// ─── Input with icon ────────────────────────────────────
const IconInput = ({
  icon: Icon,
  error,
  suffix,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ElementType;
  error?: boolean;
  suffix?: React.ReactNode;
}) => (
  <div className="relative">
    {Icon && (
      <Icon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    )}
    <input
      {...props}
      className={`
        w-full h-11 rounded-xl border bg-background text-sm transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
        ${Icon ? "pr-10" : "pr-4"}
        ${suffix ? "pl-10" : "pl-4"}
        ${
          error
            ? "border-red-400 bg-red-50/30 focus:ring-red-300 focus:border-red-400"
            : "border-border hover:border-primary/50"
        }
        ${props.className ?? ""}
      `}
    />
    {suffix && (
      <div className="absolute left-3 top-1/2 -translate-y-1/2">{suffix}</div>
    )}
  </div>
);

// ─── Main Page ──────────────────────────────────────────
const SignupPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullNameAr: "",
    fullNameEn: "",
    nationalId: "",
    email: "",
    phone: "",
    classificationNumber: "",
    specialization: "",
    subSpecialization: "",
    workplace: "",
    password: "",
    confirmPassword: "",
  });

  const set = (field: keyof FormData, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    setTouched((p) => ({ ...p, [field]: true }));
  };

  // Live errors only for touched fields
  const liveErrors = (): Errors => {
    const e: Errors = {};
    (Object.keys(RULES) as Array<keyof FormData>).forEach((key) => {
      if (!touched[key]) return;
      const rule = RULES[key] as (v: string, fd?: FormData) => string | null;
      const err = rule(formData[key], formData);
      if (err) e[key] = err;
    });
    return e;
  };

  const errors = liveErrors();

  // Full validation for submit
  const validateAll = (): Errors => {
    const e: Errors = {};
    (Object.keys(RULES) as Array<keyof FormData>).forEach((key) => {
      const rule = RULES[key] as (v: string, fd?: FormData) => string | null;
      const err = rule(formData[key], formData);
      if (err) e[key] = err;
    });
    return e;
  };

  const pwStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validateAll();

    if (Object.keys(allErrors).length > 0) {
      // Touch all fields to show errors
      const allTouched = Object.keys(formData).reduce(
        (acc, k) => ({ ...acc, [k]: true }),
        {}
      );
      setTouched(allTouched);
      toast({
        title: t("يرجى مراجعة البيانات", "Please review the form"),
        description: t(
          "بعض الحقول تحتاج إلى مراجعة",
          "Some fields need your attention"
        ),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        name: formData.fullNameEn,
        name_ar: formData.fullNameAr,
        email: formData.email,
        phone: formData.phone,
        national_id: formData.nationalId,
        classification_number: formData.classificationNumber || null,
        specialization: formData.specialization,
        sub_specialization: formData.subSpecialization || null,
        employer: formData.workplace,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      toast({
        title: t("تم إنشاء الحساب", "Account Created"),
        description: t(
          "تحقق من البريد الإلكتروني باستخدام رمز التحقق",
          "Check your email for OTP verification"
        ),
      });

      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (error: any) {
      const serverErrors = error?.response?.data?.errors;
      if (serverErrors) {
        // Map Laravel validation errors back to fields
        const fieldMap: Record<string, keyof FormData> = {
          name: "fullNameEn",
          name_ar: "fullNameAr",
          email: "email",
          phone: "phone",
          national_id: "nationalId",
          specialization: "specialization",
          sub_specialization: "subSpecialization",
          employer: "workplace",
          password: "password",
        };
        const allTouched = Object.keys(formData).reduce(
          (acc, k) => ({ ...acc, [k]: true }),
          {}
        );
        setTouched(allTouched);
      }
      toast({
        title: t("خطأ", "Error"),
        description:
          error?.response?.data?.message ||
          error.message ||
          t("فشل إنشاء الحساب", "Registration failed"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const completedSections = {
    personal:
      !errors.fullNameAr &&
      !errors.fullNameEn &&
      !errors.nationalId &&
      !errors.email &&
      !errors.phone &&
      formData.fullNameAr &&
      formData.fullNameEn &&
      formData.nationalId &&
      formData.email &&
      formData.phone,
    professional:
      !errors.specialization &&
      !errors.workplace &&
      formData.specialization &&
      formData.workplace,
    security:
      !errors.password &&
      !errors.confirmPassword &&
      formData.password &&
      formData.confirmPassword,
  };

  const inputBase =
    "w-full h-11 rounded-xl border bg-background text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary px-4";

  return (
    <Layout>
      <AuthHero
        titleAr="إنشاء حساب جديد"
        titleEn="Create New Account"
        subtitleAr="أنشئ حسابك للانضمام إلى مجتمعنا المهني"
        subtitleEn="Create your account to join our professional community"
      />

      <section className="py-16 -mt-10 relative z-10">
        <div className="container-custom max-w-7xl">
          {/* Progress pills */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {[
              { key: "personal", label: "بيانات شخصية" },
              { key: "professional", label: "بيانات مهنية" },
              { key: "security", label: "الأمان" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    completedSections[key as keyof typeof completedSections]
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-card text-muted-foreground border border-border"
                  }`}
                >
                  {completedSections[key as keyof typeof completedSections] ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />
                  )}
                  {label}
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* ─── Section 1: Personal ─── */}
              <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 md:p-8">
                <SectionHeader
                  icon={User}
                  titleAr="المعلومات الشخصية"
                  titleEn="Personal Information"
                  step={1}
                />

                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {t(
                      "الرجاء إدخال اسمك الكامل (الثلاثي أو الرباعي) كما تريد ظهوره على الشهادات وبطاقات العضوية",
                      "Please enter your full name as you want it to appear on certificates and membership cards"
                    )}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <Field
                    label="الاسم الكامل بالعربي"
                    labelEn="Full Name (Arabic)"
                    required
                    error={errors.fullNameAr}
                    hint={
                      !touched.fullNameAr
                        ? "مثال: محمد عبدالله أحمد العمري"
                        : undefined
                    }
                  >
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={formData.fullNameAr}
                        onChange={(e) => set("fullNameAr", e.target.value)}
                        onBlur={() =>
                          setTouched((p) => ({ ...p, fullNameAr: true }))
                        }
                        className={`${inputBase} pr-10 ${
                          errors.fullNameAr
                            ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
                            : "border-border hover:border-primary/50"
                        }`}
                        placeholder="الاسم الثلاثي أو الرباعي"
                        dir="rtl"
                      />
                    </div>
                  </Field>

                  <Field
                    label="الاسم الكامل بالإنجليزي"
                    labelEn="Full Name (English)"
                    required
                    error={errors.fullNameEn}
                    hint={
                      !touched.fullNameEn
                        ? "e.g. Mohammed Abdullah Al-Omari"
                        : undefined
                    }
                  >
                    <div className="relative">
                      <UserCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={formData.fullNameEn}
                        onChange={(e) => set("fullNameEn", e.target.value)}
                        onBlur={() =>
                          setTouched((p) => ({ ...p, fullNameEn: true }))
                        }
                        className={`${inputBase} pr-10 ${
                          errors.fullNameEn
                            ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
                            : "border-border hover:border-primary/50"
                        }`}
                        placeholder="Triple or quadruple name"
                        dir="ltr"
                      />
                    </div>
                  </Field>

                  <Field
                    label="رقم الهوية الوطنية"
                    labelEn="National ID"
                    required
                    error={errors.nationalId}
                    hint={!touched.nationalId ? "10 أرقـــام" : undefined}
                  >
                    <div className="relative">
                      <IdCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={formData.nationalId}
                        onChange={(e) =>
                          set(
                            "nationalId",
                            e.target.value.replace(/\D/g, "").slice(0, 10)
                          )
                        }
                        onBlur={() =>
                          setTouched((p) => ({ ...p, nationalId: true }))
                        }
                        className={`${inputBase} pr-10 ${
                          errors.nationalId
                            ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
                            : "border-border hover:border-primary/50"
                        }`}
                        placeholder="1XXXXXXXXX"
                        dir="ltr"
                        maxLength={10}
                        inputMode="numeric"
                      />
                      {formData.nationalId.length > 0 && (
                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-muted-foreground tabular-nums">
                          {formData.nationalId.length}/10
                        </span>
                      )}
                    </div>
                  </Field>

                  <Field
                    label="البريد الإلكتروني"
                    labelEn="Email Address"
                    required
                    error={errors.email}
                  >
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => set("email", e.target.value)}
                        onBlur={() =>
                          setTouched((p) => ({ ...p, email: true }))
                        }
                        className={`${inputBase} pr-10 ${
                          errors.email
                            ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
                            : "border-border hover:border-primary/50"
                        }`}
                        placeholder="example@domain.com"
                        dir="ltr"
                      />
                    </div>
                  </Field>

                  <Field
                    label="رقم الجوال"
                    labelEn="Phone Number"
                    required
                    error={errors.phone}
                    hint={
                      !touched.phone
                        ? "يشمل رمز الدولة، مثال: +966501234567"
                        : undefined
                    }
                  >
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        onBlur={() =>
                          setTouched((p) => ({ ...p, phone: true }))
                        }
                        className={`${inputBase} pr-10 ${
                          errors.phone
                            ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
                            : "border-border hover:border-primary/50"
                        }`}
                        placeholder="+XXX XX XXX XXXX"
                        dir="ltr"
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {/* ─── Section 2: Professional ─── */}
              <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 md:p-8">
                <SectionHeader
                  icon={Stethoscope}
                  titleAr="المعلومات المهنية"
                  titleEn="Professional Information"
                  step={2}
                />

                <div className="grid md:grid-cols-2 gap-5">
                  <Field
                    label="جهة العمل"
                    labelEn="Workplace / Employer"
                    required
                    error={errors.workplace}
                  >
                    <div className="relative">
                      <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={formData.workplace}
                        onChange={(e) => set("workplace", e.target.value)}
                        onBlur={() =>
                          setTouched((p) => ({ ...p, workplace: true }))
                        }
                        className={`${inputBase} pr-10 ${
                          errors.workplace
                            ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
                            : "border-border hover:border-primary/50"
                        }`}
                        placeholder="مستشفى / مركز صحي / عيادة..."
                      />
                    </div>
                  </Field>

                  <Field
                    label="التخصص"
                    labelEn="Specialization"
                    required
                    error={errors.specialization}
                  >
                    <div className="relative">
                      <Stethoscope className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={formData.specialization}
                        onChange={(e) => set("specialization", e.target.value)}
                        onBlur={() =>
                          setTouched((p) => ({ ...p, specialization: true }))
                        }
                        className={`${inputBase} pr-10 ${
                          errors.specialization
                            ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
                            : "border-border hover:border-primary/50"
                        }`}
                        placeholder="مثال: طب الأطفال، الجراحة العامة"
                      />
                    </div>
                  </Field>

                  <Field
                    label="التخصص الدقيق"
                    labelEn="Sub-specialization"
                    error={errors.subSpecialization}
                    hint="اختياري — أدخله إن وجد"
                  >
                    <div className="relative">
                      <Microscope className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={formData.subSpecialization}
                        onChange={(e) =>
                          set("subSpecialization", e.target.value)
                        }
                        className={`${inputBase} pr-10 border-border hover:border-primary/50`}
                        placeholder="مثال: جراحة القلب، أمراض الدم"
                      />
                    </div>
                  </Field>

                  <Field
                    label="رقم التصنيف"
                    labelEn="Classification Number"
                    hint="اختياري — للممارسين الصحيين المسجلين في الهيئة السعودية"
                  >
                    <div className="relative">
                      <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={formData.classificationNumber}
                        onChange={(e) =>
                          set("classificationNumber", e.target.value)
                        }
                        className={`${inputBase} pr-10 border-border hover:border-primary/50`}
                        placeholder="e.g. 123456"
                        dir="ltr"
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {/* ─── Section 3: Security ─── */}
              <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 md:p-8">
                <SectionHeader
                  icon={Lock}
                  titleAr="كلمة المرور"
                  titleEn="Security"
                  step={3}
                />

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Field
                      label="كلمة المرور"
                      labelEn="Password"
                      required
                      error={errors.password}
                    >
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type={showPw ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => set("password", e.target.value)}
                          onBlur={() =>
                            setTouched((p) => ({ ...p, password: true }))
                          }
                          className={`${inputBase} pr-10 pl-10 ${
                            errors.password
                              ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
                              : "border-border hover:border-primary/50"
                          }`}
                          dir="ltr"
                          placeholder="8 characters minimum"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw((p) => !p)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showPw ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </Field>

                    {/* Password strength bar */}
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2"
                      >
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className="h-1 flex-1 rounded-full transition-all duration-300"
                              style={{
                                backgroundColor:
                                  i <= pwStrength.score
                                    ? pwStrength.color
                                    : "var(--border)",
                              }}
                            />
                          ))}
                        </div>
                        <p
                          className="text-xs"
                          style={{ color: pwStrength.color }}
                        >
                          قوة كلمة المرور: {pwStrength.label}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <Field
                    label="تأكيد كلمة المرور"
                    labelEn="Confirm Password"
                    required
                    error={errors.confirmPassword}
                  >
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type={showCPw ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => set("confirmPassword", e.target.value)}
                        onBlur={() =>
                          setTouched((p) => ({ ...p, confirmPassword: true }))
                        }
                        className={`${inputBase} pr-10 pl-10 ${
                          errors.confirmPassword
                            ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
                            : formData.confirmPassword &&
                              !errors.confirmPassword
                            ? "border-green-400 focus:ring-green-200 focus:border-green-400"
                            : "border-border hover:border-primary/50"
                        }`}
                        dir="ltr"
                        placeholder="Re-enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCPw((p) => !p)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showCPw ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword &&
                      formData.confirmPassword === formData.password &&
                      !errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-1.5 mt-1.5 text-xs text-green-600"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          كلمتا المرور متطابقتان
                        </motion.p>
                      )}
                  </Field>
                </div>

                {/* Password requirements */}
                <div className="mt-4 bg-muted/40 rounded-xl px-4 py-3 grid grid-cols-2 gap-2">
                  {[
                    {
                      rule: formData.password.length >= 8,
                      label: "8 أحرف على الأقل",
                    },
                    {
                      rule: /[A-Za-z]/.test(formData.password),
                      label: "حرف واحد على الأقل",
                    },
                    {
                      rule: /[0-9]/.test(formData.password),
                      label: "رقم واحد على الأقل",
                    },
                    {
                      rule: /[^A-Za-z0-9]/.test(formData.password),
                      label: "رمز خاص (موصى به)",
                    },
                  ].map(({ rule, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                          rule ? "bg-green-500" : "bg-border"
                        }`}
                      >
                        {rule && (
                          <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                        )}
                      </div>
                      <span
                        className={
                          rule ? "text-green-700" : "text-muted-foreground"
                        }
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── Submit ─── */}
              <motion.div whileTap={{ scale: 0.99 }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-13 rounded-2xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:brightness-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ height: "52px" }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t("جاري إنشاء الحساب...", "Creating account...")}
                    </>
                  ) : (
                    <>
                      {t("إنشاء الحساب", "Create Account")}
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>

              <p className="text-center text-sm">
                {t("لديك حساب بالفعل؟", "Already have an account?")}{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:underline underline-offset-2"
                >
                  {t("تسجيل الدخول", "Sign In")}
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SignupPage;
