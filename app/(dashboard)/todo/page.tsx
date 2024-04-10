/* eslint-disable react/jsx-key */
"use client";
import React, { Suspense } from "react";
import { Button, TableRowSkeleton } from "@/app/components";
import TableWrapper from "./table";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";

  const boardComponent = () => {
    return (
      <main className='max-w-max p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <div className='relative flex h-auto w-full items-center flex-row gap-10 p-4 md:-mt-3  bg-violet-400 bg-opacity-20 border-violet-100 rounded-lg shadow-violet-200'>
          <div className='flex flex-col gap-6'>
            <h1 className='text-lg font-bold'>Pending</h1>
            <div className='bg-gray-100 h-96 w-96 rounded-lg flex flex-col gap-4 items-center py-6'>
              <div className='bg-violet-400  rounded-lg w-72 h-40 '>test</div>
              <div className='bg-violet-400 rounded-lg  w-72  h-40'>test</div>
              <div className='bg-violet-400 rounded-lg  w-72  h-40'>test</div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <h1 className='text-lg font-bold'>Ongoing</h1>
            <div className='bg-violet-100  h-96 w-96 rounded-lg flex flex-col gap-4 items-center py-6'>
              <div className='bg-violet-400  rounded-lg w-72 h-40'>test</div>
              <div className='bg-violet-400 rounded-lg  w-72  h-40'>test</div>
              <div className='bg-violet-400 rounded-lg  w-72  h-40'>test</div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <h1 className='text-lg font-bold'>Done</h1>
            <div className='bg-violet-300  h-96 w-96 rounded-lg flex flex-col gap-4 items-center py-6'>
              <div className='bg-violet-400  rounded-lg w-72 h-40'>test</div>
              <div className='bg-violet-400 rounded-lg  w-72  h-40'>test</div>
              <div className='bg-violet-400 rounded-lg  w-72  h-40'>test</div>
            </div>
          </div>
        </div>
      </main>
    );
  };

  return (
    <>
      {/* <Tabs
        tabLabels={["List", "Board"]}
        tabsComponent={[boardComponent(), <Table />]}
      /> */}
      <Suspense fallback={<TableRowSkeleton />}>
        <TableWrapper />
      </Suspense>
    </>
  );
}
