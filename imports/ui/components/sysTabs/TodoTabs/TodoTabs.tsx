import React from "react";
import { TabsProps } from "@mui/material";
import TodoTabsStyles from "./TodoTabsStyles";

export const TodoTabs: React.FC<TabsProps> = ({ children, ...props }) => {

    const { TodoTabs } = TodoTabsStyles;

    return (
        <TodoTabs {...props} >
            { children }
        </TodoTabs>
    );  
};