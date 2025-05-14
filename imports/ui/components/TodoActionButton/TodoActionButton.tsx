import React from "react";
import { ButtonProps } from "@mui/material";
import TodoActionButtonStyles from "./TodoActionButtonStyles";

export const TodoActionButton: React.FC<ButtonProps> = ({ children, ...props }) => {

    const { ActionButton } = TodoActionButtonStyles;

    return (
        <ActionButton {...props}>
            { children }
        </ActionButton>
    );
};