import { NextRequest, NextResponse } from 'next/server'
import { getDb, toObjectId } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const isAdmin = async () => {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'admin'
}

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const db = await getDb()
  const doc = await db.collection('blogs').findOne({ _id: toObjectId(id) })
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ...doc, id: doc._id.toString(), _id: undefined })
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await context.params
  const updates = await req.json()
  delete updates.id
  delete updates._id

  const db = await getDb()
  await db.collection('blogs').updateOne({ _id: toObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })
  const doc = await db.collection('blogs').findOne({ _id: toObjectId(id) })

  return NextResponse.json({ ...doc, id: doc?._id.toString(), _id: undefined })
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await context.params
  const db = await getDb()
  await db.collection('blogs').deleteOne({ _id: toObjectId(id) })

  return NextResponse.json({ success: true })
}
