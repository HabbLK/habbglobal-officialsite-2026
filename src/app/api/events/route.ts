import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { getServerSession, Session } from 'next-auth'
import { authOptions } from '@/lib/auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string | null
    }
  }
}

const isAdmin = async () => {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'admin'
}

const mapDocs = (docs: any[] = []) =>
  docs.map((doc) => ({
    ...doc,
    id: doc._id?.toString?.(),
    _id: undefined,
  }))

export async function GET() {
  const db = await getDb()
  const docs = await db.collection('events').find({}).sort({ order: 1, createdAt: -1 }).toArray()
  return NextResponse.json(mapDocs(docs))
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { title, description, image, link } = body

  if (!title || !description || !image || !link) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const db = await getDb()
  const result = await db.collection('events').insertOne({
    title,
    description,
    image,
    link,
    createdAt: new Date(),
  })

  return NextResponse.json({
    id: result.insertedId.toString(),
    title,
    description,
    image,
    link,
  })
}
