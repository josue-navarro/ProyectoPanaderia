'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuthContext } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Croissant, ListOrdered, Sparkles, ArrowRight } from 'lucide-react';
import { LanguageContext } from '@/components/language-provider';

export default function DashboardPage() {
  const { role } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

  const CustomerDashboard = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{t('dashboard_customer_welcome_title')}</CardTitle>
            <CardDescription>{t('dashboard_customer_welcome_desc')}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard_browse_products_title')}</CardTitle>
            <Croissant className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t('dashboard_browse_products_count')}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard_browse_products_desc')}</p>
            <Button asChild size="sm" className="mt-4">
              <Link href="/products">{t('shop_now')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard_your_orders_title')}</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t('dashboard_your_orders_count')}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard_your_orders_desc')}</p>
            <Button asChild size="sm" variant="secondary" className="mt-4">
              <Link href="/orders">{t('view_orders')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-accent text-accent-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard_ai_recs_title')}</CardTitle>
            <Sparkles className="h-4 w-4 text-accent-foreground/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t('dashboard_ai_recs_count')}</div>
            <p className="text-xs text-accent-foreground/70">{t('dashboard_ai_recs_desc')}</p>
             <Button asChild size="sm" variant="outline" className="mt-4 bg-background/20 border-accent-foreground/50 hover:bg-background/30">
              <Link href="/recommendations">{t('get_suggestions')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
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

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          <span className="capitalize">{t(`role_${role}`)}</span> {t('dashboard')}
        </h2>
      </div>
      {role === 'customer' ? <CustomerDashboard /> : <StaffDashboard />}
    </div>
  );
}
