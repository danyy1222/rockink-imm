import { NextResponse, type NextRequest } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '@/lib/products-repo'
import { Product } from '@/lib/data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function jsonNoStore(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      Pragma: 'no-cache',
      Expires: '0',
      ...(init?.headers || {}),
    },
  })
}

const ADMIN_COOKIE = 'admin_access_ok'

function isAuthorized(request: Request) {
  const adminKey = process.env.ADMIN_ACCESS_KEY
  const headerKey = request.headers.get('x-admin')
  if (adminKey && headerKey === adminKey) return true
  const cookieHeader = request.headers.get('cookie') || ''
  return cookieHeader.split(/; */).some((pair) => pair.startsWith(`${ADMIN_COOKIE}=1`))
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await getProductById(id)
    if (!product) {
      return jsonNoStore({ message: 'Producto no encontrado' }, { status: 404 })
    }
    return jsonNoStore(product)
  } catch {
    return jsonNoStore({ message: 'Error al leer producto' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return jsonNoStore({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const patch = (await request.json()) as Partial<Product>
    const updated = await updateProduct(id, patch)
    if (!updated) {
      return jsonNoStore({ message: 'Producto no encontrado' }, { status: 404 })
    }
    return jsonNoStore(updated)
  } catch (error) {
    return jsonNoStore({ message: 'Error al actualizar producto' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return jsonNoStore({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const ok = await deleteProduct(id)
    if (!ok) {
      return jsonNoStore({ message: 'Producto no encontrado' }, { status: 404 })
    }
    return jsonNoStore({ success: true })
  } catch {
    return jsonNoStore({ message: 'Error al eliminar producto' }, { status: 500 })
  }
}
