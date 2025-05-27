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
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

interface TodoListProps {
    currentUser: string | undefined;
    todos: (Partial<IToDos> & { username: string })[];
    onDetailClick: (id: string | undefined) => void;
    onDeleteClick: (id: string | undefined) => void;
    onChangeStatusClick: (todo: Partial<IToDos>) => void;
}

export const TodoList = (props: TodoListProps) => {

    const { TodoListItem, ListItemMenu } = TodoListStyles;

    const { 
        currentUser, 
        todos, 
        onDetailClick, 
        onDeleteClick,
        onChangeStatusClick,
    } = props;

    const [menu, setMenu] = React.useState<{ anchorEl: HTMLElement | null; todo: Partial<IToDos> | null }>({
        anchorEl: null,
        todo: null,
    });

    const open = Boolean(menu.anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>, todo: (Partial<IToDos> & { username: string }) | null) => {
        
        if (!todo) return;

        const { username, ...partialTodo } = todo;

        event.stopPropagation();
        setMenu({
            anchorEl: event.currentTarget,
            todo: partialTodo,
        });
    };
  
    const handleClose = () => {
        setMenu({ anchorEl: null, todo: null });
    };

    const handleDeleteClick = () => {
        handleClose();
        if (menu.todo?._id) {
            onDeleteClick(menu.todo._id);
        }
    };

    const handleChangeStatusClick = () => {
        handleClose();
        if (menu.todo?._id && menu.todo?.status) {
            onChangeStatusClick(menu.todo);
        }
    } 

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
                            { todo.status === 'Concluída' ? <TaskAltIcon fontSize="large" /> : <PanoramaFishEyeIcon fontSize="large" /> }
                        </ListItemIcon>
                        
                        <ListItemText
                            primary={todo.name}
                            secondary={`Criada por: ${currentUser === todo.userId ? 'Você' : todo.username}`} 
                        />

                        <IconButton onClick={(e) => handleClick(e, todo)}>
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

                        <MenuItem onClick={handleChangeStatusClick}>
                            { todo.status === 'Concluída' ? (
                                <>
                                    <RemoveDoneIcon />
                                    Tornar pendente
                                </>
                                ):
                                <>
                                    <DoneAllIcon />
                                    Concluir
                                </> 
                            }
                        </MenuItem>
                    </ListItemMenu>
                </Fragment>
            ))}
        </List>
    );
};