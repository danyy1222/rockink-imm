'use client';

import { FormEvent } from 'react';

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
    <section id="contacto" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Contactanos</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              Sede Arequipa
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Tu nombre y apellido"
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Tu correo electronico"
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Tu telefono"
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            />
            <textarea
              name="message"
              placeholder="Tu mensaje"
              rows={4}
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
              required
            />
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input name="privacy" type="checkbox" className="w-4 h-4" required />
              Politica de privacidad.
            </label>
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90"
            >
              Enviar mensaje
            </button>
          </form>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/rockinkperu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-semibold"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/rockink_imm/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-pink-600 text-white px-4 py-2 text-sm font-semibold"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@rockinkimm"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-black text-white px-4 py-2 text-sm font-semibold"
              >
                TikTok
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Contacto</h3>
              <p className="text-sm text-muted-foreground">Arequipa, Peru</p>
              <p className="text-sm text-muted-foreground">962838329</p>
              <p className="text-sm text-muted-foreground">contacto@rockinkimm.com</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Conocenos</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Nosotros</li>
                <li>Marcas Representadas</li>
                <li>Distribuidores</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h3 id="terminos" className="text-lg font-semibold mb-2 scroll-mt-28">Terminos</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li id="privacidad" className="scroll-mt-28">Politicas de Privacidad</li>
                <li>Libro de Reclamaciones</li>
                <li>Politicas de no discriminacion</li>
                <li id="cookies" className="scroll-mt-28">Politicas de Cookies</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="faq" className="scroll-mt-28 rounded-xl border border-border bg-card p-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Preguntas Frecuentes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>1. Te atendemos por WhatsApp para cotizacion y soporte tecnico comercial.</li>
            <li>2. Los productos en tienda se actualizan segun disponibilidad de inventario.</li>
            <li>3. Para compras por volumen, te asignamos atencion directa.</li>
          </ul>
        </div>

        <div className="pt-6 border-t border-border text-sm text-muted-foreground">
          © 2026 Rockink IMM | Todos los Derechos Reservados
        </div>
      </div>
    </section>
  );
}
