'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import React, { useContext } from 'react';
import { LanguageContext } from '@/components/language-provider';

function ProductCard({ product }: { product: Product }) {
  const { t } = useContext(LanguageContext);
  const { toast } = useToast();
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAddToCart = () => {
    toast({
      title: t('added_to_cart_title'),
      description: t('added_to_cart_desc', { productName: product.name }),
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0 relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={300}
          className="object-cover rounded-t-lg aspect-[4/3]"
          data-ai-hint="bakery product"
        />
        {!product.isAvailable && (
          <Badge variant="destructive" className="absolute top-2 right-2">{t('sold_out')}</Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-xl mb-1">{product.name}</CardTitle>
          <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          disabled={!product.isAvailable || isAdded}
          onClick={handleAddToCart}
        >
          {isAdded ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" /> {t('added')}
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" /> {t('add_to_cart')}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function ProductsPage() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('products_title')}</h1>
        <p className="text-muted-foreground">{t('products_description')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
