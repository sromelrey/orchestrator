"use client";
import * as React from "react";
import { createTheme, styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

const StyledDatePicker = styled(MUIDatePicker)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
  },
});

export default function DatePicker({ name }: { name: string }) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(""));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker
        name={name}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        className='peer block w-full rounded-md border bg-white border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
      />
    </LocalizationProvider>
  );
}
