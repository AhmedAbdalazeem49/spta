import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import sptaLogo from '@/assets/spta-logo.png';

const LoginPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isLogin ? t('تم تسجيل الدخول', 'Logged In') : t('تم إنشاء الحساب', 'Account Created'),
      description: isLogin 
        ? t('مرحباً بك مجدداً', 'Welcome back') 
        : t('يمكنك الآن تسجيل الدخول', 'You can now log in'),
    });
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = ['bg-destructive', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = [
    t('ضعيف', 'Weak'),
    t('مقبول', 'Fair'),
    t('جيد', 'Good'),
    t('قوي', 'Strong'),
  ];

  return (
    <Layout>
      <section className="min-h-screen pt-24 pb-16 flex items-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-3xl shadow-xl p-8 md:p-10"
            >
              {/* Logo */}
              <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-3 mb-6">
                  <img src={sptaLogo} alt="SPTA Logo" className="h-16 w-auto object-contain" />
                </Link>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {isLogin ? t('تسجيل الدخول', 'Sign In') : t('إنشاء حساب جديد', 'Create Account')}
                </h1>
                <p className="text-muted-foreground">
                  {isLogin 
                    ? t('مرحباً بعودتك! أدخل بياناتك للمتابعة', 'Welcome back! Enter your details to continue')
                    : t('انضم إلى مجتمع SPTA اليوم', 'Join the SPTA community today')
                  }
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 p-1 bg-secondary rounded-xl mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    isLogin ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t('تسجيل الدخول', 'Sign In')}
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    !isLogin ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t('حساب جديد', 'Sign Up')}
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('الاسم الكامل', 'Full Name')}
                    </label>
                    <div className="relative">
                      <User className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-5 h-5 text-muted-foreground`} />
                      <Input
                        required={!isLogin}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('أدخل اسمك الكامل', 'Enter your full name')}
                        className={`${isRTL ? 'pr-12' : 'pl-12'}`}
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('البريد الإلكتروني', 'Email')}
                  </label>
                  <div className="relative">
                    <Mail className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-5 h-5 text-muted-foreground`} />
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('أدخل بريدك الإلكتروني', 'Enter your email')}
                      className={`${isRTL ? 'pr-12' : 'pl-12'}`}
                    />
                  </div>
                </div>

                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('رقم الهاتف', 'Phone Number')}
                    </label>
                    <div className="relative">
                      <Phone className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-5 h-5 text-muted-foreground`} />
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('أدخل رقم هاتفك', 'Enter your phone number')}
                        className={`${isRTL ? 'pr-12' : 'pl-12'}`}
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('كلمة المرور', 'Password')}
                  </label>
                  <div className="relative">
                    <Lock className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-5 h-5 text-muted-foreground`} />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={t('أدخل كلمة المرور', 'Enter your password')}
                      className={`${isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} text-muted-foreground hover:text-foreground`}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  {!isLogin && formData.password && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3"
                    >
                      <div className="flex gap-1 mb-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-secondary'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t('قوة كلمة المرور:', 'Password strength:')} {strengthLabels[passwordStrength - 1] || t('ضعيف جداً', 'Very weak')}
                      </p>
                    </motion.div>
                  )}
                </div>

                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('تأكيد كلمة المرور', 'Confirm Password')}
                    </label>
                    <div className="relative">
                      <Lock className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-5 h-5 text-muted-foreground`} />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        required={!isLogin}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder={t('أعد إدخال كلمة المرور', 'Re-enter your password')}
                        className={`${isRTL ? 'pr-12' : 'pl-12'}`}
                      />
                    </div>
                  </motion.div>
                )}

                {isLogin && (
                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      {t('نسيت كلمة المرور؟', 'Forgot password?')}
                    </Link>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full gap-2">
                  {isLogin ? t('تسجيل الدخول', 'Sign In') : t('إنشاء الحساب', 'Create Account')}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-4 text-muted-foreground">
                    {t('أو', 'or')}
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full gap-3" type="button">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {t('المتابعة باستخدام Google', 'Continue with Google')}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
