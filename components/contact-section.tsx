'use client';

export function ContactSection() {
  return (
    <section id="contacto" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Contactanos</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              Sede Arequipa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Tu nombre y apellido"
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            />
            <input
              type="email"
              placeholder="Tu correo electronico"
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            />
            <input
              type="tel"
              placeholder="Tu telefono"
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            />
            <textarea
              placeholder="Tu mensaje"
              rows={4}
              className="w-full rounded-lg border border-input bg-background px-4 py-3"
            />
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="w-4 h-4" />
              Politica de privacidad.
            </label>
            <button
              type="button"
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
              <h3 className="text-lg font-semibold mb-2">Terminos</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Politicas de Privacidad</li>
                <li>Libro de Reclamaciones</li>
                <li>Politicas de no discriminacion</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border text-sm text-muted-foreground">
          © 2026 Rockink IMM | Todos los Derechos Reservados
        </div>
      </div>
    </section>
  );
}

