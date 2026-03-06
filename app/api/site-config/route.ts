import { NextResponse } from 'next/server'
import { getSiteConfig, updateSiteConfig } from '@/lib/site-config-repo'
import { SiteConfig } from '@/lib/site-config-db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

const ADMIN_COOKIE = 'admin_access_ok'

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

function isAuthorized(request: Request) {
  const adminKey = process.env.ADMIN_ACCESS_KEY
  const headerKey = request.headers.get('x-admin')
  if (adminKey && headerKey === adminKey) return true
  const cookieHeader = request.headers.get('cookie') || ''
  return cookieHeader.split(/; */).some((pair) => pair.startsWith(`${ADMIN_COOKIE}=1`))
}

export async function GET() {
  try {
    const config = await getSiteConfig()
    return jsonNoStore(config)
  } catch {
    return jsonNoStore({ message: 'Error al leer configuracion' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return jsonNoStore({ message: 'Unauthorized' }, { status: 401 })
    }

    const patch = (await request.json()) as Partial<SiteConfig>
    const updated = await updateSiteConfig(patch)
    return jsonNoStore(updated)
  } catch {
    return jsonNoStore({ message: 'Error al guardar configuracion' }, { status: 500 })
  }
}
