import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ObjectId } from 'mongodb'

const isAdmin = async () => {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'admin'
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { order } = body // order: [{id: string, order: number}]

    if (!order || !Array.isArray(order)) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 })
    }

    const db = await getDb()
    const collection = db.collection('teamMembers')

    // Update each document's order field
    const bulkOps = order.map(({ id, order: orderValue }) => ({
      updateOne: {
        filter: { _id: new ObjectId(id) },
        update: { $set: { order: orderValue } },
      },
    }))

    if (bulkOps.length > 0) {
      await collection.bulkWrite(bulkOps)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reorder error:', error)
    return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 })
  }
}
