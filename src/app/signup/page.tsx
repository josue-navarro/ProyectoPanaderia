
'use client';

import { Suspense, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthContext, UserRole } from '@/components/auth-provider';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { LanguageContext } from '@/components/language-provider';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { stores } from '@/lib/data';
import type { Store } from '@/lib/types';


function SignupForm() {
    const { user, signup } = useContext(AuthContext);
    const { t } = useContext(LanguageContext);
    const router = useRouter();
    const { toast } = useToast();

    const [role, setRole] = useState<UserRole | ''>('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedStoreId, setSelectedStoreId] = useState('');

    const availableStores = stores.filter(store => !users.some(u => u.storeId === store.id));

    const validatePassword = (pass: string) => {
        const hasUpperCase = /[A-Z]/.test(pass);
        const hasLowerCase = /[a-z]/.test(pass);
        const hasNumber = /\d/.test(pass);
        return pass.length >= 8 && hasUpperCase && hasLowerCase && hasNumber;
    }
    
    // Determine the title based on whether a user (superAdmin) is logged in
    const pageTitle = user?.role === 'superAdmin' ? t('nav_manage_admins') : t('signup_title');
    const pageDescription = user?.role === 'superAdmin' ? t('admin_users_description') : t('signup_desc');


    const handleSignup = async () => {
        setError('');

        const selectedRole = user?.role === 'superAdmin' ? 'admin' : 'customer';

        if (user?.role === 'superAdmin' && !selectedStoreId) {
             setError(t('store_is_required'));
             return;
        }
        if (!selectedRole) {
            setError(t('role_is_required'));
            return;
        }
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
            const selectedStore = stores.find(s => s.id === selectedStoreId);

            const success = await signup({
                fullName,
                email,
                phone,
                username,
                password,
                role: selectedRole,
                storeId: selectedStore?.id,
                storeName: selectedStore?.name
            });

            if (success) {
                toast({
                  title: t('signup_success'),
                  description: t('signup_success_desc'),
                });
                if (user?.role === 'superAdmin') {
                    router.push('/users');
                } else {
                    router.push('/');
                }
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

    const isSuperAdminCreatingAdmin = user?.role === 'superAdmin';
    const noStoresAvailable = isSuperAdminCreatingAdmin && availableStores.length === 0;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
             <Card className="w-full max-w-md shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">{pageTitle}</CardTitle>
                    <CardDescription>{pageDescription}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {isSuperAdminCreatingAdmin && (
                         <>
                            {noStoresAvailable ? (
                                <Alert>
                                    <AlertDescription>
                                        {t('no_stores_available_warning')}
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <div className="grid gap-2">
                                    <Label htmlFor="store">{t('assign_store')}</Label>
                                    <Select onValueChange={setSelectedStoreId} value={selectedStoreId} disabled={noStoresAvailable}>
                                        <SelectTrigger id="store">
                                            <SelectValue placeholder={t('select_store_placeholder')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableStores.map(store => (
                                                <SelectItem key={store.id} value={store.id}>
                                                    {store.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="fullName">{t('full_name')}</Label>
                        <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required disabled={noStoresAvailable} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('email')}</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={noStoresAvailable} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">{t('phone_number_optional')}</Label>
                        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={noStoresAvailable} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">{t('username')}</Label>
                        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={noStoresAvailable} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">{t('password')}</Label>
                        <div className="relative">
                            <Input 
                                id="password" 
                                type={showPassword ? 'text' : 'password'} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                disabled={noStoresAvailable}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={noStoresAvailable}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">{t('confirm_password')}</Label>
                        <div className="relative">
                            <Input 
                                id="confirmPassword" 
                                type={showConfirmPassword ? 'text' : 'password'} 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                                disabled={noStoresAvailable}
                            />
                             <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                disabled={noStoresAvailable}
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                    <Button onClick={handleSignup} className="w-full" disabled={isSubmitting || noStoresAvailable}>
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
