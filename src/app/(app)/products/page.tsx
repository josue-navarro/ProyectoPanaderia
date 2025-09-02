
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products as initialProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, CheckCircle, Pencil, Save } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { LanguageContext } from '@/components/language-provider';
import { AuthContext } from '@/components/auth-provider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function ProductCard({ product, onUpdateProduct }: { product: Product; onUpdateProduct: (updatedProduct: Product) => void; }) {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  
  const [isAdded, setIsAdded] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleAddToCart = () => {
    toast({
      title: t('added_to_cart_title'),
      description: t('added_to_cart_desc', { productName: product.name }),
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateProduct(editedProduct);
    setIsEditing(false);
    toast({
      title: 'Producto Actualizado',
      description: `${editedProduct.name} ha sido guardado.`,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
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
         {isEditing ? (
          <div className="space-y-2">
             <Input
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                className="font-headline text-xl font-semibold h-9"
            />
            <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">$</span>
                <Input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    className="text-lg font-bold text-primary w-24 h-9"
                />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-xl mb-1">{product.name}</CardTitle>
            <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
          </div>
        )}

        {isEditing ? (
            <Textarea
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                className="mt-2"
                rows={3}
            />
        ) : (
            <CardDescription className="mt-2">{product.description}</CardDescription>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {user?.role === 'admin' ? (
           <div className="w-full flex gap-2">
            {isEditing ? (
              <Button className="w-full" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Guardar
              </Button>
            ) : (
              <Button className="w-full" variant="outline" onClick={handleEdit}>
                <Pencil className="mr-2 h-4 w-4" /> Editar
              </Button>
            )}
          </div>
        ) : (
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
        )}
      </CardFooter>
    </Card>
  );
}


export default function ProductsPage() {
  const { t } = useContext(LanguageContext);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('products_title')}</h1>
        <p className="text-muted-foreground">{t('products_description')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onUpdateProduct={handleUpdateProduct} />
        ))}
      </div>
    </div>
  );
}
