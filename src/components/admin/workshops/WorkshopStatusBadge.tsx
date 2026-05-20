import { useLanguage } from "@/contexts/LanguageContext";

export const workshopStatusConfig = {
  open: {
    label_ar: "مفتوح",
    label_en: "Open",
    variant: "default" as const,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  closed: {
    label_ar: "مغلق",
    label_en: "Closed",
    variant: "secondary" as const,
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
  completed: {
    label_ar: "مكتمل",
    label_en: "Completed",
    variant: "secondary" as const,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  postponed: {
    label_ar: "مؤجلة",
    label_en: "Postponed",
    variant: "secondary" as const,
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },

};

interface WorkshopStatusBadgeProps {
  status?: string;
}

export const WorkshopStatusBadge = ({ status }: WorkshopStatusBadgeProps) => {
  const { t } = useLanguage();

  if (!status) return null;

  const cfg = workshopStatusConfig[status as keyof typeof workshopStatusConfig];
  if (!cfg) return <span>{status}</span>;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}
    >
      {t(cfg.label_ar, cfg.label_en)}
    </span>
  );
};
