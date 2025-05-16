import React from "react";
import { TabProps } from "@mui/material";
import TodoTabStyles from "./TodoTabStyles";


export const TodoTab: React.FC<TabProps> = ({ ...props }) => {

    const { TodoTab } = TodoTabStyles;

    return (
        <TodoTab {...props} />
    ); 
}