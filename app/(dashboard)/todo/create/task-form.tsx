"use client";
import {
  Button,
  SubmitButton,
  TextBox,
  DatePicker,
  Textarea,
} from "@/app/components";
import { createTask } from "@/app/lib/actions/(dashboard)/todo/action";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { SnackBar } from "@/app/components";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import router from "next/router";

export default function Form() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createTask, initialState);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const hasErrors = Object.keys(state.errors?.date || {})?.length > 0;

  useEffect(() => {
    hasErrors && setIsDuplicate(true);
  }, [hasErrors]);

  return (
    <form
      action={dispatch}
      className='space-y-3 bg-violet-400 bg-opacity-20 
      border-violet-100 rounded-lg shadow-violet-200'
    >
      {/* TS validation for the objects  */}
      {Object.keys(state.errors?.date || {})?.length > 0 &&
        (state?.errors?.date || []).map((error: string, index: number) => (
          <SnackBar message={error} type='error' key={index} />
        ))}
      <div className='flex-1 rounded-lg px-6 pb-4 pt-8'>
        <div className='flex flex-row text-center justify-center'>
          <Link
            href='/signup'
            className='ml-2 mb-3 mt-5 block  text-2xl font-medium text-white'
          >
            Create Main Task
          </Link>
        </div>

        <div className='w-full'>
          <div className='flex flex-col justify-center'>
            <label className='mb-3 mt-5 block text-xs font-medium text-white'>
              Select Date
            </label>
            {/* TS validation for the objects  */}

            <DatePicker name='taskDate' setIsDuplicate={setIsDuplicate} />
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
              placeholder='Enter task title'
              isInline
              required
            />
          </div>
          <div className='mt-4'>
            <Textarea
              name='description'
              label='Description'
              htmlFor='description'
            />
          </div>

          <SubmitButton
            disabled={isDuplicate}
            className=' text-xl font-bold justify-center bg-violet-500 hover:bg-violet-300 text-violet-100'
          >
            Create the task
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
