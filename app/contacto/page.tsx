'use client';

import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/header';
import { ContactSection } from '@/components/contact-section';

function ContactPageContent() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContactSection />
    </div>
  );
}

export default function ContactPage() {
  return (
    <CartProvider>
      <ContactPageContent />
    </CartProvider>
  );
}
