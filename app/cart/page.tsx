'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PRODUCTS, PHONE_NUMBERS } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { CartProvider } from '@/lib/cart-context';
import { Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function CartContent() {
  const { items, removeItem, updateQuantity, getTotalItems, getPhoneNumber, clearCart } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);

  const cartProducts = items.map((item) => ({
    ...item,
    product: PRODUCTS.find((p) => p.id === item.productId),
  }));

  const totalItems = getTotalItems();
  const phoneNumber = getPhoneNumber();
  const whatsappMessage = encodeURIComponent(
    `Hola, me gustaría ordenar los siguientes productos:\n\n${cartProducts
      .map((cp) => `- ${cp.product?.name} (Cantidad: ${cp.quantity})`)
      .join('\n')}\n\nTotal de artículos: ${totalItems}`
  );

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s/g, '')}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Mi Carrito</h1>

        {items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground text-lg mb-4">Tu carrito está vacío</p>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90">
                  Ir de compras
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartProducts.map((cp) => (
                <Card key={cp.productId} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 bg-muted rounded flex-shrink-0">
                        {cp.product && (
                          <Image
                            src={cp.product.image || "/placeholder.svg"}
                            alt={cp.product.name}
                            fill
                            className="object-cover rounded"
                          />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow">
                        <Link href={`/product/${cp.productId}`}>
                          <h3 className="font-bold text-primary hover:text-secondary cursor-pointer">
                            {cp.product?.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {cp.product?.category}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(cp.productId, cp.quantity - 1)
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">
                          {cp.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(cp.productId, cp.quantity + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(cp.productId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary and Phone Info */}
            <div className="space-y-4">
              {/* Phone Tier Info */}
              <Card className="border-accent border-2">
                <CardContent className="pt-6">
                  <div className="mb-4 p-3 bg-accent/10 rounded">
                    <p className="text-sm font-semibold text-accent mb-2">
                      INFORMACIÓN DE CONTACTO
                    </p>
                    <p className="text-2xl font-bold text-primary mb-2">
                      {totalItems} Artículos
                    </p>

                    {totalItems <= 10 && (
                      <div className="text-sm text-foreground">
                        <p className="font-semibold mb-1">Rango: 1-10 productos</p>
                        <p className="text-lg font-bold text-primary">
                          {PHONE_NUMBERS.tier1}
                        </p>
                      </div>
                    )}
                    {totalItems > 10 && totalItems <= 50 && (
                      <div className="text-sm text-foreground">
                        <p className="font-semibold mb-1">Rango: 11-50 productos</p>
                        <p className="text-lg font-bold text-primary">
                          {PHONE_NUMBERS.tier2}
                        </p>
                      </div>
                    )}
                    {totalItems > 50 && (
                      <div className="text-sm text-foreground">
                        <p className="font-semibold mb-1">Rango: 50+ productos</p>
                        <p className="text-lg font-bold text-primary">
                          {PHONE_NUMBERS.tier3}
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">
                    El número de WhatsApp cambia según la cantidad de productos en tu carrito
                  </p>

                  <Button
                    onClick={() => setShowConfirm(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Contactar por WhatsApp
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      clearCart();
                    }}
                    className="w-full mt-2"
                  >
                    Limpiar carrito
                  </Button>
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  Continuar comprando
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Confirmar orden</h2>
              <p className="text-foreground mb-6">
                Se abrirá WhatsApp con el número <strong>{phoneNumber}</strong> para continuar con tu compra de <strong>{totalItems}</strong> artículos.
              </p>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-6">
                <p className="text-sm text-blue-800">
                  Tus datos de la orden se enviarán automáticamente. Luego podrás comunicarte directamente con nuestro equipo de ventas.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirm(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Abrir WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">© 2026 Rockink IMM - E-commerce Agropecuario</p>
          <p className="text-sm opacity-75">Productos de calidad para tu campo</p>
        </div>
      </footer>
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
}

