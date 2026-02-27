'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { CartProvider } from '@/lib/cart-context';
import { CheckCircle2, Users, Award, Leaf } from 'lucide-react';

function AboutContent() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden py-20 md:py-28 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/5 to-accent/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            Sobre <span className="gradient-text">Rockink IMM</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Tu socio confiable en ingenieria ganadera moderna, comprometido con calidad y excelencia operativa.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/10 to-background border-b border-border/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 mb-6 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-primary font-semibold text-sm">Nuestra Razon de Ser</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-foreground leading-tight">Ingenieria Ganadera de Precision</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              En Rockink IMM ayudamos a productores y empresas ganaderas a operar mejor, con tecnologia,
              equipamiento e insumos tecnicos de alto rendimiento.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nuestro enfoque combina seleccion tecnica, soporte comercial y acompanamiento para mejorar
              productividad, bienestar animal y eficiencia operativa.
            </p>
            <Link href="/store">
              <Button className="btn-primary px-8 py-6 text-lg shadow-lg hover:shadow-xl">Descubre Nuestros Productos</Button>
            </Link>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20">
              <p className="text-2xl font-bold mb-2">Precision</p>
              <p className="text-muted-foreground">Seleccion tecnica de productos para resultados consistentes.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-secondary/15 to-accent/10 border border-secondary/20">
              <p className="text-2xl font-bold mb-2">Sostenibilidad</p>
              <p className="text-muted-foreground">Operacion responsable, eficiente y orientada a continuidad.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-foreground">Nuestros Valores Clave</h2>
            <p className="text-xl text-muted-foreground mt-4">Base tecnica y humana para crecer con nuestros clientes</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white/80 border border-border/40">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Excelencia</h3>
              <p className="text-muted-foreground">Calidad y control en cada linea de producto.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/80 border border-border/40">
              <Users className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-3">Confianza</h3>
              <p className="text-muted-foreground">Relacion de largo plazo basada en cumplimiento.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/80 border border-border/40">
              <Leaf className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Sostenibilidad</h3>
              <p className="text-muted-foreground">Procesos eficientes con enfoque responsable.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/80 border border-border/40">
              <CheckCircle2 className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Innovacion</h3>
              <p className="text-muted-foreground">Mejora continua en tecnologia y servicio.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">Transforma tu Operacion Ganadera</h2>
          <p className="text-2xl text-primary-foreground/95 mb-12">Unete a miles de clientes que trabajan con Rockink IMM.</p>
          <Link href="/store">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-10 py-7 text-lg font-bold shadow-xl hover:shadow-2xl">
              Explorar Productos Ahora
            </Button>
          </Link>
          <p className="text-primary-foreground/80 mt-8 text-lg">Preguntas: +51 962838329</p>
        </div>
      </section>

      <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-90">Rockink IMM - Ingenieria Ganadera</p>
          <p className="text-sm opacity-90 mt-2">© 2026 Rockink IMM. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default function AboutPage() {
  return (
    <CartProvider>
      <AboutContent />
    </CartProvider>
  );
}
