// import { Todos } from '@/lib/todos/definitions'
import React from 'react'
// import { deleteTodo } from '@/lib/todos/actions'
// import { DeleteButton, UpdateButton } from '@/components'
// import { fetchedFilteredTasks } from '@/lib/todos/data'
// import { formatDateToLocal } from '@/lib/helpers'
// import { ViewButton } from '@/components/button'

import { todos } from '@/app/lib/placeholder'
import { formatDateToLocal, transformTasks } from '@/app/lib/helpers'
import { fetchedTasks } from '@/app/lib/actions/(dashboard)/todo/data'
import { Todos } from '@/app/lib/actions/(dashboard)/todo/definitions'

// export default async function TableBody() {
export default async function TableBody({ query }: { query: string }) {
  // const items = todos

  const items: Todos[] = await fetchedTasks(query)
  console.log(items.length)
  return (
    <tbody className="bg-white">
      {items.length < 0 ? (
        items.map((item) => (
          <tr
            key={item.id}
            className="w-fit border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
          >
            <td className="whitespace-nowrap py-3 pl-6 pr-3">{item.title}</td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center">{item.no_of_tasks}</td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center">{item.pendingTasks}</td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3  text-center">
              {item.no_of_tasks_done}
            </td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3  text-center">
              {item.date ? formatDateToLocal(`${item.date?.toString()}`) : ''}
            </td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="flex justify-center gap-3">
                {/* <ViewButton href={`/dashboard/todo/${item.id}/view`} />
              <UpdateButton href={`/dashboard/todo/${item.id}/edit`} />
              <DeleteButton id={item.id} action={deleteTodo} /> */}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>No Data</tr>
      )}
    </tbody>
  )
}
