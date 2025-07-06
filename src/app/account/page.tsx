'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AccountPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/account');
    }
  }, [user, loading, router]);
  
  const handleLogout = () => {
    logout();
    router.push('/');
  }

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-10 w-1/3 mb-8" />
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <Skeleton className="h-40 w-full" />
            </div>
            <div className="md:col-span-2">
                 <Skeleton className="h-8 w-1/4 mb-4" />
                 <Skeleton className="h-64 w-full" />
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Your Account</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4"/>
          Logout
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Purchase History</CardTitle>
                </CardHeader>
                <CardContent>
                    {user.purchaseHistory.length > 0 ? (
                        <div className="space-y-4">
                            {user.purchaseHistory.map(item => (
                                <div key={item.productId} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={`${item.category} product`} />
                                    </div>
                                    <div className="flex-grow">
                                        <Link href={`/products/${item.productId}`}>
                                            <h3 className="font-bold hover:text-primary">{item.name}</h3>
                                        </Link>
                                        <p className="text-sm text-muted-foreground">{item.price.toFixed(2)} OMR</p>
                                    </div>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={`/products/${item.productId}`}>View Item</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">You have no past purchases.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
