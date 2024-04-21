import * as React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

interface TextBoxProps {
  htmlFor: string;
  label: string;
  minRows?: number;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export default function Textarea({
  htmlFor,
  label,
  minRows,
  name,
  onChange,
  ...rest
}: TextBoxProps) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className='mb-3 mt-5 block text-xs font-medium text-white'
      >
        {label}
      </label>
      <TextareaAutosize
        {...rest}
        name={name}
        className='peer block w-full rounded-md border border-gray-200 py-[9px] px-5 text-sm outline-2 placeholder:text-gray-500'
        minRows={minRows ? minRows : 3}
        placeholder='Task Description'
        onChange={onChange}
      />
    </>
  );
}
