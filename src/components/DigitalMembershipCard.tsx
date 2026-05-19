import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Download, 
  Share2,
  QrCode,
  Crown,
  Users,
  GraduationCap,
  Star,
  Sparkles,
  Printer,
  FileImage,
  FileText
} from 'lucide-react';

interface MemberData {
  fullName: string;
  fullNameEn: string;
  membershipNumber: string;
  membershipType: "active" | "affiliate" | "student" | "intern";
  expiryDate: string;
  workplace: string;
  workplaceEn: string;
  profileImage?: string;
}

interface CardStyle {
  id: string;
  name: string;
  nameAr: string;
  gradient: string;
  pattern: string;
  textColor: string;
}

const cardStyles: CardStyle[] = [
  {
    id: 'royal',
    name: 'Royal Navy',
    nameAr: 'الملكي',
    gradient: 'from-primary via-primary to-primary',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    textColor: 'text-white',
  },
  {
    id: 'emerald',
    name: 'Emerald Premium',
    nameAr: 'الزمردي',
    gradient: 'from-emerald-800 via-emerald-700 to-teal-600',
    pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/svg%3E")`,
    textColor: 'text-white',
  },
  {
    id: 'gold',
    name: 'Gold Elite',
    nameAr: 'الذهبي',
    gradient: 'from-amber-700 via-yellow-600 to-amber-500',
    pattern: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    textColor: 'text-white',
  },
  {
    id: 'modern',
    name: 'Modern Glass',
    nameAr: 'العصري',
    gradient: 'from-slate-900 via-slate-800 to-slate-700',
    pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    textColor: 'text-white',
  },
];

const membershipIcons = {
  active: Crown,
  affiliate: Users,
  student: GraduationCap,
  intern: Star,
};

const membershipLabels = {
  active: { ar: "عضو عامل", en: "Active Member" },
  affiliate: { ar: "عضو منتسب", en: "affiliate Member" },
  student: { ar: "طالب", en: "Student" },
  intern: { ar: "طالب امتياز", en: "Intern Student" },
};

interface DigitalMembershipCardProps {
  member: MemberData;
  showControls?: boolean;
  showSignature?: boolean;
  showStamp?: boolean;
  onStyleChange?: (styleId: string) => void;
}

const DigitalMembershipCard = ({
  member,
  showControls = false,
  showSignature = true,
  showStamp = true,
  onStyleChange,
}: DigitalMembershipCardProps) => {
  const { t, isRTL } = useLanguage();
  const [selectedStyle, setSelectedStyle] = useState(cardStyles[0]);
  const [isFlipped, setIsFlipped] = useState(false);

  const Icon = membershipIcons[member.membershipType];
  const membershipLabel = membershipLabels[member.membershipType];

  const handleStyleChange = (style: CardStyle) => {
    setSelectedStyle(style);
    onStyleChange?.(style.id);
  };

  return (
    <div className="space-y-6">
      {/* Style Selector */}
      {showControls && (
        <div className="flex flex-wrap justify-center gap-3">
          {cardStyles.map((style) => (
            <Button
              key={style.id}
              variant={selectedStyle.id === style.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStyleChange(style)}
              className="gap-2"
            >
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${style.gradient}`} />
              {t(style.nameAr, style.name)}
            </Button>
          ))}
        </div>
      )}

      {/* Card Container */}
      <div 
        className="perspective-1000 mx-auto cursor-pointer"
        style={{ maxWidth: '420px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="relative preserve-3d transition-transform duration-700"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Side */}
          <div 
            className={`relative w-full aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${selectedStyle.gradient} ${selectedStyle.textColor}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{ backgroundImage: selectedStyle.pattern }}
            />
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 h-full p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold opacity-90">
                    {t('الجمعية السعودية للعلاج الطبيعي', 'SPTA')}
                  </h3>
                  <p className="text-sm opacity-70">
                    {t('Saudi Physical Therapy Association', 'Saudi Physical Therapy Association')}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Member Info */}
              <div className="flex-1 flex items-center gap-4 my-4">
                {/* Profile Image */}
                <div className="w-20 h-20 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold overflow-hidden border-2 border-white/30">
                  {member.profileImage ? (
                    <img src={member.profileImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    member.fullName.charAt(0)
                  )}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">
                    {t(member.fullName, member.fullNameEn)}
                  </h2>
                  <p className="text-sm opacity-80 mb-2">
                    {t(member.workplace, member.workplaceEn)}
                  </p>
                  <Badge className="bg-white/20 text-current border-white/30 gap-1">
                    <Icon className="w-3 h-3" />
                    {t(membershipLabel.ar, membershipLabel.en)}
                  </Badge>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs opacity-60 mb-1">{t('رقم العضوية', 'Membership No.')}</p>
                  <p className="font-mono font-bold tracking-wider">{member.membershipNumber}</p>
                </div>
                <div className="text-end">
                  <p className="text-xs opacity-60 mb-1">{t('صالحة حتى', 'Valid Until')}</p>
                  <p className="font-bold">
                    {new Date(member.expiryDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })}
                  </p>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="absolute top-4 end-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-1 bg-green-accent/90 text-white px-2 py-1 rounded-full text-xs font-medium"
                >
                  <CheckCircle className="w-3 h-3" />
                  {t('موثق', 'Verified')}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div 
            className={`absolute inset-0 w-full aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${selectedStyle.gradient} ${selectedStyle.textColor}`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div 
              className="absolute inset-0 opacity-50"
              style={{ backgroundImage: selectedStyle.pattern }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
            
            <div className="relative z-10 h-full p-6 flex flex-col items-center justify-center">
              {/* QR Code Placeholder */}
              <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <QrCode className="w-24 h-24 text-navy-dark" />
              </div>
              
              <p className="text-sm opacity-80 text-center mb-4">
                {t('امسح للتحقق من صحة العضوية', 'Scan to verify membership')}
              </p>

              {/* Signature & Stamp */}
              <div className="flex items-center gap-8">
                {showSignature && (
                  <div className="text-center">
                    <div className="h-8 mb-1 font-cursive text-lg italic opacity-80">
                      {t('التوقيع', 'Signature')}
                    </div>
                    <div className="w-24 h-0.5 bg-current opacity-40" />
                    <p className="text-xs opacity-60 mt-1">{t('رئيس الجمعية', 'President')}</p>
                  </div>
                )}
                
                {showStamp && (
                  <div className="w-16 h-16 rounded-full border-2 border-current opacity-40 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Click hint */}
      <p className="text-center text-sm text-muted-foreground">
        {t('اضغط على البطاقة لقلبها', 'Click the card to flip it')}
      </p>

      {/* Action Buttons */}
      {/* {showControls && (
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => window.print()}>
            <Printer className="w-4 h-4" />
            {t('طباعة', 'Print')}
          </Button>
          <Button variant="outline" className="gap-2">
            <FileImage className="w-4 h-4" />
            {t('تحميل كصورة', 'Download Image')}
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            {t('تحميل PDF', 'Download PDF')}
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default DigitalMembershipCard;
