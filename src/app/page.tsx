'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext, UserRole } from '@/components/auth-provider';
import { Croissant, Languages, Check } from 'lucide-react';
import { LanguageContext } from '@/components/language-provider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';


export default function LoginPage() {
  const { setRole } = useContext(AuthContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogin = (role: UserRole) => {
    setRole(role);
    router.push('/dashboard');
  };

  const handleCreateAccount = (role: UserRole) => {
    setRole(role);
    setOpen(false);
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Languages className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('en')}>
              <Check className={cn("mr-2 h-4 w-4", language !== 'en' && 'opacity-0')} />
              <span>English</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('es')}>
              <Check className={cn("mr-2 h-4 w-4", language !== 'es' && 'opacity-0')} />
              <span>Español</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
        <CardFooter className="flex flex-col">
            <p className="text-xs text-muted-foreground mb-2">{t('no_account')}</p>
             <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="link" className="w-full">
                  {t('create_account_button')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="font-headline">{t('create_account_title')}</DialogTitle>
                  <DialogDescription>
                    {t('create_account_desc')}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                   <Button onClick={() => handleCreateAccount('customer')} className="w-full">
                      {t('create_account_as')} {t('role_customer')}
                    </Button>
                    <Button onClick={() => handleCreateAccount('employee')} variant="secondary" className="w-full">
                      {t('create_account_as')} {t('role_employee')}
                    </Button>
                </div>
              </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>
    </main>
  );
}
