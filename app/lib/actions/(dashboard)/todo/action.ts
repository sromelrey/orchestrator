"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";
import { getSession } from "@/app/lib/utils";
import { useRouter } from "next/navigation";

const TaskSchema = z.object({
  date: z.string({
    invalid_type_error: "Please select a date.",
  }),
  title: z.string(),
  description: z.string(),
});

export type State = {
  errors?: {
    id?: string[] | undefined;
    isDuplicate?: boolean;
    date?: string[] | undefined;
    title?: string[] | undefined;
    description?: string[] | undefined;
  };
  message: string;
};

export async function createTask(prevState: State, formData: FormData) {
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
