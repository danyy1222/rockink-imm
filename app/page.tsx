'use client';

import Link from "next/link"
import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Brand, DEFAULT_BRANDS, HeroSlide, DEFAULT_HERO_SLIDES } from '@/lib/data';
import { normalizeBrandName } from '@/lib/product-brand';
import { CartProvider } from '@/lib/cart-context';
import { ArrowRight, Truck, ShieldCheck, Sparkles, MessagesSquare, Instagram, Facebook } from 'lucide-react';

function HomeContent() {
  const [brands, setBrands] = useState<Brand[]>(DEFAULT_BRANDS);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const loadHomepageData = async () => {
    try {
      const configRes = await fetch('/api/site-config', { cache: 'no-store' });

      if (configRes.ok) {
        const config = (await configRes.json()) as {
          brands?: Brand[];
          heroSlides?: HeroSlide[];
        };
        setBrands(Array.isArray(config.brands) && config.brands.length > 0 ? config.brands : DEFAULT_BRANDS);
        setHeroSlides(
          Array.isArray(config.heroSlides) && config.heroSlides.length > 0
            ? config.heroSlides
            : DEFAULT_HERO_SLIDES
        );
      } else {
        setBrands(DEFAULT_BRANDS);
        setHeroSlides(DEFAULT_HERO_SLIDES);
      }
    } catch (e) {
      setBrands(DEFAULT_BRANDS);
      setHeroSlides(DEFAULT_HERO_SLIDES);
    }
  };

  useEffect(() => {
    void loadHomepageData();

    // Sincronizar cambios hechos en otras pestañas/ventanas y al volver a foco
    const handleStorage = () => void loadHomepageData();
    const handleFocus = () => void loadHomepageData();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    if (currentHeroIndex >= heroSlides.length) {
      setCurrentHeroIndex(0);
    }
  }, [currentHeroIndex, heroSlides.length]);

  const currentHeroSlide = heroSlides[currentHeroIndex] || DEFAULT_HERO_SLIDES[0];
  const homeBenefits = [
    {
      title: 'Asesoria personalizada',
      description: 'Te ayudamos a elegir productos correctos para tu necesidad real.',
      icon: MessagesSquare,
    },
    {
      title: 'Calidad validada',
      description: 'Trabajamos con marcas y lineas probadas en campo.',
      icon: ShieldCheck,
    },
    {
      title: 'Atencion agil',
      description: 'Canal rapido por WhatsApp para consultas y seguimiento.',
      icon: Truck,
    },
  ];
  const steps = [
    { title: 'Explora el catalogo', description: 'Filtra por categoria, marca o texto en segundos.' },
    { title: 'Compara y revisa', description: 'Mira fotos, video y especificaciones del producto.' },
    { title: 'Contacta y cierra', description: 'Coordina por WhatsApp con atencion directa.' },
  ];
  const socialCards = [
    {
      name: 'Facebook',
      handle: '/rockinkperu',
      href: 'https://www.facebook.com/rockinkperu',
      icon: Facebook,
      color: 'from-blue-600 to-blue-500',
    },
    {
      name: 'Instagram',
      handle: '@rockink_imm',
      href: 'https://www.instagram.com/rockink_imm/',
      icon: Instagram,
      color: 'from-rose-500 to-orange-400',
    },
    {
      name: 'TikTok',
      handle: '@rockinkimm',
      href: 'https://www.tiktok.com/@rockinkimm',
      icon: null,
      color: 'from-zinc-900 to-zinc-700',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative isolate min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6 md:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentHeroIndex ? 'opacity-100' : 'opacity-0'
              } bg-cover md:bg-contain bg-no-repeat bg-center`}
              style={{
                backgroundImage: `url(${slide.url})`,
                filter: 'brightness(0.82) saturate(1.05)',
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/45" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-14">
          <div className="mb-6 sm:mb-8 inline-block">
            <div className="px-4 py-2 sm:px-6 sm:py-3 bg-white/10 border border-white/20 rounded-full">
              <span className="text-white font-semibold text-sm">{currentHeroSlide.badge}</span>
            </div>
          </div>

          <h1 className="hero-text text-white mb-6 sm:mb-8 max-w-5xl mx-auto [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]" role="heading" aria-level={1}>
            {currentHeroSlide.title}
          </h1>

          <p className="hero-subtext text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 font-light [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
            {currentHeroSlide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-16">
            <Link href="/store" className="w-full sm:w-auto">
              <Button className="premium-button w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg">
                Ver Tienda
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/store" className="w-full sm:w-auto">
              <Button variant="outline" className="premium-button w-full sm:w-auto border-2 border-white/40 text-white hover:bg-white/10 text-base sm:text-lg bg-transparent">
                Ver Tienda Completa
              </Button>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-20 pt-10 sm:pt-20 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">1000+</div>
              <p className="text-white/90 font-medium">Productos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">5000+</div>
              <p className="text-white/90 font-medium">Clientes Felices</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-white/90 font-medium">Disponible</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentHeroIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentHeroIndex ? 'bg-primary w-8' : 'bg-white/50 w-2 hover:bg-white/75'
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">Marcas que Trabajan con Nosotros</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Alianzas estratégicas con las mejores marcas del sector agrícola</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/store?brand=${encodeURIComponent(normalizeBrandName(brand.name))}`}
                className="bg-white rounded-lg p-8 flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-border/20 hover:border-primary/50"
              >
                <div className="relative w-full h-24 flex flex-col items-center justify-center gap-2">
                  <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="max-w-full max-h-full object-contain" />
                  <span className="text-xs font-semibold text-muted-foreground">{normalizeBrandName(brand.name)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Una experiencia mas simple y rapida</h2>
            <p className="text-muted-foreground text-base sm:text-lg">Todo el flujo pensado para que encuentres lo que necesitas sin perder tiempo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {homeBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Como comprar en Rockink IMM</h2>
            <Sparkles className="w-7 h-7 text-primary animate-float" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, idx) => (
              <div key={step.title} className="rounded-2xl bg-background border border-border p-6 relative overflow-hidden">
                <div className="text-4xl font-black text-primary/20 absolute -top-2 -right-2">{`0${idx + 1}`}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Siguenos en redes sociales</h2>
            <p className="text-muted-foreground">Novedades, lanzamientos y contenido del dia a dia en campo.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialCards.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${social.color}`} />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-foreground">{social.name}</p>
                    {social.icon ? (
                      <social.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-foreground text-background">TT</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{social.handle}</p>
                  <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                    Visitar
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary-foreground mb-6 sm:mb-8 leading-tight">Estamos Listos para Ayudarte</h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12">Únete a miles de agricultores que confían en Rockink IMM para sus necesidades.</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/store">
              <Button className="premium-button w-full sm:w-auto bg-primary-foreground text-primary hover:bg-white text-lg font-bold">
                Ir a Tienda
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="premium-button w-full sm:w-auto border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20 text-lg font-bold bg-transparent">
                Conocer Más
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12 sm:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logoempresa.png" alt="Rockink IMM" className="w-8 h-8" />
                <span className="font-bold text-xl text-white">Rockink IMM</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Soluciones agrícolas premium transformando la producción con productos de calidad e innovación continua.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Productos</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/store" className="hover:text-primary transition">Catálogo Completo</a></li>
                <li><a href="#categories" className="hover:text-primary transition">Categorías</a></li>
                <li><a href="/about" className="hover:text-primary transition">Sobre Nosotros</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Soporte</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition">Centro de Ayuda</a></li>
                <li><a href="#" className="hover:text-primary transition">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-primary transition">Contactanos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition">Privacidad</a></li>
                <li><a href="#" className="hover:text-primary transition">Términos</a></li>
                <li><a href="#" className="hover:text-primary transition">Cookies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Contacto</h4>
              <p className="text-gray-400 text-sm mb-2">contacto@rockinkimm.com</p>
              <p className="text-gray-400 text-sm mb-4">+51 962838329</p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/rockinkperu"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition"
                >
                  <span className="text-xs">FB</span>
                </a>
                <a
                  href="https://www.instagram.com/rockink_imm/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition"
                >
                  <span className="text-xs">IG</span>
                </a>
                <a
                  href="https://www.tiktok.com/@rockinkimm"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition"
                >
                  <span className="text-xs">TT</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2026 Rockink IMM. Todos los derechos reservados.</p>
            <p className="text-gray-500 text-xs mt-2">Transformando la agricultura con innovación y calidad</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}


