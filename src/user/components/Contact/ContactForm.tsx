"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send } from "lucide-react";

export default function ContactForm() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim())
      newErrors.name = t("الاسم مطلوب", "Name is required");
    if (!formData.email.trim())
      newErrors.email = t("البريد الإلكتروني مطلوب", "Email is required");
    if (!formData.subject.trim())
      newErrors.subject = t("الموضوع مطلوب", "Subject is required");
    if (!formData.message.trim())
      newErrors.message = t("الرسالة مطلوبة", "Message is required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // simulate sending form
    setTimeout(() => {
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    }, 500);
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          data-aos="fade-right"
          className="bg-card rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {t("أرسل لنا رسالة", "Send Us a Message")}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("الاسم الكامل", "Full Name")} *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder={t("أدخل اسمك", "Enter your name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("البريد الإلكتروني", "Email")} *
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder={t("أدخل بريدك الإلكتروني", "Enter your email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("رقم الهاتف", "Phone Number")}
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder={t("أدخل رقم هاتفك", "Enter your phone")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("الموضوع", "Subject")} *
                </label>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder={t("موضوع الرسالة", "Message subject")}
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("الرسالة", "Message")} *
              </label>
              <Textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder={t(
                  "اكتب رسالتك هنا...",
                  "Write your message here..."
                )}
                className={errors.message ? "border-red-500" : ""}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              <Send className="w-5 h-5" />
              {t("إرسال الرسالة", "Send Message")}
            </Button>
          </form>
        </motion.div>

        {/* Success Modal */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          >
            <div className="bg-white rounded-xl p-8 max-w-sm text-center shadow-xl">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t("تم الإرسال بنجاح", "Message Sent Successfully")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("سنتواصل معك قريباً", "We will contact you soon")}
              </p>
              <Button onClick={() => setSuccess(false)}>
                {t("إغلاق", "Close")}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
