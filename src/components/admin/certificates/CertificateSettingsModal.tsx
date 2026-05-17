import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Settings, Signature, Stamp } from "lucide-react";

interface CertificateSettings {
  signatureImageUrl: string;
  stampImageUrl: string;
  customText: string;
  template: string;
}

interface CertificateSettingsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  settings: CertificateSettings;
  setSettings: (settings: CertificateSettings) => void;
  onSave: () => void;
}

export const CertificateSettingsModal = ({
  isOpen,
  onOpenChange,
  settings,
  setSettings,
  onSave,
}: CertificateSettingsModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            {t("إعدادات الشهادة", "Certificate Settings")}
          </DialogTitle>
          <DialogDescription>
            {t("تخصيص مظهر الشهادات", "Customize certificate appearance")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Signature className="w-4 h-4" />
              {t("صورة التوقيع", "Signature Image")}
            </Label>
            <Input type="file" accept="image/*" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Stamp className="w-4 h-4" />
              {t("صورة الختم", "Stamp Image")}
            </Label>
            <Input type="file" accept="image/*" />
          </div>

          <div className="space-y-2">
            <Label>{t("نص إضافي", "Custom Text")}</Label>
            <Textarea
              placeholder={t(
                "نص يظهر في الشهادة...",
                "Text to display on certificate..."
              )}
              value={settings.customText}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  customText: e.target.value,
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("إلغاء", "Cancel")}
          </Button>
          <Button className="bg-green-accent hover:bg-green-light gap-2" onClick={onSave}>
            <CheckCircle className="w-4 h-4" />
            {t("حفظ الإعدادات", "Save Settings")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
