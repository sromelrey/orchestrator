"use server";
import { sql } from "@vercel/postgres";
import { getSession } from "@/app/lib/utils";
import { unstable_noStore as noStore } from "next/cache";
import { todo } from "node:test";

export type SubtasksList = {
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
  subtasks_list?: Array<SubtasksList>;
  date: string;
};
export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "pending" | "inprogress" | "done";
  subtasks?: Array<Subtasks>;
  no_of_subtasks?: number;
  date: string;
};

//* List Fetch Start Here
export async function fetchedTaskById(id: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  const session = await getSession();
  const userId = session?.id;

  try {
    let taskData: Task;
    const tasksResponse =
      await sql<Task>`SELECT * FROM tasks WHERE id=${id} AND user_id=${userId};`;

    taskData = tasksResponse.rows[0];

    const subTasksResponse =
      await sql<Subtasks>`SELECT * FROM subtasks WHERE task_id=${taskData.id};`;
    const subTasks = subTasksResponse.rows;
    taskData.subtasks = subTasks;

    const subTasksList = await Promise.all(
      subTasks.map((subtask) => {
        return sql`SELECT * FROM subtasks_list WHERE subtask_id=${subtask.id};`;
      })
    );
    const enrichedSubtasksList = subTasksList.flatMap(
      (subtaskList) => subtaskList.rows
    );

    if (subTasks.length > 0) {
      const enrichedSubtasks = subTasks.map((subtask) => {
        const subtaskList = enrichedSubtasksList?.map((list) => {
          if (list.subtask_id === subtask.id) {
            return list;
          }
        });
        const filteredSubtasks =
          subtaskList?.filter((data) => data !== undefined) || [];

        return {
          ...subtask,
          subtaskList: filteredSubtasks,
        };
      });
      taskData.subtasks = enrichedSubtasks;
    }
    console.log(taskData.subtasks.map((data) => data));

    return tasksResponse.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tasks.");
  }
}
export async function fetchedTasks(query: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  const session = await getSession();
  const userId = session?.id;

  try {
    let todosData: Array<Task>;
    let subTaskData: Array<Subtasks>;

    const todosResponse =
      await sql<Task>`SELECT *  FROM tasks WHERE user_id=${userId};`;
    todosData = todosResponse.rows;

    if (todosData.length > 0) {
      const subtaskResponse = await Promise.all(
        todosData.map(async (todo: any) => {
          const sqlResponse = await sql<Subtasks>`
        SELECT *  FROM  subtasks WHERE task_id=${todo.id};`;
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
            const sqlResponse = await sql<SubtasksList>`
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

export async function fetchSelectedTime(
  startTime: string,
  endTime: string,
  taskId: string
) {
  const selectedTime = await sql`SELECT * FROM subtasks
  WHERE (
    /* Overlaps the beginning */
    (start_time <=${startTime}  AND end_time >= ${startTime}) OR
    /* Overlaps the end */
    (start_time <= ${endTime} AND end_time >=${endTime} ) OR
    /* Completely encompasses existing time */
    ( ${startTime} >= start_time AND ${endTime} <= end_time)
  )AND task_id=${taskId};`;
  return selectedTime.rows.length > 0;
}