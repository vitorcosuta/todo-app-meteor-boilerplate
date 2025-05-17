import React, { useState } from "react";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import List from '@mui/material/List';
import Typography from "@mui/material/Typography";
import { TodoListItem } from '/imports/ui/components/TodoListItem/TodoListItem';

interface TodoListProps {
    currentUserName: string | undefined;
    todos: (Partial<IToDos> & { username: string })[];
}

export const TodoList = (props: TodoListProps) => {

    const { currentUserName } = props;
    let { todos } = props;

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
                    currentUser={currentUserName}
                    taskCreator={todo.username}
                    taskName={todo.name}
                />
            ))}
        </List>
    );
};