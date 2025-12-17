import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Users, BookOpen, Award, Building2, 
  GraduationCap, FileText, Database, Microscope, ArrowRight, 
  Heart, Target, Lightbulb, Globe2, Calendar, Smartphone
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

// Import hero images
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';
import hero4 from '@/assets/hero-4.jpg';
import BranchesSection from '@/components/BranchesSection';
const HomePage = () => {
  const { t, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: hero3,
      title: t('الجمعية السعودية للعلاج الطبيعي', 'Saudi Physical Therapy Association'),
      subtitle: t('نحو تطوير مهنة العلاج الطبيعي في المملكة', 'Advancing Physical Therapy in Saudi Arabia'),
      cta: t('انضم إلينا', 'Join Us'),
    },
    {
      image: hero2,
      title: t('المكتبة الإلكترونية', 'Digital Library'),
      subtitle: t('وصول مجاني لأحدث المراجع والأبحاث العلمية', 'Free access to the latest references and research'),
      cta: t('استكشف المكتبة', 'Explore Library'),
    },
    {
      image: hero3,
      title: t('البحث العلمي', 'Scientific Research'),
      subtitle: t('قواعد بيانات متقدمة وأدوات بحثية متخصصة', 'Advanced databases and specialized research tools'),
      cta: t('ابدأ البحث', 'Start Research'),
    },
    {
      image: hero4,
      title: t('المؤتمرات والفعاليات', 'Conferences & Events'),
      subtitle: t('انضم لمجتمع العلاج الطبيعي في المملكة', 'Join the Physical Therapy community'),
      cta: t('عرض الفعاليات', 'View Events'),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const stats = [
    { number: '5000+', label: t('عضو مسجل', 'Registered Members'), icon: Users },
    { number: '200+', label: t('بحث علمي', 'Scientific Research'), icon: BookOpen },
    { number: '50+', label: t('شراكة', 'Partnerships'), icon: Award },
    { number: '13', label: t('فرع إقليمي', 'Regional Branches'), icon: Building2 },
  ];

  const researchCards = [
    {
      icon: Microscope,
      title: t('الممارسة المبنية على الأدلة', 'Evidence-Based Practice'),
      description: t('تعرف على منهجية الممارسة المبنية على الأدلة العلمية', 'Learn the methodology of evidence-based practice'),
      link: '/research/ebp',
    },
    {
      icon: Database,
      title: t('قواعد البيانات', 'Research Databases'),
      description: t('الوصول إلى قواعد بيانات عالمية مثل PubMed و Cochrane', 'Access global databases like PubMed and Cochrane'),
      link: '/research/databases',
    },
    {
      icon: FileText,
      title: t('إرشادات البحث', 'Research Guidelines'),
      description: t('دليلك الشامل لكتابة ونشر الأبحاث العلمية', 'Your comprehensive guide to writing and publishing research'),
      link: '/research/guidelines',
    },
  ];

  const newsItems = [
    {
      id: 1,
      title: t('المؤتمر السنوي للعلاج الطبيعي 2024', 'Annual Physical Therapy Conference 2024'),
      date: t('15 يناير 2024', 'January 15, 2024'),
      category: t('فعاليات', 'Events'),
      image: hero4,
    },
    {
      id: 2,
      title: t('إطلاق برنامج التعليم المستمر', 'Launch of Continuing Education Program'),
      date: t('10 يناير 2024', 'January 10, 2024'),
      category: t('أخبار', 'News'),
      image: hero2,
    },
    {
      id: 3,
      title: t('شراكة جديدة مع جامعة الملك سعود', 'New Partnership with King Saud University'),
      date: t('5 يناير 2024', 'January 5, 2024'),
      category: t('شراكات', 'Partnerships'),
      image: hero3,
    },
  ];

  const paths = [
    { icon: GraduationCap, title: t('التعليم', 'Education'), color: 'bg-blue-primary' },
    { icon: Heart, title: t('الصحة', 'Health'), color: 'bg-accent' },
    { icon: Target, title: t('البحث', 'Research'), color: 'bg-navy' },
    { icon: Lightbulb, title: t('الابتكار', 'Innovation'), color: 'bg-blue-medium' },
    { icon: Globe2, title: t('الشراكات', 'Partnerships'), color: 'bg-blue-light' },
    { icon: Calendar, title: t('الفعاليات', 'Events'), color: 'bg-navy-light' },
  ];

  return (
    <Layout>
      {/* Hero Section with Slider */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
              </motion.div>
            )
          ))}
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-center">
          <div className="container-custom">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className={`max-w-3xl ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl md:text-2xl text-primary-foreground/90 mb-10"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex gap-4 flex-wrap"
                >
                  <Button size="lg" className="btn-hero gap-2 text-lg">
                    {heroSlides[currentSlide].cta}
                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                  <Button size="lg" variant="outline" className="btn-hero-outline text-lg">
                    {t('اعرف المزيد', 'Learn More')}
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
          >
            {isRTL ? <ChevronRight className="w-6 h-6 text-primary-foreground" /> : <ChevronLeft className="w-6 h-6 text-primary-foreground" />}
          </button>
          <div className="flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide ? 'w-10 bg-primary-foreground' : 'w-2 bg-primary-foreground/40'
                }`}
              />
            ))}
          </div>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
          >
            {isRTL ? <ChevronLeft className="w-6 h-6 text-primary-foreground" /> : <ChevronRight className="w-6 h-6 text-primary-foreground" />}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <span className="text-accent font-semibold text-lg mb-4 block">
                {t('من نحن', 'About Us')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t('الجمعية السعودية للعلاج الطبيعي', 'Saudi Physical Therapy Association')}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t(
                  'تأسست الجمعية السعودية للعلاج الطبيعي بهدف تطوير مهنة العلاج الطبيعي في المملكة العربية السعودية، وتعزيز البحث العلمي والممارسة المبنية على الأدلة، وتوفير فرص التعليم المستمر للممارسين.',
                  'The Saudi Physical Therapy Association was established to develop the physical therapy profession in Saudi Arabia, promote scientific research and evidence-based practice, and provide continuing education opportunities for practitioners.'
                )}
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t(
                  'نسعى لتحقيق رؤية المملكة 2030 من خلال رفع مستوى الخدمات الصحية وتأهيل الكوادر الوطنية المتخصصة في مجال العلاج الطبيعي.',
                  'We strive to achieve Saudi Vision 2030 by raising the level of healthcare services and qualifying national cadres specialized in physical therapy.'
                )}
              </p>
              <Link to="/about">
                <Button className="gap-2" size="lg">
                  {t('اقرأ المزيد', 'Read More')}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
            </div>
            <div className="relative" data-aos="fade-left" data-aos-delay="200">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={hero4} 
                  alt={t('العلاج الطبيعي', 'Physical Therapy')}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-8 -right-8 bg-accent text-accent-foreground p-6 rounded-2xl shadow-lg"
              >
                <span className="text-4xl font-bold block">25+</span>
                <span className="text-sm">{t('سنة من الخبرة', 'Years of Experience')}</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                  <stat.icon className="w-8 h-8" />
                </div>
                <motion.span 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                  className="text-4xl md:text-5xl font-bold block mb-2"
                >
                  {stat.number}
                </motion.span>
                <span className="text-primary-foreground/80">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Education Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t('البحث والتعليم', 'Research & Education')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('أدوات البحث العلمي', 'Scientific Research Tools')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                'نوفر لك مجموعة شاملة من الأدوات والموارد لدعم بحثك العلمي',
                'We provide you with a comprehensive set of tools and resources to support your scientific research'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {researchCards.map((card, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -10 }}
                className="bg-card rounded-2xl p-8 shadow-md card-hover group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <card.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{card.title}</h3>
                <p className="text-muted-foreground mb-6">{card.description}</p>
                <Link 
                  to={card.link} 
                  className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
                >
                  {t('اكتشف المزيد', 'Discover More')}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12" data-aos="fade-up">
            <div>
              <span className="text-accent font-semibold text-lg mb-4 block">
                {t('آخر الأخبار', 'Latest News')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('أحدث المقالات والفعاليات', 'Latest Articles & Events')}
              </h2>
            </div>
            <Link to="/news">
              <Button variant="outline" className="gap-2 mt-4 md:mt-0">
                {t('عرض الكل', 'View All')}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                  <span className="text-muted-foreground text-sm mb-3 block">{item.date}</span>
                  <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <Link 
                    to={`/news/${item.id}`} 
                    className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
                  >
                    {t('اقرأ المزيد', 'Read More')}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Paths Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t('مساراتنا', 'Our Paths')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('مجالات عملنا', 'Our Areas of Work')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {paths.map((path, index) => (
              <motion.div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 50}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-card rounded-2xl p-6 text-center shadow-sm card-hover cursor-pointer group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <path.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{path.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t('حمّل تطبيق SPTA', 'Download SPTA App')}
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                {t(
                  'احصل على جميع خدمات الجمعية في جيبك. تطبيق سهل الاستخدام يوفر لك الوصول السريع للمكتبة الإلكترونية والأخبار والفعاليات.',
                  'Get all association services in your pocket. An easy-to-use app that gives you quick access to the digital library, news, and events.'
                )}
              </p>
              <div className="flex gap-4 flex-wrap">
                <a 
                  href="#" 
                  className="flex items-center gap-3 bg-primary-foreground text-primary px-6 py-3 rounded-xl hover:bg-primary-foreground/90 transition-colors"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-xs block opacity-80">{t('متوفر على', 'Download on')}</span>
                    <span className="font-semibold">App Store</span>
                  </div>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 bg-primary-foreground text-primary px-6 py-3 rounded-xl hover:bg-primary-foreground/90 transition-colors"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 01-.109-.531V2.344a1.5 1.5 0 01.108-.53zm10.89 9.479l2.708-2.708 5.904 3.349c.476.27.476.932 0 1.201l-5.904 3.35-2.708-2.708L12 12l2.5-.707zM4.4.935l8.676 8.677 2.708-2.708L5.502.238A1.5 1.5 0 004.4.935zm8.676 12.453L4.4 23.065a1.5 1.5 0 001.102.697l10.282-6.666-2.708-2.708z"/>
                  </svg>
                  <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-xs block opacity-80">{t('متوفر على', 'Get it on')}</span>
                    <span className="font-semibold">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex justify-center" data-aos="fade-left" data-aos-delay="200">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-64 h-[500px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-primary-foreground rounded-[2.5rem] overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-b-2xl" />
                    <div className="pt-10 px-4">
                      <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center mb-4">
                        <span className="text-primary-foreground font-bold text-2xl">S</span>
                      </div>
                      <p className="text-center text-foreground font-bold text-lg">SPTA</p>
                      <p className="text-center text-muted-foreground text-sm">{t('الجمعية السعودية', 'Saudi Physical')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <BranchesSection />

      {/* Map Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t('موقعنا', 'Our Location')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('تواصل معنا', 'Get in Touch')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('نرحب بزيارتكم في مقر الجمعية بمدينة الرياض', 'We welcome your visit to the association headquarters in Riyadh')}
            </p>
          </div>
          <div data-aos="zoom-in" className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674714456827!2d46.6752957!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sKing%20Saud%20University!5e0!3m2!1sen!2ssa!4v1702000000000!5m2!1sen!2ssa"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SPTA Location"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
