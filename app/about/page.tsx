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

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/5 to-accent/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            Sobre <span className="gradient-text">Rockink IMM</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Tu socio confiable en la agricultura moderna, comprometidos con la calidad y la excelencia.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/10 to-background border-b border-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-block px-4 py-2 mb-6 bg-primary/10 border border-primary/30 rounded-full">
                <span className="text-primary font-semibold text-sm">Nuestra Razón de Ser</span>
              </div>
              <h2 className="text-5xl font-bold mb-6 text-foreground leading-tight">Transformando la Agricultura</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                En Rockink IMM, creemos que cada agricultor merece acceso a productos de la más alta calidad. Nuestra misión es revolucionar la forma en que los productores agrícolas obtienen los insumos que necesitan para prosperar.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Trabajamos incansablemente para conectar a farmers con productos premium que maximicen su rendimiento y rentabilidad, transformando cada cosecha en un éxito.
              </p>
              <Link href="/#products">
                <Button className="btn-primary px-8 py-6 text-lg shadow-lg hover:shadow-xl">
                  Descubre Nuestros Productos
                </Button>
              </Link>
            </div>
            
            <div className="animate-slide-in-right">
              <div className="space-y-6">
                <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 hover:border-primary/50 transition-smooth hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Precisión</h3>
                    <p className="text-muted-foreground">Seleccionamos cada producto con cuidado para garantizar excelencia.</p>
                  </div>
                </div>

                <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-secondary/15 to-accent/10 border border-secondary/20 hover:border-secondary/50 transition-smooth hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🌱</div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Sostenibilidad</h3>
                    <p className="text-muted-foreground">Comprometidos con el futuro verde de la agricultura.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 bg-accent/10 border border-accent/30 rounded-full">
              <span className="text-accent font-semibold text-sm">Pilares Fundamentales</span>
            </div>
            <h2 className="text-5xl font-bold text-foreground">Nuestros Valores Clave</h2>
            <p className="text-xl text-muted-foreground mt-4">Lo que nos define y guía cada decisión</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white/80 border border-border/40 hover:border-primary/50 transition-smooth group hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="bg-primary/10 rounded-xl p-4 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Excelencia</h3>
              <p className="text-muted-foreground">Comprometidos con la más alta calidad en cada aspecto de nuestro negocio y servicios.</p>
            </div>

            <div className="p-8 rounded-2xl bg-white/80 border border-border/40 hover:border-secondary/50 transition-smooth group hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="bg-secondary/10 rounded-xl p-4 w-fit mb-4 group-hover:bg-secondary/20 transition-colors">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Confianza</h3>
              <p className="text-muted-foreground">Construimos relaciones duraderas basadas en transparencia y confiabilidad total.</p>
            </div>

            <div className="p-8 rounded-2xl bg-white/80 border border-border/40 hover:border-primary/50 transition-smooth group hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="bg-primary/10 rounded-xl p-4 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Sostenibilidad</h3>
              <p className="text-muted-foreground">Promovemos prácticas agrícolas sostenibles para un futuro más verde y próspero.</p>
            </div>

            <div className="p-8 rounded-2xl bg-white/80 border border-border/40 hover:border-accent/50 transition-smooth group hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="bg-accent/10 rounded-xl p-4 w-fit mb-4 group-hover:bg-accent/20 transition-colors">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Innovación</h3>
              <p className="text-muted-foreground">Constantemente innovamos para ofrecer las mejores soluciones agrícolas modernas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/15 border-y border-border/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-primary font-semibold text-sm">Nuestro Viaje</span>
            </div>
            <h2 className="text-5xl font-bold text-foreground">Nuestra Historia de Éxito</h2>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-2xl shadow-lg">2020</div>
              </div>
              <div className="flex-grow pt-2 pl-6 border-l-2 border-primary/30 hover:border-primary/60 transition-colors group">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[11px] mt-2" />
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">El Comienzo</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">Rockink IMM nace con la visión de transformar el acceso a productos agropecuarios de calidad en América Latina. Conectamos directamente con agricultores y proveedores, sembrando las raíces de una revolución agrícola.</p>
              </div>
            </div>

            <div className="flex gap-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground font-bold text-2xl shadow-lg">2021-22</div>
              </div>
              <div className="flex-grow pt-2 pl-6 border-l-2 border-secondary/30 hover:border-secondary/60 transition-colors group">
                <div className="absolute w-4 h-4 bg-secondary rounded-full -left-[11px] mt-2" />
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">Crecimiento Exponencial</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">Expandimos nuestro catálogo a más de 1000 productos de proveedores verificados. Llegamos a 5000 agricultores satisfechos en Perú, transformando sus operaciones y aumentando sus ganancias significativamente.</p>
              </div>
            </div>

            <div className="flex gap-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground font-bold text-2xl shadow-lg">2023-24</div>
              </div>
              <div className="flex-grow pt-2 pl-6 border-l-2 border-accent/30 hover:border-accent/60 transition-colors group">
                <div className="absolute w-4 h-4 bg-accent rounded-full -left-[11px] mt-2" />
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">Era de Innovación</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">Implementamos tecnología de punta, análisis de datos e inteligencia artificial. Revolucionamos la experiencia del usuario con una plataforma intuitiva que optimiza cada aspecto del proceso de compra y distribución.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Highlight */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/5 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 bg-secondary/10 border border-secondary/30 rounded-full">
              <span className="text-secondary font-semibold text-sm">Talento Dedicado</span>
            </div>
            <h2 className="text-5xl font-bold text-foreground">Conoce Nuestro Equipo</h2>
            <p className="text-xl text-muted-foreground mt-4">Expertos apasionados por la agricultura moderna</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center animate-fade-in-up hover:shadow-xl transition-smooth" style={{ animationDelay: '0ms' }}>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-6xl shadow-lg group-hover:scale-110 transition-transform">👨‍🌾</div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Carlos Mendez</h3>
              <p className="text-lg font-semibold text-primary mb-4">Fundador & CEO</p>
              <p className="text-muted-foreground mb-4">20 años de experiencia en agricultura y tecnología agrícola de vanguardia.</p>
              <div className="pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground">Especialización: Estrategia & Visión</p>
              </div>
            </div>

            <div className="group text-center animate-fade-in-up hover:shadow-xl transition-smooth" style={{ animationDelay: '100ms' }}>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-6xl shadow-lg group-hover:scale-110 transition-transform">👩‍💼</div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">María García</h3>
              <p className="text-lg font-semibold text-secondary mb-4">Gerente de Operaciones</p>
              <p className="text-muted-foreground mb-4">Especialista en logística y cadena de suministro agrícola integral.</p>
              <div className="pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground">Especialización: Logística & Distribución</p>
              </div>
            </div>

            <div className="group text-center animate-fade-in-up hover:shadow-xl transition-smooth" style={{ animationDelay: '200ms' }}>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-6xl shadow-lg group-hover:scale-110 transition-transform">👨‍💻</div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Juan Rodriguez</h3>
              <p className="text-lg font-semibold text-accent mb-4">Director de Tecnología</p>
              <p className="text-muted-foreground mb-4">Experto en desarrollo de plataformas e-commerce modernas y escalables.</p>
              <div className="pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground">Especialización: Tecnología & Innovación</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-8 rounded-2xl bg-white/60 border border-border/40 backdrop-blur-sm hover:shadow-lg transition-smooth group">
              <div className="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform">1000+</div>
              <p className="text-foreground font-semibold">Productos Premium</p>
              <p className="text-sm text-muted-foreground mt-2">Cuidadosamente seleccionados</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/60 border border-border/40 backdrop-blur-sm hover:shadow-lg transition-smooth group">
              <div className="text-5xl font-bold text-secondary mb-3 group-hover:scale-110 transition-transform">5000+</div>
              <p className="text-foreground font-semibold">Clientes Satisfechos</p>
              <p className="text-sm text-muted-foreground mt-2">En todo Perú</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/60 border border-border/40 backdrop-blur-sm hover:shadow-lg transition-smooth group">
              <div className="text-5xl font-bold text-accent mb-3 group-hover:scale-110 transition-transform">24/7</div>
              <p className="text-foreground font-semibold">Disponibilidad</p>
              <p className="text-sm text-muted-foreground mt-2">Siempre para ti</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/60 border border-border/40 backdrop-blur-sm hover:shadow-lg transition-smooth group">
              <div className="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform">100%</div>
              <p className="text-foreground font-semibold">Garantía</p>
              <p className="text-sm text-muted-foreground mt-2">De Calidad Total</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">Transforma Tu Negocio Hoy</h2>
          <p className="text-2xl text-primary-foreground/95 mb-12">Únete a miles de agricultores que ya están cosechando éxito con Rockink IMM.</p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center">
            <Link href="/#products">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-10 py-7 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Explorar Productos Ahora
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/15 px-10 py-7 text-lg font-bold bg-transparent/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Acceso a Administración
              </Button>
            </Link>
          </div>

          <p className="text-primary-foreground/80 mt-8 text-lg">¿Preguntas? Contáctanos: +51 962838329</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Rockink IMM</h3>
              <p className="text-sm opacity-90">Transformando la agricultura con tecnología y calidad.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Enlaces</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li><a href="/" className="hover:opacity-100 transition">Inicio</a></li>
                <li><a href="/about" className="hover:opacity-100 transition">Sobre Nosotros</a></li>
                <li><a href="/#products" className="hover:opacity-100 transition">Productos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Empresa</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li><a href="/about" className="hover:opacity-100 transition">Nuestra Historia</a></li>
                <li><a href="/about" className="hover:opacity-100 transition">Equipo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Contacto</h4>
              <p className="text-sm opacity-90 mb-2">contacto@agrotienda.pe</p>
              <p className="text-sm opacity-90">+51 962838329</p>
            </div>
          </div>
          
          <div className="border-t border-primary/30 pt-8 text-center">
            <p className="text-sm opacity-90">© 2026 Rockink IMM. Todos los derechos reservados.</p>
          </div>
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

