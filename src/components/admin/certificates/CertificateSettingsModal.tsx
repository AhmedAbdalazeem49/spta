import { api } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CheckCircle,
  Loader2,
  Settings,
  Signature,
  Stamp,
  UploadCloud,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";

export interface CertificateSettings {
  signature_image: File | string | null;
  stamp_image: File | string | null;
  chairman_name: string;
  custom_text: string;
}

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  settings: CertificateSettings; // ✅ controlled by parent
  setSettings: React.Dispatch<React.SetStateAction<CertificateSettings>>;
}

export const CertificateSettingsModal = ({
  isOpen,
  onOpenChange,
  settings, // ✅ use props — no internal state shadow
  setSettings,
}: Props) => {
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);

  // FILE HANDLER
  const handleFileChange =
    (key: "signature_image" | "stamp_image") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setSettings((prev) => ({ ...prev, [key]: file }));
    };

  // IMAGE PREVIEW — handles File, server path, or null
  const getImagePreview = (value: File | string | null): string | undefined => {
    if (!value) return undefined;
    if (value instanceof File) return URL.createObjectURL(value);
    if (value.startsWith("http")) return value;
    return `https://spta-one.vercel.app${value}`;
  };

  // SAVE
  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("chairman_name", settings.chairman_name || "");
      formData.append("custom_text", settings.custom_text || "");
      if (settings.signature_image instanceof File)
        formData.append("signature_image", settings.signature_image);
      if (settings.stamp_image instanceof File)
        formData.append("stamp_image", settings.stamp_image);

      const res = await api.post("/certificate-settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ same dual-shape handling
      const data = res.data?.data ?? res.data;
      if (data) {
        setSettings((prev) => ({
          ...prev,
          signature_image: data.signature_image ?? prev.signature_image,
          stamp_image: data.stamp_image ?? prev.stamp_image,
          chairman_name: data.chairman_name ?? prev.chairman_name,
          custom_text: data.custom_text ?? prev.custom_text,
        }));
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-3xl border-0 shadow-2xl overflow-hidden p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b px-6 py-5">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              {t("إعدادات الشهادات", "Certificate Settings")}
            </DialogTitle>
            <DialogDescription className="text-sm mt-1">
              {t(
                "يمكنك تخصيص شكل التوقيع والختم والنصوص الخاصة بالشهادات",
                "Customize certificate signature, stamp, and appearance"
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* BODY */}
        <div className="px-6 py-6">
          <div className="space-y-8">
            {/* Uploads */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Signature */}
              <div className="rounded-2xl border bg-muted/20 p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Signature className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{t("التوقيع", "Signature")}</h3>
                </div>
                <div className="h-40 rounded-2xl border-2 border-dashed bg-background flex items-center justify-center overflow-hidden">
                  {settings.signature_image ? (
                    <img
                      src={getImagePreview(settings.signature_image)}
                      alt="signature"
                      className="max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <UploadCloud className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        {t("لم يتم رفع توقيع", "No signature uploaded")}
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange("signature_image")}
                />
              </div>

              {/* Stamp */}
              <div className="rounded-2xl border bg-muted/20 p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Stamp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{t("الختم", "Stamp")}</h3>
                </div>
                <div className="h-40 rounded-2xl border-2 border-dashed bg-background flex items-center justify-center overflow-hidden">
                  {settings.stamp_image ? (
                    <img
                      src={getImagePreview(settings.stamp_image)}
                      alt="stamp"
                      className="max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <UploadCloud className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        {t("لم يتم رفع ختم", "No stamp uploaded")}
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange("stamp_image")}
                />
              </div>
            </div>

            {/* Chairman */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <UserCircle2 className="w-4 h-4 text-primary" />
                {t("اسم رئيس الجمعية", "Chairman Name")}
              </Label>
              <Input
                value={settings.chairman_name}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    chairman_name: e.target.value,
                  }))
                }
                placeholder={t("أدخل اسم رئيس الجمعية", "Enter chairman name")}
                className="h-12 rounded-xl"
              />
            </div>

            {/* Custom Text */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">
                {t("نص إضافي في الشهادة", "Custom Certificate Text")}
              </Label>
              <Textarea
                value={settings.custom_text}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    custom_text: e.target.value,
                  }))
                }
                placeholder={t(
                  "اكتب النص الذي سيظهر داخل الشهادة...",
                  "Write text displayed inside certificates..."
                )}
                className="min-h-[140px] rounded-2xl resize-none"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="border-t px-6 py-5 gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            {t("إلغاء", "Cancel")}
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-green-600 hover:bg-green-700 gap-2 min-w-[150px]"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("جارِ الحفظ...", "Saving...")}
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                {t("حفظ الإعدادات", "Save Settings")}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
