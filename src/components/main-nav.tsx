'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/constants';
import { AuthContext } from './auth-provider';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LanguageContext } from './language-provider';

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { role } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

  const links = navLinks[role] || [];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <SidebarMenu>
        {links.map((link) => (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href} passHref>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                className="w-full justify-start"
                tooltip={t(link.label)}
              >
                <div>
                  <link.icon className="h-5 w-5" />
                  <span>{t(link.label)}</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}
