"use client";
import * as React from "react";
import { createTheme, styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";


export default function DatePicker({
  name,
  setIsDuplicate,
}: {
  name: string;
  setIsDuplicate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(""));

  const handleChangeDate = (newValue: Dayjs | null) => {
    setValue(newValue);
    setIsDuplicate(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker
        name={name}
        value={value}
        onChange={(newValue) => handleChangeDate(newValue)}
        className={
          "peer block w-full rounded-md border bg-white border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        }
      />
    </LocalizationProvider>
  );
}
