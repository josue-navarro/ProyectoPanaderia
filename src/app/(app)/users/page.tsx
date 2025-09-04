
'use client';

import { useContext, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { users } from '@/lib/data';
import type { User } from '@/lib/types';
import { LanguageContext } from '@/components/language-provider';
import { AuthContext } from '@/components/auth-provider';
import { User2, PlusCircle, MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

function UserTable({ title, description, userList, showStore = false, actionButton, onUserChange }: { title: string; description: string; userList: User[]; showStore?: boolean; actionButton?: React.ReactNode; onUserChange?: () => void; }) {
    const { t } = useContext(LanguageContext);
    const { user } = useContext(AuthContext);

    const getRoleVariant = (role: User['role']) => {
        switch (role) {
            case 'superAdmin': return 'default';
            case 'admin': return 'destructive';
            case 'employee': return 'secondary';
            case 'customer': return 'outline';
            default: return 'default';
        }
    }

    const handleDelete = (userId: string) => {
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex > -1) {
            users.splice(userIndex, 1);
            onUserChange?.();
        }
    };
    
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
                                {user?.role === 'superAdmin' && <TableHead>{t('verification_code')}</TableHead>}
                                <TableHead className="text-center">{t('role_type')}</TableHead>
                                {user?.role === 'superAdmin' && <TableHead><span className="sr-only">{t('actions')}</span></TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userList.map(listUser => (
                                <TableRow key={listUser.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={`https://avatar.vercel.sh/${listUser.username}.png`} alt={`@${listUser.username}`} />
                                                <AvatarFallback>{getInitials(listUser.fullName)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{listUser.fullName}</p>
                                                <p className="text-sm text-muted-foreground">@{listUser.username}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{listUser.email}</TableCell>
                                    {showStore && <TableCell>{listUser.storeName || 'N/A'}</TableCell>}
                                     {user?.role === 'superAdmin' && <TableCell className="font-mono text-center">{listUser.verificationCode}</TableCell>}
                                    <TableCell className="text-center">
                                        <Badge variant={getRoleVariant(listUser.role)}>{t(`role_${listUser.role}`)}</Badge>
                                    </TableCell>
                                    {user?.role === 'superAdmin' && (
                                        <TableCell className="text-right">
                                            <AlertDialog>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">{t('open_menu')}</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                <span>{t('delete')}</span>
                                                            </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>{t('are_you_sure')}</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {t('delete_admin_confirm_message')}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(listUser.id)}>
                                                            {t('confirm_delete')}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    )}
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
    const [version, setVersion] = useState(0);

    const forceRerender = () => setVersion(v => v + 1);

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
                        onUserChange={forceRerender}
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
