import { CustomTreeView, PopOver } from "@/app/components";
import { Subtasks } from "@/app/lib/actions/(dashboard)/todo/data";
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
        <CustomTreeView items={subtaskTree} />
      </div>
    </div>
  );
}
