
'use client';

import { useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { users } from '@/lib/data';
import type { User } from '@/lib/types';
import { LanguageContext } from '@/components/language-provider';
import { AuthContext } from '@/components/auth-provider';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

function UserTable({ title, description, userList }: { title: string; description: string; userList: User[] }) {
    const { t } = useContext(LanguageContext);

    const getRoleVariant = (role: User['role']) => {
        switch (role) {
            case 'superAdmin': return 'default';
            case 'admin': return 'destructive';
            case 'employee': return 'secondary';
            case 'customer': return 'outline';
            default: return 'default';
        }
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('user')}</TableHead>
                            <TableHead>{t('email')}</TableHead>
                            <TableHead>{t('phone_number_optional')}</TableHead>
                            <TableHead className="text-center">{t('role_type')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userList.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={`https://avatar.vercel.sh/${user.username}.png`} alt={`@${user.username}`} />
                                            <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user.fullName}</p>
                                            <p className="text-sm text-muted-foreground">@{user.username}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone || 'N/A'}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={getRoleVariant(user.role)}>{t(`role_${user.role}`)}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default function UsersPage() {
    const { t } = useContext(LanguageContext);
    const { user } = useContext(AuthContext);

    const adminUsers = users.filter(user => user.role === 'admin');
    const employeeUsers = users.filter(user => user.role === 'employee');
    const customerUsers = users.filter(user => user.role === 'customer');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">{t('users_title')}</h1>
                <p className="text-muted-foreground">{t('users_description')}</p>
            </div>
            
            <div className="space-y-8">
                {user?.role === 'superAdmin' || user?.role === 'admin' ? (
                    <UserTable 
                        title={t('admin_users_title')} 
                        description={t('admin_users_description')}
                        userList={adminUsers} 
                    />
                ) : null}

                {user?.role === 'admin' && (
                    <>
                        <UserTable 
                            title={t('employee_users_title')} 
                            description={t('employee_users_description')}
                            userList={employeeUsers} 
                        />
                        <UserTable 
                            title={t('customer_users_title')} 
                            description={t('customer_users_description')}
                            userList={customerUsers} 
                        />
                    </>
                )}
            </div>
        </div>
    );
}
