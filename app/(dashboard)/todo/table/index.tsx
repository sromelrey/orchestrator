/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Button, TableRowSkeleton } from "@/app/components";
import Search from "@/app/components/search";
import { Todos, fetchedTasks } from "@/app/lib/actions/(dashboard)/todo/data";
import { PlusIcon } from "@heroicons/react/24/outline";
import TableBody from "../todo-table-body";
import Link from "next/link";
import React, { Suspense } from "react";
import TableHeader from "./table-header";

export default async function TableWrapper({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const items: Todos[] = await fetchedTasks(query);
  return (
    <main className='w-full'>
      <div className='relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-3  bg-violet-400 bg-opacity-20 border-violet-100 rounded-lg shadow-violet-200'>
        <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
          <Search placeholder={`Search todo's by title...`} />
          <Button
            className='sw-auto justify-center
           bg-indigo-500  hover:bg-indigo-400
            focus-visible:outline-indigo-500
             active:bg-indigo-600'
          >
            <Link
              href='/todo/create'
              className='flex h-10 items-center
               rounded-lgpx-4 text-sm font-medium
                text-white transition-colors 
                focus-visible:outline 
                focus-visible:outline-2 
                focus-visible:outline-offset-2'
            >
              <span className='hidden md:block'>Create Todo</span>

              <PlusIcon className='ml-2 h-5 w-5 text-gray-50' />
            </Link>
          </Button>
        </div>
        <div className='mt-6 flow-root'>
          <div className='inline-block min-w-full align-middle'>
            <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
              <table className='hidden min-w-full text-gray-900 md:table'>
                <TableHeader />
                <TableBody items={items} />
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
