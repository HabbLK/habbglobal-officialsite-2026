import { MongoClient, Db, ObjectId } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI || ''
const dbName = process.env.MONGODB_DB 

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

async function getClient(): Promise<MongoClient> {
  if (client) return client
  if (!clientPromise) {
    if (!uri) {
        throw new Error('MONGODB_URI is not defined in the environment variables')
    }
    clientPromise = MongoClient.connect(uri, {
      // retryable writes fail on local standalones; keep defaults simple
    })
  }
  client = await clientPromise
  return client
}

export async function getDb(): Promise<Db> {
  const cli = await getClient()
  return cli.db(dbName)
}

export function toObjectId(id: string): ObjectId {
  return new ObjectId(id)
}
