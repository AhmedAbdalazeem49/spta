import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, ArrowRight, Share2, Facebook, Twitter, Linkedin, 
  Clock, User, Tag
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';
import hero4 from '@/assets/hero-4.jpg';

const NewsPage = () => {
  const { t, isRTL } = useLanguage();

  const newsItems = [
    {
      id: 1,
      title: t('المؤتمر السنوي للعلاج الطبيعي 2024', 'Annual Physical Therapy Conference 2024'),
      excerpt: t('انطلاق المؤتمر السنوي الخامس للعلاج الطبيعي بمشاركة أكثر من 500 متخصص من مختلف أنحاء المملكة والخليج العربي.', 'The fifth annual physical therapy conference kicks off with the participation of more than 500 specialists from across the Kingdom and the Gulf.'),
      date: t('15 يناير 2024', 'January 15, 2024'),
      category: t('فعاليات', 'Events'),
      image: hero4,
      readTime: t('5 دقائق', '5 min read'),
      author: t('فريق التحرير', 'Editorial Team'),
    },
    {
      id: 2,
      title: t('إطلاق برنامج التعليم المستمر الجديد', 'Launch of New Continuing Education Program'),
      excerpt: t('أعلنت الجمعية عن إطلاق برنامج جديد للتعليم المستمر يهدف إلى تطوير مهارات الممارسين وتحديث معارفهم.', 'The association announced the launch of a new continuing education program aimed at developing practitioners skills and updating their knowledge.'),
      date: t('10 يناير 2024', 'January 10, 2024'),
      category: t('أخبار', 'News'),
      image: hero2,
      readTime: t('3 دقائق', '3 min read'),
      author: t('د. أحمد العتيبي', 'Dr. Ahmed Al-Otaibi'),
    },
    {
      id: 3,
      title: t('شراكة استراتيجية مع جامعة الملك سعود', 'Strategic Partnership with King Saud University'),
      excerpt: t('توقيع اتفاقية تعاون بين الجمعية وجامعة الملك سعود لتعزيز البحث العلمي وتبادل الخبرات الأكاديمية.', 'Signing a cooperation agreement between the association and King Saud University to enhance scientific research and exchange academic expertise.'),
      date: t('5 يناير 2024', 'January 5, 2024'),
      category: t('شراكات', 'Partnerships'),
      image: hero3,
      readTime: t('4 دقائق', '4 min read'),
      author: t('إدارة الشراكات', 'Partnerships Dept.'),
    },
    {
      id: 4,
      title: t('افتتاح فرع جديد في المنطقة الشرقية', 'Opening a New Branch in the Eastern Region'),
      excerpt: t('تم افتتاح فرع جديد للجمعية في المنطقة الشرقية لخدمة أعضاء المنطقة وتقديم الخدمات بشكل أقرب.', 'A new branch of the association was opened in the Eastern Region to serve members and provide services more closely.'),
      date: t('1 يناير 2024', 'January 1, 2024'),
      category: t('أخبار', 'News'),
      image: hero1,
      readTime: t('2 دقائق', '2 min read'),
      author: t('فريق التحرير', 'Editorial Team'),
    },
  ];

  const categories = [
    { name: t('الكل', 'All'), count: 24 },
    { name: t('أخبار', 'News'), count: 12 },
    { name: t('فعاليات', 'Events'), count: 6 },
    { name: t('شراكات', 'Partnerships'), count: 4 },
    { name: t('إعلانات', 'Announcements'), count: 2 },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-primary-foreground/80 font-medium text-lg mb-4 block">
              {t('المجلة العلمية', 'Scientific Journal')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t('آخر الأخبار والمقالات', 'Latest News & Articles')}
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              {t(
                'تابع أحدث الأخبار والفعاليات والمقالات العلمية في مجال العلاج الطبيعي',
                'Follow the latest news, events, and scientific articles in physical therapy'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-8">
                {newsItems.map((item, index) => (
                  <motion.article
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="news-card group"
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="news-card-image"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          {item.author}
                        </span>
                        <Link 
                          to={`/news/${item.id}`}
                          className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
                        >
                          {t('اقرأ المزيد', 'Read More')}
                          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  {t('عرض المزيد', 'Load More')}
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <motion.div
                data-aos="fade-left"
                className="bg-card rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {t('التصنيفات', 'Categories')}
                </h3>
                <div className="space-y-2">
                  {categories.map((cat, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <span className="text-foreground">{cat.name}</span>
                      <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                data-aos="fade-left"
                data-aos-delay="100"
                className="bg-primary rounded-2xl p-6 text-primary-foreground"
              >
                <h3 className="text-lg font-bold mb-4">
                  {t('اشترك في النشرة', 'Subscribe to Newsletter')}
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  {t('احصل على آخر الأخبار في بريدك', 'Get the latest news in your inbox')}
                </p>
                <input
                  type="email"
                  placeholder={t('بريدك الإلكتروني', 'Your email')}
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 mb-3"
                />
                <Button variant="secondary" className="w-full">
                  {t('اشتراك', 'Subscribe')}
                </Button>
              </motion.div>

              {/* Share */}
              <motion.div
                data-aos="fade-left"
                data-aos-delay="200"
                className="bg-card rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {t('شارك', 'Share')}
                </h3>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Linkedin].map((Icon, index) => (
                    <button
                      key={index}
                      className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewsPage;
