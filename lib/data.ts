export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  image: string;
  model3dEmbedUrl?: string;
  specifications: string[];
  youtubeId: string;
  inStock: boolean;
  inOffer?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface HeroSlide {
  id: string;
  url: string;
  badge: string;
  title: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Semillas de Maíz Híbrido Premium',
    description: 'Semillas de maíz híbrido de alta calidad para obtener mejores rendimientos en tus cultivos.',
    category: 'Semillas',
    image: 'https://images.unsplash.com/photo-1574895617837-7e16022e5ecb?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1574895617837-7e16022e5ecb?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=500&h=500&fit=crop',
    ],
    specifications: ['Rendimiento: 15-18 ton/ha', 'Ciclo vegetativo: 130-140 días', 'Tolerancia a sequía: Alta'],
    youtubeId: 'dQw4w9WgXcQ',
    inStock: true,
    inOffer: true,
  },
  {
    id: '2',
    name: 'Abono Orgánico Concentrado',
    description: 'Abono 100% orgánico para mejorar la fertilidad de tus suelos de manera natural.',
    category: 'Fertilizantes',
    image: 'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1574895617837-7e16022e5ecb?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1626693566450-cf282c3b316d?w=500&h=500&fit=crop',
    ],
    specifications: ['Nitrógeno: 5%', 'Fósforo: 3%', 'Potasio: 2%', 'Materia orgánica: 85%'],
    youtubeId: 'dQw4w9WgXcQ',
    inStock: true,
    inOffer: true,
  },
  {
    id: '3',
    name: 'Pesticida Ecológico Natural',
    description: 'Insecticida 100% natural sin químicos peligrosos para proteger tu cultivo.',
    category: 'Pesticidas',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517648713202-36953330e2d5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=500&fit=crop',
    ],
    specifications: ['Componente activo: Neem', 'Concentración: 3%', 'Duración: 7-10 días'],
    youtubeId: 'dQw4w9WgXcQ',
    inStock: true,
    inOffer: false,
  },
  {
    id: '4',
    name: 'Kit de Herramientas Agrícolas',
    description: 'Set completo de herramientas manuales para el trabajo diario en tu chacra.',
    category: 'Herramientas',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1574895617837-7e16022e5ecb?w=500&h=500&fit=crop',
    ],
    specifications: ['Pala, azadón, rastrillo, pico', 'Material: Acero reforzado', 'Mango de madera tratada'],
    youtubeId: 'dQw4w9WgXcQ',
    inStock: true,
    inOffer: true,
  },
  {
    id: '5',
    name: 'Malla de Sombreo 50%',
    description: 'Malla de sombreo para proteger tus plantas del exceso de radiación solar.',
    category: 'Estructuras',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1574264867378-0a0ce0f4a9b0?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=500&h=500&fit=crop',
    ],
    specifications: ['Sombreo: 50%', 'Ancho: 2 metros', 'Material: Polietileno de alta densidad'],
    youtubeId: 'dQw4w9WgXcQ',
    inStock: true,
    inOffer: false,
  },
  {
    id: '6',
    name: 'Semillas de Papa Certificadas',
    description: 'Semillas de papa certificadas libres de enfermedades para mejor producción.',
    category: 'Semillas',
    image: 'https://images.unsplash.com/photo-1599599810694-a4d9c6c4b5a7?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599599810694-a4d9c6c4b5a7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1574895617837-7e16022e5ecb?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=500&fit=crop',
    ],
    specifications: ['Variedad: Perricholi', 'Tamaño: 30-40 gramos', 'Vigor: Excelente'],
    youtubeId: 'dQw4w9WgXcQ',
    inStock: true,
    inOffer: true,
  },
  {
    id: '7',
    name: 'Bioestimulante para Raíces',
    description: 'Promotor del crecimiento de raíces para mayor absorción de nutrientes.',
    category: 'Fertilizantes',
    image: 'https://images.unsplash.com/photo-1626693566450-cf282c3b316d?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1626693566450-cf282c3b316d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1574895617837-7e16022e5ecb?w=500&h=500&fit=crop',
    ],
    specifications: ['Ácidos húmicos: 10%', 'Aminoácidos: 5%', 'Microelementos: Incluidos'],
    youtubeId: 'dQw4w9WgXcQ',
    inStock: true,
    inOffer: false,
  },
  {
    id: '8',
    name: 'Sistema de Riego por Goteo',
    description: 'Sistema completo de riego automatizado para optimizar el uso del agua.',
    category: 'Riego',
    image: 'https://images.unsplash.com/photo-1574264867378-0a0ce0f4a9b0?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1574264867378-0a0ce0f4a9b0?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=500&h=500&fit=crop',
    ],
    specifications: ['Caudal: 30-40 metros', 'Espaciamiento: 20-30 cm', 'Material: PVC de 16mm'],
    youtubeId: 'dQw4w9WgXcQ',
    inStock: true,
    inOffer: true,
  },
  {
    id: '9',
    name: 'Fungicida Preventivo',
    description: 'Producto preventivo contra enfermedades fúngicas comunes en cultivos.',
    category: 'Pesticidas',
    image: 'https://images.unsplash.com/photo-1517648713202-36953330e2d5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517648713202-36953330e2d5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=500&fit=crop',
    ],
    specifications: ['Principio activo: Cobre', 'Concentración: 48%', 'Dosis: 2-3 kg/ha'],
    youtubeId: 'dQw4w9WgXcQ',
    inStock: true,
    inOffer: false,
  },
  {
    id: '10',
    name: 'Bolsas de Almácigo Biodegradables',
    description: 'Bolsas ecológicas para almácigos que se descomponen naturalmente.',
    category: 'Insumos',
    image: 'https://images.unsplash.com/photo-1578482840093-1c28bffa0d46?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578482840093-1c28bffa0d46?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1574895617837-7e16022e5ecb?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=500&fit=crop',
    ],
    specifications: ['Tamaño: 10x15 cm', 'Material: Papel biodegradable', 'Cantidad: 500 unidades'],
    youtubeId: 'dQw4w9WgXcQ',
    inStock: true,
    inOffer: false,
  },
];

export const DEFAULT_BRANDS: Brand[] = [
  {
    id: '1',
    name: 'Lister',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'CRV',
    logo: 'https://images.unsplash.com/photo-1560264357-8d9766985b90?w=200&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Melasty',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'Sunway',
    logo: 'https://images.unsplash.com/photo-1560264357-8d9766985b90?w=200&h=100&fit=crop',
  },
];

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=1600&h=900&fit=crop',
    badge: 'Bienvenido a Rockink IMM',
    title: 'Ofertas Especiales Ahora',
    description: 'Descubre nuestros productos en oferta seleccionados especialmente para ti. Calidad premium a precios excepcionales.',
  },
  {
    id: 'hero-2',
    url: 'https://images.unsplash.com/photo-1574895617837-7e16022e5ecb?w=1600&h=900&fit=crop',
    badge: 'Calidad para tu campo',
    title: 'Rendimiento y Confianza',
    description: 'Equipos e insumos pensados para agricultores que buscan resultados reales temporada tras temporada.',
  },
  {
    id: 'hero-3',
    url: 'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=1600&h=900&fit=crop',
    badge: 'Atención personalizada',
    title: 'Soluciones que Sí Funcionan',
    description: 'Te ayudamos a elegir productos adecuados para mejorar productividad, salud del cultivo y eficiencia.',
  },
];

export const PHONE_NUMBERS = {
  tier1: '+51 962838329', // 1-10 productos
  tier2: '+51 962838329', // 11-50 productos
  tier3: '+51 962838329', // 50+ productos
};

