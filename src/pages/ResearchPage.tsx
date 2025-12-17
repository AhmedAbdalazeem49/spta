import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Microscope, Database, FileText, BookOpen, Search, ArrowRight,
  CheckCircle, ExternalLink, Layers
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

import hero3 from '@/assets/hero-3.jpg';

const ResearchPage = () => {
  const { t, isRTL } = useLanguage();

  const ebpSteps = [
    {
      step: 1,
      title: t('صياغة السؤال البحثي', 'Formulate Research Question'),
      description: t('استخدام نموذج PICOS لصياغة سؤال واضح ومحدد', 'Use the PICOS model to formulate a clear and specific question'),
    },
    {
      step: 2,
      title: t('البحث عن الأدلة', 'Search for Evidence'),
      description: t('استخدام قواعد البيانات المتخصصة للبحث عن أفضل الأدلة المتاحة', 'Use specialized databases to search for the best available evidence'),
    },
    {
      step: 3,
      title: t('التقييم النقدي', 'Critical Appraisal'),
      description: t('تقييم جودة وموثوقية الأدلة المستخرجة', 'Evaluate the quality and reliability of the extracted evidence'),
    },
    {
      step: 4,
      title: t('التطبيق السريري', 'Clinical Application'),
      description: t('دمج الأدلة مع الخبرة السريرية وتفضيلات المريض', 'Integrate evidence with clinical expertise and patient preferences'),
    },
    {
      step: 5,
      title: t('التقييم والمتابعة', 'Evaluation & Follow-up'),
      description: t('تقييم النتائج والتحسين المستمر', 'Evaluate outcomes and continuous improvement'),
    },
  ];

  const databases = [
    { name: 'PubMed', description: t('قاعدة بيانات طبية شاملة', 'Comprehensive medical database'), url: '#' },
    { name: 'Cochrane Library', description: t('مراجعات منهجية وتحليلات تجميعية', 'Systematic reviews and meta-analyses'), url: '#' },
    { name: 'PEDro', description: t('قاعدة بيانات العلاج الطبيعي', 'Physical therapy database'), url: '#' },
    { name: 'ERIC', description: t('موارد التعليم والبحث', 'Education research resources'), url: '#' },
    { name: 'SIGN Guidelines', description: t('إرشادات سريرية معتمدة', 'Approved clinical guidelines'), url: '#' },
    { name: 'TRIP Database', description: t('بوابة البحث الإكلينيكي', 'Clinical research gateway'), url: '#' },
  ];

  const tools = [
    {
      icon: Layers,
      title: t('هرم الأدلة', 'Evidence Pyramid'),
      description: t('فهم مستويات الأدلة العلمية وترتيبها', 'Understanding scientific evidence levels'),
      link: '/research/pyramid',
    },
    {
      icon: Search,
      title: t('تقنيات البحث المتقدم', 'Advanced Search Techniques'),
      description: t('استراتيجيات البحث الفعال في قواعد البيانات', 'Effective database search strategies'),
      link: '/research/search-techniques',
    },
    {
      icon: FileText,
      title: t('قوالب PICOS', 'PICOS Templates'),
      description: t('قوالب جاهزة لصياغة أسئلة البحث', 'Ready templates for formulating research questions'),
      link: '/research/picos',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-primary">
        <div className="absolute inset-0">
          <img src={hero3} alt="" className="w-full h-full object-cover opacity-20" />
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
              {t('البحث والتعليم', 'Research & Education')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t('أدوات البحث العلمي', 'Scientific Research Tools')}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              {t(
                'مجموعة شاملة من الأدوات والموارد لدعم بحثك العلمي والممارسة المبنية على الأدلة',
                'A comprehensive set of tools and resources to support your scientific research and evidence-based practice'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* EBP Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <span className="text-accent font-semibold text-lg mb-4 block">
                {t('الممارسة المبنية على الأدلة', 'Evidence-Based Practice')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('ما هي الممارسة المبنية على الأدلة؟', 'What is Evidence-Based Practice?')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t(
                  'الممارسة المبنية على الأدلة هي نهج منهجي لاتخاذ القرارات السريرية يدمج بين أفضل الأدلة البحثية المتاحة والخبرة السريرية وتفضيلات المريض.',
                  'Evidence-based practice is a systematic approach to clinical decision-making that integrates the best available research evidence with clinical expertise and patient preferences.'
                )}
              </p>
              <Link to="/research/ebp">
                <Button className="gap-2" size="lg">
                  {t('اكتشف المزيد', 'Learn More')}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
            </div>

            <div data-aos="fade-left" data-aos-delay="200">
              <div className="space-y-4">
                {ebpSteps.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: isRTL ? -10 : 10 }}
                    className="flex items-start gap-4 bg-card rounded-xl p-5 shadow-sm card-hover"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Databases Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t('قواعد البيانات', 'Databases')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('قواعد البيانات العلمية', 'Scientific Databases')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                'وصول مباشر إلى أهم قواعد البيانات العلمية في مجال العلاج الطبيعي والطب',
                'Direct access to the most important scientific databases in physical therapy and medicine'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {databases.map((db, index) => (
              <motion.a
                key={index}
                href={db.url}
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-up"
                data-aos-delay={index * 50}
                whileHover={{ y: -5 }}
                className="group bg-card rounded-2xl p-6 shadow-sm card-hover block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {db.name}
                </h3>
                <p className="text-muted-foreground">{db.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Research Tools */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t('أدوات بحثية', 'Research Tools')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('أدوات مساعدة للباحثين', 'Helpful Tools for Researchers')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                whileHover={{ y: -10 }}
                className="bg-card rounded-2xl p-8 shadow-md card-hover group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <tool.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{tool.title}</h3>
                <p className="text-muted-foreground mb-6">{tool.description}</p>
                <Link 
                  to={tool.link} 
                  className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
                >
                  {t('استكشف', 'Explore')}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div data-aos="zoom-in" className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('هل تحتاج مساعدة في بحثك؟', 'Need Help with Your Research?')}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              {t(
                'فريقنا المتخصص جاهز لمساعدتك في رحلتك البحثية',
                'Our specialized team is ready to help you in your research journey'
              )}
            </p>
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="gap-2">
                {t('تواصل معنا', 'Contact Us')}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ResearchPage;
