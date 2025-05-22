import React from "react";
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import { styled } from "@mui/material/styles";

interface ITodoListStyles {
    TodoListItem: React.ElementType<ListItemProps>;
}

const TodoListStyles: ITodoListStyles = {
    TodoListItem: styled(ListItem)(({ theme }) => ({
        '&:hover': {
            backgroundColor: theme.palette.divider,
            cursor: 'pointer',
        }
    })),
}

export default TodoListStyles;