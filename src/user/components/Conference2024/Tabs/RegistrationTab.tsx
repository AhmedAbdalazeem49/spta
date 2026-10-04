import { PhoneInput } from "@/components/shared/PhoneInput";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Eye,
  EyeOff,
  Globe,
  IdCard,
  Info,
  Loader2,
  Lock,
  LogIn,
  Mail,
  MapPin,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// ─── Countries List ──────────────────────────────────────────
const COUNTRIES = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Kuwait",
  "Qatar",
  "Bahrain",
  "Oman",
  "Egypt",
  "Jordan",
  "Lebanon",
  "Iraq",
  "Yemen",
  "Syria",
  "Palestine",
  "Sudan",
  "Morocco",
  "Algeria",
  "Tunisia",
  "Libya",
  "Mauritania",
  "Somalia",
  "United Kingdom",
  "United States",
  "Canada",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Ireland",
  "Netherlands",
  "Switzerland",
  "Belgium",
  "Sweden",
  "Austria",
  "Poland",
  "Australia",
  "New Zealand",
  "India",
  "Pakistan",
  "Philippines",
  "Malaysia",
  "Singapore",
  "Turkey",
  "Indonesia",
  "South Korea",
  "Japan",
  "South Africa",
];

// ─── Types ───────────────────────────────────────────────
type Step = "gate" | "login" | "signup" | "otp" | "register";

type FormData = {
  country: string;
  title: string;
  fullNameAr: string;
  fullNameEn: string;
  nationalId: string;
  email: string;
  phone: string;
  classificationNumber: string;
  specialization: string;
  subSpecialization: string;
  workplace: string;
  region: string;
  city: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

// ─── Validators matching Laravel RegisterRequest ──────────
const RULES = {
  country: (v: string) => {
    if (!v || !v.trim()) return "Please select your country";
    return null;
  },
  fullNameAr: (v: string) => {
    if (v && /[a-zA-Z]/.test(v)) return "Please use Arabic characters only";
    if (v && v.length > 255) return "Name is too long (max 255 characters)";
    return null;
  },
  fullNameEn: (v: string) => {
    if (!v || !v.trim()) return "Full name in English is required";
    if (v.trim().split(/\s+/).length < 2)
      return "Please enter at least first and last name";
    if (v.length > 255) return "Name is too long (max 255 characters)";
    if (/[\u0600-\u06FF]/.test(v)) return "Please use English characters only";
    return null;
  },
  nationalId: (v: string, formData?: FormData) => {
    if (formData?.country === "Saudi Arabia") {
      if (!v || !v.trim()) return "National ID / Iqama is required";
      if (!/^\d{10}$/.test(v))
        return "National ID / Iqama must be exactly 10 digits";
    }
    return null;
  },
  email: (v: string) => {
    if (!v || !v.trim()) return "Email address is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "Invalid email address format";
    if (v.length > 255) return "Email address is too long";
    return null;
  },
  phone: (v: string) => {
    if (!v || !v.trim()) return "Phone number is required";
    if (!/^\+?[0-9\s\-()]{7,20}$/.test(v))
      return "Invalid phone number format";
    return null;
  },
  specialization: (v: string) => {
    if (!v || !v.trim()) return "Specialization is required";
    if (v.length > 255) return "Text is too long";
    return null;
  },
  workplace: (v: string) => {
    if (!v || !v.trim()) return "Workplace / Employer is required";
    if (v.length > 255) return "Text is too long";
    return null;
  },
  subSpecialization: (v: string) => {
    if (v && v.length > 255) return "Text is too long";
    return null;
  },
  region: (v: string, formData?: FormData) => {
    if (formData?.country === "Saudi Arabia") {
      if (!v || !v.trim()) return "Region is required";
    }
    return null;
  },
  city: (v: string, formData?: FormData) => {
    if (formData?.country === "Saudi Arabia") {
      if (v && v.length > 255) return "City name is too long";
    }
    return null;
  },
  classificationNumber: (_v: string) => null,
  password: (v: string) => {
    if (!v) return "Password is required";
    if (v.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Za-z]/.test(v)) return "Must contain at least one letter";
    if (!/[0-9]/.test(v)) return "Must contain at least one number";
    return null;
  },
  confirmPassword: (v: string, formData?: FormData) => {
    if (!v) return "Confirm password is required";
    if (formData && v !== formData.password)
      return "Passwords do not match";
    return null;
  },
};

const getPasswordStrength = (pw: string) => {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "Weak", color: "#ef4444" };
  if (score <= 2) return { score, label: "Fair", color: "#f97316" };
  if (score <= 3) return { score, label: "Good", color: "#eab308" };
  if (score <= 4) return { score, label: "Strong", color: "#22c55e" };
  return { score, label: "Excellent", color: "#10b981" };
};

const Field = ({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="group">
    <label className="block mb-1.5">
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
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
          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500 font-medium"
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

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  step,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  step: number;
}) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="relative">
      <div className="w-10 h-10 rounded-2xl bg-[#e0f2f1] dark:bg-[#11517E]/30 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#11517E] dark:text-[#6FC4BC]" />
      </div>
      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#11517E] text-white text-[10px] font-bold flex items-center justify-center">
        {step}
      </span>
    </div>
    <div>
      <h3 className="font-bold text-base leading-tight text-slate-900 dark:text-white">
        {title}
      </h3>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  timeLabel,
  priceData,
  disabled = false,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOpt = options.find((o) => o.id === value);

  // Close dropdown on click outside
  useEffect(() => {
    const close = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener("click", close);
    }
    return () => document.removeEventListener("click", close);
  }, [isOpen]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center bg-white dark:bg-slate-900 shadow-sm ${isOpen ? "border-[#11517E] ring-4 ring-[#11517E]/10" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}
      >
        {selectedOpt ? (
          <div className="flex flex-col gap-1 pr-6">
            <span className="font-bold text-slate-900 dark:text-white line-clamp-1">
              {selectedOpt.title}
            </span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> {selectedOpt.speaker}
              {priceData?.workshop_price && (
                <span className="text-[#11517E] dark:text-[#6FC4BC] font-bold ml-2">
                  (+{priceData.workshop_price} SAR)
                </span>
              )}
            </span>
            <span className="font-bold text-[12px] text-slate-900 dark:text-white">
              +4 CME Hours
            </span>
          </div>
        ) : (
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            {placeholder}
          </span>
        )}

        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-400 shrink-0"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
              <div
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className={`p-3 rounded-xl cursor-pointer transition-colors ${!value ? "bg-[#f0f8f8] dark:bg-[#11517E]/20 text-[#11517E] dark:text-[#6FC4BC]" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"}`}
              >
                <span className="font-semibold">{placeholder}</span>
              </div>

              {options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    onChange(opt.id);
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-colors border-2 ${value === opt.id ? "bg-[#f0f8f8] dark:bg-[#11517E]/20 border-[#11517E]/20 dark:border-blue-800" : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`font-bold text-sm ${value === opt.id ? "text-blue-900 dark:text-[#6FC4BC]" : "text-slate-900 dark:text-slate-100"}`}
                      >
                        {opt.title}
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <User className="w-3 h-3" /> {opt.speaker}
                      </span>
                    </div>
                    {priceData?.workshop_price && (
                      <>
                        <div className="shrink-0 bg-[#e0f2f1] dark:bg-blue-900/40 text-[#11517E] dark:text-[#6FC4BC] text-xs font-bold px-2 py-1 rounded-lg">
                          +{priceData.workshop_price} SAR
                        </div>
                      </>
                    )}
                  </div>
                  <span className="font-bold text-[10px] text-slate-900 dark:text-white">
                    +4 CME
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const RegistrationTab = () => {
  const { isAuthenticated, login, register, user } = useAuth();
  const { t } = useLanguage();
  const { toast: uiToast } = useToast();

  const [step, setStep] = useState<Step>("gate");
  const [emailForOtp, setEmailForOtp] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceData, setPriceData] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      setStep("register");
      fetchPriceData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (priceData?.my_registration?.selected_workshops) {
      const existing = priceData.my_registration.selected_workshops;
      const morning = existing.find((w: string) => w.startsWith("m"));
      const evening = existing.find((w: string) => w.startsWith("e"));
      if (morning && !selectedMorning) setSelectedMorning(morning);
      if (evening && !selectedEvening) setSelectedEvening(evening);
    }
  }, [priceData]);

  const fetchPriceData = () => {
    setIsLoading(true);
    api
      .get("/conference/price")
      .then((res) => setPriceData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  // --- Forms State ---

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: "",
    title: "",
    fullNameAr: "",
    fullNameEn: "",
    nationalId: "",
    email: "",
    phone: "",
    classificationNumber: "",
    specialization: "",
    subSpecialization: "",
    workplace: "",
    region: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const setF = (field: keyof FormData, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    setTouched((p) => ({ ...p, [field]: true }));
  };

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

  const validateAll = (): Errors => {
    const e: Errors = {};
    (Object.keys(RULES) as Array<keyof FormData>).forEach((key) => {
      const rule = RULES[key] as (v: string, fd?: FormData) => string | null;
      const err = rule(formData[key], formData);
      if (err) e[key] = err;
    });
    return e;
  };

  // OTP
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Register Form
  const [selectedMorning, setSelectedMorning] = useState("");
  const [selectedEvening, setSelectedEvening] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState<{
    type: string;
    value: number;
  } | null>(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] =
    useState(false);
  const navigate = useNavigate();

  // Workshops
  const morningWorkshops = [
    {
      id: "m1",
      title: "Clinical Reasoning in Cervicothoracic Disorders",
      speaker: "Dr. Terrence McGee",
    },
    {
      id: "m2",
      title: "Speaking Up in Elite Sport",
      speaker: "Dr. Sian Knott",
    },
    {
      id: "m3",
      title: "From Rehabilitation to Performance (OPT)",
      speaker: "Ms. Tahani AlMahdi",
    },
    {
      id: "m4",
      title: "Physiotherapy in Chronic Overlapping Pain Conditions",
      speaker: "Dr. Aly Alatar",
    },
    {
      id: "m5",
      title: "A Practical Approach to Acute Vertigo and BPPV",
      speaker: "Dr. Doaa AlSharif",
    },
  ];
  const eveningWorkshops = [
    {
      id: "e1",
      title: "Aquatic Therapy Beyond the Pool",
      speaker: "Mr. Mohamed Zedan",
    },
    {
      id: "e2",
      title: "Using Musculoskeletal Ultrasound",
      speaker: "Mr. Jaffar Alabdrabalrasol",
    },
    {
      id: "e3",
      title: "From Physical Stimuli to Biological Adaptation",
      speaker: "Dr. Philippe Germain",
    },
    {
      id: "e4",
      title: "Better Teams, Better Care",
      speaker: "Ms. Halah Aldhuaian",
    },
    {
      id: "e5",
      title: "From Risk to Readiness",
      speaker: "Dr. Mohammed Alshehri",
    },
  ];

  // Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(loginEmail, loginPassword);
      setStep("register");
      fetchPriceData();
    } catch (error: any) {
      if (
        error?.response?.data?.errors?.email?.[0]?.includes("unverified") ||
        error?.message?.includes("unverified")
      ) {
        setEmailForOtp(loginEmail);
        setStep("otp");
        toast.error("Email unverified. Please verify your OTP.");
      } else {
        toast.error(error?.response?.data?.message || "Invalid credentials");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validateAll();
    if (Object.keys(allErrors).length > 0) {
      const allTouched = Object.keys(formData).reduce(
        (acc, k) => ({ ...acc, [k]: true }),
        {},
      );
      setTouched(allTouched);
      uiToast({
        title: "Please review the form",
        description: "Some fields need your attention",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const isSaudi = formData.country === "Saudi Arabia";
      // Generate a unique 10-digit random number for national_id if non-Saudi
      const fallbackNationalId = Math.floor(
        1000000000 + Math.random() * 9000000000,
      ).toString();

      await register({
        title: formData.title || undefined,
        name: formData.fullNameEn,
        name_ar: formData.fullNameAr || null,
        email: formData.email,
        phone: formData.phone,
        national_id: isSaudi ? formData.nationalId : fallbackNationalId,
        classification_number: formData.classificationNumber || null,
        specialization: formData.specialization,
        sub_specialization: formData.subSpecialization || null,
        employer: formData.workplace,
        region: isSaudi ? formData.region : "غير محدد",
        city: isSaudi ? (formData.city || null) : "غير محدد",
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      setEmailForOtp(formData.email);
      setStep("otp");
      toast.success("Account created! Please verify your email.");
    } catch (error: any) {
      const serverErrors = error?.response?.data?.errors;
      if (serverErrors) {
        if (
          serverErrors.email &&
          serverErrors.email.includes("unverified_account")
        ) {
          toast.info(
            "Email is already registered but not verified. Redirecting...",
          );
          setTimeout(() => {
            setEmailForOtp(formData.email);
            setStep("otp");
          }, 2000);
          return;
        }
      }
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Registration failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/verify-otp", { email: emailForOtp, otp });
      toast.success("Email verified successfully! Please login.");
      setStep("login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await api.post("/resend-otp", { email: emailForOtp });
      toast.success("OTP resent!");
      setResendTimer(60);
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      toast.error("Failed to resend OTP");
    }
  };

  const validatePromoCode = async () => {
    if (!promoCode) return;
    setIsValidatingPromo(true);
    try {
      const res = await api.post("/promo-codes/validate", {
        code: promoCode,
        applies_to: "conference",
      });
      if (res.data.valid) {
        setPromoDiscount({
          type: res.data.type,
          value: res.data.discount_percentage,
        });
        toast.success("Promo code applied!");
      } else {
        toast.error("Invalid promo code");
        setPromoDiscount(null);
      }
    } catch (error: any) {
      toast.error("Invalid promo code");
      setPromoDiscount(null);
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const hasRegistration = !!priceData?.my_registration;
  const existingWorkshops =
    priceData?.my_registration?.selected_workshops || [];
  const hasMorning = existingWorkshops.some((w: string) => w.startsWith("m"));
  const hasEvening = existingWorkshops.some((w: string) => w.startsWith("e"));

  const calculateTotal = () => {
    if (!priceData) return 0;
    let total = hasRegistration ? 0 : priceData.conference_price || 0;
    if (selectedMorning && !existingWorkshops.includes(selectedMorning))
      total += priceData.workshop_price || 0;
    if (selectedEvening && !existingWorkshops.includes(selectedEvening))
      total += priceData.workshop_price || 0;

    if (promoDiscount) {
      if (promoDiscount.type === "free") total = 0;
      else if (promoDiscount.type === "discount")
        total -= total * (promoDiscount.value / 100);
    }
    return Math.max(0, total);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the terms.");
      return;
    }
    setIsSubmitting(true);
    try {
      const workshopsArray = [selectedMorning, selectedEvening].filter(Boolean);
      const finalAmount = calculateTotal();

      const res = await api.post("/conference/register", {
        morning_workshop_id: selectedMorning || null,
        afternoon_workshop_id: selectedEvening || null,
        selected_workshops: workshopsArray,
        workshops: workshopsArray,
        amount: finalAmount,
        total_amount: finalAmount,
        promo_code: promoCode || null,
        payment_method: "creditcard",
      });

      const paymentUrl = res.data?.data?.payment_url || res.data?.payment_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        setShowSuccessModal(true);
      }
    } catch (error: any) {
      if (
        error?.response?.status === 409 ||
        error?.response?.data?.message?.includes("مسبقاً") ||
        error?.response?.data?.message?.includes("already registered")
      ) {
        setShowAlreadyRegisteredModal(true);
      } else {
        toast.error(error?.response?.data?.message || "Registration failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full h-11 rounded-xl border bg-background text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#11517E]/30 focus:border-[#11517E] px-4";

  // --- Render Steps ---

  const renderPricingModal = () => (
    <AnimatePresence>
      {showPricingModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
          onClick={() => setShowPricingModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl max-w-lg w-full relative overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 text-[#11517E] pointer-events-none">
              <Info className="w-32 h-32" />
            </div>

            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#11517E] to-[#6FC4BC]">
                Pricing & Fees
              </h3>
              <button
                onClick={() => setShowPricingModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700">
                <h4 className="font-bold mb-3 text-lg text-slate-800 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-[#11517E]" /> Conference Students
                </h4>
                <p className="text-base flex justify-between mb-1 text-slate-600 dark:text-slate-300">
                  <span>Early Bird:</span>{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    300 SAR
                  </span>
                </p>
                <p className="text-base flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Regular:</span>{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    350 SAR
                  </span>
                </p>
              </div>
              <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700">
                <h4 className="font-bold mb-3 text-lg text-slate-800 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#6FC4BC]" /> Conference Professionals
                </h4>
                <p className="text-base flex justify-between mb-1 text-slate-600 dark:text-slate-300">
                  <span>Early Bird:</span>{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    600 SAR
                  </span>
                </p>
                <p className="text-base flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Regular:</span>{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    650 SAR
                  </span>
                </p>
              </div>
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold text-center shadow-lg shadow-orange-500/20"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span className="text-lg">50% off for SPTA Members</span>
                </div>
                <span className="text-sm font-medium text-amber-100">
                  (Applied to Conference Registration Only)
                </span>
              </motion.div>
              <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700">
                <h4 className="font-bold mb-3 text-lg text-slate-800 dark:text-white flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-[#55AE47]" /> Workshops
                </h4>
                <p className="text-base flex justify-between mb-1 text-slate-600 dark:text-slate-300">
                  <span>Students:</span>{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    200 SAR / workshop
                  </span>
                </p>
                <p className="text-base flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Professionals:</span>{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    300 SAR / workshop
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderGate = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center p-8 max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 text-center mt-12"
    >
      <div className="w-20 h-20 bg-[#e0f2f1] dark:bg-[#11517E]/30 text-[#11517E] dark:text-[#6FC4BC] rounded-full flex items-center justify-center mb-6">
        <Sparkles className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#11517E] to-[#6FC4BC]">
        6th Saudi International Physiotherapy Conference
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium">
        Please sign in to register for the conference.
      </p>
      <div className="flex flex-col w-full gap-4">
        <button
          onClick={() => setStep("login")}
          className="w-full py-4 bg-[#11517E] hover:bg-[#0d3d5f] text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogIn className="w-5 h-5" /> Sign In
        </button>
        <button
          onClick={() => setStep("signup")}
          className="w-full py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-5 h-5" /> Create Account
        </button>
        <button
          type="button"
          onClick={() => setShowPricingModal(true)}
          className="w-full py-3.5 border border-[#11517E]/20 hover:border-[#11517E] bg-white dark:bg-slate-900 text-[#11517E] dark:text-[#6FC4BC] font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm hover:shadow cursor-pointer"
        >
          <Info className="w-4 h-4 text-[#6FC4BC]" /> View Pricing & Fees
        </button>
      </div>
    </motion.div>
  );

  const renderLogin = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-md mx-auto mt-12 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800"
    >
      <button
        onClick={() => setStep("gate")}
        className="mb-6 flex items-center text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#e0f2f1] dark:bg-[#11517E]/30 text-[#11517E] rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-extrabold">Welcome Back</h3>
        <p className="text-slate-500 mt-2">
          Log in to continue your registration
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#11517E] transition-colors" />
            <input
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-[#11517E] outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#11517E] transition-colors" />
            <input
              type="password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-[#11517E] outline-none transition-all"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 mt-6 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </motion.div>
  );

  const renderSignup = () => {
    const pwStrength = getPasswordStrength(formData.password);
    const isSaudi = formData.country === "Saudi Arabia";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800"
      >
        <button
          onClick={() => setStep("gate")}
          className="mb-6 flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
        </button>
        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold text-[#11517E] dark:text-[#6FC4BC]">
            Create Account
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Please fill in your details to create an account
          </p>
        </div>
        <form onSubmit={handleSignup} noValidate className="space-y-8">
          {/* Section 1: Personal Info */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            <SectionHeader
              icon={User}
              title="Personal Information"
              subtitle="Basic personal and contact information"
              step={1}
            />

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Title" error={undefined}>
                <select
                  value={formData.title}
                  onChange={(e) => setF("title", e.target.value)}
                  className={`${inputBase} bg-white dark:bg-slate-900`}
                  dir="ltr"
                >
                  <option value="">(None)</option>
                  <option value="Prof">Prof</option>
                  <option value="Dr">Dr</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                </select>
              </Field>

              <Field
                label="Country"
                required
                error={errors.country}
              >
                <div className="relative">
                  <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select
                    value={formData.country}
                    onChange={(e) => setF("country", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, country: true }))}
                    className={`${inputBase} pr-10 bg-white dark:bg-slate-900 ${
                      errors.country ? "border-red-400 bg-red-50" : ""
                    }`}
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c === "Saudi Arabia"
                          ? "Saudi Arabia (المملكة العربية السعودية)"
                          : c}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>

              <Field
                label="Full Name (English)"
                required
                error={errors.fullNameEn}
              >
                <div className="relative">
                  <UserCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={formData.fullNameEn}
                    onChange={(e) => setF("fullNameEn", e.target.value)}
                    onBlur={() =>
                      setTouched((p) => ({ ...p, fullNameEn: true }))
                    }
                    className={`${inputBase} pr-10 ${
                      errors.fullNameEn ? "border-red-400 bg-red-50" : ""
                    }`}
                    placeholder="First and last name"
                    dir="ltr"
                  />
                </div>
              </Field>

              <Field
                label="Full Name (Arabic) (Optional)"
                error={errors.fullNameAr}
              >
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={formData.fullNameAr}
                    onChange={(e) => setF("fullNameAr", e.target.value)}
                    onBlur={() =>
                      setTouched((p) => ({ ...p, fullNameAr: true }))
                    }
                    className={`${inputBase} pr-10 ${
                      errors.fullNameAr ? "border-red-400 bg-red-50" : ""
                    }`}
                    placeholder="Full name in Arabic (optional)"
                    dir="rtl"
                  />
                </div>
              </Field>

              {/* Conditional Saudi Fields: National ID, Region, City */}
              {isSaudi && (
                <>
                  <Field
                    label="National ID / Iqama"
                    required
                    error={errors.nationalId}
                  >
                    <div className="relative">
                      <IdCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        value={formData.nationalId}
                        onChange={(e) =>
                          setF(
                            "nationalId",
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                        onBlur={() =>
                          setTouched((p) => ({ ...p, nationalId: true }))
                        }
                        className={`${inputBase} pr-10 ${
                          errors.nationalId ? "border-red-400 bg-red-50" : ""
                        }`}
                        placeholder="10-digit National ID or Iqama"
                        dir="ltr"
                        maxLength={10}
                        inputMode="numeric"
                      />
                    </div>
                  </Field>

                  <Field
                    label="Region"
                    required
                    error={errors.region}
                  >
                    <div className="relative">
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        value={formData.region}
                        onChange={(e) => setF("region", e.target.value)}
                        onBlur={() => setTouched((p) => ({ ...p, region: true }))}
                        className={`${inputBase} pr-10 bg-white dark:bg-slate-900 ${
                          errors.region ? "border-red-400 bg-red-50" : ""
                        }`}
                      >
                        <option value="">Select Region</option>
                        {[
                          "Riyadh (الرياض)",
                          "Makkah (مكة المكرمة)",
                          "Madinah (المدينة المنورة)",
                          "Eastern Province (المنطقة الشرقية)",
                          "Al-Qassim (القصيم)",
                          "Asir (عسير)",
                          "Tabuk (تبوك)",
                          "Hail (حائل)",
                          "Northern Borders (الحدود الشمالية)",
                          "Jazan (جازان)",
                          "Najran (نجران)",
                          "Al-Baha (الباحة)",
                          "Al-Jouf (الجوف)",
                        ].map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Field>

                  <Field label="City (Optional)" error={errors.city}>
                    <input
                      value={formData.city}
                      onChange={(e) => setF("city", e.target.value)}
                      className={inputBase}
                      placeholder="e.g. Riyadh, Jeddah, Dammam..."
                    />
                  </Field>
                </>
              )}

              <Field
                label="Email Address"
                required
                error={errors.email}
              >
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setF("email", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                    className={`${inputBase} pr-10 ${
                      errors.email ? "border-red-400 bg-red-50" : ""
                    }`}
                    placeholder="example@domain.com"
                    dir="ltr"
                  />
                </div>
              </Field>

              <div className={isSaudi ? "md:col-span-2" : ""}>
                <Field
                  label="Phone Number"
                  required
                  error={errors.phone}
                >
                  <PhoneInput
                    value={formData.phone}
                    onChange={(value) => setF("phone", value)}
                    onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                    error={errors.phone}
                    inputBaseClass={`${inputBase} bg-white dark:bg-slate-900`}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Section 2: Professional Info */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            <SectionHeader
              icon={Stethoscope}
              title="Professional Information"
              subtitle="Career and professional details"
              step={2}
            />
            <div className="grid md:grid-cols-2 gap-5">
              <Field
                label="Workplace / Employer"
                required
                error={errors.workplace}
              >
                <div className="relative">
                  <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={formData.workplace}
                    onChange={(e) => setF("workplace", e.target.value)}
                    onBlur={() =>
                      setTouched((p) => ({ ...p, workplace: true }))
                    }
                    className={`${inputBase} pr-10 ${
                      errors.workplace ? "border-red-400 bg-red-50" : ""
                    }`}
                    placeholder="e.g. Hospital / Health Center / University..."
                  />
                </div>
              </Field>

              <Field
                label="Specialization"
                required
                error={errors.specialization}
              >
                <div className="relative">
                  <Stethoscope className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={formData.specialization}
                    onChange={(e) => setF("specialization", e.target.value)}
                    onBlur={() =>
                      setTouched((p) => ({ ...p, specialization: true }))
                    }
                    className={`${inputBase} pr-10 ${
                      errors.specialization ? "border-red-400 bg-red-50" : ""
                    }`}
                    placeholder="e.g. Physical Therapy, Sports Medicine..."
                  />
                </div>
              </Field>

              <Field
                label="Sub-specialization (Optional)"
                error={errors.subSpecialization}
              >
                <div className="relative">
                  <Microscope className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={formData.subSpecialization}
                    onChange={(e) => setF("subSpecialization", e.target.value)}
                    className={`${inputBase} pr-10`}
                    placeholder="e.g. Pediatric, Neurological..."
                  />
                </div>
              </Field>

              <Field
                label="SCFHS Classification Number (Optional)"
                error={errors.classificationNumber}
              >
                <div className="relative">
                  <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={formData.classificationNumber}
                    onChange={(e) =>
                      setF("classificationNumber", e.target.value)
                    }
                    className={`${inputBase} pr-10`}
                    placeholder="e.g. SCFHS Registration Number"
                    dir="ltr"
                  />
                </div>
              </Field>
            </div>
          </div>

          {/* Section 3: Security Info */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            <SectionHeader
              icon={Lock}
              title="Security"
              subtitle="Password and account security"
              step={3}
            />
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Field
                  label="Password"
                  required
                  error={errors.password}
                >
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setF("password", e.target.value)}
                      onBlur={() =>
                        setTouched((p) => ({ ...p, password: true }))
                      }
                      className={`${inputBase} pr-10 pl-10 ${
                        errors.password ? "border-red-400 bg-red-50" : ""
                      }`}
                      dir="ltr"
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((p) => !p)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPw ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </Field>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all"
                          style={{
                            backgroundColor:
                              i <= pwStrength.score
                                ? pwStrength.color
                                : "#e2e8f0",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium" style={{ color: pwStrength.color }}>
                      Password strength: {pwStrength.label}
                    </p>
                  </div>
                )}
              </div>

              <Field
                label="Confirm Password"
                required
                error={errors.confirmPassword}
              >
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showCPw ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setF("confirmPassword", e.target.value)}
                    onBlur={() =>
                      setTouched((p) => ({ ...p, confirmPassword: true }))
                    }
                    className={`${inputBase} pr-10 pl-10 ${
                      errors.confirmPassword ? "border-red-400 bg-red-50" : ""
                    }`}
                    dir="ltr"
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCPw((p) => !p)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showCPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </Field>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] hover:from-[#0d3d5f] hover:to-[#5ba8a1] text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-[#11517E]/25 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </motion.div>
    );
  };

  const renderOtp = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-md mx-auto mt-12 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-center"
    >
      <button
        onClick={() => setStep("gate")}
        className="mb-6 flex items-center text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>
      <div className="w-16 h-16 bg-[#e0f2f1] dark:bg-[#11517E]/30 text-[#11517E] rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Verify Email</h3>
      <p className="text-sm text-slate-500 mb-6">
        Enter the OTP sent to {emailForOtp}
      </p>
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full text-center text-2xl tracking-widest p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[#11517E]"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-[#11517E] hover:bg-[#11517E] text-white font-bold rounded-xl transition-all shadow-md"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Verify OTP"
          )}
        </button>
      </form>
      <button
        onClick={handleResendOtp}
        disabled={resendTimer > 0}
        className="mt-6 text-sm text-[#11517E] hover:underline"
      >
        {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
      </button>
    </motion.div>
  );

  const renderRegister = () => {
    const isNotMember =
      priceData?.is_member === false || user?.is_member === false;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-4xl mx-auto mt-8 pb-16"
      >
        {/* Promotional Banner */}
        {isNotMember && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white p-1"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
              <Sparkles className="w-24 h-24" />
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block shadow-sm">
                  Special Offer
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-2 leading-tight">
                  Unlock a 50% Discount!
                </h3>
                <p className="text-amber-50 text-base md:text-lg max-w-lg font-medium leading-relaxed">
                  Become a Saudi Physical Therapy Association member today and
                  instantly save 50% on your conference registration fee.
                </p>
              </div>
              <Link
                to="/membership"
                className="shrink-0 w-full md:w-auto text-center px-8 py-4 bg-white text-orange-600 font-extrabold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Join SPTA Now
              </Link>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11517E]/10 dark:bg-[#6FC4BC]/15 text-[#11517E] dark:text-[#6FC4BC] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Registration</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Conference Registration
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Select your workshops and complete your registration
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowPricingModal(true)}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#11517E] to-[#6FC4BC] hover:from-[#0d3d5f] hover:to-[#5ba8a1] text-white font-extrabold text-sm shadow-lg shadow-[#11517E]/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group shrink-0"
          >
            <Info className="w-4 h-4 text-emerald-300 group-hover:rotate-12 transition-transform" />
            <span>View Pricing & Fees</span>
            <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Section A: Conference */}
        <div className="bg-gradient-to-br from-[#11517E] to-indigo-700 p-8 rounded-3xl shadow-xl text-white mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block backdrop-blur-sm">
              13 CME Hours
            </span>
            <h2 className="text-3xl font-extrabold mb-2">
              6th Saudi International Physiotherapy Conference
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              12–13 November 2026 • Almoosa Rehabilitation Hospital, Al Ahsa
            </p>
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <div className="bg-black/20 p-4 rounded-xl flex justify-between items-center backdrop-blur-md">
                <div>
                  <p className="text-sm text-blue-200">
                    Category:{" "}
                    {priceData?.is_student ? "Student" : "Professional"}
                  </p>
                  <p className="text-sm font-bold text-green-300">
                    {priceData?.is_member
                      ? "SPTA Member (50% Off Applied)"
                      : "Non-Member"}
                  </p>
                </div>
                <div className="text-2xl font-bold">
                  {priceData?.conference_price} SAR
                </div>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleRegisterSubmit}
          className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 relative z-10"
        >
          {/* Section B: Workshops */}
          {hasRegistration && (
            <div className="mb-6 bg-gradient-to-r from-[#55AE47] to-[#55AE47] text-white rounded-3xl p-6 shadow-lg flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  You are already registered!
                </h3>
                <p className="opacity-90">
                  Your conference registration is confirmed. You can add
                  optional workshops below.
                </p>
              </div>
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b pb-2 flex items-center gap-2">
              Workshop Add-ons (Optional)
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full ml-auto">
                40 CME Hours
              </span>
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Saturday, 14 November 2026. Select up to 1 morning and 1 afternoon
              workshop.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  Morning Workshop (08:00–12:00)
                </label>
                <CustomSelect
                  value={selectedMorning}
                  onChange={setSelectedMorning}
                  options={morningWorkshops}
                  placeholder="No morning workshop selected"
                  timeLabel="08:00 - 12:00"
                  priceData={priceData}
                  disabled={hasMorning}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  Afternoon Workshop (13:00–17:00)
                </label>
                <CustomSelect
                  value={selectedEvening}
                  onChange={setSelectedEvening}
                  options={eveningWorkshops}
                  placeholder="No afternoon workshop selected"
                  timeLabel="13:00 - 17:00"
                  priceData={priceData}
                  disabled={hasEvening}
                />
              </div>
            </div>
          </div>

          {/* Section C: Promo */}
          <div>
            <label className="block font-semibold mb-2">Promo Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Enter promo code"
                className="flex-1 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none uppercase"
              />
              <button
                type="button"
                onClick={validatePromoCode}
                disabled={!promoCode || isValidatingPromo}
                className="px-6 bg-slate-800 text-white rounded-xl font-bold disabled:opacity-50"
              >
                {isValidatingPromo ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </div>

          {/* Section D: Summary */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-xl text-slate-800 dark:text-white">
                Price Summary
              </h4>
              <button
                type="button"
                onClick={() => setShowPricingModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-700 text-[#11517E] dark:text-[#6FC4BC] font-bold text-sm rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 hover:shadow-md hover:border-[#6FC4BC]/50 transition-all"
              >
                <Info className="w-4 h-4" /> View Pricing & Fees
              </button>
            </div>
            <div className="space-y-2 text-slate-600 dark:text-slate-400 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-base">
                <span>Conference Ticket</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {hasRegistration ? (
                    <span className="text-[#55AE47] font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Paid
                    </span>
                  ) : (
                    `${priceData?.conference_price || 0} SAR`
                  )}
                </span>
              </div>
              {selectedMorning && (
                <div className="flex justify-between text-base">
                  <span>Morning Workshop</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {existingWorkshops.includes(selectedMorning) ? (
                      <span className="text-[#55AE47] font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Paid
                      </span>
                    ) : (
                      `${priceData?.workshop_price || 0} SAR`
                    )}
                  </span>
                </div>
              )}
              {selectedEvening && (
                <div className="flex justify-between text-base">
                  <span>Afternoon Workshop</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {existingWorkshops.includes(selectedEvening) ? (
                      <span className="text-[#55AE47] font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Paid
                      </span>
                    ) : (
                      `${priceData?.workshop_price || 0} SAR`
                    )}
                  </span>
                </div>
              )}
              {promoDiscount && (
                <div className="flex justify-between text-base text-green-600 font-semibold">
                  <span>Discount applied</span>
                  <span>-{promoDiscount.value}%</span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xl font-bold text-slate-800 dark:text-white">
                Total
              </span>
              <span className="text-5xl font-black text-[#11517E] dark:text-[#6FC4BC] drop-shadow-sm">
                {calculateTotal()} SAR
              </span>
            </div>
          </div>

          {/* Section E: Submit */}
          <div>
            <label
              className={`flex items-start sm:items-center gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer group mb-6 select-none ${
                agreed
                  ? "bg-[#11517E]/5 border-[#11517E] dark:bg-[#11517E]/20 dark:border-[#6FC4BC] shadow-sm"
                  : "bg-slate-50/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="relative flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                    agreed
                      ? "bg-[#11517E] border-[#11517E] dark:bg-[#6FC4BC] dark:border-[#6FC4BC] text-white shadow-md shadow-[#11517E]/30 scale-105"
                      : "border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 group-hover:border-[#11517E]"
                  }`}
                >
                  <Check
                    className={`w-4 h-4 transition-all duration-200 ${
                      agreed
                        ? "opacity-100 scale-100 text-white dark:text-slate-900 stroke-[3]"
                        : "opacity-0 scale-50"
                    }`}
                  />
                </div>
              </div>
              <span
                className={`text-sm leading-relaxed transition-colors ${
                  agreed
                    ? "font-bold text-[#11517E] dark:text-[#6FC4BC]"
                    : "font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                }`}
              >
                التزام ان البيانات المرفقه صحيحه وتحت مسؤليتي (I confirm that all provided information is correct)
              </span>
            </label>
            <button
              type="submit"
              disabled={isSubmitting || !agreed}
              className="w-full py-5 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xl rounded-2xl shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_40px_rgb(37,99,235,0.4)] flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1"
            >
              {isSubmitting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-6 h-6" />
                  Complete Registration
                </>
              )}
            </button>
          </div>
        </form>

        {/* Modals */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl max-w-md w-full text-center"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Success!</h3>
                <p className="text-slate-600 mb-8">
                  You have successfully registered for the conference.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-4 bg-[#11517E] text-white font-bold rounded-xl cursor-pointer"
                >
                  Continue
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-[70vh] w-full relative">
      <AnimatePresence mode="wait">
        {step === "gate" && <motion.div key="gate">{renderGate()}</motion.div>}
        {step === "login" && (
          <motion.div key="login">{renderLogin()}</motion.div>
        )}
        {step === "signup" && (
          <motion.div key="signup">{renderSignup()}</motion.div>
        )}
        {step === "otp" && <motion.div key="otp">{renderOtp()}</motion.div>}
        {step === "register" && (
          <motion.div key="register">{renderRegister()}</motion.div>
        )}
      </AnimatePresence>
      {renderPricingModal()}
    </div>
  );
};

export default RegistrationTab;
