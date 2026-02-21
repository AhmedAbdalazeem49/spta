"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const SignupPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullNameAr: "",
    fullNameEn: "",
    email: "",
    phone: "",
    nationalId: "",
    specialization: "",
    subSpecialization: "",
    workplace: "",
    password: "",
    confirmPassword: "",
  });

  const [existingIds] = useState<string[]>(["1234567890"]); // simulate DB

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (existingIds.includes(formData.nationalId)) {
      toast({
        title: t("خطأ", "Error"),
        description: t(
          "رقم الهوية مستخدم مسبقاً",
          "National ID already registered"
        ),
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t("خطأ", "Error"),
        description: t("كلمتا المرور غير متطابقتين", "Passwords do not match"),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("تم إنشاء الحساب", "Account Created"),
      description: t("يمكنك الآن تسجيل الدخول", "You can now log in"),
    });
  };

  return (
    <Layout>
      <section className="min-h-screen pt-24 pb-16">
        <div className="container-custom max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl shadow-xl p-10"
          >
            <h1 className="text-2xl font-bold mb-8 text-center">
              {t("إنشاء حساب مجاني", "Create Free Account")}
            </h1>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <Input
                placeholder={t("الاسم الرباعي (عربي)", "Full Name (Arabic)")}
                required
                onChange={(e) =>
                  setFormData({ ...formData, fullNameAr: e.target.value })
                }
              />

              <Input
                placeholder={t(
                  "الاسم الرباعي (English)",
                  "Full Name (English)"
                )}
                required
                onChange={(e) =>
                  setFormData({ ...formData, fullNameEn: e.target.value })
                }
              />

              <Input
                type="email"
                placeholder={t("البريد الإلكتروني", "Email")}
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Input
                type="tel"
                placeholder={t("رقم الجوال", "Phone Number")}
                required
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <Input
                placeholder={t("رقم الهوية الوطنية", "National ID")}
                required
                onChange={(e) =>
                  setFormData({ ...formData, nationalId: e.target.value })
                }
              />

              <Input
                placeholder={t("التخصص", "Specialization")}
                required
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
              />

              <Input
                placeholder={t("التخصص الدقيق", "Sub-specialization")}
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subSpecialization: e.target.value,
                  })
                }
              />

              <Input
                placeholder={t("جهة العمل", "Workplace")}
                required
                onChange={(e) =>
                  setFormData({ ...formData, workplace: e.target.value })
                }
              />

              <Input
                type="password"
                placeholder={t("كلمة المرور", "Password")}
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <Input
                type="password"
                placeholder={t("تأكيد كلمة المرور", "Confirm Password")}
                required
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />

              <div className="md:col-span-2">
                <Button type="submit" size="lg" className="w-full">
                  {t("إنشاء الحساب", "Create Account")}
                </Button>
              </div>
            </form>

            <p className="text-center text-sm mt-6">
              {t("لديك حساب بالفعل؟", "Already have an account?")}{" "}
              <Link to="/login" className="text-primary font-medium">
                {t("تسجيل الدخول", "Sign In")}
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SignupPage;
