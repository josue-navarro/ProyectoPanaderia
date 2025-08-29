
'use client';

import { useContext } from 'react';
import { AuthContext } from '@/components/auth-provider';
import { LanguageContext } from '@/components/language-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('profile')}</h1>
        <p className="text-muted-foreground">{t('profile_description')}</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
            <AvatarImage src={`https://avatar.vercel.sh/${user.username}.png`} alt={`@${user.username}`} className="w-full h-full" />
            <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline">{user.fullName}</CardTitle>
          <CardDescription>@{user.username}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center p-3 rounded-lg bg-muted/50">
              <Mail className="w-5 h-5 mr-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{t('email')}</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            {user.phone && (
                 <div className="flex items-center p-3 rounded-lg bg-muted/50">
                    <Phone className="w-5 h-5 mr-4 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">{t('phone_number_optional')}</p>
                        <p className="font-medium">{user.phone}</p>
                    </div>
                </div>
            )}
            <div className="flex items-center p-3 rounded-lg bg-muted/50">
              <Shield className="w-5 h-5 mr-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{t('role_type')}</p>
                <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                    {t(`role_${user.role}`)}
                </Badge>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
