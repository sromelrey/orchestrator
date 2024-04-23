import React from "react";
import { Task, fetchedTaskById } from "@/app/lib/actions/(dashboard)/todo/data";

export default async function TaskDetails({ tasks }: { tasks: Task }) {
  return (
    <div className='flex-1 bg-violet-100 rounded-lg px-6 pb-4 pt-8'>
      <div className='flex flex-col text-left justify-center'>
        <h1 className='text-2xl font-bold  text-black'>{tasks.title}</h1>
        <p className='text-lg mt-6 text-black'>{tasks.description}</p>
      </div>
    </div>
  );
}
