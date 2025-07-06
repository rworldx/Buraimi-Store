'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search } from 'lucide-react';
import { buttonVariants } from './ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Badge } from './ui/badge';
import { useSearch } from '@/context/SearchContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const { getCartItemCount } = useCart();
  const { user } = useAuth();
  const itemCount = getCartItemCount();
  const { searchQuery, setSearchQuery } = useSearch();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query && pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="text-2xl font-bold font-headline">
          Buraimi Store
        </Link>
        <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="relative w-full max-w-sm">
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="w-full h-10 pl-10 pr-4 rounded-full border bg-card focus:ring-primary focus:outline-none" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/cart" aria-label="Shopping Cart" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <div className="relative">
              <ShoppingCart />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0 bg-accent text-accent-foreground">{itemCount}</Badge>
              )}
            </div>
          </Link>
          <Link href={user ? '/account' : '/login'} aria-label="User Account" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <User />
          </Link>
        </nav>
      </div>
    </header>
  );
}
