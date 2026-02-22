import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has admin role
  const isAdmin = (user as any)?.role === 'admin' || (user as any)?.is_admin;
  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-3">{t('غير مصرح', 'Access Denied')}</h1>
            <p className="text-muted-foreground mb-6">
              {t('ليس لديك صلاحية للوصول إلى هذه الصفحة', 'You do not have permission to access this page')}
            </p>
            <Link to="/">
              <Button>{t('العودة للرئيسية', 'Go Home')}</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
