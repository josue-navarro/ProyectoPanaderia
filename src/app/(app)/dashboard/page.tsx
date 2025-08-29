'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { AuthContext } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { ListOrdered, ArrowRight } from 'lucide-react';
import { LanguageContext } from '@/components/language-provider';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

  const CustomerDashboard = () => (
    <>
      <div className="grid gap-6">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{t('dashboard_customer_welcome_title', { name: user!.fullName.split(' ')[0] })}</CardTitle>
            <CardDescription>{t('dashboard_customer_welcome_desc')}</CardDescription>
          </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
              <Image src="https://picsum.photos/seed/bread/600/400" alt="Freshly baked bread" width={600} height={400} className="rounded-t-lg object-cover aspect-[3/2]" data-ai-hint="baked bread"/>
            <CardHeader>
              <CardTitle className="font-headline">{t('nav_products')}</CardTitle>
              <CardDescription>{t('dashboard_browse_products_desc')}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href="/products">{t('shop_now')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
             <Image src="https://picsum.photos/seed/pastry/600/400" alt="A person tracking an order on a map" width={600} height={400} className="rounded-t-lg object-cover aspect-[3/2]" data-ai-hint="tracking order"/>
            <CardHeader>
              <CardTitle className="font-headline">{t('nav_my_orders')}</CardTitle>
              <CardDescription>{t('dashboard_your_orders_desc')}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild variant="secondary" className="w-full">
                <Link href="/orders">{t('view_orders')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col bg-accent text-accent-foreground">
             <Image src="https://picsum.photos/seed/ai/600/400" alt="Abstract representation of AI" width={600} height={400} className="rounded-t-lg object-cover aspect-[3/2]" data-ai-hint="artificial intelligence"/>
            <CardHeader>
              <CardTitle className="font-headline">{t('nav_for_you')}</CardTitle>
              <CardDescription className="text-accent-foreground/80">{t('dashboard_ai_recs_desc')}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild variant="outline" className="w-full bg-background/20 border-accent-foreground/50 hover:bg-background/30">
                <Link href="/recommendations">{t('get_suggestions')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );

  const StaffDashboard = () => (
     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{t('dashboard_staff_title')}</CardTitle>
            <CardDescription>{t('dashboard_staff_desc')}</CardDescription>
          </CardHeader>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard_active_orders_title')}</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">{t('dashboard_active_orders_desc')}</p>
          </CardContent>
        </Card>
     </div>
  );
  
  if (!user) {
    return null; // Or a loading indicator
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          <span className="capitalize">{t(`role_${user.role}`)}</span> {t('dashboard')}
        </h2>
      </div>
      {user.role === 'customer' ? <CustomerDashboard /> : <StaffDashboard />}
    </div>
  );
}
