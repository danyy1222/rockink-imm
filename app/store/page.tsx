'use client';

import Link from "next/link"
import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { PRODUCTS, Product } from '@/lib/data';
import { CartProvider } from '@/lib/cart-context';
import { ArrowLeft } from 'lucide-react';

function StoreContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products', { cache: 'no-store' });
        if (!response.ok) throw new Error('Error API');
        const data = (await response.json()) as Product[];
        setAllProducts(data);
      } catch (e) {
        setAllProducts(PRODUCTS);
      }
    };

    void loadProducts();
  }, []);

  const categories = Array.from(new Set(allProducts.map((p) => p.category)));
  const filteredProducts = selectedCategory
    ? allProducts.filter((p) => p.category === selectedCategory)
    : allProducts;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Tienda <span className="text-primary">Completa</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explora nuestro catálogo completo de productos agropecuarios premium. {allProducts.length} productos disponibles.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-20 px-4 md:px-8 bg-background border-b border-gray-100" id="categories">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Filtrar por Categoría</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                selectedCategory === null 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'border-2 border-gray-200 hover:border-primary text-foreground hover:bg-primary/5'
              }`}
            >
              Todos
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'border-2 border-gray-200 hover:border-primary text-foreground hover:bg-primary/5'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-32 px-4 md:px-8 bg-background" id="products">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
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
            <p className="text-xl text-muted-foreground">
              {filteredProducts.length} productos disponibles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <div className="text-7xl mb-6">🌾</div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                No hay productos en esta categoría
              </h3>
              <p className="text-xl text-muted-foreground mb-8">
                Intenta con otra categoría.
              </p>
              <Button 
                onClick={() => setSelectedCategory(null)} 
                className="premium-button bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Ver Todos los Productos
              </Button>
            </div>
          )}
        </div>
      </section>
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
