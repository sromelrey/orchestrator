"use client";
import { CustomTreeView, PopOver } from "@/app/components";
import { Subtasks } from "@/app/lib/actions/(dashboard)/todo/data";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function SubtasksDetails({
  subtask,
  subtaskTree,
}: {
  subtask: Subtasks[];
  subtaskTree: {
    id: string;
    label: string;
    children: { id: string; label: string }[] | undefined;
  }[];
}) {
  return (
    <div className='flex-1 bg-violet-100 rounded-lg px-6 pb-4 pt-8'>
      <div className='flex flex-col text-left justify-center'>
        {/* {subtask.map((sbtask, index) => ( 
          // <div key={index}>
          //   <div
          //     key={sbtask.id}
          //     className='flex flex-row row-span-2 gap-2  justify-between relative'
          //   >
          //     <div className='w-full  cursor-pointer'>
          //       <PopOver message={`${sbtask.description}`}>
          //         <h1 className='text-xl font-bold text-black'>
          //           {sbtask.title}
          //         </h1>
          //       </PopOver>
          //     </div>
          //     <div className='w-full flex flex-row gap-6  cursor-pointer'>
          //       <h1 className='text-xl font-bold text-black'>
          //         {sbtask.start_time}
          //       </h1>
          //       <h1 className='text-xl font-bold text-black'>
          //         {sbtask.end_time}
          //       </h1>
          //     </div>

          //     {/* <p className='text-lg mt-6 text-black truncate'>
          //     {sbtask.description}
          //   </p> */}
        {/* //   </div> */}
        {/* <div key={index}> */}
        {/* <TreeView /> */}
        <CustomTreeView items={subtaskTree} />
        {/* </div> */}
        {/* </div>
        ))} */}
      </div>
    </div>
  );
}
