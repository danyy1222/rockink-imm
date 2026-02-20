'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PRODUCTS, PHONE_NUMBERS, Product } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { CartProvider } from '@/lib/cart-context';
import { ArrowLeft, ShoppingCart, Check, Download, MessageCircle, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { createElement, use, useEffect, useMemo, useState } from 'react';

function ProductDetailContent({ productId }: { productId: string }) {
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openZoom, setOpenZoom] = useState(false);
  const [activeMedia, setActiveMedia] = useState<'video' | 'model3d'>('video');
  const { addItem } = useCart();

  const product = allProducts.find((p) => p.id === productId);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products', { cache: 'no-store' });
        if (!response.ok) throw new Error('Error API');
        const data = (await response.json()) as Product[];
        setAllProducts(data);
      } catch {
        setAllProducts(PRODUCTS);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    void loadProducts();
  }, []);

  const images = useMemo(() => {
    if (!product) return [] as string[];
    return product.images && product.images.length > 0 ? product.images : [product.image];
  }, [product]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [productId]);

  const relatedProducts = useMemo(() => {
    if (!product) return [] as Product[];
    return allProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [allProducts, product]);

  const handleAddCart = () => {
    addItem(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleDownloadFicha = () => {
    if (!product) return;
    const text = [
      `Producto: ${product.name}`,
      `Categoria: ${product.category}`,
      `Descripcion: ${product.description}`,
      '',
      'Especificaciones:',
      ...product.specifications.map((s, i) => `${i + 1}. ${s}`),
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ficha-${product.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
          <Link href="/store">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a la tienda
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentImage = images[activeImageIndex] || '/placeholder.svg';
  const model3dUrl = product.model3dEmbedUrl?.trim() || '';
  const has3dModel = Boolean(model3dUrl);
  const isGlbModel = /\.glb(\?|$)/i.test(model3dUrl);
  const waPhone = PHONE_NUMBERS.tier1.replace(/\D/g, '');
  const waText = encodeURIComponent(
    `Hola Rockink IMM, quiero informacion de este producto: ${product.name} (ID: ${product.id})`
  );
  const waLink = `https://wa.me/${waPhone}?text=${waText}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link href="/store" className="text-primary hover:text-secondary flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver a la tienda
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setOpenZoom(true)}
              className="relative w-full h-[420px] bg-card rounded-lg overflow-hidden border border-border"
            >
              <Image src={currentImage} alt={product.name} fill className="object-cover" />
            </button>

            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={`${product.id}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-24 rounded-md overflow-hidden border ${
                    idx === activeImageIndex ? 'border-primary' : 'border-border'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold mb-3">
              {product.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{product.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[0, 1, 2].map((i) => (
                <Card key={i} className="border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                      <p className="text-sm text-foreground line-clamp-2">
                        {product.specifications[i] || 'Calidad premium para mejor rendimiento'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Button
                onClick={handleAddCart}
                disabled={!product.inStock}
                className="bg-primary hover:bg-primary/90 text-lg py-6"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {added ? 'Agregado' : 'Agregar al carrito'}
              </Button>

              <a href={waLink} target="_blank" rel="noreferrer">
                <Button variant="outline" className="w-full text-lg py-6">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Comprar por WhatsApp
                </Button>
              </a>
            </div>

            <Button onClick={handleDownloadFicha} variant="ghost" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Descargar ficha tecnica
            </Button>

            {added && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-center mt-4">
                Producto agregado exitosamente
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-card py-12 px-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary">Centro Multimedia</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Cambia entre video y modelo 3D en un solo bloque.
            </p>
          </div>

          <Card className="border-border/60">
            <CardContent className="p-3 sm:p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setActiveMedia('video')}
                  className={`rounded-lg px-4 py-3 text-left border transition ${
                    activeMedia === 'video'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold text-sm">Video</p>
                  <p className="text-xs text-muted-foreground">Demostración del producto</p>
                </button>
                <button
                  type="button"
                  onClick={() => has3dModel && setActiveMedia('model3d')}
                  disabled={!has3dModel}
                  className={`rounded-lg px-4 py-3 text-left border transition ${
                    activeMedia === 'model3d'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  } ${!has3dModel ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <p className="font-semibold text-sm">Vista 3D</p>
                  <p className="text-xs text-muted-foreground">
                    {has3dModel ? 'Interactúa con el modelo' : 'No disponible'}
                  </p>
                </button>
              </div>

              {activeMedia === 'video' && (
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
              )}

              {activeMedia === 'model3d' && has3dModel && (
                <div className="space-y-3">
                  {isGlbModel ? (
                    <>
                      <Script
                        type="module"
                        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                        strategy="afterInteractive"
                      />
                      <div className="w-full h-[460px] rounded-lg overflow-hidden bg-black/80 border border-border">
                        {createElement('model-viewer', {
                          src: model3dUrl,
                          alt: `Modelo 3D de ${product.name}`,
                          poster: product.image,
                          class: 'w-full h-full',
                          style: { width: '100%', height: '100%' },
                          'camera-controls': true,
                          'auto-rotate': true,
                          'auto-rotate-delay': '1200',
                          'shadow-intensity': '1',
                          'interaction-prompt': 'auto',
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={model3dUrl}
                        title="Modelo 3D del producto"
                        frameBorder="0"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              )}

              {activeMedia === 'model3d' && !has3dModel && (
                <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
                  Este producto todavia no tiene modelo 3D configurado.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveMedia('video')}
                  className={`relative h-28 rounded-lg overflow-hidden border text-left ${
                    activeMedia === 'video' ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Image src={product.image || '/placeholder.svg'} alt="Miniatura de video" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/45 flex items-end p-2">
                    <span className="text-white text-xs font-semibold">Video de YouTube</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => has3dModel && setActiveMedia('model3d')}
                  disabled={!has3dModel}
                  className={`relative h-28 rounded-lg overflow-hidden border text-left ${
                    activeMedia === 'model3d' ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary/50'
                  } ${!has3dModel ? 'opacity-55 cursor-not-allowed' : ''}`}
                >
                  <Image src={product.image || '/placeholder.svg'} alt="Miniatura de vista 3D" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/45 flex items-end p-2">
                    <span className="text-white text-xs font-semibold">
                      {has3dModel ? 'Modelo 3D' : '3D no disponible'}
                    </span>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Productos relacionados</h2>
          <Link href="/store" className="text-sm text-primary underline">
            Ver mas
          </Link>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`} className="group">
                <Card className="overflow-hidden h-full border-border/60 hover:border-primary/50 transition-colors">
                  <div className="relative h-40 w-full">
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                    <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No hay productos relacionados por ahora.</p>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">Lo que valoran nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Excelente calidad y entrega rapida. Muy recomendado para trabajo diario.',
            'La atencion fue clara y el producto supero expectativas.',
            'Muy buena relacion calidad-precio y soporte por WhatsApp inmediato.',
          ].map((review, idx) => (
            <Card key={idx} className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">© 2026 Rockink IMM - E-commerce Agropecuario</p>
          <p className="text-sm opacity-75">Productos de calidad para tu campo</p>
        </div>
      </footer>

      <Dialog open={openZoom} onOpenChange={setOpenZoom}>
        <DialogContent className="sm:max-w-4xl p-2">
          <div className="relative w-full h-[70vh] rounded-md overflow-hidden bg-black">
            <Image src={currentImage} alt={product.name} fill className="object-contain" />
          </div>
        </DialogContent>
      </Dialog>
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

