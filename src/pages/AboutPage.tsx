import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, Eye, CheckCircle, Users, Award, Building2, 
  Handshake, ArrowRight, Quote
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

const AboutPage = () => {
  const { t, isRTL } = useLanguage();

  const objectives = [
    t('تطوير مهنة العلاج الطبيعي في المملكة العربية السعودية', 'Develop the physical therapy profession in Saudi Arabia'),
    t('تعزيز البحث العلمي والممارسة المبنية على الأدلة', 'Promote scientific research and evidence-based practice'),
    t('توفير فرص التعليم المستمر للممارسين', 'Provide continuing education opportunities for practitioners'),
    t('بناء شراكات محلية وعالمية استراتيجية', 'Build strategic local and international partnerships'),
    t('رفع مستوى الوعي بأهمية العلاج الطبيعي', 'Raise awareness about the importance of physical therapy'),
    t('دعم الكوادر الوطنية المتخصصة', 'Support specialized national cadres'),
  ];

  const council = [
    { name: t('د. أحمد الشهراني', 'Dr. Ahmed Al-Shahrani'), role: t('رئيس مجلس الإدارة', 'Chairman of the Board'), image: hero1 },
    { name: t('د. فاطمة القحطاني', 'Dr. Fatima Al-Qahtani'), role: t('نائب الرئيس', 'Vice Chairman'), image: hero2 },
    { name: t('د. محمد العتيبي', 'Dr. Mohammed Al-Otaibi'), role: t('أمين عام الجمعية', 'Secretary General'), image: hero3 },
  ];

  const partners = [
    { name: t('جامعة الملك سعود', 'King Saud University'), type: t('أكاديمي', 'Academic') },
    { name: t('وزارة الصحة', 'Ministry of Health'), type: t('حكومي', 'Government') },
    { name: t('الهيئة السعودية للتخصصات الصحية', 'Saudi Commission for Health Specialties'), type: t('تنظيمي', 'Regulatory') },
    { name: t('الاتحاد العالمي للعلاج الطبيعي', 'World Physiotherapy'), type: t('دولي', 'International') },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-primary">
        <div className="absolute inset-0">
          <img src={hero2} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        </div>
        <div className="container-custom relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`max-w-3xl ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <span className="text-primary-foreground/80 font-medium text-lg mb-4 block">
              {t('من نحن', 'About Us')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t('الجمعية السعودية للعلاج الطبيعي', 'Saudi Physical Therapy Association')}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              {t(
                'نعمل على تطوير مهنة العلاج الطبيعي وتعزيز البحث العلمي منذ أكثر من 25 عاماً',
                'We have been working to develop the physical therapy profession and promote scientific research for over 25 years'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              data-aos="fade-right"
              className="bg-card rounded-2xl p-8 shadow-md card-hover"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('الرؤية', 'Vision')}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  'أن نكون المرجع الأول في تطوير مهنة العلاج الطبيعي في المملكة العربية السعودية والشرق الأوسط، وتحقيق التميز في البحث العلمي والممارسة السريرية.',
                  'To be the leading reference in developing the physical therapy profession in Saudi Arabia and the Middle East, achieving excellence in scientific research and clinical practice.'
                )}
              </p>
            </motion.div>

            <motion.div
              data-aos="fade-left"
              data-aos-delay="100"
              className="bg-card rounded-2xl p-8 shadow-md card-hover"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('الرسالة', 'Mission')}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  'تعزيز مهنة العلاج الطبيعي من خلال التعليم المستمر والبحث العلمي والممارسة المبنية على الأدلة، وبناء مجتمع مهني متكامل يخدم الصحة العامة.',
                  'Enhance the physical therapy profession through continuing education, scientific research, and evidence-based practice, building an integrated professional community serving public health.'
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t('أهدافنا', 'Our Goals')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('نسعى لتحقيق', 'We Strive to Achieve')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 bg-card rounded-xl p-6 shadow-sm card-hover"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground font-medium">{objective}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t('القيادة', 'Leadership')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('المجلس الحالي', 'Current Council')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('فريق من القادة المتميزين الملتزمين بتطوير المهنة', 'A team of distinguished leaders committed to developing the profession')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {council.map((member, index) => (
              <motion.div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            data-aos="fade-up"
            className="max-w-4xl mx-auto text-center"
          >
            <Quote className="w-16 h-16 mx-auto mb-8 opacity-50" />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
              {t(
                'نؤمن بأن العلاج الطبيعي هو ركيزة أساسية في منظومة الرعاية الصحية، ونعمل جاهدين لتحقيق رؤية المملكة 2030 في قطاع الصحة.',
                'We believe that physical therapy is a fundamental pillar of the healthcare system, and we work diligently to achieve the Kingdom Vision 2030 in the health sector.'
              )}
            </p>
            <div>
              <p className="font-bold text-lg">{t('د. أحمد الشهراني', 'Dr. Ahmed Al-Shahrani')}</p>
              <p className="text-primary-foreground/80">{t('رئيس مجلس الإدارة', 'Chairman of the Board')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t('شركاؤنا', 'Our Partners')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('الشراكات والتعاون', 'Partnerships & Collaboration')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl p-6 text-center shadow-sm card-hover"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Handshake className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{partner.name}</h3>
                <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  {partner.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            data-aos="zoom-in"
            className="bg-primary rounded-3xl p-12 text-center text-primary-foreground"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('انضم إلى مجتمعنا', 'Join Our Community')}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t(
                'كن جزءاً من أكبر مجتمع للعلاج الطبيعي في المملكة العربية السعودية',
                'Be part of the largest physical therapy community in Saudi Arabia'
              )}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="gap-2">
                  {t('سجل الآن', 'Register Now')}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  {t('تواصل معنا', 'Contact Us')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
