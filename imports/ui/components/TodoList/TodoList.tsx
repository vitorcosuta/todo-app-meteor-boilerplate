import React from "react";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import List from '@mui/material/List';
import { TodoListItem } from '/imports/ui/components/TodoListItem/TodoListItem';

interface TodoListProps {
    todos: (Partial<IToDos> & { username: string })[];
    currentUserName: string | undefined;
}

export const TodoList = (props: TodoListProps) => {

    return (
        <List sx={{ width: '100%' }}>
            {props.todos.map((todo) => (
                <TodoListItem 
                    key={todo._id}
                    currentUser={props.currentUserName}
                    taskCreator={todo.username}
                    taskName={todo.name}
                />
            ))}
        </List>
    );
};