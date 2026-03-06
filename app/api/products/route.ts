import { NextResponse } from 'next/server'
import { createProduct, getProducts } from '@/lib/products-repo'
import { Product } from '@/lib/data'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ message: 'Error al leer productos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as Product
    if (!body?.name) {
      return NextResponse.json({ message: 'Nombre requerido' }, { status: 400 })
    }

    const created = await createProduct(body)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error al crear producto' }, { status: 500 })
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
