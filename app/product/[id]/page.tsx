'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PRODUCTS, Product } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { CartProvider } from '@/lib/cart-context';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

function toEmbeddable3dUrl(url?: string) {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (trimmed.includes('/embed')) return trimmed;
  if (trimmed.includes('hitem3d.ai/share/')) {
    return trimmed.replace('/share/', '/embed/');
  }
  return trimmed;
}

function ProductDetailContent({ productId }: { productId: string }) {
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const product = allProducts.find((p) => p.id === productId);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const embeddable3dUrl = toEmbeddable3dUrl(product?.model3dEmbedUrl);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products', { cache: 'no-store' });
        if (!response.ok) throw new Error('Error API');
        const data = (await response.json()) as Product[];
        setAllProducts(data);
      } catch (e) {
        setAllProducts(PRODUCTS);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    void loadProducts();
  }, []);

  const handleAddCart = () => {
    addItem(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoadingProducts) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-primary">Producto no encontrado</h1>
          <Link href="/">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a la tienda
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link href="/" className="text-primary hover:text-secondary flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver a la tienda
        </Link>
      </div>

      {/* Product Detail */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-96 bg-card rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold mb-2">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {product.name}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {product.description}
            </p>

            {/* Specifications */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="font-bold text-primary mb-3">Especificaciones</h3>
                <ul className="space-y-2">
                  {product.specifications.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="text-green-600 font-semibold flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  En Stock
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Agotado</span>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddCart}
              disabled={!product.inStock}
              className="bg-primary hover:bg-primary/90 text-lg py-6 w-full mb-4"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {added ? 'Agregado al carrito' : 'Agregar al carrito'}
            </Button>

            {added && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-center">
                ✓ Producto agregado exitosamente
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-card py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-6">Vista 3D del producto</h2>
          {embeddable3dUrl ? (
            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={embeddable3dUrl}
                  title="Modelo 3D del producto"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <a
                href={product.model3dEmbedUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sm text-primary underline"
              >
                Abrir modelo 3D en una pestaña nueva
              </a>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Este producto no tiene modelo 3D configurado.
            </p>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-card py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-6">Conoce el producto</h2>
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${product.youtubeId}`}
              title="Video del producto"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">© 2024 AgroTienda - E-commerce Agropecuario</p>
          <p className="text-sm opacity-75">Productos de calidad para tu campo</p>
        </div>
      </footer>
    </div>
  );
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <CartProvider>
      <ProductDetailContent productId={id} />
    </CartProvider>
  );
}
