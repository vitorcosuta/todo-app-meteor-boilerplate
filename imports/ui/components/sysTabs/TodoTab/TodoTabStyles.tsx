import React from "react";
import { styled } from '@mui/material/styles';
import Tab from "@mui/material/Tab";

interface ITodoTab {
    TodoTab: React.ElementType;
}

const TodoTabStyles: ITodoTab = {
    TodoTab: styled(Tab)(({ theme }) => ({
        color: theme.palette.common.black,
        textTransform: 'none',
        '&.Mui-selected': {
            color: theme.palette.common.black,
            fontWeight: 'bold',
        },
        '&:hover': {
            color: theme.palette.common.black,
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
        },
    }))
};

export default TodoTabStyles;