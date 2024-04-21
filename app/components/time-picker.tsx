"use client";
import * as React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicTimePicker({
  name,
  label,
  onChange,
}: {
  name: string;
  label: string;
  onChange: React.Dispatch<any>;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label className='mb-3 mt-5 block text-xs font-medium text-white'>
        {label}
      </label>
      <DemoContainer components={["DesktopTimePicker"]}>
        <TimePicker
          name={name}
          className={
            "peer block w-full rounded-md border bg-white border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          }
          onChange={onChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
