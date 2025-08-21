import { Croissant, LayoutGrid, ListOrdered, MapPin, Sparkles, Users, FileText } from 'lucide-react';
import type { UserRole } from '@/components/auth-provider';

export const navLinks = {
  customer: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/products', label: 'Products', icon: Croissant },
    { href: '/orders', label: 'My Orders', icon: ListOrdered },
    { href: '/recommendations', label: 'For You', icon: Sparkles },
    { href: '/stores', label: 'Stores', icon: MapPin },
  ],
  employee: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/orders', label: 'Manage Orders', icon: ListOrdered },
  ],
  admin: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/products', label: 'Manage Products', icon: Croissant },
    { href: '/orders', label: 'All Orders', icon: ListOrdered },
    { href: '/stores', label: 'Manage Stores', icon: MapPin },
    { href: '/users', label: 'Manage Users', icon: Users },
    { href: '/reports', label: 'Reports', icon: FileText },
  ],
} satisfies Record<UserRole, { href: string; label: string; icon: React.ElementType }[]>;
