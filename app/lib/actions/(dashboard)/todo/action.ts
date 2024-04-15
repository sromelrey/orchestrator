"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/utils";

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
  console.log();
  if (selectedDate.rows.length > 0) {
    return {
      errors: {
        date: [
          "A task with this date already exists. Please choose a different date.",
        ],
      },
      message:
        "Failed to create task. A task with the same date already exists.",
    };
  }

  try {
    await sql`
      INSERT INTO tasks (user_id, title, description, date)
      VALUES (${userId}, ${title}, ${description}, ${date})
    `;
    return { message: "Account created successfully" };
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
  revalidatePath("/todo/create");
  redirect("/todo/create");
}
