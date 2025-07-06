import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AddToCartButton from '@/components/AddToCartButton';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { productId: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = getProductById(params.productId);
  if (!product) {
    return {
      title: 'Product not found'
    }
  }
 
  return {
    title: `${product.name} | Buraimi Store`,
    description: product.description,
  }
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductById(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="bg-card rounded-lg overflow-hidden aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={800}
              className="object-cover w-full h-full"
              data-ai-hint={`${product.category} product detail`}
            />
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <Badge variant="outline">{product.category}</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">{product.name}</h1>
            <p className="text-3xl font-bold text-primary">{product.price.toFixed(2)} OMR</p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.longDescription}
          </p>

          <div className="mt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
