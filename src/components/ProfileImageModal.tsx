import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ProfileService } from "@/services/profile.service";
import { ImagePlus, Loader2, Trash2, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (newUrl: string) => void;
}

const MAX_SIZE = 8 * 1024 * 1024; // 2MB

export default function ProfileImageModal({ open, onClose, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const resetState = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setIsDragging(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const validateAndSetFile = (f: File | undefined | null) => {
    setError(null);

    if (!f) return;

    if (!f.type.startsWith("image/")) {
      setError("الرجاء رفع ملف صورة صالح (PNG أو JPG أو WEBP).");
      return;
    }

    if (f.size > MAX_SIZE) {
      setError(
        `حجم الملف كبير جدًا. الحد الأقصى 8 ميجابايت (حجم ملفك ${(f.size / 1024 / 1024).toFixed(1)} ميجابايت).`,
      );
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndSetFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetState();
  };

const handleUpload = async () => {
  if (!file) return;

  setLoading(true);

  try {
    const res = await ProfileService.updateProfileImage(file);

    const imageUrl =
      res?.data?.profile_image || res?.data?.profile_image_url || null;

    toast({
      title: "تم بنجاح",
      description: "تم تحديث الصورة الشخصية",
    });

    if (imageUrl) onSuccess(imageUrl);

    handleClose();

    // 🔥 reload page after success
    window.location.reload();
  } catch (err: any) {
    toast({
      title: "خطأ",
      description: err?.response?.data?.message || "فشل رفع الصورة",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-[400px] p-6" dir="rtl">
        <DialogHeader>
          <DialogTitle>تحديث الصورة الشخصية</DialogTitle>
          <DialogDescription>
            PNG أو JPG أو WEBP، بحد أقصى 8 ميجابايت
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {preview ? (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="relative group">
                <img
                  src={preview}
                  alt="معاينة الصورة"
                  className="w-32 h-32 rounded-full object-cover border-2 border-border shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute -top-1 -left-1 bg-destructive text-destructive-foreground rounded-full p-1.5 shadow-md hover:scale-110 transition-transform"
                  aria-label="إزالة الصورة"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <ImagePlus className="w-3.5 h-3.5" />
                اختيار صورة أخرى
              </button>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-colors py-10 px-4 text-center",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/40",
              )}
            >
              <div className="rounded-full bg-muted p-3">
                <UploadCloud className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">
                اضغط للرفع أو اسحب الصورة وأفلتها هنا
              </p>
              <p className="text-xs text-muted-foreground">
                PNG، JPG، WEBP حتى 8 ميجابايت
              </p>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            {file && (
              <Button
                variant="outline"
                onClick={handleRemove}
                disabled={loading}
                className="shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            <Button
              onClick={handleUpload}
              disabled={!file || loading}
              className="flex-1"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? "جارٍ الرفع..." : "رفع الصورة"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
