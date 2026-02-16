# AgroTienda - Plataforma E-commerce Agropecuaria

## Descripción
Plataforma profesional de e-commerce para venta de productos agropecuarios con sistema inteligente de carrito y panel de administración.

## Características Principales

### Para Clientes (Tienda Pública)
1. **Catálogo de Productos**
   - Visualización de productos agropecuarios (semillas, fertilizantes, herramientas, etc.)
   - Filtrado por categorías
   - Información detallada de cada producto (sin mostrar precios)
   - Videos de YouTube integrados en cada producto

2. **Carrito Inteligente**
   - Agregar/eliminar productos del carrito
   - Ajustar cantidades
   - Sistema automático de números de WhatsApp según cantidad:
     - **1-10 productos**: +51 949478966
     - **11-50 productos**: +51 959670506
     - **50+ productos**: +51 962838329

3. **Proceso de Compra**
   - Visualización del carrito
   - Confirmación de cantidad de artículos
   - Envío automático de orden por WhatsApp

### Para Administrador (Panel Admin)
1. **Autenticación Segura**
   - Login con usuario y contraseña
   - Usuario: `admin`
   - Contraseña: `admin`

2. **Gestión de Productos**
   - Crear nuevos productos
   - Editar productos existentes
   - Eliminar productos
   - Actualizar estado de stock
   - Agregar URLs de imágenes
   - Agregar IDs de videos de YouTube

3. **Interfaz Profesional**
   - Dashboard intuitivo
   - Formularios dinámicos
   - Visualización de todos los productos

## URLs de Acceso

- **Tienda Pública**: `http://localhost:3000/`
- **Carrito**: `http://localhost:3000/cart`
- **Panel Admin**: `http://localhost:3000/admin`
- **Login Admin**: `http://localhost:3000/admin/login`
- **Detalle Producto**: `http://localhost:3000/product/[id]`

## Estructura de Datos

### Producto
```typescript
{
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  specifications: string[];
  youtubeId: string;
  inStock: boolean;
}
```

## Flujo de Compra

1. Cliente navega por la tienda
2. Visualiza detalles de productos con videos
3. Agrega productos al carrito
4. Revisa el carrito y ve el número de WhatsApp correspondiente
5. Confirma la compra
6. Se abre WhatsApp con el número automático y datos de la orden

## Números de WhatsApp Según Volumen

| Rango de Productos | Número | Descripción |
|------------------|--------|------------|
| 1-10 | +51 949478966 | Ventas estándar |
| 11-50 | +51 959670506 | Ventas mayoristas |
| 50+ | +51 962838329 | Grandes volúmenes |

## Almacenamiento de Datos

Los datos se almacenan de forma temporal en:
- **Productos**: Código (se pueden editar en el panel admin)
- **Carrito**: localStorage del navegador
- **Sesión Admin**: sessionStorage del navegador

## Personalización

### Cambiar Colores
Editar `/app/globals.css` - sección `:root` y `.dark`

### Cambiar Números de WhatsApp
Editar `/lib/data.ts` - objeto `PHONE_NUMBERS`

### Agregar Nuevos Productos
- Usar el panel admin
- O editar directamente `/lib/data.ts` en el array `PRODUCTS`

### Cambiar Credenciales Admin
Editar `/lib/auth-context.tsx` - variables `ADMIN_USERNAME` y `ADMIN_PASSWORD`

## Tecnologías Utilizadas

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide Icons

## Notas Importantes

⚠️ **Bases de Datos Temporales**: Los datos se guardan en memoria/localStorage y se pierden al actualizar la página (excepto el carrito que se persiste en localStorage)

⚠️ **Autenticación Simple**: El sistema de login es de demostración. Para producción, implementar autenticación más segura.

⚠️ **Precios Ocultos**: Los precios NO se muestran en la tienda. El modelo es contacto directo por WhatsApp.

## Soporte

Para cambios adicionales o información, revisar la estructura del código:
- Componentes: `/components/`
- Páginas: `/app/`
- Contextos: `/lib/`
