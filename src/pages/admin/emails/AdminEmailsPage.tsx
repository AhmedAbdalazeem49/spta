import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const AdminEmailsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const [form, setForm] = useState({
    region: "all",
    subject: "",
    body: "",
  });

  const handleSend = async () => {
    if (!form.subject.trim() || !form.body.trim()) {
      toast({
        title: t("خطأ", "Error"),
        description: t("يرجى إدخال الموضوع والمحتوى", "Please enter subject and content"),
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      await api.post("/admin/emails/send", form);
      toast({
        title: t("تم بنجاح", "Success"),
        description: t("تم إرسال رسائل البريد الإلكتروني بنجاح", "Emails sent successfully"),
      });
      setForm({
        region: "all",
        subject: "",
        body: "",
      });
    } catch (err: any) {
      toast({
        title: t("خطأ", "Error"),
        description: err.response?.data?.message || t("حدث خطأ أثناء الإرسال", "Error sending emails"),
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" />
            {t("حملات البريد الإلكتروني", "Email Campaigns")}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t(
              "إرسال رسائل بريد إلكتروني مخصصة للمستخدمين حسب المنطقة",
              "Send customized emails to users by region"
            )}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {t("إنشاء رسالة جديدة", "Create New Message")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t("المنطقة المستهدفة", "Target Region")}</Label>
            <Select
              value={form.region}
              onValueChange={(val) => setForm({ ...form, region: val })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("اختر المنطقة", "Select Region")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("جميع المناطق", "All Regions")}
                </SelectItem>
                {[
                  "الرياض",
                  "مكة المكرمة",
                  "المدينة المنورة",
                  "القصيم",
                  "الشرقية",
                  "عسير",
                  "تبوك",
                  "حائل",
                  "الحدود الشمالية",
                  "جازان",
                  "نجران",
                  "الباحة",
                  "الجوف",
                ].map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("الموضوع", "Subject")}</Label>
            <Input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder={t("أدخل موضوع الرسالة", "Enter email subject")}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("محتوى الرسالة", "Message Content")}</Label>
            <div className="border border-input rounded-md overflow-hidden bg-background" dir="ltr">
              <ReactQuill
                theme="snow"
                value={form.body}
                onChange={(val) => setForm({ ...form, body: val })}
                modules={modules}
                style={{ height: "300px", border: "none" }}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              onClick={handleSend}
              disabled={isSending || !form.subject.trim() || !form.body.trim()}
              className="gap-2"
              size="lg"
            >
              {isSending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {t("إرسال الحملة", "Send Campaign")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEmailsPage;
