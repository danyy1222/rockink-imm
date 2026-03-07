'use client';

import { FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from 'lucide-react';

const faqs = [
  'Te atendemos por WhatsApp para cotizacion, soporte tecnico comercial y seguimiento.',
  'Los productos publicados se actualizan segun disponibilidad real de inventario.',
  'Para compras por volumen o proyectos especiales asignamos atencion directa.',
];

const channels = [
  {
    title: 'WhatsApp directo',
    value: '+51 962838329',
    href: 'https://wa.me/51962838329',
    icon: MessageCircle,
  },
  {
    title: 'Correo comercial',
    value: 'contacto@rockinkimm.com',
    href: 'mailto:contacto@rockinkimm.com',
    icon: Mail,
  },
  {
    title: 'Cobertura',
    value: 'Arequipa, Peru',
    href: 'https://maps.google.com/?q=Arequipa,Peru',
    icon: MapPin,
  },
];

export function ContactSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const message = String(data.get('message') || '').trim();
    const accepted = Boolean(data.get('privacy'));

    if (!name || !message || !accepted) return;

    const text = encodeURIComponent(
      [
        'Hola Rockink IMM, quiero contactarme.',
        `Nombre: ${name}`,
        email ? `Correo: ${email}` : '',
        phone ? `Telefono: ${phone}` : '',
        `Mensaje: ${message}`,
      ]
        .filter(Boolean)
        .join('\n')
    );

    window.open(`https://wa.me/51962838329?text=${text}`, '_blank');
    form.reset();
  };

  return (
    <>
      <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
            <Sparkles className="w-4 h-4" />
            Centro de contacto Rockink IMM
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Contacto directo para una operacion <span className="gradient-text">mas agil</span>
              </h1>
              <p className="mt-5 text-base sm:text-xl text-muted-foreground max-w-2xl">
                Hablemos de productos, soporte tecnico comercial, compras por volumen y soluciones
                para operaciones ganaderas con criterio real de campo.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#formulario-contacto">
                  <Button className="premium-button bg-primary text-primary-foreground hover:bg-primary/90">
                    Ir al formulario
                  </Button>
                </a>
                <a href="https://wa.me/51962838329" target="_blank" rel="noreferrer">
                  <Button
                    variant="outline"
                    className="premium-button border-primary/20 text-foreground hover:bg-primary/5 bg-background/70"
                  >
                    WhatsApp inmediato
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {channels.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="rounded-2xl border border-border bg-background/85 backdrop-blur-sm p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                      {item.title}
                    </p>
                    <p className="text-sm font-bold text-foreground break-words">{item.value}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                Operacion y soporte
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Respuesta clara, tecnica y comercial
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Atendemos consultas de producto, soporte tecnico comercial y proyectos de compra con
                una conversacion directa y sin friccion.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-muted/50 border border-border/70 p-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Telefono</p>
                  <p className="text-sm text-muted-foreground mt-1">+51 962838329</p>
                </div>

                <div className="rounded-2xl bg-muted/50 border border-border/70 p-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Cobertura</p>
                  <p className="text-sm text-muted-foreground mt-1">Atencion comercial y tecnica</p>
                </div>
              </div>
            </div>

            <div
              id="faq"
              className="scroll-mt-28 rounded-3xl border border-border bg-gradient-to-br from-card to-muted/30 p-6 sm:p-8 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-foreground mb-5">Preguntas frecuentes</h3>
              <div className="space-y-3">
                {faqs.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border/70 bg-background/90 px-4 py-4 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                  >
                    <p className="text-sm font-semibold text-primary mb-1">{`0${index + 1}`}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            id="formulario-contacto"
            className="scroll-mt-28 rounded-[2rem] border border-border bg-background shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary via-secondary to-accent px-6 sm:px-8 py-6 text-primary-foreground">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-90">Formulario</p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2">Escribenos tu necesidad</h3>
              <p className="mt-2 text-primary-foreground/85">
                Te respondemos con una conversacion mas directa por WhatsApp.
              </p>
            </div>

            <form className="space-y-4 p-6 sm:p-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Tu nombre y apellido"
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Tu correo electronico"
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <input
                name="phone"
                type="tel"
                placeholder="Tu telefono"
                className="w-full rounded-2xl border border-input bg-background px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />

              <textarea
                name="message"
                placeholder="Cuéntanos qué necesitas"
                rows={6}
                className="w-full rounded-2xl border border-input bg-background px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />

              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input name="privacy" type="checkbox" className="w-4 h-4 mt-1" required />
                <span>
                  Acepto la politica de privacidad y autorizo que Rockink IMM me contacte por los
                  medios indicados.
                </span>
              </label>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-2">
                <div className="text-sm text-muted-foreground">
                  Prioridad para mensajes de cotizacion y soporte tecnico comercial.
                </div>
                <Button type="submit" className="premium-button bg-primary text-primary-foreground hover:bg-primary/90">
                  Enviar mensaje
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18 px-4 sm:px-6 md:px-8 bg-muted/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-background border border-border p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary mb-2">Redes</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/rockinkperu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/rockink_imm/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-pink-600 text-white px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@rockinkimm"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-black text-white px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform"
              >
                TikTok
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-background border border-border p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-3">Conocenos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">Sobre nosotros</Link></li>
              <li><Link href="/store" className="hover:text-primary transition-colors">Marcas y catalogo</Link></li>
              <li><span>Distribuidores</span></li>
              <li><span>Blog</span></li>
            </ul>
          </div>

          <div className="rounded-2xl bg-background border border-border p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li id="privacidad" className="scroll-mt-28">Politicas de Privacidad</li>
              <li id="terminos" className="scroll-mt-28">Terminos</li>
              <li>Libro de Reclamaciones</li>
              <li id="cookies" className="scroll-mt-28">Politicas de Cookies</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-primary-foreground py-12 sm:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logoempresa.png" alt="Rockink IMM" className="w-8 h-8" />
                <span className="font-bold text-xl text-white">Rockink IMM</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Soluciones de ingenieria ganadera enfocadas en productividad, bienestar animal e innovacion continua.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Productos</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/store" className="hover:text-primary transition">Catalogo Completo</a></li>
                <li><a href="/store#categories" className="hover:text-primary transition">Categorias</a></li>
                <li><a href="/about" className="hover:text-primary transition">Sobre Nosotros</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Soporte</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/contacto" className="hover:text-primary transition">Centro de Ayuda</a></li>
                <li><a href="/contacto#faq" className="hover:text-primary transition">Preguntas Frecuentes</a></li>
                <li><a href="/contacto" className="hover:text-primary transition">Contactanos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/contacto#privacidad" className="hover:text-primary transition">Privacidad</a></li>
                <li><a href="/contacto#terminos" className="hover:text-primary transition">Terminos</a></li>
                <li><a href="/contacto#cookies" className="hover:text-primary transition">Cookies</a></li>
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
            <p className="text-gray-500 text-xs mt-2">Transformando la ingenieria ganadera con innovacion y calidad</p>
          </div>
        </div>
      </footer>
    </>
  );
}
