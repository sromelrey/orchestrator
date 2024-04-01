'use server'
import { sql } from '@vercel/postgres'
import { Todos } from './definitions'
import { getSession } from '@/app/lib/utils'
import { unstable_noStore as noStore } from 'next/cache'
import { transformTasks } from '@/app/lib/helpers'

//* List Fetch Start Here
export async function fetchedTaskById(id: string) {}
export async function fetchedTasks(query: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore()
  const session = await getSession()
  const userId = session?.userData?.id
  let transformedData: Todos[] = []
  console.log({ userId, session })
  try {
    const tasks = await sql`SELECT id,  userid,  title,  date,
     json_agg(CASE WHEN todos IS NOT NULL THEN json_build_object('id', tasks.id, 'userid', tasks.userid,
     'title', tasks.title, 'todos', tasks.todos) END) AS tasks FROM tasks WHERE userid=${userId}
     AND (tasks.title ILIKE ${`%${query}%`} OR tasks.title IS NULL) OR date::text ILIKE ${`%${query}%`}  OR date IS NULL
     GROUP BY id, userid, title, date;`

    transformedData = transformTasks(tasks.rows)
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch tasks.')
  } finally {
    return transformedData
  }
}
