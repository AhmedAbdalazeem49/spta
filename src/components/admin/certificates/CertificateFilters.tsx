import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Filter, Search } from "lucide-react";

interface CertificateFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export const CertificateFilters = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}: CertificateFiltersProps) => {
  const { t, isRTL } = useLanguage();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 ${
                isRTL ? "right-3" : "left-3"
              } w-4 h-4 text-muted-foreground`}
            />
            <Input
              placeholder={t(
                "بحث بالاسم أو رقم الشهادة...",
                "Search by name or certificate number..."
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={isRTL ? "pr-10" : "pl-10"}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="w-4 h-4 me-2" />
              <SelectValue placeholder={t("الحالة", "Status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("الكل", "All")}</SelectItem>
              <SelectItem value="verified">{t("موثقة", "Verified")}</SelectItem>
              <SelectItem value="pending">{t("قيد المعالجة", "Pending")}</SelectItem>
              <SelectItem value="revoked">{t("ملغاة", "Revoked")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
