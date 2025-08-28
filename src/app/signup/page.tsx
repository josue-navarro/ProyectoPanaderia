
'use client';

import { Suspense, useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthContext, UserRole } from '@/components/auth-provider';
import { Croissant, Languages, Check, ArrowLeft } from 'lucide-react';
import { LanguageContext } from '@/components/language-provider';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

function SignupForm() {
    const { signup } = useContext(AuthContext);
    const { t } = useContext(LanguageContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const role = (searchParams.get('role') as UserRole) || 'customer';

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validatePassword = (pass: string) => {
        const hasUpperCase = /[A-Z]/.test(pass);
        const hasLowerCase = /[a-z]/.test(pass);
        const hasNumber = /\d/.test(pass);
        return pass.length >= 8 && hasUpperCase && hasLowerCase && hasNumber;
    }

    const handleSignup = async () => {
        setError('');
        if (password !== confirmPassword) {
            setError(t('passwords_do_not_match'));
            return;
        }
        if (!validatePassword(password)) {
            setError(t('password_requirements'));
            return;
        }

        setIsSubmitting(true);
        try {
            const success = await signup({
                fullName,
                email,
                phone,
                username,
                password,
                role
            });

            if (success) {
                toast({
                  title: t('signup_success'),
                  description: t('signup_success_desc'),
                });
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.message);
            toast({
                variant: "destructive",
                title: t('signup_failed'),
                description: err.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
             <Card className="w-full max-w-md shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">{t('signup_title')}</CardTitle>
                    <CardDescription>{t('signup_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="fullName">{t('full_name')}</Label>
                        <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('email')}</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">{t('phone_number_optional')}</Label>
                        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">{t('username')}</Label>
                        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">{t('password')}</Label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">{t('confirm_password')}</Label>
                        <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <Button onClick={handleSignup} className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? t('creating_account') : t('create_account')}
                    </Button>
                </CardContent>
                 <CardFooter className="flex justify-center">
                    <Button asChild variant="link" size="sm">
                      <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> {t('back_to_login')}</Link>
                    </Button>
                </CardFooter>
             </Card>
        </main>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
        </Suspense>
    )
}
