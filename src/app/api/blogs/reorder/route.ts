import { NextResponse } from 'next/server'
import { getDb, toObjectId } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const isAdmin = async () => {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'admin'
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { items } = await req.json()
    
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid items array' }, { status: 400 })
    }

    const db = await getDb()
    const collection = db.collection('blogs')
    
    const updatePromises = items.map((item: any, index: number) => 
      collection.updateOne(
        { _id: toObjectId(item.id) },
        { $set: { order: index } }
      )
    )
    
    await Promise.all(updatePromises)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reorder error:', error)
    return NextResponse.json({ error: 'Reorder failed' }, { status: 500 })
  }
}
