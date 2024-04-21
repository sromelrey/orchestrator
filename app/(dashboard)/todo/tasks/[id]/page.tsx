import React, { Suspense } from "react";
import TaskDetails from "./tasks-details";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import SubTaskForm from "./subtask-form";
import {
  CardSkeleton,
  SubmitButton,
  TextBox,
  Textarea,
  TimePicker,
} from "@/app/components";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className='flex items-center justify-center md:h-screen border-r-indigo-800'>
      <div className='relative mx-auto flex w-full max-w-[700px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <div
          className='space-y-3 flex flex-col w-auto bg-violet-500 bg-opacity-20 p-10
      border-violet-100 rounded-lg shadow-violet-200'
        >
          <Suspense fallback={<CardSkeleton />}>
            <TaskDetails params={params} />
          </Suspense>
          {/* 
          <div className=' -m-10 flex-1 border-t-2 border-t-violet-100 justify-end p-6'>
            <Button
              className='sw-auto justify-end
           bg-indigo-500  hover:bg-indigo-400
            focus-visible:outline-indigo-500
             active:bg-indigo-600 flex h-10 items-center
             rounded-lgpx-4 text-sm font-medium transition-colors 
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 '
            >
              <PlusIcon className='ml-2 h-5 w-5  text-gray-50' />
              <span className='hidden md:block  text-gray-50'>
                Add Subtasks
              </span>
            </Button>
          </div> */}
          <SubTaskForm params={params} />
        </div>
      </div>
    </main>
  );
}
