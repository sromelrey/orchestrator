import React from "react";

export default function TableMD() {
  return (
    <div className='md:hidden'>
      {/* {invoices?.map((invoice) => (
        <div key={invoice.id} className='mb-2 w-full rounded-md bg-white p-4'>
          <div className='flex items-center justify-between border-b pb-4'>
            test
          </div>
          <div className='flex w-full items-center justify-between pt-4'>
            <div>
              <p className='text-xl font-medium'>
                {formatCurrency(invoice.amount)}
              </p>
              <p>{formatDateToLocal(invoice.date)}</p>
            </div>
            <div className='flex justify-end gap-2'>
              <UpdateInvoice id={invoice.id} />
              <DeleteInvoice id={invoice.id} />
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
}
