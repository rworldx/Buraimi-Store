'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if(!loading && cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems, loading, router])

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
          </div>
          <div>
            <Skeleton className="h-8 w-1/4 mb-4" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. A confirmation has been sent to your email.",
    });
    clearCart();
    router.push('/account');
  };

  return (
    <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-headline font-bold mb-8">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle className="font-headline">Shipping Information</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue={user.name} required />
                           </div>
                           <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue={user.email} required />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="address">Address</Label>
                           <Input id="address" placeholder="123 Desert Rose St" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" placeholder="Buraimi" required />
                           </div>
                           <div className="space-y-2">
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input id="zip" placeholder="512" required />
                           </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="font-headline">Payment Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="**** **** **** 1234" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" required />
                           </div>
                           <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" required />
                           </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader><CardTitle className="font-headline">Order Summary</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.productId} className="flex justify-between items-center text-sm">
                                <p>{item.name} x {item.quantity}</p>
                                <p>{(item.price * item.quantity).toFixed(2)} OMR</p>
                            </div>
                        ))}
                        <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                            <p>Total</p>
                            <p>{getCartTotal().toFixed(2)} OMR</p>
                        </div>
                    </CardContent>
                </Card>
                 <Button type="submit" size="lg" className="w-full mt-6">Place Order</Button>
            </div>
        </form>
    </div>
  );
}
