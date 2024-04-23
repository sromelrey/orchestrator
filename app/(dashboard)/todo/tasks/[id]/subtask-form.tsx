"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import {
  TextBox,
  Textarea,
  SubmitButton,
  TimePicker,
  SnackBar,
} from "@/app/components";
import { createSubtasks } from "@/app/lib/actions/(dashboard)/todo/action";
import { formatTime } from "@/app/lib/helpers";

export default function Form({ params }: { params: { id: string } }) {
  const initialState = { message: "", errors: {} };

  const initialEventState = {
    title: "",
    startTime: "",
    endTime: "",
    description: "",
  };

  const [eventData, setEventData] = useState(initialEventState);
  const [state, dispatch] = useFormState(createSubtasks, initialState);

  const handleSubmit = () => {
    dispatch({
      task_id: params.id,
      title: eventData.title,
      startTime: formatTime(eventData.startTime),
      endTime: formatTime(eventData.endTime),
      description: eventData.description,
    } as unknown as FormData);
  };

  return (
    <form action={handleSubmit} className='w-full'>
      {/* TS validation for the objects  */}
      {Object.keys((state.errors as { time: string[] })?.time || []).length >
        0 && (
        <SnackBar
          message={`${(state.errors as { time: string[] })?.time || []}`}
          type='error'
        />
      )}
      <div>
        <h1 className='text-2xl font-bold  text-white mt-10'>Subtasks</h1>
      </div>
      <div>
        <TextBox
          classLabel='mb-3 mt-5 block text-xs font-medium text-white'
          classInput='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
          htmlFor='title'
          label='Title'
          id='title'
          type='text'
          name='title'
          placeholder='Enter sub task title'
          isInline
          required
          onChange={(e: any) =>
            setEventData({ ...eventData, title: e.target.value })
          }
        />
      </div>
      <div className='flex flex-row row-span-2 gap-5'>
        <div className='w-full'>
          <TimePicker
            name='startTime'
            label='Start time'
            onChange={(e: any) => setEventData({ ...eventData, startTime: e })}
          />
        </div>
        <div className='w-full'>
          <TimePicker
            name='endTime'
            label='End time'
            onChange={(e: any) => setEventData({ ...eventData, endTime: e })}
          />
        </div>
      </div>

      <div className='mt-4'>
        <Textarea
          name='description'
          label='Description'
          htmlFor='description'
          onChange={(e: any) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
      </div>
      <SubmitButton className=' text-xl font-bold justify-center bg-violet-500 hover:bg-violet-300 text-violet-100'>
        Create Sub task
      </SubmitButton>
    </form>
  );
}
