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
  const docs = await db.collection('careers').find({}).sort({ order: 1, createdAt: -1 }).toArray()
  return NextResponse.json(mapDocs(docs))
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { title, department, location, employmentType, summary, applyLink, tags, image } = body

  if (!title || !summary || !applyLink) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const db = await getDb()
  const insertDoc: any = {
    title,
    department,
    location,
    employmentType,
    summary,
    applyLink,
    tags,
    createdAt: new Date(),
  }

  if (image) insertDoc.image = image

  const result = await db.collection('careers').insertOne(insertDoc)

  return NextResponse.json({
    id: result.insertedId.toString(),
    title,
    department,
    location,
    employmentType,
    summary,
    applyLink,
    tags,
    image,
  })
}
