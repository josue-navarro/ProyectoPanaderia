import { Croissant, LayoutGrid, ListOrdered, MapPin, Sparkles, Users, FileText, BarChart2, Languages } from 'lucide-react';
import type { UserRole } from '@/components/auth-provider';
import type { TranslationKey } from './translations';

export const navLinks: Record<UserRole, { href: string; label: TranslationKey; icon: React.ElementType }[]> = {
  customer: [
    { href: '/products', label: 'nav_products', icon: Croissant },
    { href: '/orders', label: 'nav_my_orders', icon: ListOrdered },
    { href: '/recommendations', label: 'nav_for_you', icon: Sparkles },
    { href: '/stores', label: 'nav_stores', icon: MapPin },
    { href: '/translate', label: 'translate_title', icon: Languages },
  ],
  employee: [
    { href: '/orders', label: 'nav_manage_orders', icon: ListOrdered },
  ],
  admin: [
    { href: '/products', label: 'nav_manage_products', icon: Croissant },
    { href: '/orders', label: 'nav_all_orders', icon: ListOrdered },
    { href: '/stores', label: 'nav_manage_stores', icon: MapPin },
    { href: '/users', label: 'nav_manage_users', icon: Users },
    { href: '/reports', label: 'nav_reports', icon: FileText },
  ],
};
