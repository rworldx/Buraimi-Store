'use client';

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ProductRecommendations from "@/components/ProductRecommendations";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const cartTotal = getCartTotal();

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
                <h1 className="mt-8 text-4xl font-headline font-bold">Your Cart is Empty</h1>
                <p className="mt-4 text-muted-foreground">Looks like you haven&apos;t added anything to your cart yet.</p>
                <Button asChild className="mt-8">
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-headline font-bold mb-8">Your Cart</h1>
            <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <Card key={item.productId} className="flex items-center p-4">
                            <div className="relative h-24 w-24 rounded-md overflow-hidden mr-4">
                                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={`${item.category} product`} />
                            </div>
                            <div className="flex-grow">
                                <Link href={`/products/${item.productId}`}>
                                    <h2 className="font-bold font-headline text-lg hover:text-primary">{item.name}</h2>
                                </Link>
                                <p className="text-sm text-muted-foreground">{item.category}</p>
                                <p className="text-lg font-bold mt-1">{item.price.toFixed(2)} OMR</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                                    className="w-20 h-10"
                                />
                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.productId)}>
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>{cartTotal.toFixed(2)} OMR</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Shipping</p>
                                <p>Calculated at checkout</p>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-4">
                                <p>Total</p>
                                <p>{cartTotal.toFixed(2)} OMR</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href="/checkout">
                                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <ProductRecommendations />
                </div>
            </div>
        </div>
    );
}