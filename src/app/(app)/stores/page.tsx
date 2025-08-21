'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { stores } from '@/lib/data';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function StoresPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Our Stores</h1>
        <p className="text-muted-foreground">Find a Panadería Cloud near you.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map(store => (
          <Card key={store.id}>
            <CardHeader>
              <CardTitle className="font-headline">{store.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                    <p>{store.address}</p>
                    <p className="text-muted-foreground">{store.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p>{store.phone}</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <p>{store.hours}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
