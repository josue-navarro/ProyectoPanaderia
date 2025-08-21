'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext, UserRole } from '@/components/auth-provider';
import { Croissant } from 'lucide-react';
import { LanguageContext } from '@/components/language-provider';

export default function LoginPage() {
  const { setRole } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const router = useRouter();

  const handleLogin = (role: UserRole) => {
    setRole(role);
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center space-x-2 text-primary">
          <Croissant className="h-12 w-12" />
          <h1 className="text-5xl font-headline font-bold">Panadería Cloud</h1>
        </div>
        <p className="text-lg text-muted-foreground">{t('app_subtitle')}</p>
      </div>
      <Card className="w-full max-w-sm mt-12 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{t('login_welcome_back')}</CardTitle>
          <CardDescription>{t('login_select_role')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button onClick={() => handleLogin('customer')} className="w-full">
              {t('sign_in_as')} {t('role_customer')}
            </Button>
            <Button onClick={() => handleLogin('employee')} variant="secondary" className="w-full">
               {t('sign_in_as')} {t('role_employee')}
            </Button>
            <Button onClick={() => handleLogin('admin')} variant="outline" className="w-full">
               {t('sign_in_as')} {t('role_admin')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
