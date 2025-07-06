'use client';

import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your shopping cart.`,
    });
  }

  return <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto" onClick={handleAddToCart}><ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart</Button>;
}
