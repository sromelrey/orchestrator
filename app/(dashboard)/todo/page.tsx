'use client'
import React, { Suspense } from 'react'
import { Button, TableRowSkeleton, Tabs } from '@/app/components'
import Link from 'next/link'
import Search from '@/app/components/search'
import { PlusIcon } from '@heroicons/react/24/outline'
import Table from '@/app/components/table'
import TableBody from './todo-table-body'

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ''

  const todoListComponent = () => {
    return (
      <main className="w-full">
        <div className="relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-3  bg-violet-400 bg-opacity-20 border-violet-100 rounded-lg shadow-violet-200">
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder={`Search todo's by title...`} />
            <Button className="sw-auto justify-center bg-indigo-500  hover:bg-indigo-400 focus-visible:outline-indigo-500 active:bg-indigo-600 ">
              <Link
                href="/dashboard/todo/create"
                className="flex h-10 items-center rounded-lgpx-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span className="hidden md:block">Create Todo</span>

                <PlusIcon className="ml-2 h-5 w-5 text-gray-50" />
              </Link>
            </Button>
          </div>
          {/* <Form /> */}
          <Suspense fallback={<TableRowSkeleton />}>
            <Table>
              <TableBody query={''} />
              {/* <TableBody query={query} /> */}
            </Table>
          </Suspense>
        </div>
      </main>
    )
  }

  const boardComponent = () => {
    return (
      <main className="max-w-max p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="relative flex h-auto w-full items-center flex-row gap-10 p-4 md:-mt-3  bg-violet-400 bg-opacity-20 border-violet-100 rounded-lg shadow-violet-200">
          <div className="flex flex-col gap-6">
            <h1 className="text-lg font-bold">Pending</h1>
            <div className="bg-gray-100 h-96 w-96 rounded-lg flex flex-col gap-4 items-center py-6">
              <div className="bg-violet-400  rounded-lg w-72 h-40 ">test</div>
              <div className="bg-violet-400 rounded-lg  w-72  h-40">test</div>
              <div className="bg-violet-400 rounded-lg  w-72  h-40">test</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-lg font-bold">Ongoing</h1>
            <div className="bg-violet-100  h-96 w-96 rounded-lg flex flex-col gap-4 items-center py-6">
              <div className="bg-violet-400  rounded-lg w-72 h-40">test</div>
              <div className="bg-violet-400 rounded-lg  w-72  h-40">test</div>
              <div className="bg-violet-400 rounded-lg  w-72  h-40">test</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-lg font-bold">Done</h1>
            <div className="bg-violet-300  h-96 w-96 rounded-lg flex flex-col gap-4 items-center py-6">
              <div className="bg-violet-400  rounded-lg w-72 h-40">test</div>
              <div className="bg-violet-400 rounded-lg  w-72  h-40">test</div>
              <div className="bg-violet-400 rounded-lg  w-72  h-40">test</div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <Tabs tabLabels={['List', 'Board']} tabsComponent={[boardComponent(), todoListComponent()]} />
    </>
  )
}
