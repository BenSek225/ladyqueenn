import { NextResponse } from 'next/server'
import { getPaymentRequest, jekoConfigured } from '@/lib/jeko'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!jekoConfigured()) return NextResponse.json({ status: 'unknown' }, { status: 503 })
  const { id } = await params
  try {
    const payment = await getPaymentRequest(id)
    return NextResponse.json({ status: payment.status, reference: payment.reference, errorReason: payment.errorReason ?? null })
  } catch {
    return NextResponse.json({ status: 'unknown' }, { status: 502 })
  }
}
