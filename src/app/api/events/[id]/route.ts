import { NextResponse } from 'next/server'
import { getDb, toObjectId } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const isAdmin = async () => {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'admin'
}

export async function PUT(req: Request, context: any) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const params = context?.params
  const id = params ? (typeof params.then === 'function' ? (await params).id : params.id) : undefined
  const updates = await req.json()
  const db = await getDb()
  await db.collection('events').updateOne({ _id: toObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })
  const doc = await db.collection('events').findOne({ _id: toObjectId(id) })
  return NextResponse.json({ ...doc, id: doc?._id?.toString?.(), _id: undefined })
}

export async function DELETE(_: Request, context: any) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const params = context?.params
  const id = params ? (typeof params.then === 'function' ? (await params).id : params.id) : undefined
  const db = await getDb()
  await db.collection('events').deleteOne({ _id: toObjectId(id) })
  return NextResponse.json({ success: true })
}
