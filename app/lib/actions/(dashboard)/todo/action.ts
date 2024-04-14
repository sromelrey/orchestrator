"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/utils";

const TaskSchema = z.object({
  id: z.string(),
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

  const taskDate = new Date(date).toISOString().split("T")[0];

  try {
    await sql`
  INSERT INTO invoices (user_id, title, description, status, date)
  VALUES (${userId}, ${title}, ${description}, ${taskDate})
`;
    return { message: "Account created successfully" };
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
  revalidatePath("/todo/create");
  redirect("/todo/create");
}
