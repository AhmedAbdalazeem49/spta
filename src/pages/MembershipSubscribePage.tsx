import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Crown, Check, Loader2, CreditCard, Banknote, Sparkles, ArrowRight, AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/services/api';
import AuthHero from '@/components/auth/AuthHero';

interface Membership {
  id: number;
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  price: number;
  duration_months: number;
}

const MembershipSubscribePage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/admin/memberships');
      const data = res.data?.data || res.data || [];
      setMemberships(Array.isArray(data) ? data : []);
    } catch {
      // Silently fail — show empty state
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedMembership || !paymentMethod) return;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/membership/subscribe' } } });
      return;
    }
    setIsSubscribing(true);
    try {
      const res = await api.post('/membership/subscribe', {
        membership_id: selectedMembership.id,
        payment_method: paymentMethod,
      });
      const data = res.data?.data || res.data;
      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast({ title: t('تم بنجاح', 'Success'), description: t('تم الاشتراك بنجاح', 'Subscribed successfully') });
        navigate('/profile');
      }
    } catch (err: any) {
      toast({
        title: t('خطأ', 'Error'),
        description: err.response?.data?.message || t('حدث خطأ', 'Something went wrong'),
        variant: 'destructive',
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const openSubscribeDialog = (m: Membership) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/membership/subscribe' } } });
      return;
    }
    setSelectedMembership(m);
    setPaymentMethod('');
    setIsDialogOpen(true);
  };

  const colors = [
    'from-primary to-deep-blue',
    'from-teal to-aqua-teal',
    'from-mint to-teal',
    'from-deep-blue to-midnight',
  ];

  return (
    <Layout>
      <AuthHero
        titleAr="اشترك في العضوية"
        titleEn="Subscribe to Membership"
        subtitleAr="اختر الباقة المناسبة وابدأ رحلتك المهنية"
        subtitleEn="Choose the right plan and start your professional journey"
      />

      <section className="py-16 -mt-6 relative z-10">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-96 rounded-3xl" />
              ))}
            </div>
          ) : memberships.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Crown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{t('لا توجد باقات متاحة حالياً', 'No plans available yet')}</h3>
              <p className="text-muted-foreground">{t('يرجى المحاولة لاحقاً', 'Please check back later')}</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memberships.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="relative overflow-hidden rounded-3xl border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group h-full flex flex-col">
                    <div className={`h-2 bg-gradient-to-r ${colors[i % colors.length]}`} />
                    {i === 0 && (
                      <div className="absolute top-4 end-4">
                        <Badge className="bg-primary text-primary-foreground gap-1">
                          <Sparkles className="w-3 h-3" />
                          {t('الأكثر شعبية', 'Most Popular')}
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-8 flex flex-col flex-1">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                        <Crown className="w-7 h-7" />
                      </div>

                      <h3 className="text-2xl font-bold mb-2">{t(m.name_ar || m.name, m.name)}</h3>
                      {m.description && (
                        <p className="text-muted-foreground text-sm mb-6">{t(m.description_ar || m.description, m.description)}</p>
                      )}

                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold text-primary">{m.price}</span>
                        <span className="text-muted-foreground">
                          {t('ريال', 'SAR')} / {m.duration_months} {t('شهر', 'mo')}
                        </span>
                      </div>

                      <div className="flex-1" />

                      <Button
                        onClick={() => openSubscribeDialog(m)}
                        className="w-full gap-2 mt-4"
                        size="lg"
                      >
                        {t('اشترك الآن', 'Subscribe Now')}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              {t('تأكيد الاشتراك', 'Confirm Subscription')}
            </DialogTitle>
            <DialogDescription>
              {selectedMembership && t(
                `الاشتراك في ${selectedMembership.name_ar || selectedMembership.name}`,
                `Subscribe to ${selectedMembership.name}`
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedMembership && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{t(selectedMembership.name_ar || selectedMembership.name, selectedMembership.name)}</span>
                  <span className="font-bold text-primary">{selectedMembership.price} {t('ريال', 'SAR')}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedMembership.duration_months} {t('شهر', 'months')}
                </p>
              </div>

              <div className="space-y-2">
                <Label>{t('طريقة الدفع', 'Payment Method')}</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('اختر طريقة الدفع', 'Select payment method')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">
                      <span className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        {t('بطاقة ائتمان', 'Credit Card')}
                      </span>
                    </SelectItem>
                    <SelectItem value="mada">
                      <span className="flex items-center gap-2">
                        <Banknote className="w-4 h-4" />
                        {t('مدى', 'Mada')}
                      </span>
                    </SelectItem>
                    <SelectItem value="bank_transfer">
                      <span className="flex items-center gap-2">
                        <Banknote className="w-4 h-4" />
                        {t('تحويل بنكي', 'Bank Transfer')}
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t('إلغاء', 'Cancel')}</Button>
            <Button onClick={handleSubscribe} disabled={isSubscribing || !paymentMethod} className="gap-2">
              {isSubscribing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {t('تأكيد الدفع', 'Confirm Payment')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MembershipSubscribePage;
