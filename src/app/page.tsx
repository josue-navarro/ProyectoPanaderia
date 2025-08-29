
'use client';

import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/components/auth-provider';
import { Croissant, Languages, Check, Eye, EyeOff } from 'lucide-react';
import { LanguageContext } from '@/components/language-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000); // Oculta el error después de 5 segundos
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async () => {
    setError('');
    try {
      const success = await login(username, password);
      if (success) {
        router.push('/dashboard');
      } else {
        const errorMessage = t('invalid_credentials');
        setError(errorMessage);
        setUsername('');
        setPassword('');
        usernameInputRef.current?.focus();
      }
    } catch (err: any) {
      setError(err.message);
      setUsername('');
      setPassword('');
      usernameInputRef.current?.focus();
    }
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
          <CardDescription>{t('login_enter_credentials')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
             <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="username">{t('username')}</Label>
            <Input 
              id="username" 
              ref={usernameInputRef}
              type="text" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('password')}</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
           <Button onClick={handleLogin} className="w-full">
              {t('sign_in')}
            </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-xs text-muted-foreground">{t('no_account')}</p>
          <Button asChild variant="link" size="sm">
              <Link href="/signup">{t('create_account_button')}</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
