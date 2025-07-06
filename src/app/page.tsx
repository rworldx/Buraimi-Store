'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';
import type { Product } from '@/lib/types';
import { SearchX } from 'lucide-react';

export default function Home() {
  const { searchQuery } = useSearch();
  const allProducts = useMemo(() => getProducts(), []);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    if (lowercasedQuery === '') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, allProducts]);

  return (
    <div>
      <section className="bg-card py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">Welcome to our store</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the authentic spirit of Buraimi through our curated collection of artisanal goods.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            {searchQuery ? `Results for "${searchQuery}"` : 'Our Collection'}
          </h2>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center text-muted-foreground py-16 flex flex-col items-center gap-4">
              <SearchX className="h-16 w-16" />
              <p className="text-xl font-medium">No Products Found</p>
              <p>Your search for "{searchQuery}" did not match any products.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
