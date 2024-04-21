import { z } from "zod";

export const TaskSchema = z.object({
  date: z.string({
    invalid_type_error: "Please select a date.",
  }),
  title: z.string(),
  description: z.string(),
});

export const SubtaskSchema = z.object({
  title: z.string(),
  startTime: z.string({
    invalid_type_error: "Please select a start time.",
  }),
  endTime: z.string({
    invalid_type_error: "Please select a end time.",
  }),
  description: z.string(),
});
