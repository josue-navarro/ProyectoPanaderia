'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, orders } from "@/lib/data";
import { Check, Circle, CookingPot, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";

const mockCart = [
  { ...products[0], quantity: 1 },
  { ...products[4], quantity: 2 },
];
const cartTotal = mockCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const trackingOrder = orders[1];

const statusSteps: { status: OrderStatus; icon: React.ElementType; label: string; description: string }[] = [
    { status: 'Pending', icon: Circle, label: 'Order Placed', description: 'We have received your order.'},
    { status: 'In Progress', icon: CookingPot, label: 'In Progress', description: 'Our bakers are working on it.'},
    { status: 'Ready for Pickup', icon: ShoppingCart, label: 'Ready for Pickup', description: 'Your order is ready to be collected.'},
    { status: 'Completed', icon: Check, label: 'Completed', description: 'You have collected your order.'}
];

export default function OrdersPage() {
  const currentStatusIndex = statusSteps.findIndex(step => step.status === trackingOrder.status);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Your Orders</h1>
        <p className="text-muted-foreground">Manage your cart and track your purchases.</p>
      </div>
      <Tabs defaultValue="cart" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
          <TabsTrigger value="track">Track Order</TabsTrigger>
        </TabsList>
        <TabsContent value="cart">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Cart</CardTitle>
              <CardDescription>Review and place your order.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCart.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint="bakery product" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="track">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Track Order #{trackingOrder.id}</CardTitle>
                    <CardDescription>Estimated Arrival: 15-20 minutes</CardDescription>
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
