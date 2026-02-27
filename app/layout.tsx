import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rockink IMM - Ingenieria Ganadera',
  description: 'Plataforma especializada en ingenieria ganadera, equipos tecnicos e insumos para operaciones pecuarias.',
  generator: 'v0.app',
  icons: {
    icon: '/logoempresa.png',
    shortcut: '/logoempresa.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
