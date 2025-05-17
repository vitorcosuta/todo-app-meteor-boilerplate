import React, { useState } from 'react';
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { TodoList } from '../TodoList/TodoList';
import TodoCollapseStyles from './TodoCollapseStyles';

interface TodoCollapseProps {
    currentUserName: string | undefined;
    todos: (Partial<IToDos> & { username: string })[];
    variant: 'completed' | 'pending';
}

export const TodoCollapse = (props: TodoCollapseProps) => {
    
    const [open, setOpen] = useState(true);
    
    const { currentUserName, variant } = props;
    let { todos } = props;

    const {
        Wrapper,
        DropdownBox
    } = TodoCollapseStyles;

    const title = variant === 'completed' ? 
                        `Concluídas (${todos.length})`:
                        `Não concluídas (${todos.length})`;

    return (
        <Wrapper>
            <DropdownBox onClick={() => setOpen(!open)}>
                <IconButton size="small">
                {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Typography fontWeight="bold">{ title }</Typography>
            </DropdownBox>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <TodoList currentUserName={currentUserName} todos={todos} />
            </Collapse>
        </Wrapper>
    );
}