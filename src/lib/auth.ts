import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import { getDb } from './mongodb'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.SECRET || "dev-nextauth-secret",
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email || "";
        const password = credentials?.password || "";

        try {
          const db = await getDb()
          const user = await db.collection('users').findOne({ email })
          if (!user || !user.password) return null

          const match = bcrypt.compareSync(password, user.password)
          if (!match) return null

          return {
            id: user._id?.toString?.() || 'user',
            email: user.email,
            name: user.name || user.email,
            role: user.role || 'user',
          } as any
        } catch (err) {
          console.error('Auth authorize error:', err)
          return null
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    jwt: async (payload: any) => {
      const { token } = payload;
      const user = payload.user;

      if (user) {
        return {
          ...token,
          id: user.id,
          role: (user as any).role || token.role,
        };
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token?.id,
            role: (token as any).role,
          },
        };
      }
      return session;
    },
  },
};
