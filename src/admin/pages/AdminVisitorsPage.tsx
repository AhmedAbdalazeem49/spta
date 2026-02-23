import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/services/api";

interface Visitor {
  id: number;
  ip: string;
  user_agent: string;
  url: string;
  created_at: string;
}

const AdminVisitorsPage = () => {
  const { t } = useLanguage();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await api.get("/admin/visitors");
        setVisitors(res.data.data || res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVisitors();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("عدد الزوار", "Visitors")}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>{t("جاري التحميل...", "Loading...")}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("IP", "IP")}</TableHead>
                  <TableHead>{t("User Agent", "User Agent")}</TableHead>
                  <TableHead>{t("URL", "URL")}</TableHead>
                  <TableHead>{t("تاريخ الزيارة", "Visited At")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>{v.ip}</TableCell>
                    <TableCell>{v.user_agent}</TableCell>
                    <TableCell>{v.url}</TableCell>
                    <TableCell>
                      {new Date(v.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVisitorsPage;
