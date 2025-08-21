'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { products } from '@/lib/data';
import { generateProductRecommendations, GenerateProductRecommendationsOutput } from '@/ai/flows/product-recommendations';
import { Loader2, Sparkles, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';

const popularCombinations = ['Sourdough Loaf', 'Croissant', 'Espresso'];

export default function RecommendationsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<GenerateProductRecommendationsOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCheckboxChange = (productName: string) => {
    setSelectedProducts(prev =>
      prev.includes(productName)
        ? prev.filter(p => p !== productName)
        : [...prev, productName]
    );
  };

  const getRecommendations = () => {
    startTransition(async () => {
      const result = await generateProductRecommendations({
        pastOrders: selectedProducts,
        popularCombinations: popularCombinations,
      });
      setRecommendations(result);
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Sparkles className="text-accent" /> AI Product Recommendations
        </h1>
        <p className="text-muted-foreground">Discover new treats based on your tastes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Past Purchases</CardTitle>
              <CardDescription>Select items you've enjoyed before.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {products.map(product => (
                <div key={product.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`product-${product.id}`}
                    onCheckedChange={() => handleCheckboxChange(product.name)}
                    checked={selectedProducts.includes(product.name)}
                  />
                  <label
                    htmlFor={`product-${product.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {product.name}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
          <Button onClick={getRecommendations} disabled={isPending || selectedProducts.length === 0} className="w-full mt-4">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              'Get Recommendations'
            )}
          </Button>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-[30rem] flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">Suggested For You</CardTitle>
              <CardDescription>Here's what our AI thinks you'll love next.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
              {isPending ? (
                <div className="flex flex-col items-center text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <p>Baking up fresh recommendations...</p>
                </div>
              ) : recommendations && recommendations.recommendations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {recommendations.recommendations.map((rec, index) => {
                    const product = products.find(p => p.name === rec);
                    return (
                       <div key={index} className="flex items-center gap-4 p-3 rounded-lg border bg-background">
                         {product ? (
                           <Image src={product.imageUrl} alt={product.name} width={60} height={60} className="rounded-md object-cover" data-ai-hint="bakery product"/>
                         ) : (
                           <div className="h-[60px] w-[60px] bg-muted rounded-md flex items-center justify-center"><Lightbulb className="h-6 w-6 text-muted-foreground" /></div>
                         )}
                         <p className="font-semibold">{rec}</p>
                       </div>
                    )
                  })}
                </div>
              ) : (
                 <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Ready to Discover?</AlertTitle>
                    <AlertDescription>
                      Select some items you've purchased and click "Get Recommendations" to see your personalized suggestions.
                    </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
