import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import {
  Award, Search, Eye, CheckCircle, Clock, XCircle, Download, QrCode, Calendar, GraduationCap, User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';

interface Certificate {
  id: string | number;
  recipient_name?: string;
  recipientNameAr?: string;
  recipientNameEn?: string;
  workshop_title?: string;
  workshopTitleAr?: string;
  workshopTitleEn?: string;
  workshop_date?: string;
  workshopDate?: string;
  issue_date?: string;
  issueDate?: string;
  hours?: number;
  status?: string;
  verification_url?: string;
}

const AdminCertificatesPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => { fetchCertificates(); }, []);

  const fetchCertificates = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/admin/certificates');
      const data = res.data?.data || res.data || [];
      setCertificates(Array.isArray(data) ? data : []);
    } catch {
      setCertificates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    const configs: Record<string, { color: string; icon: any; label: string }> = {
      verified: { color: 'bg-green-accent/10 text-green-accent border-green-accent/30', icon: CheckCircle, label: t('موثقة', 'Verified') },
      pending: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', icon: Clock, label: t('قيد المعالجة', 'Pending') },
      revoked: { color: 'bg-destructive/10 text-destructive border-destructive/30', icon: XCircle, label: t('ملغاة', 'Revoked') },
    };
    const config = configs[status || 'pending'] || configs.pending;
    const Icon = config.icon;
    return <Badge variant="outline" className={`${config.color} gap-1 text-xs`}><Icon className="w-3 h-3" />{config.label}</Badge>;
  };

  const getName = (c: Certificate) => c.recipient_name || t(c.recipientNameAr || '', c.recipientNameEn || '');
  const getWorkshop = (c: Certificate) => c.workshop_title || t(c.workshopTitleAr || '', c.workshopTitleEn || '');

  const filtered = certificates.filter(c => {
    const name = getName(c).toLowerCase();
    const workshop = getWorkshop(c).toLowerCase();
    const q = searchQuery.toLowerCase();
    return name.includes(q) || workshop.includes(q) || String(c.id).includes(q);
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          {t('إدارة الشهادات', 'Certificates Management')}
        </h2>
        <p className="text-muted-foreground">{t('عرض وإدارة جميع الشهادات', 'View and manage all certificates')}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-muted-foreground`} />
            <Input
              placeholder={t('بحث بالاسم أو رقم الشهادة...', 'Search by name or certificate number...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={isRTL ? 'pr-10' : 'pl-10'}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">{t('لا توجد شهادات بعد', 'No certificates yet')}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-start p-4 font-semibold text-sm">{t('الرقم', 'ID')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('المستلم', 'Recipient')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('الورشة', 'Workshop')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('التاريخ', 'Date')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('الحالة', 'Status')}</th>
                    <th className="text-start p-4 font-semibold text-sm">{t('الإجراءات', 'Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-t border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 text-sm font-mono text-muted-foreground">{c.id}</td>
                      <td className="p-4 text-sm font-medium">{getName(c)}</td>
                      <td className="p-4 text-sm text-muted-foreground">{getWorkshop(c)}</td>
                      <td className="p-4 text-sm text-muted-foreground">{c.issue_date || c.issueDate || c.workshop_date || c.workshopDate || '—'}</td>
                      <td className="p-4">{getStatusBadge(c.status)}</td>
                      <td className="p-4">
                        <Button size="sm" variant="ghost" onClick={() => { setSelected(c); setIsViewOpen(true); }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('تفاصيل الشهادة', 'Certificate Details')}</DialogTitle>
            <DialogDescription>#{selected?.id}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 py-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-midnight to-dark-navy text-center text-white">
                <Award className="w-10 h-10 mx-auto mb-2 text-mint" />
                <p className="font-bold">{t('شهادة حضور', 'Certificate of Attendance')}</p>
              </div>
              {[
                { icon: User, label: t('المستلم', 'Recipient'), value: getName(selected) },
                { icon: GraduationCap, label: t('الورشة', 'Workshop'), value: getWorkshop(selected) },
                { icon: Calendar, label: t('التاريخ', 'Date'), value: selected.issue_date || selected.issueDate || '—' },
                { icon: Clock, label: t('الساعات', 'Hours'), value: selected.hours ? `${selected.hours} ${t('ساعات', 'hours')}` : '—' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                  <item.icon className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
              <div className="pt-2">{getStatusBadge(selected.status)}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCertificatesPage;
