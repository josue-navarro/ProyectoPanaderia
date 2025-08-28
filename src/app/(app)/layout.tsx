'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { AuthContext } from '@/components/auth-provider';
import { LanguageContext } from '@/components/language-provider';
import { Croissant, LogOut } from 'lucide-react';
import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2" data-testid="sidebar-header">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Croissant className="h-5 w-5" />
            </div>
            <span className="text-lg font-headline font-semibold">Panadería Cloud</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={logout}>
            <LogOut className="h-5 w-5" />
            <span>{t('logout')}</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {/* Can add breadcrumbs or page title here */}
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
