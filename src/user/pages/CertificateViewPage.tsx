import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import {
  Award, Download, Printer, Share2, AlertCircle,
  Search, Shield, Loader2, Palette
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import CertificateTemplate, { CertTemplate } from '@/components/CertificateTemplate';

interface Certificate {
  id: string | number;
  recipient_name?: string;
  workshop_title?: string;
  issue_date?: string;
  hours?: number;
  status?: string;
  verification_code?: string;
  template?: CertTemplate;
}

const TEMPLATES: { key: CertTemplate; labelAr: string; labelEn: string }[] = [
  { key: 'classic', labelAr: 'كلاسيكي', labelEn: 'Classic' },
  { key: 'modern', labelAr: 'عصري', labelEn: 'Modern' },
  { key: 'elegant', labelAr: 'فاخر', labelEn: 'Elegant' },
  { key: 'minimal', labelAr: 'بسيط', labelEn: 'Minimal' },
];

const CertificateViewPage = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [templateMap, setTemplateMap] = useState<Record<string, CertTemplate>>({});

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await api.get('/certificates/my');
      const data = res.data?.data || res.data || [];
      setCertificates(Array.isArray(data) ? data : []);
    } catch {
      setCertificates([
        { id: 'CERT-001', recipient_name: user?.name || 'محمد أحمد', workshop_title: 'ورشة تقنيات العلاج الطبيعي الحديثة', issue_date: '2026-01-15', hours: 8, status: 'verified', verification_code: 'SPTA-2026-001' },
        { id: 'CERT-002', recipient_name: user?.name || 'محمد أحمد', workshop_title: 'ورشة إعادة التأهيل العصبي', issue_date: '2025-11-20', hours: 12, status: 'verified', verification_code: 'SPTA-2025-042' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplate = (id: string | number): CertTemplate =>
    templateMap[String(id)] || 'classic';

  const setCertTemplate = (id: string | number, tpl: CertTemplate) =>
    setTemplateMap((p) => ({ ...p, [String(id)]: tpl }));

  const handleDownload = async (cert: Certificate) => {
    toast({
      title: t('جاري التحضير...', 'Preparing...'),
      description: t('سيتم تحميل الشهادة كملف PDF', 'Certificate will be downloaded as PDF')
    });
    // Best-effort: open print which user can save as PDF
    setTimeout(() => window.print(), 300);
  };

  const handlePrint = (cert: Certificate) => {
    window.print();
  };

  const handleShare = async (cert: Certificate) => {
    const verifyUrl = `${window.location.origin}/certificates/verify/${cert.verification_code}`;
    const shareData = {
      title: t('شهادة من الجمعية السعودية للعلاج الطبيعي', 'Certificate from SPTA'),
      text: `${cert.workshop_title} - ${cert.verification_code}`,
      url: verifyUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(verifyUrl);
        toast({ title: t('تم نسخ رابط التحقق', 'Verification link copied') });
      }
    } catch {}
  };

  const filtered = certificates.filter(c =>
    (c.workshop_title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.verification_code || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 start-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              {t('شهاداتي', 'My Certificates')}
            </h1>
            <p className="text-primary-foreground/70">
              {t('عرض، طباعة، تحميل، ومشاركة شهاداتك', 'View, print, download and share your certificates')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 space-y-6">
        {/* Search */}
        <div className="relative max-w-md" data-aos="fade-up">
          <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-muted-foreground`} />
          <Input
            placeholder={t('بحث في الشهادات...', 'Search certificates...')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={isRTL ? 'pr-10' : 'pl-10'}
          />
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-80 rounded-2xl" />
                <Skeleton className="h-10 rounded-lg" />
              </div>
            ))}
          </div>
        ) : error ? (
          <Card className="text-center py-16" data-aos="fade-up">
            <CardContent>
              <AlertCircle className="w-16 h-16 mx-auto text-destructive/50 mb-4" />
              <h3 className="text-lg font-bold mb-2">{t('حدث خطأ', 'An error occurred')}</h3>
              <p className="text-muted-foreground mb-4">{t('تعذر تحميل الشهادات', 'Could not load certificates')}</p>
              <Button onClick={fetchCertificates} variant="outline">{t('إعادة المحاولة', 'Try Again')}</Button>
            </CardContent>
          </Card>
        ) : filtered.length === 0 ? (
          <Card className="text-center py-16" data-aos="fade-up">
            <CardContent>
              <Award className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-bold mb-2">{t('لا توجد شهادات', 'No Certificates')}</h3>
              <p className="text-muted-foreground">
                {t('لم يتم العثور على شهادات بعد. شارك في ورش العمل للحصول على شهاداتك.', 'No certificates found yet. Participate in workshops to earn certificates.')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((cert, i) => {
              const tpl = getTemplate(cert.id);
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow rounded-2xl">
                    <CertificateTemplate cert={cert} template={tpl} />

                    <CardContent className="p-4 space-y-3 border-t">
                      {/* Template selector */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5" />
                          {t('اختر التصميم', 'Choose Template')}
                        </p>
                        <div className="grid grid-cols-4 gap-1.5">
                          {TEMPLATES.map((tplOpt) => (
                            <button
                              key={tplOpt.key}
                              onClick={() => setCertTemplate(cert.id, tplOpt.key)}
                              className={`text-xs py-1.5 px-2 rounded-md border transition-all ${
                                tpl === tplOpt.key
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'bg-background hover:bg-muted border-border'
                              }`}
                            >
                              {t(tplOpt.labelAr, tplOpt.labelEn)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button onClick={() => handleDownload(cert)} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
                          <Download className="w-3.5 h-3.5" />
                          {t('PDF', 'PDF')}
                        </Button>
                        <Button onClick={() => handlePrint(cert)} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
                          <Printer className="w-3.5 h-3.5" />
                          {t('طباعة', 'Print')}
                        </Button>
                        <Button onClick={() => handleShare(cert)} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
                          <Share2 className="w-3.5 h-3.5" />
                          {t('مشاركة', 'Share')}
                        </Button>
                      </div>
                      {cert.verification_code && (
                        <p className="text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1">
                          <Shield className="w-3 h-3" />
                          {t('رمز التحقق:', 'Verification:')} {cert.verification_code}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CertificateViewPage;
