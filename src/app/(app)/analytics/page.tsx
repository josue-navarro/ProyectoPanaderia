'use client';

import { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuthContext } from '@/components/auth-provider';
import { ListOrdered } from 'lucide-react';
import { LanguageContext } from '@/components/language-provider';

export default function AnalyticsPage() {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

  if (!user || user.role === 'customer') {
    return null; // Or a loading/unauthorized indicator
  }

  return (
     <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          {t('dashboard')}
        </h2>
      </div>
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
    </div>
  );
}
