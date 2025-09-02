

'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, CheckCircle, Pencil, Save, ImagePlus, Plus, Trash2 } from 'lucide-react';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { LanguageContext } from '@/components/language-provider';
import { AuthContext } from '@/components/auth-provider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


function ProductCard({ product, onProductChange }: { product: Product; onProductChange: () => void; }) {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  
  const [isAdded, setIsAdded] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(product.id.startsWith('new_'));
  const [editedProduct, setEditedProduct] = useState(product);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedProduct(product);
    if (product.id.startsWith('new_')) {
      setImagePreview(null);
      setIsEditing(true);
    }
  }, [product]);

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
    setImagePreview(null);
  };

  const handleSave = () => {
    let finalProduct = { ...editedProduct };
    if (imagePreview) {
      finalProduct.imageUrl = imagePreview;
    }
    
    const productIndex = products.findIndex(p => p.id === finalProduct.id);

    if (productIndex !== -1) {
        // It's an existing product (or a new one that was just added)
        if (finalProduct.id.startsWith('new_')) {
            finalProduct.id = `prod_${Date.now()}`;
        }
        products[productIndex] = finalProduct;
    } else {
        // This case should ideally not happen with the current logic
    }
    
    setIsEditing(false);
    setImagePreview(null);
    onProductChange(); // Notify parent to re-render
    toast({
      title: 'Producto Guardado',
      description: `${finalProduct.name} ha sido guardado.`,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
  };
  
  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusChange = (status: string) => {
    setEditedProduct(prev => ({
      ...prev,
      isAvailable: status !== 'sold_out',
      stock: status === 'low_stock' ? 5 : (status === 'sold_out' ? 0 : 100),
    }));
  };

  const getCurrentStatus = () => {
    if (!editedProduct.isAvailable) return 'sold_out';
    if (editedProduct.stock < 10) return 'low_stock';
    return 'available';
  };
  
  const handleDelete = () => {
      const productIndex = products.findIndex(p => p.id === product.id);
      if (productIndex > -1) {
          products.splice(productIndex, 1);
          onProductChange();
      }
  };


  return (
    <Card className="flex flex-col">
       <CardHeader className="p-0 relative">
        <div 
            className={`aspect-[4/3] rounded-t-lg ${isEditing ? 'cursor-pointer bg-muted/50 hover:bg-muted/80' : ''}`}
            onClick={handleImageClick}
        >
          {isEditing ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-2">
              {(imagePreview || editedProduct.imageUrl) ? (
                <Image
                  src={imagePreview || editedProduct.imageUrl}
                  alt="Vista previa del producto"
                  width={400}
                  height={300}
                  className="object-contain w-full h-full rounded-t-lg"
                  unoptimized // Allows blob URLs and external URLs
                />
              ) : (
                <>
                  <ImagePlus className="h-12 w-12" />
                  <p className="mt-2 text-sm font-semibold">Cambiar imagen</p>
                </>
              )}
               <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/png, image/jpeg, image/gif"
              />
            </div>
          ) : (
            <Image
              src={product.imageUrl || 'https://picsum.photos/400/300'}
              alt={product.name}
              width={400}
              height={300}
              className="object-cover rounded-t-lg aspect-[4/3]"
              data-ai-hint="bakery product"
              unoptimized // Allows external URLs without domain config
            />
          )}
        </div>
        {!isEditing && product.isAvailable && product.stock > 0 && product.stock < 10 && (
          <Badge className="absolute top-2 left-2">Pocas unidades</Badge>
        )}
        {!isEditing && !product.isAvailable && (
          <Badge variant="destructive" className="absolute top-2 left-2">{t('sold_out')}</Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-4">
         {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs text-muted-foreground">Nombre</Label>
             <Input
                id="name"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                className="font-headline text-xl font-semibold h-9"
            />
            <Label htmlFor="price" className="text-xs text-muted-foreground">Precio</Label>
            <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">$</span>
                <Input
                    type="number"
                    id="price"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    className="text-lg font-bold text-primary w-24 h-9"
                />
            </div>
            <Label htmlFor="description" className="text-xs text-muted-foreground">Descripción</Label>
            <Textarea
                id="description"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                rows={3}
            />
             <Label className="text-xs text-muted-foreground">Estado</Label>
             <RadioGroup value={getCurrentStatus()} onValueChange={handleStatusChange} className="flex space-x-4 pt-1">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="available" id={`available-${product.id}`} />
                    <Label htmlFor={`available-${product.id}`} className="font-normal">Disponible</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low_stock" id={`low_stock-${product.id}`} />
                    <Label htmlFor={`low_stock-${product.id}`} className="font-normal">Pocas unidades</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sold_out" id={`sold_out-${product.id}`} />
                    <Label htmlFor={`sold_out-${product.id}`} className="font-normal">Agotado</Label>
                </div>
            </RadioGroup>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-xl mb-1">{product.name}</CardTitle>
                <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
            </div>
            <CardDescription className="mt-2">{product.description}</CardDescription>
          </div>
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
                <>
                <Button className="flex-1" variant="outline" onClick={handleEdit}>
                    <Pencil className="mr-2 h-4 w-4" /> Editar
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="flex-1" variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente el producto.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Sí, eliminar
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </>
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

function AddProductCard({ onAdd }: { onAdd: () => void }) {
  return (
    <Card 
      className="flex flex-col items-center justify-center aspect-[0.78] border-2 border-dashed bg-muted/50 hover:bg-muted/80 hover:border-primary transition-colors cursor-pointer"
      onClick={onAdd}
    >
      <Plus className="h-16 w-16 text-muted-foreground" />
      <p className="mt-2 font-medium text-muted-foreground">Añadir Nuevo Producto</p>
    </Card>
  )
}


export default function ProductsPage() {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  
  // A simple way to force re-render when the underlying data changes.
  const [version, setVersion] = useState(0);

  const forceRerender = () => {
    setVersion(v => v + 1);
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: `new_${Date.now()}`,
      name: 'Nuevo Producto',
      description: '',
      price: 0,
      imageUrl: '',
      category: 'Pastries',
      isAvailable: true,
      stock: 100,
    };
    products.push(newProduct);
    forceRerender();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('products_title')}</h1>
        <p className="text-muted-foreground">{t('products_description')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onProductChange={forceRerender}
          />
        ))}
        {user?.role === 'admin' && <AddProductCard onAdd={handleAddProduct} />}
      </div>
    </div>
  );
}
