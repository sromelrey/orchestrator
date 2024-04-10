import { Button, SubmitButton, TextBox, DatePicker } from "@/app/components";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Form() {
  return (
    <form className='space-y-3  bg-violet-400 bg-opacity-20 border-violet-100 rounded-lg shadow-violet-200'>
      <div className='flex-1 rounded-lg px-6 pb-4 pt-8'>
        <div className='flex flex-col justify-center'>
          <label className='mb-3 mt-5 block text-xs font-medium text-white'>
            Select Date
          </label>
          <DatePicker />
        </div>

        <div className='relative px-2 py-2 my-2 h-10 flex flex-row w-full align-middle items-center'>
          <div className='flex-1 border-t-2 border-violet-700'></div>
          <span className='px-3 text-violet-700'>OR</span>
          <div className='flex-1 border-t-2 border-violet-700'></div>
        </div>
        <div className='w-full'>
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
            <TextBox
              classLabel='mb-3 mt-5 block text-xs font-medium text-white'
              classInput='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
              htmlFor='password'
              label='Password'
              type='password'
              name='password'
              placeholder='Enter password'
              isInline
              required
              minLength={6}
              icon={
                <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
              }
            />
          </div>
          <div className='mt-4'>
            <TextBox
              classLabel='mb-3 mt-5 block text-xs font-medium text-white'
              classInput='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
              htmlFor='confirmPassword'
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              placeholder='Enter Confirm Password'
              isInline
              required
              minLength={6}
              icon={
                <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
              }
            />
          </div>
        </div>
        <SubmitButton className=' text-xl font-bold justify-center bg-violet-500 hover:bg-violet-300 text-violet-100'>
          Sign up
        </SubmitButton>
        <div className='relative flex flex-row justify-center'>
          <p className='ml-2 mb-3 mt-5 text-center block text-l text-violet-100'>
            Already have an account?
          </p>
          <Link
            href='/signin'
            className='ml-2 mb-3 mt-5 text-center block text-l text-violet-500'
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
}
