import React from "react";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";

interface ITodoActionButtonStyles {
    ActionButton: React.ElementType;
}

const TodoActionButtonStyles: ITodoActionButtonStyles = {
    ActionButton: styled(Button)(({theme}) => ({
        backgroundColor: theme.palette.divider,
        border: 'none',
        borderRadius: '999px', // faz o botão virar uma "pílula"
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        color: theme.palette.common.black,
        left: '50%',
        maxHeight: '50px',
        maxWidth: '238px',
        position: 'fixed',
        textTransform: 'none', // mantém o texto como foi escrito (sem virar caps)
        top: '85%',
        transform: 'translate(-50%, -50%)',
        // padding (usando shorthand do MUI — px/py) deve ser aplicado via `sx` ou em Box
        // se estiver usando styled direto, substitua por padding puro:
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        '&:hover': {
            border: 'none',
            backgroundColor: theme.palette.text.secondary,
            color: theme.palette.common.white,
        },
        '&:active': {
            border: 'none',
            backgroundColor: theme.palette.text.secondary,
            color: theme.palette.common.white,
        },
        '&:focus': {
            border: 'none',
            backgroundColor: theme.palette.text.secondary,
            color: theme.palette.common.white,
        },
        '&.Mui-focusVisible': {
            border: 'none',
            backgroundColor: theme.palette.text.secondary,
            color: theme.palette.common.white,
        },
    })),
};

export default TodoActionButtonStyles;