import React, { Fragment } from "react";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import IconButton from "@mui/material/IconButton";
import List from '@mui/material/List';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import TodoListStyles from "./TodoListStyles";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface TodoListProps {
    currentUser: string | undefined;
    todos: (Partial<IToDos> & { username: string })[];
    onDetailClick: (id: string | undefined) => void;
    onDeleteClick: (id: string | undefined) => void;
}

export const TodoList = (props: TodoListProps) => {

    const { TodoListItem, ListItemMenu } = TodoListStyles;

    const { currentUser, todos, onDetailClick, onDeleteClick } = props;

    const [menu, setMenu] = React.useState<{ anchorEl: HTMLElement | null; todoId?: string }>({
        anchorEl: null,
        todoId: undefined,
    });

    const open = Boolean(menu.anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>, todoId: string | undefined) => {
        event.stopPropagation();
        setMenu({
            anchorEl: event.currentTarget,
            todoId,
        });
    };
  
    const handleClose = () => {
        setMenu({ anchorEl: null, todoId: undefined });
    };

    const handleDeleteClick = () => {
        handleClose();
        if (menu.todoId) {
            onDeleteClick(menu.todoId);
        }
    };

    if (todos.length == 0) {
        return (
            <Typography>
                Não há tarefas para visualização.
            </Typography>
        );
    } 

    return (
        <List sx={{ width: '100%' }}>
            {todos.map((todo) => (
                <Fragment>
                    <TodoListItem
                        key={todo._id}
                        divider={true} 
                        onClick={() => onDetailClick(todo._id)}
                    >
                        <ListItemIcon>
                            {todo.status === 'Concluída' ? <TaskAltIcon fontSize="large" /> : <PanoramaFishEyeIcon fontSize="large" />}
                        </ListItemIcon>
                        
                        <ListItemText
                            primary={todo.name}
                            secondary={`Criada por: ${currentUser === todo.userId ? 'Você' : todo.username}`} 
                        />

                        <IconButton onClick={(e) => handleClick(e, todo._id)}>
                            <MoreVertIcon />
                        </IconButton>
                    </TodoListItem>

                    <ListItemMenu
                        anchorEl={menu.anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleDeleteClick} disableRipple>
                            <DeleteForeverIcon />
                            Deletar
                        </MenuItem>
                    </ListItemMenu>
                </Fragment>
            ))}
        </List>
    );
};