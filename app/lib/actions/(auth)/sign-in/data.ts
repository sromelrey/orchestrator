'use server'

import { sql } from '@vercel/postgres'
import type { User } from './definitions'
import { encrypt } from '../../../utils'
import { cookies } from 'next/headers'

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
    const userData = user.rows[0]
    const now = new Date();
    const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const sessionData = await encrypt({ userData, expires });

    await cookies().set("session", sessionData as string, {
      expires,
      httpOnly: true,
    });

    return user.rows[0]
  } catch (error) {
    console.log(error)
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}
