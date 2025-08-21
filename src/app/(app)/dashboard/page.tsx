'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuthContext } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Croissant, ListOrdered, Sparkles, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { role } = useContext(AuthContext);

  const CustomerDashboard = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Welcome, Bread Lover!</CardTitle>
            <CardDescription>Ready for your daily dose of deliciousness? Here's what you can do.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Browse Products</CardTitle>
            <Croissant className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50+ Items</div>
            <p className="text-xs text-muted-foreground">Freshly baked bread, pastries, and more.</p>
            <Button asChild size="sm" className="mt-4">
              <Link href="/products">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Orders</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Track Status</div>
            <p className="text-xs text-muted-foreground">Check on your recent orders.</p>
            <Button asChild size="sm" variant="secondary" className="mt-4">
              <Link href="/orders">View Orders <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-accent text-accent-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
            <Sparkles className="h-4 w-4 text-accent-foreground/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Discover New Tastes</div>
            <p className="text-xs text-accent-foreground/70">Let our AI suggest your next favorite treat.</p>
             <Button asChild size="sm" variant="outline" className="mt-4 bg-background/20 border-accent-foreground/50 hover:bg-background/30">
              <Link href="/recommendations">Get Suggestions <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const StaffDashboard = () => (
     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Staff Dashboard</CardTitle>
            <CardDescription>Here's a quick overview of today's operations.</CardDescription>
          </CardHeader>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Orders currently in progress or pending</p>
          </CardContent>
        </Card>
     </div>
  );

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          <span className="capitalize">{role}</span> Dashboard
        </h2>
      </div>
      {role === 'customer' ? <CustomerDashboard /> : <StaffDashboard />}
    </div>
  );
}
