import {
  Button,
  SubmitButton,
  TextBox,
  DatePicker,
  Textarea,
} from "@/app/components";
import { createTask } from "@/app/lib/actions/(dashboard)/todo/action";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Form() {
  const initialState = { message: "", errors: {} };
  const [errors, dispatch] = useFormState(createTask, initialState);

  return (
    <form
      action={dispatch}
      className='space-y-3 bg-violet-400 bg-opacity-20 
      border-violet-100 rounded-lg shadow-violet-200'
    >
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
            <DatePicker name='taskDate' />
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

          <SubmitButton className=' text-xl font-bold justify-center bg-violet-500 hover:bg-violet-300 text-violet-100'>
            Create the task
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
