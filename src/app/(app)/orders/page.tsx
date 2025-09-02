
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { products, orders } from "@/lib/data";
import { Check, Circle, CookingPot, MoreHorizontal, ShoppingCart, Truck, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";
import { useContext, useState } from "react";
import { LanguageContext } from "@/components/language-provider";
import { AuthContext } from "@/components/auth-provider";
import { OrderDetails } from "@/components/order-details";

const mockCart = [
  { ...products[0], quantity: 1 },
  { ...products[4], quantity: 2 },
];
const cartTotal = mockCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const trackingOrder = orders[1];


function CustomerOrders() {
    const { t } = useContext(LanguageContext);
  
    const statusSteps: { status: OrderStatus; icon: React.ElementType; label: string; description: string }[] = [
        { status: 'Pending', icon: Circle, label: t('order_status_placed_label'), description: t('order_status_placed_desc')},
        { status: 'In Progress', icon: CookingPot, label: t('order_status_progress_label'), description: t('order_status_progress_desc')},
        { status: 'Ready for Pickup', icon: ShoppingCart, label: t('order_status_ready_label'), description: t('order_status_ready_desc')},
        { status: 'Completed', icon: Check, label: t('order_status_completed_label'), description: t('order_status_completed_desc')}
    ];

    const currentStatusIndex = statusSteps.findIndex(step => step.status === trackingOrder.status);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">{t('orders_title')}</h1>
                <p className="text-muted-foreground">{t('orders_description')}</p>
            </div>
            <Tabs defaultValue="cart" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="cart">{t('shopping_cart')}</TabsTrigger>
                <TabsTrigger value="track">{t('track_order')}</TabsTrigger>
                </TabsList>
                <TabsContent value="cart">
                <Card>
                    <CardHeader>
                    <CardTitle className="font-headline">{t('your_cart')}</CardTitle>
                    <CardDescription>{t('review_and_place_order')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    {mockCart.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint="bakery product" />
                            <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{t('quantity')}: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <p>{t('total')}</p>
                        <p>${cartTotal.toFixed(2)}</p>
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Button className="w-full">{t('proceed_to_checkout')}</Button>
                    </CardFooter>
                </Card>
                </TabsContent>
                <TabsContent value="track">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">{t('track_order')} #{trackingOrder.id}</CardTitle>
                            <CardDescription>{t('estimated_arrival')}: 15-20 {t('minutes')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative flex flex-col gap-8 ml-4">
                                <div className="absolute left-[-9px] top-2 h-full border-l-2 border-dashed border-border"></div>
                                {statusSteps.map((step, index) => {
                                    const isActive = index <= currentStatusIndex;
                                    return (
                                        <div key={step.status} className="flex items-start gap-4 relative">
                                            <div className={cn(
                                                "flex items-center justify-center h-8 w-8 rounded-full border-2",
                                                isActive ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border"
                                            )}>
                                                <step.icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className={cn("font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>{step.label}</p>
                                                <p className="text-sm text-muted-foreground">{step.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function StaffOrders() {
    const { t } = useContext(LanguageContext);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const getStatusVariant = (status: OrderStatus) => {
        switch(status) {
            case 'Pending': return 'default';
            case 'In Progress': return 'secondary';
            case 'Ready for Pickup': return 'outline';
            case 'Completed': return 'default';
            case 'Cancelled': return 'destructive';
            default: return 'default';
        }
    }
    
    return (
         <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">{t('order_list_title')}</h1>
                <p className="text-muted-foreground">{t('order_list_description')}</p>
            </div>
             <Dialog>
                <Card>
                    <CardHeader>
                        <CardTitle>{t('all_orders_title')}</CardTitle>
                        <CardDescription>{t('all_orders_description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('order_id')}</TableHead>
                                    <TableHead>{t('customer_name')}</TableHead>
                                    <TableHead>{t('order_date')}</TableHead>
                                    <TableHead className="text-right">{t('total')}</TableHead>
                                    <TableHead className="text-center">{t('status')}</TableHead>
                                    <TableHead><span className="sr-only">{t('actions')}</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{order.customerName}</TableCell>
                                        <TableCell>{order.orderDate}</TableCell>
                                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                                    {t('view_details')}
                                                </Button>
                                            </DialogTrigger>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                {selectedOrder && (
                     <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>{t('order_details_title')} {selectedOrder.id}</DialogTitle>
                        </DialogHeader>
                        <OrderDetails order={selectedOrder} />
                    </DialogContent>
                )}
            </Dialog>
         </div>
    );
}


export default function OrdersPage() {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    if (user.role === 'customer') {
        return <CustomerOrders />;
    }

    return <StaffOrders />;
}
