
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
import { User2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

function UserTable({ title, description, userList, showStore = false, actionButton }: { title: string; description: string; userList: User[]; showStore?: boolean; actionButton?: React.ReactNode }) {
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
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                {actionButton}
            </CardHeader>
            <CardContent>
                {userList.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('user')}</TableHead>
                                <TableHead>{t('email')}</TableHead>
                                {showStore && <TableHead>{t('store_assigned')}</TableHead>}
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
                                    {showStore && <TableCell>{user.storeName || 'N/A'}</TableCell>}
                                    <TableCell className="text-center">
                                        <Badge variant={getRoleVariant(user.role)}>{t(`role_${user.role}`)}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                     <div className="flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                        <User2 className="h-12 w-12 mb-4" />
                        <p className="font-medium">{t('no_admin_users_message')}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default function UsersPage() {
    const { t } = useContext(LanguageContext);
    const { user } = useContext(AuthContext);

    const adminUsers = users.filter(u => u.role === 'admin');
    const employeeUsers = users.filter(u => u.role === 'employee');
    const customerUsers = users.filter(u => u.role === 'customer');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">{t('users_title')}</h1>
                <p className="text-muted-foreground">{t('users_description')}</p>
            </div>
            
            <div className="space-y-8">
                {user?.role === 'superAdmin' && (
                    <UserTable 
                        title={t('admin_users_title')} 
                        description={t('admin_users_description')}
                        userList={adminUsers} 
                        showStore={true}
                        actionButton={
                             <Button asChild>
                                <Link href="/signup">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    {t('add_admin_button')}
                                </Link>
                            </Button>
                        }
                    />
                )}
                
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
