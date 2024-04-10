"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";

const StyledDatePicker = styled(MUIDatePicker)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

export default function DatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker />
    </LocalizationProvider>
  );
}
