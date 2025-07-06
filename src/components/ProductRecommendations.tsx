'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { recommendProducts } from '@/ai/flows/product-recommendation';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { Lightbulb } from 'lucide-react';

export default function ProductRecommendations() {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (cartItems.length === 0 && !user?.purchaseHistory) return;

      setLoading(true);
      setError(null);
      try {
        const result = await recommendProducts({
          cartItems,
          userPurchaseHistory: user?.purchaseHistory,
          userProfile: user?.profileDescription,
          numberOfRecommendations: 3,
        });
        
        // Filter out items already in the cart
        const cartIds = new Set(cartItems.map(item => item.productId));
        const filteredRecommendations = result.filter(rec => !cartIds.has(rec.productId));

        setRecommendations(filteredRecommendations);
      } catch (e) {
        console.error('Error fetching recommendations:', e);
        setError('Could not fetch recommendations.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce the call
    const handler = setTimeout(() => {
        fetchRecommendations();
    }, 500);

    return () => clearTimeout(handler);
  }, [cartItems, user]);

  if (loading) {
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Lightbulb /> You Might Also Like</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
  }

  if (error || recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8 bg-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="text-primary"/> You Might Also Like</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <Link href={`/products/${rec.productId}`} key={rec.productId} className="flex items-center gap-4 group">
            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                <Image src={rec.imageUrl} alt={rec.name} fill className="object-cover" data-ai-hint={`${rec.category} product`} />
            </div>
            <div>
              <p className="font-bold group-hover:text-primary transition-colors">{rec.name}</p>
              <p className="text-sm text-muted-foreground">{rec.price.toFixed(2)} OMR</p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
