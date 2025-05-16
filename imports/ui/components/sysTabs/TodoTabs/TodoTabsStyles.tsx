import React from "react";
import { styled } from '@mui/material/styles';
import Tabs from "@mui/material/Tabs";

interface ITodoTabsStyles {
    TodoTabs: React.ElementType;
}

const TodoTabsStyles: ITodoTabsStyles = {
    TodoTabs: styled(Tabs)(({ theme }) => ({ 
		paddingLeft: '10vw',
        width: '100%',
        '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.common.black,
            height: '4px',
            borderRadius: '4px 4px 0 0',
        },
    }))
}

export default TodoTabsStyles;