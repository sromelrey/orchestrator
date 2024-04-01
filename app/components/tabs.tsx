import { useState } from "react";
import { Tabs as MUITabs } from "@mui/material";

import Tab from "@mui/material/Tab";
import { Box, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tabs({
  tabLabels,
  tabsComponent,
}: {
  tabLabels: Array<string>;
  tabsComponent: Array<React.ReactNode>;
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='w-full flex flex-col items-center'>
      {/* <div className="relative mx-auto"> */}
      <MUITabs
        value={value}
        onChange={handleChange}
        className=' flex w-96 justify-center flex-row gap-6 p-4 md:-mt-3 mb-6  bg-violet-400 bg-opacity-20 border-violet-100 rounded-lg shadow-violet-200'
      >
        {tabLabels.map((label, index) => (
          <Tab
            label={label}
            key={index}
            {...a11yProps(0)}
            className='text-white'
          />
        ))}
      </MUITabs>
      {/* </div> */}
      {tabsComponent.map((panel, index) => (
        <CustomTabPanel value={value} key={index} index={index}>
          {panel}
        </CustomTabPanel>
      ))}
    </div>
  );
}
