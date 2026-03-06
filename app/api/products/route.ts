import { NextResponse } from 'next/server'
import { createProduct, getProducts } from '@/lib/products-repo'
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

export async function GET() {
  try {
    const products = await getProducts()
    return jsonNoStore(products)
  } catch (error) {
    return jsonNoStore({ message: 'Error al leer productos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return jsonNoStore({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as Product
    if (!body?.name) {
      return jsonNoStore({ message: 'Nombre requerido' }, { status: 400 })
    }

    const created = await createProduct(body)
    return jsonNoStore(created, { status: 201 })
  } catch (error) {
    return jsonNoStore({ message: 'Error al crear producto' }, { status: 500 })
  }
}
const ADMIN_COOKIE = 'admin_access_ok'

function isAuthorized(request: Request) {
  const adminKey = process.env.ADMIN_ACCESS_KEY
  const headerKey = request.headers.get('x-admin')
  if (adminKey && headerKey === adminKey) return true
  const cookieHeader = request.headers.get('cookie') || ''
  return cookieHeader.split(/; */).some((pair) => pair.startsWith(`${ADMIN_COOKIE}=1`))
}
