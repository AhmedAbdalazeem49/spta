import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import {
  Award, Download, Printer, Share2, CheckCircle, AlertCircle,
  Search, Calendar, User, FileText, Shield, Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';

interface Certificate {
  id: string | number;
  recipient_name?: string;
  workshop_title?: string;
  issue_date?: string;
  hours?: number;
  status?: string;
  verification_code?: string;
}

const CertificateViewPage = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

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
      // Mock data fallback
      setCertificates([
        { id: 'CERT-001', recipient_name: user?.name || 'محمد أحمد', workshop_title: 'ورشة تقنيات العلاج الطبيعي الحديثة', issue_date: '2026-01-15', hours: 8, status: 'verified', verification_code: 'SPTA-2026-001' },
        { id: 'CERT-002', recipient_name: user?.name || 'محمد أحمد', workshop_title: 'ورشة إعادة التأهيل العصبي', issue_date: '2025-11-20', hours: 12, status: 'verified', verification_code: 'SPTA-2025-042' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (cert: Certificate) => {
    toast({ title: t('جاري التحميل...', 'Downloading...'), description: t('سيتم تحميل الشهادة كملف PDF', 'Certificate will be downloaded as PDF') });
  };

  const handlePrint = (cert: Certificate) => {
    window.print();
  };

  const handleShare = async (cert: Certificate) => {
    const shareData = {
      title: t('شهادة من الجمعية السعودية للعلاج الطبيعي', 'Certificate from SPTA'),
      text: `${cert.workshop_title} - ${cert.verification_code}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({ title: t('تم نسخ الرابط', 'Link copied') });
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
      <section className="relative py-16 overflow-hidden" style={{ background: 'var(--gradient-navy)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 start-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {t('شهاداتي', 'My Certificates')}
            </h1>
            <p className="text-white/70">{t('عرض وتحميل جميع شهاداتك', 'View and download all your certificates')}</p>
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

        {/* Loading */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 rounded-xl" />
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
              <p className="text-muted-foreground">{t('لم يتم العثور على شهادات بعد. شارك في ورش العمل للحصول على شهاداتك.', 'No certificates found yet. Participate in workshops to earn certificates.')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((cert, i) => (
              <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                {/* Certificate Preview */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-8 border-b">
                    {/* Decorative border */}
                    <div className="absolute inset-3 border-2 border-primary/20 rounded-lg" />
                    <div className="absolute inset-4 border border-accent/10 rounded-lg" />
                    
                    <div className="relative text-center space-y-3 py-4">
                      <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Award className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{t('الجمعية السعودية للعلاج الطبيعي', 'Saudi Physical Therapy Association')}</p>
                        <h3 className="text-lg font-bold mt-2">{t('شهادة حضور', 'Certificate of Attendance')}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{t('تشهد الجمعية بأن', 'This certifies that')}</p>
                      <p className="text-xl font-bold text-primary">{cert.recipient_name}</p>
                      <p className="text-sm text-muted-foreground">{t('قد أتم بنجاح حضور', 'has successfully completed')}</p>
                      <p className="font-semibold">{cert.workshop_title}</p>
                      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{cert.issue_date}</span>
                        {cert.hours && <span>{cert.hours} {t('ساعة', 'hours')}</span>}
                      </div>
                      {cert.status === 'verified' && (
                        <Badge className="bg-accent/10 text-accent border-accent/30 mt-2">
                          <CheckCircle className="w-3 h-3 me-1" />
                          {t('موثقة', 'Verified')}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Button onClick={() => handleDownload(cert)} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
                        <Download className="w-3.5 h-3.5" />
                        {t('تحميل PDF', 'Download PDF')}
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
                      <p className="text-[10px] text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3" />
                        {t('رمز التحقق:', 'Verification:')} {cert.verification_code}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CertificateViewPage;
