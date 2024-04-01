'use client'
import { TextBox, Button, SubmitButton } from '@/app/components'
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

import Link from 'next/link'

import { useFormState } from 'react-dom'
import { authenticate } from '@/app/lib/actions/(auth)/sign-in/actions'

export default function Form() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <form
      action={dispatch}
      className="space-y-3  bg-violet-400 bg-opacity-20 border-violet-100 rounded-lg shadow-violet-200"
    >
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <div className="flex flex-row text-center justify-center">
          <Link href="/signup" className="ml-2 mb-3 mt-5 block  text-2xl font-medium text-white">
            ORCHESTRATOR
          </Link>
        </div>
        <div className="relative">
          <Button className="w-full font-bold justify-center text-lg bg-white hover:to-blue-200 text-blue-500">
            Login with Google
          </Button>
        </div>
        <div className="relative px-2 py-2 my-2 h-10 flex flex-row w-full align-middle items-center">
          <div className="flex-1 border-t-2 border-violet-700"></div>
          <span className="px-3 text-violet-700">OR</span>
          <div className="flex-1 border-t-2 border-violet-700"></div>
        </div>
        <div className="w-full">
          <div>
            <TextBox
              classLabel="mb-3 mt-5 block text-xs font-medium text-white"
              classInput="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              htmlFor="email"
              label="Email"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              isInline
              required
              icon={
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              }
            />
          </div>
          <div className="mt-4">
            <TextBox
              classLabel="mb-3 mt-5 block text-xs font-medium text-white"
              classInput="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              htmlFor="password"
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
              isInline
              required
              minLength={6}
              icon={
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              }
            />
          </div>
        </div>

        <SubmitButton className=" text-xl font-bold justify-center bg-violet-500 hover:bg-violet-300 text-violet-100">
          Sign in
        </SubmitButton>
        <div className="relative">
          <Link
            href="/forgot-password"
            className="ml-2 mb-3 mt-5 text-center block text-xl text-violet-500"
          >
            Forgot Password ?
          </Link>
        </div>
        <div className="relative">
          <div className="flex flex-row text-center justify-center">
            <Link
              href={`/signup`}
              shallow
              className="flex h-10 items-center rounded-lg text-lg font-medium w-full justify-center bg-violet-800 hover:bg-violet-600 text-violet-200"
            >
              Create Account
            </Link>
          </div>
        </div>
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
