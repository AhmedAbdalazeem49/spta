import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, Loader2, Smartphone } from "lucide-react";

export type PaymentMethodKey = "visa" | "applepay" | "samsungpay";

interface Props {
  amount: number;
  currency?: string;
  loading?: boolean;
  selected?: PaymentMethodKey | null;
  onSelect: (m: PaymentMethodKey) => void;
  onConfirm: () => void;
  confirmLabel?: { ar: string; en: string };
}

const methods: {
  key: PaymentMethodKey;
  ar: string;
  en: string;
  Icon: typeof CreditCard;
  hint?: { ar: string; en: string };
}[] = [
  {
    key: "visa",
    ar: "فيزا / ماستركارد",
    en: "Visa / Mastercard",
    Icon: CreditCard,
  },
  { key: "applepay", ar: "Apple Pay", en: "Apple Pay", Icon: Smartphone },
  { key: "samsungpay", ar: "Google Pay", en: "Google Pay", Icon: Smartphone },
];

const PaymentMethodPicker: React.FC<Props> = ({
  amount,
  currency = "SAR",
  loading,
  selected,
  onSelect,
  onConfirm,
  confirmLabel,
}) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-accent/5 p-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {t("المبلغ المستحق", "Amount Due")}
        </span>
        <span className="text-2xl font-bold text-primary">
          {amount.toLocaleString()} {t("ر.س", currency)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {methods.map(({ key, ar, en, Icon, hint }, i) => {
          const active = selected === key;
          return (
            <motion.button
              key={key}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onSelect(key)}
              className={`relative p-3 rounded-xl border text-start transition-all ${
                active
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border hover:border-primary/40 hover:bg-muted/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground"}`}
                />
                <span className="text-sm font-medium">{t(ar, en)}</span>
              </div>
              {hint && (
                <p className="text-[10px] text-muted-foreground mt-1">
                  {t(hint.ar, hint.en)}
                </p>
              )}
              {active && (
                <CheckCircle2 className="absolute top-2 end-2 w-4 h-4 text-primary" />
              )}
            </motion.button>
          );
        })}
      </div>

      <Button
        onClick={onConfirm}
        disabled={!selected || loading}
        className="w-full gap-2 h-11"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CheckCircle2 className="w-4 h-4" />
        )}
        {t(
          confirmLabel?.ar || "تأكيد الدفع",
          confirmLabel?.en || "Confirm Payment",
        )}
      </Button>

      <p className="text-[10px] text-center text-muted-foreground">
        {t(
          "مدفوعات آمنة عبر بوابة موثقة. لن يكتمل التسجيل إلا بعد نجاح الدفع.",
          "Secure payments via certified gateway. Registration is confirmed only after successful payment.",
        )}
      </p>
    </div>
  );
};

export default PaymentMethodPicker;
