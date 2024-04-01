import Image from "next/image";

import TableMD from "./table-md";
import TableHeader from "./table-header";

export default async function Table({
  children,
}: {
  children: React.ReactNode;
}) {
  //     {
  //   query,
  //   currentPage,
  // }: {
  //   query: string;
  //   currentPage: number;
  // }
  //   const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <TableMD />
          <table className='hidden min-w-full text-gray-900 md:table'>
            <TableHeader />
            {children}
          </table>
        </div>
      </div>
    </div>
  );
}
