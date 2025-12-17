import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Linkedin, 
  Instagram, MessageCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';

import hero4 from '@/assets/hero-4.jpg';

const ContactPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('تم الإرسال بنجاح', 'Message Sent Successfully'),
      description: t('سنتواصل معك قريباً', 'We will contact you soon'),
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('العنوان', 'Address'),
      details: t('الرياض، المملكة العربية السعودية', 'Riyadh, Saudi Arabia'),
      sub: t('جامعة الملك سعود', 'King Saud University'),
    },
    {
      icon: Phone,
      title: t('الهاتف', 'Phone'),
      details: '+966 XX XXX XXXX',
      sub: t('متاح 24/7', 'Available 24/7'),
    },
    {
      icon: Mail,
      title: t('البريد الإلكتروني', 'Email'),
      details: 'info@spta.org.sa',
      sub: t('سنرد خلال 24 ساعة', 'We reply within 24 hours'),
    },
    {
      icon: Clock,
      title: t('ساعات العمل', 'Working Hours'),
      details: t('الأحد - الخميس', 'Sunday - Thursday'),
      sub: t('8:00 ص - 4:00 م', '8:00 AM - 4:00 PM'),
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp', color: 'hover:bg-green-600' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-primary">
        <div className="absolute inset-0">
          <img src={hero4} alt="" className="w-full h-full object-cover opacity-20" />
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
              {t('تواصل معنا', 'Contact Us')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t('نحن هنا لمساعدتك', 'We Are Here to Help')}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              {t(
                'لا تتردد في التواصل معنا لأي استفسارات أو اقتراحات',
                'Do not hesitate to contact us for any inquiries or suggestions'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background -mt-16 relative z-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl p-6 shadow-lg card-hover text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{info.title}</h3>
                <p className="text-foreground font-medium">{info.details}</p>
                <p className="text-muted-foreground text-sm mt-1">{info.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              data-aos="fade-right"
              className="bg-card rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('أرسل لنا رسالة', 'Send Us a Message')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('الاسم الكامل', 'Full Name')} *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('أدخل اسمك', 'Enter your name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('البريد الإلكتروني', 'Email')} *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('أدخل بريدك الإلكتروني', 'Enter your email')}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('رقم الهاتف', 'Phone Number')}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('أدخل رقم هاتفك', 'Enter your phone')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('الموضوع', 'Subject')} *
                    </label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t('موضوع الرسالة', 'Message subject')}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('الرسالة', 'Message')} *
                  </label>
                  <Textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('اكتب رسالتك هنا...', 'Write your message here...')}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  <Send className="w-5 h-5" />
                  {t('إرسال الرسالة', 'Send Message')}
                </Button>
              </form>
            </motion.div>

            {/* Map & Social */}
            <div className="space-y-8">
              <motion.div
                data-aos="fade-left"
                className="rounded-2xl overflow-hidden shadow-lg h-[400px]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674714456827!2d46.6752957!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sKing%20Saud%20University!5e0!3m2!1sen!2ssa!4v1702000000000!5m2!1sen!2ssa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SPTA Location"
                />
              </motion.div>

              <motion.div
                data-aos="fade-left"
                data-aos-delay="100"
                className="bg-card rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {t('تابعنا على وسائل التواصل', 'Follow Us on Social Media')}
                </h3>
                <div className="flex gap-4 flex-wrap">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground transition-colors ${social.color} hover:text-primary-foreground`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
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

export default ContactPage;
