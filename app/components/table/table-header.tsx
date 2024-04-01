import React from 'react'

export default function TableHeader() {
  return (
    <thead className="rounded-lg text-left text-sm font-normal">
      <tr>
        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
          Title's
        </th>
        <th scope="col" className="px-3 py-5 font-medium text-center">
          No. of Task's
        </th>
        <th scope="col" className="px-3 py-5 font-medium  text-center">
          Pending Task
        </th>
        <th scope="col" className="px-3 py-5 font-medium  text-center">
          Finished Task
        </th>
        <th scope="col" className="px-3 py-5 font-medium text-center">
          Date
        </th>
        <th scope="col" className="px-3 py-5 font-medium text-center">
          <span className="sr-only">Edit</span>
          Actions
        </th>
      </tr>
    </thead>
  )
}
