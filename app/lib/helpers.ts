import { QueryResultRow } from '@vercel/postgres'
import dayjs from "dayjs";

export function formatDateToLocal(dateStr: string, locale: string = "en-US") {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);

  return formatter.format(date);
}

export function formatTime(time: string) {
  return dayjs(time).format("hh:mm:ss A");
}



type Todo = {
  id: string
  userid: string
  title: string | null
  tasks?: {
    [x: string]: any
    todos: { status: string }[]
  }[]
  date: string
}

type TransformedTodo = {
  id: string
  userId: string
  title: string
  no_of_tasks: number
  pendingTasks: number
  no_of_tasks_done: number
  date: string
}

export function transformTasks(fetchedTasks: QueryResultRow[]): TransformedTodo[] {
  let transformedData: TransformedTodo[] = []

  if (fetchedTasks.length > 0) {
    transformedData = fetchedTasks.map((taskList): TransformedTodo => {
      const noOfTasks =
        taskList.tasks?.reduce(
          (acc: any, data: { todos: string | any[] }) => acc + data.todos.length,
          0
        ) || 0 // Handle potential null for tasks

      let totalDoneTodos = 0

      taskList.tasks?.forEach(
        (data: {
          todos: {
            filter: (arg0: (todo: any) => boolean) => {
              (): any
              new (): any
              length: number
            }
          }
        }) => {
          totalDoneTodos += data.todos.filter(
            (todo: { status: string }) => todo.status === 'done'
          ).length
        }
      )

      let totalPendingTodos = 0

      taskList.tasks?.forEach(
        (data: {
          todos: {
            filter: (arg0: (todo: any) => boolean) => {
              (): any
              new (): any
              length: number
            }
          }
        }) => {
          totalPendingTodos += data.todos.filter(
            (todo: { status: string }) => todo.status === 'pending'
          ).length
        }
      )

      let titles =
        taskList.tasks?.reduce(
          (acc: string, task: { title: any }) => acc + `${task.title}, `,
          ''
        ) || ''

      if (titles.endsWith(', ')) {
        titles = titles.slice(0, -2) // Remove the last two characters (", ")
      }
      if (titles.length > 10) {
        titles = titles.slice(0, 30) + '...'
      }

      return {
        id: String(taskList.id), // Convert id to string if needed
        userId: taskList.userid,
        title: titles,
        no_of_tasks: noOfTasks,
        pendingTasks: totalPendingTodos,
        no_of_tasks_done: totalDoneTodos,
        date: taskList.date,
      }
    })
  }

  return transformedData
}


export function getErrors() {}