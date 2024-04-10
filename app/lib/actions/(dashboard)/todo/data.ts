"use server";
import { sql } from "@vercel/postgres";
import { getSession } from "@/app/lib/utils";
import { unstable_noStore as noStore } from "next/cache";
import { todo } from "node:test";

export type Subtasks_List = {
  id: string;
  user_id?: string;
  title: string;
  no_of_tasks: number;
  no_of_tasks_done: number;
  pendingTasks: number;
  date: string;
};

export type Subtasks = {
  id: string;
  user_id?: string;
  title: string;
  no_of_tasks: number;
  no_of_tasks_done: number;
  pendingTasks: number;
  subtasks_list: Array<Subtasks_List>;
  date: string;
};
export type Todos = {
  id: string;
  user_id: string;
  title: string;
  status: "pending" | "inprogress" | "done";
  subtasks?: Array<Subtasks>;
  no_of_subtasks?: number;
  date: string;
};

//* List Fetch Start Here
export async function fetchedTaskById(id: string) {}
export async function fetchedTasks(query: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  const session = await getSession();
  const userId = session?.id;

  try {
    let todosData: Array<Todos>;
    let subTaskData: Array<Subtasks>;

    const todosResponse =
      await sql<Todos>`SELECT *  FROM todos WHERE user_id=${userId};`;
    todosData = todosResponse.rows;

    if (todosData.length > 0) {
      const subtaskResponse = await Promise.all(
        todosData.map(async (todo: any) => {
          const sqlResponse = await sql<Subtasks>`
        SELECT *  FROM  subtasks WHERE todo_id=${todo.id};`;
          todo.subtasks = sqlResponse.rows;
          todo.no_of_subtasks = sqlResponse.rows.length;
          return sqlResponse;
        })
      );
      //@ts-ignore
      subTaskData = await subtaskResponse[0].rows;

      if (subTaskData.length > 0) {
        await Promise.all(
          subTaskData.map(async (subTask: any) => {
            const sqlResponse = await sql<Subtasks_List>`
          SELECT *  FROM subtasks_list WHERE subtask_id=${subTask.id};`;
            subTask["subtasks_list"] = sqlResponse.rows;
            return sqlResponse;
          })
        );
      }
    }

    return todosData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tasks.");
  }
}
