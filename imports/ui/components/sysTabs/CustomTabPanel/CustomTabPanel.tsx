import React from 'react';
import Box from '@mui/material/Box';
import CustomTabPanelSyles from './CustomTabPanelStyles';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
export const CustomTabPanel = (props: TabPanelProps) => {
    
    const { children, value, index } = props;

    const {
        TabPanelBox
    } = CustomTabPanelSyles

    return (
        <TabPanelBox
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
        {value === index && <Box>{children}</Box>}
        </TabPanelBox>
    );
}