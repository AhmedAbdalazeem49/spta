import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { api } from "@/api";
import { Coupon } from "@/types/coupon";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Edit,
  Gift,
  GraduationCap,
  Link2,
  Percent,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

/* -----------------------------
   TIME FORMATTER (SAFE + CLEAN)
------------------------------*/
const formatDateTime = (date?: string | null) => {
  if (!date) return "—";

  const d = new Date(date);

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
};

/* -----------------------------
   WORKSHOP CACHE
------------------------------*/
const workshopCache = new Map<number, string>();

async function fetchWorkshopName(id: number): Promise<string> {
  if (workshopCache.has(id)) return workshopCache.get(id)!;

  try {
    const res = await api.get(`/workshops/${id}`);
    const name = res.data?.data?.title || res.data?.title || `Workshop #${id}`;
    workshopCache.set(id, name);
    return name;
  } catch {
    return `Workshop #${id}`;
  }
}

/* -----------------------------
   PROPS
------------------------------*/
interface CouponsListProps {
  coupons: Coupon[];
  isLoading: boolean;
  onOpenEdit: (coupon: Coupon) => void;
  onOpenDelete: (coupon: Coupon) => void;
  onCopyCode: (code: string) => void;
}

/* -----------------------------
   COMPONENT
------------------------------*/
export const CouponsList = ({
  coupons,
  isLoading,
  onOpenEdit,
  onOpenDelete,
  onCopyCode,
}: CouponsListProps) => {
  const { t } = useLanguage();

  const [workshopNames, setWorkshopNames] = useState<Record<number, string>>(
    {}
  );

  /* -----------------------------
     LOAD WORKSHOP NAMES
  ------------------------------*/
  useEffect(() => {
    const load = async () => {
      const ids = coupons
        .filter((c) => c.appliesTo === "workshop" && c.appliesToId)
        .map((c) => c.appliesToId!);

      const unique = Array.from(new Set(ids));

      const results = await Promise.all(
        unique.map(async (id) => [id, await fetchWorkshopName(id)] as const)
      );

      const map: Record<number, string> = {};
      results.forEach(([id, name]) => {
        map[id] = name;
      });

      setWorkshopNames(map);
    };

    if (coupons.length) load();
  }, [coupons]);

  /* -----------------------------
     TYPE BADGE
  ------------------------------*/
  const getTypeBadge = (type: string) =>
    type === "free" ? (
      <Badge className="bg-green-500/10 text-green-600 border-green-500/30 gap-1">
        <Gift className="w-3 h-3" />
        {t("مجاني", "Free")}
      </Badge>
    ) : (
      <Badge className="bg-primary/10 text-primary border-primary/30 gap-1">
        <Percent className="w-3 h-3" />
        {t("خصم", "Discount")}
      </Badge>
    );

  /* -----------------------------
     STATUS BADGE
  ------------------------------*/
  const getStatusBadge = (status: string) => {
    const map: any = {
      active: {
        color: "bg-green-500/10 text-green-600 border-green-500/30",
        icon: CheckCircle,
        ar: "نشط",
        en: "Active",
      },
      expired: {
        color: "bg-red-500/10 text-red-600 border-red-500/30",
        icon: Clock,
        ar: "منتهي",
        en: "Expired",
      },
      used: {
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
        icon: AlertCircle,
        ar: "مستنفد",
        en: "Used",
      },
    };

    const c = map[status] || map.expired;
    const Icon = c.icon;

    return (
      <Badge className={`${c.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(c.ar, c.en)}
      </Badge>
    );
  };

  /* -----------------------------
     LOADING
  ------------------------------*/
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-72 rounded-2xl" />
        ))}
      </div>
    );
  }

  /* -----------------------------
     EMPTY STATE
  ------------------------------*/
  if (!coupons.length) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-14 h-14 mx-auto text-muted-foreground/40 mb-3" />
        <p className="text-muted-foreground">
          {t("لا توجد أكواد حالياً", "No coupons found")}
        </p>
      </div>
    );
  }

  /* -----------------------------
     UI
  ------------------------------*/
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {coupons.map((c, index) => {
          const usagePercent =
            c.usageLimit > 0 ? (c.usedCount / c.usageLimit) * 100 : 0;

          const workshopName =
            c.appliesTo === "workshop" && c.appliesToId
              ? workshopNames[c.appliesToId] || "Loading..."
              : null;

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden rounded-2xl border hover:shadow-xl transition-all duration-300">
                {/* TOP BAR */}
                <div
                  className={`h-1.5 ${
                    c.type === "free"
                      ? "bg-gradient-to-r from-green-400 to-emerald-500"
                      : "bg-gradient-to-r from-primary to-blue-500"
                  }`}
                />

                <CardContent className="p-5 space-y-4">
                  {/* HEADER */}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2 flex-wrap">
                      {getTypeBadge(c.type)}
                      {getStatusBadge(c.status)}
                    </div>

                    <button
                      onClick={() => onCopyCode(c.code)}
                      className="p-2 rounded-md hover:bg-muted transition"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* CODE */}
                  <div className="text-center bg-muted/40 rounded-xl py-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      {t("الكود", "Code")}
                    </p>
                    <p className="text-xl font-mono font-bold tracking-widest text-primary">
                      {c.code}
                    </p>
                  </div>

                  {/* VALUE */}
                  <div className="text-center">
                    <span className="text-4xl font-bold text-primary">
                      {c.discountPercentage}%
                    </span>
                  </div>

                  {/* USAGE */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {t("الاستخدام", "Usage")}
                      </span>
                      <span>
                        {c.usedCount} / {c.usageLimit || "∞"}
                      </span>
                    </div>

                    <Progress value={usagePercent} className="h-2" />
                  </div>

                  {/* DATES (IMPROVED) */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>
                      {formatDateTime(c.startDate)} →{" "}
                      {formatDateTime(c.endDate)}
                    </span>
                  </div>

                  {/* SCOPE */}
                  <div className="flex items-center gap-2 text-xs">
                    <Link2 className="w-4 h-4 text-primary" />
                    <span className="font-medium">
                      {c.scopeLabelAr} ({c.scopeLabelEn})
                    </span>
                  </div>

                  {/* TARGET */}
                  <div className="flex items-center gap-2 text-xs">
                    {c.appliesTo === "workshop" ? (
                      <GraduationCap className="w-4 h-4 text-primary" />
                    ) : (
                      <Users className="w-4 h-4 text-primary" />
                    )}

                    <span>
                      {c.appliesTo === "all"
                        ? "All targets"
                        : c.appliesTo === "membership"
                        ? "Membership"
                        : workshopName || `Workshop #${c.appliesToId}`}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => onOpenEdit(c)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {t("تعديل", "Edit")}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500"
                      onClick={() => onOpenDelete(c)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
