import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, ArrowRight, ArrowLeft, Presentation } from 'lucide-react';
import { Link } from 'react-router-dom';

import sptaConference1 from '@/assets/spta-conference-1.jpg';
import sptaConference2 from '@/assets/spta-conference-2.jpg';
import sptaEvent1 from '@/assets/spta-event-1.jpg';
import sptaCeremony1 from '@/assets/spta-ceremony-1.jpg';

const allConferences = [
  { id: 'conf-5', titleAr: 'المؤتمر السعودي الدولي الخامس للعلاج الطبيعي', titleEn: '5th Saudi International PT Conference', date: '2026-09-15', locationAr: 'الرياض', locationEn: 'Riyadh', image: sptaConference1, status: 'upcoming' },
  { id: 'conf-lymph-2', titleAr: 'المؤتمر الثاني للوذمة اللمفاوية', titleEn: '2nd Lymphedema Conference', date: '2026-11-20', locationAr: 'جدة', locationEn: 'Jeddah', image: sptaConference2, status: 'upcoming' },
  { id: 'conf-stroke-1', titleAr: 'المؤتمر السعودي الدولي الأول للجلطة', titleEn: '1st Saudi International Stroke Conference', date: '2025-12-10', locationAr: 'الرياض', locationEn: 'Riyadh', image: sptaEvent1, status: 'past' },
  { id: 'conf-4', titleAr: 'المؤتمر السعودي الدولي الرابع للعلاج الطبيعي', titleEn: '4th Saudi International PT Conference', date: '2025-03-20', locationAr: 'الرياض', locationEn: 'Riyadh', image: sptaCeremony1, status: 'past' },
  { id: 'conf-lymph-1', titleAr: 'المؤتمر الأول للوذمة اللمفاوية', titleEn: '1st Lymphedema Conference', date: '2024-06-10', locationAr: 'الرياض', locationEn: 'Riyadh', image: sptaConference2, status: 'past' },
  { id: 'conf-3', titleAr: 'المؤتمر الثالث للعلاج الطبيعي', titleEn: '3rd PT Conference', date: '2023-11-15', locationAr: 'الرياض', locationEn: 'Riyadh', image: sptaConference1, status: 'past' },
  { id: 'conf-2', titleAr: 'المؤتمر الثاني للعلاج الطبيعي', titleEn: '2nd PT Conference', date: '2022-05-20', locationAr: 'الرياض', locationEn: 'Riyadh', image: sptaEvent1, status: 'past' },
  { id: 'conf-1', titleAr: 'المؤتمر الأول للعلاج الطبيعي', titleEn: '1st PT Conference', date: '2021-03-10', locationAr: 'الرياض', locationEn: 'Riyadh', image: sptaCeremony1, status: 'past' },
];

const ConferencesPage = () => {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => { AOS.init({ duration: 700, once: true }); }, []);

  const upcoming = allConferences.filter(c => c.status === 'upcoming');
  const past = allConferences.filter(c => c.status === 'past');

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'var(--gradient-navy)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 start-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-10 end-10 w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-4">
              <Presentation className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {t('المؤتمرات والفعاليات', 'Conferences & Events')}
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              {t('جميع مؤتمرات الجمعية السعودية للعلاج الطبيعي', 'All Saudi Physical Therapy Association conferences')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CalendarDays className="w-6 h-6 text-accent" />
              {t('المؤتمرات القادمة', 'Upcoming Conferences')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcoming.map((c, i) => (
                <Link key={c.id} to={`/conferences/${c.id}`}>
                  <Card data-aos="fade-up" data-aos-delay={i * 100} className="overflow-hidden group hover:shadow-xl transition-all border-accent/20">
                    <div className="relative h-48 overflow-hidden">
                      <img src={c.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-3 end-3 bg-accent text-accent-foreground">{t('قادم', 'Upcoming')}</Badge>
                      <div className="absolute bottom-3 start-3 end-3">
                        <h3 className="text-white font-bold text-lg">{t(c.titleAr, c.titleEn)}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" />{new Date(c.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{t(c.locationAr, c.locationEn)}</span>
                      </div>
                      <Arrow className="w-5 h-5 text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Past */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-muted-foreground" />
            {t('المؤتمرات السابقة', 'Past Conferences')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((c, i) => (
              <Link key={c.id} to={`/conferences/${c.id}`}>
                <Card data-aos="fade-up" data-aos-delay={i * 50} className="overflow-hidden group hover:shadow-lg transition-all">
                  <div className="relative h-40 overflow-hidden">
                    <img src={c.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 start-2 end-2">
                      <h3 className="text-white font-bold text-sm line-clamp-2">{t(c.titleAr, c.titleEn)}</h3>
                    </div>
                  </div>
                  <CardContent className="p-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{new Date(c.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'short' })}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{t(c.locationAr, c.locationEn)}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ConferencesPage;
