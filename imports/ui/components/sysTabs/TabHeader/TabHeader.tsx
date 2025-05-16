import React from 'react';
import Box from '@mui/material/Box';
import { TodoTabs } from '../TodoTabs/TodoTabs';
import { TodoTab } from '../TodoTab/TodoTab';

interface TabHeaderProps {
    value?: number;
    onChange?: (event: React.SyntheticEvent, newValue: number) => void;
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TabHeader = (props: TabHeaderProps) => {

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <TodoTabs value={props.value} onChange={props.onChange}>
                <TodoTab label="Minhas Tarefas" {...a11yProps(0)} />
                <TodoTab label="Tarefas do Time" {...a11yProps(1)} />
            </TodoTabs>
        </Box>
    );
};