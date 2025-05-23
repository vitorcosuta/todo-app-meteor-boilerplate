import React from "react";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import List from '@mui/material/List';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Typography from "@mui/material/Typography";
import TodoListStyles from "./TodoListStyles";

interface TodoListProps {
    currentUser: string | undefined;
    todos: (Partial<IToDos> & { username: string })[];
    onDetailClick: (id: string | undefined) => void;
}

export const TodoList = (props: TodoListProps) => {

    const { TodoListItem } = TodoListStyles;

    const { currentUser, todos, onDetailClick } = props;

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
                </TodoListItem>
            ))}
        </List>
    );
};