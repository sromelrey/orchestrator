"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function MUIPopover({
  message,
  children,
}: {
  message: string;
  children: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className='w-full relative'>
      <span
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </span>

      <Popover
        id='mouse-over-popover'
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{message}</Typography>
      </Popover>
    </div>
  );
}
