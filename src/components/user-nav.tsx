'use client';

import { useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { AuthContext } from './auth-provider';
import { LanguageContext } from './language-provider';
import { LogOut, User, Languages, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserNav() {
  const { role, logout } = useContext(AuthContext);
  const { language, setLanguage, t } = useContext(LanguageContext);

  const getInitials = (role: string) => {
    return role.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt={`@${role}`} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {getInitials(role)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{t('signed_in_as')}</p>
            <p className="text-xs leading-none text-muted-foreground capitalize">{t(`role_${role}`)}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <User className="mr-2 h-4 w-4" />
            <span>{t('profile')}</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages className="mr-2 h-4 w-4" />
              <span>{t('language')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setLanguage('en')}>
                       <Check className={cn("mr-2 h-4 w-4", language !== 'en' && 'opacity-0')} />
                        <span>English</span>
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setLanguage('es')}>
                        <Check className={cn("mr-2 h-4 w-4", language !== 'es' && 'opacity-0')} />
                        <span>Español</span>
                    </DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
