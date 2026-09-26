import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, CreditCard, X, AlertCircle, LogIn, Percent, Loader2, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import api from "@/services/api";
import { toast } from "sonner";

export const RegistrationTab = () => {
  const { isAuthenticated, user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [priceData, setPriceData] = useState<{
    is_member: boolean;
    is_student: boolean;
    is_early_bird: boolean;
    conference_price: number;
    workshop_price: number;
    has_member_discount: boolean;
  } | null>(null);

  const [selectedMorning, setSelectedMorning] = useState("");
  const [selectedEvening, setSelectedEvening] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState<{ type: string, value: number } | null>(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);

  const morningWorkshops = [
    { id: 'm1', title: 'Clinical Reasoning in Cervicothoracic Disorders', time: '08:00 AM - 12:00 PM' },
    { id: 'm2', title: 'Speaking Up in Elite Sport', time: '08:00 AM - 12:00 PM' },
    { id: 'm3', title: 'From Rehabilitation to Performance: Integrating OPT', time: '08:00 AM - 12:00 PM' },
    { id: 'm4', title: 'Physiotherapy in Chronic Overlapping Pain Conditions', time: '08:00 AM - 12:00 PM' },
    { id: 'm5', title: 'A Practical Approach to Acute Vertigo and BPPV', time: '08:00 AM - 12:00 PM' },
  ];

  const eveningWorkshops = [
    { id: 'e1', title: 'Aquatic Therapy Beyond the Pool', time: '01:00 PM - 05:00 PM' },
    { id: 'e2', title: 'Using Musculoskeletal Ultrasound', time: '01:00 PM - 05:00 PM' },
    { id: 'e3', title: 'From Physical Stimuli to Biological Adaptation', time: '01:00 PM - 05:00 PM' },
    { id: 'e4', title: 'Better Teams, Better Care', time: '01:00 PM - 05:00 PM' },
    { id: 'e5', title: 'From Risk to Readiness', time: '01:00 PM - 05:00 PM' },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      api.get("/conference/price")
        .then(res => setPriceData(res.data))
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, [isAuthenticated]);

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: { pathname: location.pathname, hash: location.hash || "#registration" } } });
  };

  const validatePromoCode = async () => {
    if (!promoCode) return;
    setIsValidatingPromo(true);
    try {
      const res = await api.post("/promo-codes/validate", { code: promoCode, applies_to: 'conference' });
      if (res.data.valid) {
        setPromoDiscount({ type: res.data.type, value: res.data.discount_percentage });
        toast.success(t("تم تفعيل كود الخصم", "Promo code applied successfully"));
      } else {
        toast.error(t("كود الخصم غير صالح", "Invalid promo code"));
        setPromoDiscount(null);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid promo code");
      setPromoDiscount(null);
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const calculateTotal = () => {
    if (!priceData) return 0;
    
    let total = priceData.conference_price;
    if (selectedMorning) total += priceData.workshop_price;
    if (selectedEvening) total += priceData.workshop_price;

    if (promoDiscount) {
      if (promoDiscount.type === 'free') {
        total = 0;
      } else if (promoDiscount.type === 'discount') {
        total = total - (total * (promoDiscount.value / 100));
      }
    }

    return Math.max(0, total);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const workshops = [];
    if (selectedMorning) workshops.push(selectedMorning);
    if (selectedEvening) workshops.push(selectedEvening);

    try {
      const res = await api.post("/conference/register", {
        payment_method: 'creditcard',
        promo_code: promoCode,
        workshops: workshops
      });
      
      if (res.data.data.payment_url) {
        window.location.href = res.data.data.payment_url;
      } else {
        toast.success(t("تم التسجيل بنجاح", "Registered successfully!"));
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("حدث خطأ أثناء التسجيل", "An error occurred"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center pb-10 pt-12 relative px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 text-center max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{t("تسجيل الدخول مطلوب", "Login Required")}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {t(
              "يجب عليك تسجيل الدخول في المنصة لتتمكن من حجز مقعدك في المؤتمر.",
              "You must be logged in to your account to register for the conference."
            )}
          </p>
          <button 
            onClick={handleLoginRedirect}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            {t("تسجيل الدخول", "Sign In")}
          </button>
        </motion.div>
      </div>
    );
  }

  if (priceData?.my_registration) {
    return (
      <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center pb-10 pt-12 relative px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12" />
          </div>
          <h3 className="text-3xl font-bold mb-4">{t("مرحباً بك مجدداً!", "Welcome back!")}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
            {t(
              "لقد قمت بالتسجيل مسبقاً في هذا المؤتمر بنجاح. نحن نتطلع بشوق لرؤيتك!",
              "You have already successfully registered for this conference. We are looking forward to seeing you!"
            )}
          </p>
          <button 
            onClick={() => navigate("/profile")}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <User className="w-5 h-5" />
            {t("الذهاب إلى الملف الشخصي", "Go to Profile")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[70vh] flex flex-col pb-10 pt-12 relative px-4">
      <div className="text-center mb-10 flex flex-col items-center">
        <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 mb-6">
          {t("التسجيل في المؤتمر", "Conference Registration")}
        </h3>
        
      </div>

      <div className="flex-1 flex flex-col xl:flex-row gap-8 w-full mt-6 max-w-7xl mx-auto items-start">

        {/* Pricing Section Displayed Side-by-Side */}
        <div className="w-full xl:w-[35%] flex-shrink-0">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden h-full sticky top-32">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <CreditCard className="text-amber-500 w-7 h-7" /> {t("الأسعار والرسوم", "Pricing & Fees")}
              </h2>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Conference Pricing */}
              <div>
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> {t("تذكرة المؤتمر", "Conference Pass")}
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4">{t("الطلاب", "Students")}</h4>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">{t("التسجيل المبكر", "Early Bird")}</span>
                        <span className="text-[10px] text-green-600 dark:text-green-400">{t("حتى", "Until")} 01-11-2026</span>
                      </div>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">300 SAR</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">{t("التسجيل المتأخر", "Late Bird")}</span>
                        <span className="text-[10px] text-red-500 dark:text-red-400">{t("من", "From")} 01-11-2026</span>
                      </div>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">350 SAR</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4">{t("الممارسين الصحيين", "Professionals")}</h4>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">{t("التسجيل المبكر", "Early Bird")}</span>
                        <span className="text-[10px] text-green-600 dark:text-green-400">{t("حتى", "Until")} 01-11-2026</span>
                      </div>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">600 SAR</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">{t("التسجيل المتأخر", "Late Bird")}</span>
                        <span className="text-[10px] text-red-500 dark:text-red-400">{t("من", "From")} 01-11-2026</span>
                      </div>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">650 SAR</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800/50 text-center">
                    {t("خصم 50% لأعضاء الجمعية", "50% OFF for SPTA Members")}
                  </div>
                </div>
              </div>

              {/* Workshop Pricing */}
              <div>
                <h3 className="text-lg font-bold text-amber-600 dark:text-amber-500 mb-4 flex items-center gap-2 mt-8">
                  <Sparkles className="w-5 h-5" /> {t("تذكرة ورش العمل", "Workshop Pass")}
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4">{t("الطلاب", "Students")}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400 text-sm">{t("لكل ورشة", "Per Workshop")}</span>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">200 SAR</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4">{t("الممارسين الصحيين", "Professionals")}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400 text-sm">{t("لكل ورشة", "Per Workshop")}</span>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">300 SAR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full flex items-start justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="w-full max-w-4xl bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800"
          >
            {priceData && !priceData.is_member && (
              <div className="mb-8 p-5 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl border border-amber-200 dark:border-amber-700/50 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1">
                    {t("احصل على خصم 50% كعضو في الجمعية", "Get 50% off as an SPTA member")}
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-500 mb-3">
                    {t("أسعار المؤتمر مخفضة بنسبة 50% لأعضاء الجمعية السعودية للعلاج الطبيعي النشطين.", "Conference prices are reduced by 50% for active Saudi Physical Therapy Association members.")}
                  </p>
                  <a href="/membership" target="_blank" className="text-sm font-bold bg-amber-500 text-white px-4 py-2 rounded-full shadow-sm hover:bg-amber-600 transition-colors inline-block">
                    {t("اشترك الآن", "Subscribe Now")}
                  </a>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Workshops Selection */}
              <div className="space-y-6 md:col-span-2">
                <h4 className="text-xl font-bold text-slate-800 dark:text-white border-b pb-2">
                  {t("اختيار ورش العمل (اختياري)", "Workshop Selection (Optional)")}
                </h4>
                
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {t("ورشة العمل الصباحية", "Morning Workshop")} (08:00 AM - 12:00 PM)
                  </label>
                  <select 
                    value={selectedMorning}
                    onChange={(e) => setSelectedMorning(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-blue-500 outline-none"
                  >
                    <option value="">{t("بدون ورشة عمل صباحية", "No morning workshop")}</option>
                    {morningWorkshops.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.title} {priceData?.workshop_price ? `(+${priceData.workshop_price} SAR)` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {t("ورشة العمل المسائية", "Evening Workshop")} (01:00 PM - 05:00 PM)
                  </label>
                  <select 
                    value={selectedEvening}
                    onChange={(e) => setSelectedEvening(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-blue-500 outline-none"
                  >
                    <option value="">{t("بدون ورشة عمل مسائية", "No evening workshop")}</option>
                    {eveningWorkshops.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.title} {priceData?.workshop_price ? `(+${priceData.workshop_price} SAR)` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-3">
                  {t("كود الخصم (إن وجد)", "Promo Code (if any)")}
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder={t("أدخل كود الخصم", "Enter promo code")} 
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-blue-500 outline-none uppercase font-mono"
                  />
                  <button 
                    type="button" 
                    onClick={validatePromoCode}
                    disabled={isValidatingPromo || !promoCode}
                    className="px-6 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50"
                  >
                    {isValidatingPromo ? <Loader2 className="w-5 h-5 animate-spin" /> : t("تفعيل", "Apply")}
                  </button>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl mb-8 border border-blue-100 dark:border-blue-800">
              <h4 className="font-bold text-lg mb-4 text-blue-900 dark:text-blue-100">{t("ملخص الرسوم", "Order Summary")}</h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span>{t("تذكرة المؤتمر", "Conference Pass")} {priceData?.is_early_bird && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">Early Bird</span>}</span>
                  <span className="font-semibold">{priceData?.conference_price} SAR</span>
                </div>
                {selectedMorning && (
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span>{t("ورشة عمل صباحية", "Morning Workshop")}</span>
                    <span className="font-semibold">{priceData?.workshop_price} SAR</span>
                  </div>
                )}
                {selectedEvening && (
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span>{t("ورشة عمل مسائية", "Evening Workshop")}</span>
                    <span className="font-semibold">{priceData?.workshop_price} SAR</span>
                  </div>
                )}
                {promoDiscount && (
                  <div className="flex justify-between text-green-600 font-bold border-t border-blue-200 dark:border-blue-800 pt-2 mt-2">
                    <span>{t("الخصم", "Discount")}</span>
                    <span>- {promoDiscount.type === 'free' ? '100%' : `${promoDiscount.value}%`}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center text-xl md:text-2xl font-black text-blue-900 dark:text-white border-t border-blue-200 dark:border-blue-800 pt-4">
                <span>{t("الإجمالي", "Total")}</span>
                <span>{calculateTotal()} SAR</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-black text-xl shadow-lg flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  <span>{t("تأكيد التسجيل والدفع", "Confirm & Pay")}</span>
                  <CreditCard className="w-6 h-6" />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </div></div></div>);};
