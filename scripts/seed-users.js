import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

dotenv.config()

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

if (!uri || !dbName) {
  console.error('Missing MONGODB_URI or MONGODB_DB in environment')
  process.exit(1)
}

if (!adminEmail || !adminPassword) {
  console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment; aborting seed to avoid exposing credentials')
  process.exit(1)
}

;(async () => {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db(dbName)

    const hashed = bcrypt.hashSync(adminPassword, 10)

    await db.collection('users').updateOne(
      { email: adminEmail },
      {
        $set: {
          email: adminEmail,
          password: hashed,
          name: 'HABB Admin',
          role: 'admin',
          createdAt: new Date(),
        },
      },
      { upsert: true }
    )

    console.log('Admin user seeded using email from environment (password not logged)')
  } catch (err) {
    console.error('Seed users error:', err)
    process.exitCode = 1
  } finally {
    await client.close()
  }
})()
