import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthHeroProps {
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
}

const AuthHero = ({ titleAr, titleEn, subtitleAr, subtitleEn }: AuthHeroProps) => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-[hsl(var(--brand-teal))] to-[hsl(var(--brand-midnight))] py-16 pt-28">
      {/* Abstract shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white mb-3"
        >
          {t(titleAr, titleEn)}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/80 text-lg max-w-lg mx-auto"
        >
          {t(subtitleAr, subtitleEn)}
        </motion.p>
      </div>
    </div>
  );
};

export default AuthHero;
