"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import sptaLogo from "@/assets/spta-trans.png";

const LoginPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0] as string[];
          toast({
            title: t("خطأ", "Error"),
            description: firstError[0],
            variant: "destructive",
          });
        } else {
          toast({
            title: t("خطأ", "Error"),
            description: data.message || "Invalid credentials",
            variant: "destructive",
          });
        }
        return;
      }

      // ✅ Save token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // ✅ Fetch authenticated user
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
          Accept: "application/json",
        },
      });

      const user = await userResponse.json();
      localStorage.setItem("user", JSON.stringify(user));

      toast({
        title: t("تم تسجيل الدخول", "Logged In"),
        description: t("مرحباً بعودتك", "Welcome back"),
      });

      // ✅ Redirect to admin/dashboard
      window.location.href = "/admin";
    } catch (error) {
      toast({
        title: t("خطأ", "Error"),
        description: t("حدث خطأ في الاتصال بالخادم", "Server connection error"),
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <section className="min-h-screen pt-24 pb-16 flex items-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl shadow-xl p-8"
            >
              {/* Logo */}
              <div className="text-center mb-8">
                <Link to="/" className="inline-flex mb-6">
                  <img src={sptaLogo} alt="SPTA Logo" className="h-16" />
                </Link>

                <h1 className="text-2xl font-bold">
                  {t("تسجيل الدخول", "Sign In")}
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm mb-2">
                    {t("البريد الإلكتروني", "Email")}
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "right-4" : "left-4"
                      } w-5`}
                    />
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`${isRTL ? "pr-12" : "pl-12"}`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm mb-2">
                    {t("كلمة المرور", "Password")}
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "right-4" : "left-4"
                      } w-5`}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={`${isRTL ? "pr-12 pl-12" : "pl-12 pr-12"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "left-4" : "right-4"
                      }`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    {t("نسيت كلمة المرور؟", "Forgot password?")}
                  </Link>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {t("تسجيل الدخول", "Sign In")}
                  <ArrowRight className={`${isRTL ? "rotate-180" : ""}`} />
                </Button>

                <p className="text-center text-sm mt-4">
                  {t("ليس لديك حساب؟", "Don't have an account?")}{" "}
                  <Link to="/signup" className="text-primary font-medium">
                    {t("إنشاء حساب", "Create Account")}
                  </Link>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
