'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProductosPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la página principal de admin
    router.push('/admin');
  }, [router]);

  return null;
}
