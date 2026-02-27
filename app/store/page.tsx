'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
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
import { getCategories, mergeCategoriesWithProducts } from '@/lib/categories';
import { getProductBrand, normalizeBrandName, productMatchesBrand } from '@/lib/product-brand';
import { CartProvider, useCart } from '@/lib/cart-context';
import { ArrowLeft, Search, ShoppingCart, SlidersHorizontal, X } from 'lucide-react';

const CATEGORY_TREE = [
  { label: 'Consumibles' },
  { label: 'Hormonas' },
  { label: 'Inseminación Artificial Bovinos' },
  { label: 'Inseminación Artificial Ovinos' },
  {
    label: 'Línea de Ecógrafos',
    children: ['MARCA BMV', 'MARCA DRAMINSKI', 'MARCA IMV'],
  },
  {
    label: 'Materiales y Accesorios',
    children: ['Alimentadores para terneros', 'Equipos Detectores Draminski', 'Trampa para moscas'],
  },
  {
    label: 'Medios',
    children: ['OPU', 'Equipos'],
  },
  {
    label: 'Producción de Semen',
    children: ['Análisis de semen', 'Electro eyaculador', 'Llenado de impresión de pajillas'],
  },
  { label: 'Sin categorizar' },
  {
    label: 'Transferencia de embriones',
    children: ['Neovet', 'WTA'],
  },
];

function isPajillaToroProduct(product: Product) {
  const text = `${product.name} ${product.description} ${product.category}`.toLowerCase();
  return /\bpajillas?\b|\bsemen\b|\btoros?\b|\binseminaci[oó]n\b|\bia\b/.test(text);
}

function StoreContent() {
  const PRODUCTS_PER_PAGE = 16;
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isPajillasView, setIsPajillasView] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);
  const [storedCategories, setStoredCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [treeSearchTerm, setTreeSearchTerm] = useState('');
  const [selectedTreeFilters, setSelectedTreeFilters] = useState<string[]>([]);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'name_asc' | 'name_desc'>('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
    const params = new URLSearchParams(window.location.search);
    const brandParam = params.get('brand');
    const viewParam = params.get('view');
    setSelectedBrand(brandParam ? normalizeBrandName(brandParam) : null);
    setIsPajillasView(viewParam === 'pajillas');
  }, []);

  useEffect(() => {
    setStoredCategories(getCategories());
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const categories = useMemo(
    () => mergeCategoriesWithProducts(allProducts.map((p) => p.category), storedCategories),
    [allProducts, storedCategories]
  );

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const treeQ = selectedTreeFilters.map((v) => v.toLowerCase());
    const base = allProducts.filter((p) => {
      const text = `${p.name} ${p.description} ${p.category}`.toLowerCase();
      if (isPajillasView && !isPajillaToroProduct(p)) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedBrand && !productMatchesBrand(p, selectedBrand)) return false;
      if (onlyOffers && !p.inOffer) return false;
      if (treeQ.length > 0 && !treeQ.some((token) => text.includes(token))) return false;
      if (!q) return true;
      return (
        text.includes(q)
      );
    });

    if (sortBy === 'name_asc') return [...base].sort((a, b) => a.name.localeCompare(b.name, 'es'));
    if (sortBy === 'name_desc') return [...base].sort((a, b) => b.name.localeCompare(a.name, 'es'));
    return base;
  }, [allProducts, isPajillasView, selectedCategory, selectedBrand, onlyOffers, searchTerm, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const categoryPreviews = useMemo(
    () =>
      categories.map((category) => {
        const sample =
          allProducts.find((p) => p.category === category && p.image) ||
          allProducts.find((p) => p.category === category) ||
          null;
        return {
          category,
          image: sample?.image || '/placeholder.svg',
        };
      }),
    [categories, allProducts]
  );

  const handleAddedToCart = (product: Product) => {
    setToastMessage(`${product.name} agregado al carrito`);
  };

  const quickViewImages = quickViewProduct?.images?.length
    ? quickViewProduct.images.slice(0, 2)
    : quickViewProduct
    ? [quickViewProduct.image]
    : [];
  const availableBrands = Array.from(new Set(allProducts.map((p) => getProductBrand(p))));
  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (selectedBrand ? 1 : 0) +
    (onlyOffers ? 1 : 0) +
    (isPajillasView ? 1 : 0) +
    (searchTerm.trim() ? 1 : 0) +
    selectedTreeFilters.length;
  const quickCategories = categories.slice(0, 6);
  const filteredTree = useMemo(() => {
    const q = treeSearchTerm.trim().toLowerCase();
    if (!q) return CATEGORY_TREE;
    return CATEGORY_TREE.filter((item) => {
      if (item.label.toLowerCase().includes(q)) return true;
      return item.children?.some((child) => child.toLowerCase().includes(q));
    });
  }, [treeSearchTerm]);

  const paginationItems = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, 'dots-right', totalPages] as const;
    if (currentPage >= totalPages - 3) {
      return [1, 'dots-left', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
    }
    return [1, 'dots-left', currentPage - 1, currentPage, currentPage + 1, 'dots-right', totalPages] as const;
  }, [currentPage, totalPages]);

  const activeFilterChips = useMemo(() => {
    const chips: Array<{ key: string; label: string; onRemove: () => void }> = [];
    if (selectedCategory) {
      chips.push({
        key: `category-${selectedCategory}`,
        label: `Categoria: ${selectedCategory}`,
        onRemove: () => setSelectedCategory(null),
      });
    }
    if (selectedBrand) {
      chips.push({
        key: `brand-${selectedBrand}`,
        label: `Marca: ${selectedBrand}`,
        onRemove: () => setSelectedBrand(null),
      });
    }
    if (onlyOffers) {
      chips.push({
        key: 'offers',
        label: 'Solo ofertas',
        onRemove: () => setOnlyOffers(false),
      });
    }
    if (isPajillasView) {
      chips.push({
        key: 'pajillas',
        label: 'Vista pajillas',
        onRemove: () => setIsPajillasView(false),
      });
    }
    selectedTreeFilters.forEach((filter) => {
      chips.push({
        key: `tree-${filter}`,
        label: filter,
        onRemove: () => setSelectedTreeFilters((prev) => prev.filter((x) => x !== filter)),
      });
    });
    return chips;
  }, [selectedCategory, selectedBrand, onlyOffers, isPajillasView, selectedTreeFilters]);

  const toggleTreeFilter = (value: string) => {
    setSelectedTreeFilters((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSearchTerm('');
    setTreeSearchTerm('');
    setSelectedTreeFilters([]);
    setOnlyOffers(false);
    setIsPajillasView(false);
    setSortBy('relevance');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, isPajillasView, onlyOffers, sortBy, searchTerm, treeSearchTerm, selectedTreeFilters.length]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

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
            {isPajillasView ? (
              <>
                Vista <span className="text-primary">Pajillas de Toros</span>
              </>
            ) : (
              <>
                Tienda <span className="text-primary">Completa</span>
              </>
            )}
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl">
            Explora nuestro catalogo completo de soluciones de ingenieria ganadera. {allProducts.length} productos disponibles.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="#products">
              <Button className="rounded-full px-5">Explorar productos</Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-full px-5"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedBrand(null);
                setSearchTerm('');
                setTreeSearchTerm('');
                setSelectedTreeFilters([]);
                setOnlyOffers(false);
                setIsPajillasView(false);
                setSortBy('relevance');
              }}
            >
              Reiniciar filtros
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <div className="rounded-xl border bg-background/80 px-4 py-3">
              <p className="text-xs text-muted-foreground">Productos</p>
              <p className="text-xl font-bold text-foreground">{allProducts.length}</p>
            </div>
            <div className="rounded-xl border bg-background/80 px-4 py-3">
              <p className="text-xs text-muted-foreground">Categorías</p>
              <p className="text-xl font-bold text-foreground">{categories.length}</p>
            </div>
            <div className="rounded-xl border bg-background/80 px-4 py-3">
              <p className="text-xs text-muted-foreground">Marcas</p>
              <p className="text-xl font-bold text-foreground">{availableBrands.length}</p>
            </div>
            <div className="rounded-xl border bg-background/80 px-4 py-3">
              <p className="text-xs text-muted-foreground">Resultados</p>
              <p className="text-xl font-bold text-primary">{filteredProducts.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-6 md:px-8 bg-background" id="products">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside
            className="lg:col-span-4 xl:col-span-3 space-y-6 bg-card p-6 rounded-lg shadow-md border border-border"
          >
            <h2 className="text-lg font-bold text-foreground mb-4">Filtros</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={treeSearchTerm}
                onChange={(e) => setTreeSearchTerm(e.target.value)}
                placeholder="Buscar por categoría"
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary"
              />
              <div className="space-y-2">
                {filteredTree.map((item) => (
                  <div key={`tree-${item.label}`} className="space-y-1">
                    <label className="flex items-center gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={selectedTreeFilters.includes(item.label)}
                        onChange={() => toggleTreeFilter(item.label)}
                        className="h-4 w-4 rounded border-input focus:ring-2 focus:ring-primary"
                      />
                      {item.label}
                    </label>
                    {item.children?.map((child) => (
                      <label
                        key={`tree-${item.label}-${child}`}
                        className="ml-6 flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTreeFilters.includes(child)}
                          onChange={() => toggleTreeFilter(child)}
                          className="h-4 w-4 rounded border-input focus:ring-2 focus:ring-primary"
                        />
                        {child}
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-foreground">Productos</h2>
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} resultados encontrados
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                  onAddedToCart={handleAddedToCart}
                />
              ))}
            </div>

            {filteredProducts.length > PRODUCTS_PER_PAGE && (
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full px-4 py-2"
                >
                  Anterior
                </Button>
                <span className="px-4 py-2 text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full px-4 py-2"
                >
                  Siguiente
                </Button>
              </div>
            )}
          </div>
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
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0 z-50 rounded-lg border border-primary/20 bg-background px-4 py-3 shadow-xl">
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
