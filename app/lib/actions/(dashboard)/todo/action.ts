"use server";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/utils";
import { SubtaskSchema, TaskSchema } from "./schemas";
import { SubtaskState, TaskState } from "./definitions";
import { fetchSelectedTime } from "./data";
import { revalidatePath } from "next/cache";

export async function createTask(prevState: TaskState, formData: FormData) {
  const session = await getSession();
  const userId = session?.id;
  const validatedFields = TaskSchema.safeParse({
    date: formData.get("taskDate"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Task.",
    };
  }
  const { date, title, description } = validatedFields.data;

  const selectedDate = await sql`SELECT * FROM tasks WHERE date = ${date};`;
  const isDuplicateTaskDate = selectedDate.rows.length > 0;
  if (isDuplicateTaskDate) {
    return {
      errors: {
        isDuplicate: true,
        date: [
          "A task with this date already exists. Please choose a different date.",
        ],
      },
      message:
        "Failed to create task. A task with the same date already exists.",
    };
  }
  let redirectPath: string | null = null;
  try {
    const responseData = await sql`
      INSERT INTO tasks (user_id, title, description, date)
      VALUES (${userId}, ${title}, ${description}, ${date})
      RETURNING id, title, description, date;
    `;
    if (responseData.rows[0].id)
      redirectPath = `/todo/tasks/${responseData.rows[0].id}`;

    return {
      message: "Task created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  } finally {
    //Clear resources
    if (!!redirectPath) redirect(redirectPath);
  }
}

export async function createSubtasks(prevState: SubtaskState, formData: any) {
  const session = await getSession();
  const userId = session?.id;

  const validatedFields = SubtaskSchema.safeParse({
    title: formData?.title,
    startTime: formData?.startTime,
    endTime: formData?.endTime,
    description: formData?.description,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Task.",
    };
  }
  const { title, startTime, endTime, description } = validatedFields.data;

  const hasOverlaps = await fetchSelectedTime(
    startTime,
    endTime,
    formData.task_id
  );

  if (hasOverlaps) {
    return {
      errors: {
        hasOverlaps: true,
        time: [
          "The entered times overlap. Please adjust your times to ensure they do not conflict.",
        ],
      },
      message:
        "Failed to create Subtask. The entered times overlap. Please adjust your times to ensure they do not conflict.",
    };
  }

  try {
    const responseData = await sql`INSERT INTO subtasks 
    (task_id, title, description, start_time, end_time)
    VALUES (${formData.task_id},${title},${description},${startTime},${endTime})
    RETURNING id, title, description, start_time, end_time;
   `;
    return {
      message: "Task created successfully",
    };
  } catch (error) {
    return {
      message: "Task created successfully",
    };
  }
}

export async function updateSubtaskList(
  taskId: string,
  id: string,
  status: string
) {
  try {
    await sql`
    UPDATE subtasks_list 
    SET status=${status}
    WHERE id=${id}
  `;
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Update subtasks_list.",
    };
  }
  revalidatePath(`/todo/tasks/${taskId}`);
}

