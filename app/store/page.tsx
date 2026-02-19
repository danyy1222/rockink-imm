'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PRODUCTS, Product } from '@/lib/data';
import { getProductBrand, normalizeBrandName, productMatchesBrand } from '@/lib/product-brand';
import { CartProvider, useCart } from '@/lib/cart-context';
import { ArrowLeft, Search, ShoppingCart } from 'lucide-react';

function StoreContent() {
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products', { cache: 'no-store' });
        if (!response.ok) throw new Error('Error API');
        const data = (await response.json()) as Product[];
        setAllProducts(data);
      } catch {
        setAllProducts(PRODUCTS);
      }
    };

    void loadProducts();
  }, []);

  useEffect(() => {
    const brandParam = searchParams.get('brand');
    setSelectedBrand(brandParam ? normalizeBrandName(brandParam) : null);
  }, [searchParams]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const categories = Array.from(new Set(allProducts.map((p) => p.category)));

  const filteredProducts = allProducts.filter((p) => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedBrand && !productMatchesBrand(p, selectedBrand)) return false;
    if (onlyInStock && !p.inStock) return false;
    if (onlyOffers && !p.inOffer) return false;

    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;

    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const handleAddedToCart = (product: Product) => {
    setToastMessage(`${product.name} agregado al carrito`);
  };

  const quickViewImages = quickViewProduct?.images?.length
    ? quickViewProduct.images.slice(0, 2)
    : quickViewProduct
    ? [quickViewProduct.image]
    : [];
  const availableBrands = Array.from(new Set(allProducts.map((p) => getProductBrand(p))));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </Link>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Tienda <span className="text-primary">Completa</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl">
            Explora nuestro catalogo completo de productos agropecuarios premium. {allProducts.length} productos disponibles.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8 bg-background border-b border-gray-100" id="categories">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Buscar y filtrar productos</h2>

          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, descripcion o categoria"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full px-6 py-3 font-semibold"
            >
              Todos
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full px-6 py-3 font-semibold"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedBrand === null ? 'default' : 'outline'}
              onClick={() => setSelectedBrand(null)}
              className="rounded-full"
            >
              Todas las marcas
            </Button>
            {availableBrands.map((brand) => (
              <Button
                key={brand}
                variant={selectedBrand === brand ? 'default' : 'outline'}
                onClick={() => setSelectedBrand(brand)}
                className="rounded-full"
              >
                {brand}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant={onlyInStock ? 'default' : 'outline'}
              onClick={() => setOnlyInStock((v) => !v)}
              className="rounded-full"
            >
              Solo en stock
            </Button>
            <Button
              variant={onlyOffers ? 'default' : 'outline'}
              onClick={() => setOnlyOffers((v) => !v)}
              className="rounded-full"
            >
              Solo ofertas
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-background" id="products">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {selectedCategory ? (
                <>
                  Productos en <span className="text-primary">{selectedCategory}</span>
                </>
              ) : (
                <>
                  Todos Nuestros <span className="text-primary">Productos</span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground">
              {filteredProducts.length} productos disponibles
            </p>
            {selectedBrand && (
              <p className="text-sm text-primary mt-2">Filtrando por marca: {selectedBrand}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                  onAddedToCart={handleAddedToCart}
                />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                No hay productos con esos filtros
              </h3>
              <p className="text-xl text-muted-foreground mb-8">
                Prueba cambiando categoria, texto o filtros.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSearchTerm('');
                  setOnlyInStock(false);
                  setOnlyOffers(false);
                }}
                className="premium-button bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      <Dialog
        open={Boolean(quickViewProduct)}
        onOpenChange={(open) => {
          if (!open) setQuickViewProduct(null);
        }}
      >
        <DialogContent className="sm:max-w-3xl">
          {quickViewProduct && (
            <div className="space-y-5">
              <DialogHeader>
                <DialogTitle>{quickViewProduct.name}</DialogTitle>
                <DialogDescription>{quickViewProduct.category}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickViewImages.map((img, idx) => (
                  <div key={`${quickViewProduct.id}-${idx}`} className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={img || '/placeholder.svg'}
                      alt={`${quickViewProduct.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">{quickViewProduct.description}</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/product/${quickViewProduct.id}`} className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">Ver detalle completo</Button>
                </Link>
                <Button
                  onClick={() => {
                    addItem(quickViewProduct.id);
                    setToastMessage(`${quickViewProduct.name} agregado al carrito`);
                  }}
                  disabled={!quickViewProduct.inStock}
                  className="w-full sm:w-auto"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Agregar al carrito
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 rounded-lg border border-primary/20 bg-background px-4 py-3 shadow-xl">
          <p className="text-sm font-medium text-foreground">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

export default function Store() {
  return (
    <CartProvider>
      <StoreContent />
    </CartProvider>
  );
}

