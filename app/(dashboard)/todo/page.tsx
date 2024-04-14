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

  return (
    <div className='w-full'>
      <Suspense fallback={<TableRowSkeleton />}>
        <TableWrapper />
      </Suspense>
    </div>
  );
}
