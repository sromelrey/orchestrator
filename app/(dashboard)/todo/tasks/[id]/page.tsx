import React, { Suspense } from "react";
import TaskDetails from "./tasks-details";
import SubTaskForm from "./subtask-form";
import { CardSkeleton } from "@/app/components";
import { fetchedTaskById } from "@/app/lib/actions/(dashboard)/todo/data";
import SubtasksDetails from "./subtasks-details";

export default async function Page({ params }: { params: { id: string } }) {
  const task = await fetchedTaskById(params.id);

  return (
    <main className='flex items-center justify-center md:h-screen border-r-indigo-800'>
      <div className='relative mx-auto flex w-full max-w-[700px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <div
          className='space-y-3 flex flex-col w-auto bg-violet-500 bg-opacity-20 p-10
      border-violet-100 rounded-lg shadow-violet-200'
        >
          <Suspense fallback={<CardSkeleton />}>
            <TaskDetails tasks={task} />
          </Suspense>
          <SubTaskForm params={params} />
          <SubtasksDetails
            subtask={task.subtasks || []}
            subtaskTree={task.subtaskTree || []}
          />
        </div>
      </div>
    </main>
  );
}
