'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { ShoppingCart, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onAddedToCart?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView, onAddedToCart }: ProductCardProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card
      onClick={() => router.push(`/product/${product.id}`)}
      className="overflow-hidden card-hover h-full flex flex-col border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/20 cursor-pointer"
    >
      <div className="relative w-full h-56 bg-gradient-to-br from-muted to-muted/50 overflow-hidden group">
        <Image
          src={images[currentImageIndex] || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
          <Tag className="w-3 h-3" />
          {product.category}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full ${
                    idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 w-2'
                  } transition-all`}
                />
              ))}
            </div>
          </>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Agotado</span>
          </div>
        )}
      </div>

      <CardContent className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-foreground hover:text-primary mb-2 line-clamp-2 transition-colors duration-200">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow leading-relaxed">
          {product.description}
        </p>

        <div className="pt-2 border-t border-border/30">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.(product);
              }}
              className="text-sm"
            >
              Vista rapida
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addItem(product.id);
                onAddedToCart?.(product);
              }}
              className="btn-primary shadow-md text-sm w-full"
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Anadir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

