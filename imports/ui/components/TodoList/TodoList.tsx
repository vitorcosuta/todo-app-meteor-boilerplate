import React from "react";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Typography from "@mui/material/Typography";
import TodoListStyles from "./TodoListStyles";

interface TodoListProps {
    currentUserName: string | undefined;
    todos: (Partial<IToDos> & { username: string })[];
}

export const TodoList = (props: TodoListProps) => {

    const { TodoListItem } = TodoListStyles;

    const { currentUserName, todos } = props;

    if (todos.length == 0) {
        return (
            <Typography>
                Não há tarefas para visualização.
            </Typography>
        );
    } 

    return (
        <List sx={{ width: '100%' }}>
            {todos.map((todo, index) => (
                <TodoListItem
                    key={todo._id}
                    divider={true} 
                >
                    <ListItemIcon>
                        {todo.status === 'Concluída' ? <TaskAltIcon fontSize="large" /> : <PanoramaFishEyeIcon fontSize="large" />}
                    </ListItemIcon>
                    
                    <ListItemText
                        primary={todo.name}
                        secondary={`Criada por: ${currentUserName === todo.username ? 'Você' : todo.username}`} 
                    />
                </TodoListItem>
            ))}
        </List>
    );
};