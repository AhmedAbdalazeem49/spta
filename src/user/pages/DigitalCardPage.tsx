import { useEffect } from 'react';
import AOS from 'aos';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DigitalMembershipCard from '@/components/DigitalMembershipCard';
import { CreditCard, Shield, Smartphone, QrCode } from 'lucide-react';

// Mock member data
const mockMember = {
  fullName: 'د. أحمد محمد العتيبي',
  fullNameEn: 'Dr. Ahmed Mohammed Al-Otaibi',
  membershipNumber: 'SPTA-2024-00142',
  membershipType: 'active' as const,
  expiryDate: '2026-09-15',
  workplace: 'مستشفى الملك فيصل التخصصي',
  workplaceEn: 'King Faisal Specialist Hospital',
};

const features = [
  {
    icon: Shield,
    titleAr: 'آمنة وموثقة',
    titleEn: 'Secure & Verified',
    descAr: 'بطاقة رقمية مؤمنة برمز QR للتحقق الفوري',
    descEn: 'Digital card secured with QR code for instant verification',
  },
  {
    icon: Smartphone,
    titleAr: 'متاحة دائماً',
    titleEn: 'Always Available',
    descAr: 'احمل بطاقتك في جوالك في أي وقت وأي مكان',
    descEn: 'Carry your card on your phone anytime, anywhere',
  },
  {
    icon: QrCode,
    titleAr: 'تحقق فوري',
    titleEn: 'Instant Verification',
    descAr: 'امسح رمز QR للتحقق من صحة العضوية',
    descEn: 'Scan QR code to verify membership validity',
  },
];

const DigitalCardPage = () => {
  const { t } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <div data-aos="fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <CreditCard className="w-5 h-5 text-green-accent" />
              <span className="text-white text-sm font-medium">
                {t('بطاقة العضوية الرقمية', 'Digital Membership Card')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t('بطاقتك الرقمية', 'Your Digital Card')}
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              {t(
                'بطاقة عضوية رقمية احترافية يمكنك حملها في جوالك',
                'A professional digital membership card you can carry on your phone'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Card Preview Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto" data-aos="fade-up">
            <DigitalMembershipCard 
              member={mockMember}
              showControls={true}
              showSignature={true}
              showStamp={true}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
            {t('مميزات البطاقة الرقمية', 'Digital Card Features')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="card-hover text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-light flex items-center justify-center text-primary-foreground mx-auto mb-4 shadow-lg">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {t(feature.titleAr, feature.titleEn)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(feature.descAr, feature.descEn)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default DigitalCardPage;
