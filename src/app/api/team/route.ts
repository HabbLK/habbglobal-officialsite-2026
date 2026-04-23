import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

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
  const docs = await db.collection('teamMembers').find({}).sort({ order: 1, createdAt: -1 }).toArray()
  return NextResponse.json(mapDocs(docs))
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { name, position, image, linkedinLink } = body

  if (!name || !position || !image) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const db = await getDb()
  const result = await db.collection('teamMembers').insertOne({
    name,
    position,
    image,
    linkedinLink,
    createdAt: new Date(),
  })

  return NextResponse.json({
    id: result.insertedId.toString(),
    name,
    position,
    image,
    linkedinLink,
  })
}
