'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext, UserRole } from '@/components/auth-provider';
import { Croissant } from 'lucide-react';

export default function LoginPage() {
  const { setRole } = useContext(AuthContext);
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
        <p className="text-lg text-muted-foreground">The finest baked goods, now in the cloud.</p>
      </div>
      <Card className="w-full max-w-sm mt-12 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Select a role to sign in to your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button onClick={() => handleLogin('customer')} className="w-full">
              Sign in as Customer
            </Button>
            <Button onClick={() => handleLogin('employee')} variant="secondary" className="w-full">
              Sign in as Employee
            </Button>
            <Button onClick={() => handleLogin('admin')} variant="outline" className="w-full">
              Sign in as Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
