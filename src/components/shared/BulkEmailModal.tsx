import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Loader2, Mail, Send, Users } from "lucide-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface BulkEmailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  /** The API endpoint to POST to (e.g. /admin/emails/send) */
  endpoint: string;
  /** Any extra payload fields to merge into the request body */
  extraPayload?: Record<string, string | number | string[]>;
  /** Label describing who will receive the emails */
  recipientLabel?: string;
  /** How many recipients (optional) */
  recipientCount?: number;
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "align",
  "list",
  "bullet",
  "link",
];

export const BulkEmailModal = ({
  isOpen,
  onOpenChange,
  endpoint,
  extraPayload = {},
  recipientLabel,
  recipientCount,
}: BulkEmailModalProps) => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleClose = () => {
    if (!isSending) {
      setSubject("");
      setBody("");
      onOpenChange(false);
    }
  };

  const handleSend = async () => {
    if (!subject.trim()) {
      toast({
        title: t("خطأ", "Error"),
        description: t("يرجى إدخال موضوع الرسالة", "Please enter a subject"),
        variant: "destructive",
      });
      return;
    }
    if (!body.trim() || body === "<p><br></p>") {
      toast({
        title: t("خطأ", "Error"),
        description: t("يرجى كتابة محتوى الرسالة", "Please write message content"),
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const res = await api.post(endpoint, {
        subject,
        body,
        ...extraPayload,
      });
      const count = res.data?.count;
      toast({
        title: t("تم الإرسال بنجاح", "Sent Successfully"),
        description: count
          ? t(`تم إرسال ${count} رسالة بريد إلكتروني`, `${count} emails queued successfully`)
          : t("تم إرسال الرسائل", "Emails queued successfully"),
      });
      handleClose();
    } catch (err: any) {
      toast({
        title: t("خطأ في الإرسال", "Send Error"),
        description:
          err.response?.data?.message ||
          t("حدث خطأ أثناء إرسال الرسائل", "An error occurred while sending"),
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-3xl max-h-[92vh] overflow-hidden flex flex-col p-0 rounded-2xl"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Gradient Header */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-teal-600 text-white px-6 py-5 overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <DialogHeader className="relative">
            <DialogTitle className="flex items-center gap-3 text-xl text-white">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              {t("إرسال بريد إلكتروني", "Send Email Campaign")}
            </DialogTitle>
            {(recipientLabel || recipientCount !== undefined) && (
              <div className="flex items-center gap-2 mt-2 text-white/80 text-sm">
                <Users className="w-4 h-4" />
                {recipientLabel && <span>{recipientLabel}</span>}
                {recipientCount !== undefined && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium">
                    {recipientCount} {t("مستلم", "recipients")}
                  </span>
                )}
              </div>
            )}
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Subject */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              {t("موضوع الرسالة", "Subject")}
              <span className="text-destructive ms-1">*</span>
            </Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t("أدخل موضوع الرسالة...", "Enter email subject...")}
              className="h-11 text-base"
            />
          </div>

          {/* Body */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              {t("محتوى الرسالة", "Message Content")}
              <span className="text-destructive ms-1">*</span>
            </Label>
            <div
              className="border border-input rounded-xl overflow-hidden bg-background"
              dir="ltr"
              style={{ minHeight: 280 }}
            >
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                modules={quillModules}
                formats={quillFormats}
                placeholder={
                  isRTL
                    ? "اكتب محتوى الرسالة هنا..."
                    : "Write your message content here..."
                }
                style={{ height: 230 }}
              />
            </div>
          </div>

          {/* Info note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(
                "سيتم إرسال الرسائل بشكل غير متزامن في خلفية النظام. قد يستغرق الأمر بضع دقائق حتى تصل الرسائل إلى صناديق الوارد.",
                "Emails will be sent asynchronously in the background. It may take a few minutes for messages to reach inboxes."
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t gap-2 shrink-0">
          <Button variant="outline" onClick={handleClose} disabled={isSending}>
            {t("إلغاء", "Cancel")}
          </Button>
          <Button
            onClick={handleSend}
            disabled={isSending || !subject.trim()}
            className="gap-2 min-w-[140px]"
            size="lg"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isSending
              ? t("جارٍ الإرسال...", "Sending...")
              : t("إرسال الرسائل", "Send Emails")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEmailModal;
