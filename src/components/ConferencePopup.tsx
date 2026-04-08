import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarDays, 
  X, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  Presentation,
  Clock,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

import sptaConference1 from '@/assets/spta-conference-1.jpg';
import sptaConference2 from '@/assets/spta-conference-2.jpg';
import sptaEvent1 from '@/assets/spta-event-1.jpg';
import sptaCeremony1 from '@/assets/spta-ceremony-1.jpg';

interface Conference {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  date: string;
  location: string;
  locationAr: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

const conferences: Conference[] = [
  {
    id: 'conf-5',
    titleAr: 'المؤتمر السعودي الدولي الخامس للعلاج الطبيعي',
    titleEn: '5th Saudi International Physical Therapy Conference',
    descriptionAr: 'المؤتمر الأكبر في مجال العلاج الطبيعي على مستوى المملكة',
    descriptionEn: 'The largest physical therapy conference in the Kingdom',
    date: '2026-09-15',
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    image: sptaConference1,
    status: 'upcoming',
  },
  {
    id: 'conf-lymph-2',
    titleAr: 'المؤتمر الثاني للوذمة اللمفاوية',
    titleEn: '2nd Lymphedema Conference',
    descriptionAr: 'مؤتمر متخصص في أحدث أبحاث وعلاجات الوذمة اللمفاوية',
    descriptionEn: 'Specialized conference on latest lymphedema research and treatments',
    date: '2026-11-20',
    location: 'Jeddah, Saudi Arabia',
    locationAr: 'جدة، المملكة العربية السعودية',
    image: sptaConference2,
    status: 'upcoming',
  },
  {
    id: 'conf-stroke-1',
    titleAr: 'المؤتمر السعودي الدولي الأول للجلطة',
    titleEn: '1st Saudi International Stroke Conference',
    descriptionAr: 'مؤتمر شامل حول إعادة تأهيل مرضى الجلطات الدماغية',
    descriptionEn: 'Comprehensive conference on stroke rehabilitation',
    date: '2025-12-10',
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    image: sptaEvent1,
    status: 'past',
  },
  {
    id: 'conf-4',
    titleAr: 'المؤتمر السعودي الدولي الرابع للعلاج الطبيعي',
    titleEn: '4th Saudi International Physical Therapy Conference',
    descriptionAr: 'المؤتمر الرابع بمشاركة دولية واسعة',
    descriptionEn: 'The 4th conference with wide international participation',
    date: '2025-03-20',
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    image: sptaCeremony1,
    status: 'past',
  },
];

const ConferencePopup = () => {
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    if (status === 'upcoming') return (
      <Badge className="bg-accent text-accent-foreground text-[10px]">
        {t('قادم', 'Upcoming')}
      </Badge>
    );
    if (status === 'ongoing') return (
      <Badge className="bg-primary text-primary-foreground text-[10px]">
        {t('جاري', 'Ongoing')}
      </Badge>
    );
    return (
      <Badge variant="secondary" className="text-[10px]">
        {t('منتهي', 'Past')}
      </Badge>
    );
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Floating Conference Icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 start-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-br from-accent to-primary hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Presentation className="w-6 h-6" />
              </motion.div>
              <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-full mb-2 start-0 bg-card rounded-lg shadow-lg px-3 py-2 text-xs whitespace-nowrap border border-border"
            >
              {t('المؤتمرات', 'Conferences')}
              <div className="absolute bottom-0 start-6 translate-y-1/2 rotate-45 w-2 h-2 bg-card border-b border-r border-border" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 start-6 z-50"
          >
            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border w-[360px] sm:w-[400px]">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary via-accent to-primary p-4 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Presentation className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">
                        {t('المؤتمرات والفعاليات', 'Conferences & Events')}
                      </h3>
                      <p className="text-[11px] opacity-80">
                        {t('أحدث مؤتمرات الجمعية', 'Latest SPTA conferences')}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Conference List */}
              <ScrollArea className="h-[400px]">
                <div className="p-3 space-y-3">
                  {conferences.map((conf, index) => (
                    <motion.div
                      key={conf.id}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link to={`/conferences/${conf.id}`} onClick={() => setIsOpen(false)}>
                        <div className="group rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300 hover:border-primary/30">
                          <div className="relative h-28 overflow-hidden">
                            <img
                              src={conf.image}
                              alt={t(conf.titleAr, conf.titleEn)}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute top-2 end-2">
                              {getStatusBadge(conf.status)}
                            </div>
                            <div className="absolute bottom-2 start-2 end-2">
                              <h4 className="text-white text-xs font-bold line-clamp-1">
                                {t(conf.titleAr, conf.titleEn)}
                              </h4>
                            </div>
                          </div>
                          <div className="p-2.5 space-y-1.5">
                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                              {t(conf.descriptionAr, conf.descriptionEn)}
                            </p>
                            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <CalendarDays className="w-3 h-3" />
                                {new Date(conf.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
                                  year: 'numeric', month: 'short', day: 'numeric'
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {t(conf.locationAr, conf.location)}
                              </span>
                            </div>
                            <div className="flex items-center justify-end">
                              <span className="text-[10px] text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                {t('التفاصيل', 'Details')}
                                <Arrow className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="p-3 border-t border-border">
                <Link to="/conferences" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full gap-2 text-xs h-9">
                    {t('عرض جميع المؤتمرات', 'View All Conferences')}
                    <Arrow className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConferencePopup;
