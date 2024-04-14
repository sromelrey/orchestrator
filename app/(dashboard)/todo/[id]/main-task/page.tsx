import { BreadCrumbs, Button } from "@/app/components";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function page() {
  return (
    <main className='space-y-3  p-5  bg-violet-400 bg-opacity-20 border-violet-100 rounded-lg shadow-violet-200'>
      <div className='flex flex-row text-center justify-lef'>
        {/* <label className='ml-2 mb-3 mt-5 block  text-2xl font-medium text-white'>
          ORCHESTRATOR
        </label> */}
        <BreadCrumbs
          breadcrumbs={[
            { label: "Todo", href: "/todo" },
            {
              label: "Task Title",
              href: `todo/test/main-task`,
              active: true,
            },
          ]}
        />
      </div>
      <div className='h-full bg-violet-100  rounded-lg px-10 py-5'>
        <button
          className='flex  h-16 items-center w-16 sw-auto rounded-full justify-center
           bg-indigo-500  hover:bg-indigo-400
            focus-visible:outline-indigo-500
             active:bg-indigo-600'
        >
          <PlusIcon className='h-5 w-5 text-gray-50' />
        </button>
      </div>
    </main>
  );
}
