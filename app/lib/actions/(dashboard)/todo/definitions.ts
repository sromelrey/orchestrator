export type Todos = {
  id: string
  user_id?: string
  title: string
  no_of_tasks: number
  no_of_tasks_done: number
  pendingTasks: number
  date: string
}

export type TaskState = {
  errors?: {
    id?: string[] | undefined;
    isDuplicate?: boolean;
    date?: string[] | undefined;
    title?: string[] | undefined;
    description?: string[] | undefined;
  };
  message?: string;
};

export type SubtaskState = {
  errors?: {
    id?: string[] | undefined;
    hasOverlaps?: boolean;
    startTime?: string[] | undefined;
    endTime?: string[] | undefined;
    time?: string[] | undefined;
    title?: string[] | undefined;
    description?: string[] | undefined;
  };
  message?: string;
};

