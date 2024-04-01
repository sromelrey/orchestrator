import React from 'react'
import Form from './sign-up-form'

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen border-r-indigo-800">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Form />
      </div>
    </main>
  )
}
