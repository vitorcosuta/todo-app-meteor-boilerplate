import React from "react";
import { styled } from "@mui/material/styles";
import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";

interface ITodoDetailDrawerStyles {
    DrawerContainer: React.ElementType<BoxProps>;
    DrawerHeader: React.ElementType<BoxProps>;
    DrawerOptions: React.ElementType<BoxProps>;
    FieldText: React.ElementType<TypographyProps>;
    FieldTitle: React.ElementType<TypographyProps>;
    EditButton: React.ElementType<ButtonProps>;
}

const TodoDetailDrawerStyles: ITodoDetailDrawerStyles = {
    DrawerContainer: styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        width: '40vw',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(4),
        padding: '10px 30px',
    })),
    DrawerHeader: styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(5),
    })),
    DrawerOptions: styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: theme.spacing(3),
    })),
    FieldText: styled(Typography)(({ theme }) => ({
        fontWeight: '400',
        fontSize: '18px',
        letterSpacing: '0.15%',
        lineHeight: '100%',
    })),
    FieldTitle: styled(Typography)(() => ({
        fontWeight: '900',
        fontSize: '18px',
        letterSpacing: '0.15%',
        lineHeight: '100%',
    })),
    EditButton: styled(Button)(({ theme }) => ({
        width: '278px',
        height: '50px',
        borderRadius: '10px',
        textTransform: 'none',
        margin: '30px auto',
        color: theme.palette.common.black,
        borderColor: theme.palette.divider,
        borderBlockWidth: '2px',
        '&:hover': {
            backgroundColor: alpha(theme.palette.divider, 0.3),
            borderColor: alpha(theme.palette.divider, 0.6),
            borderWidth: '4px',
            color: alpha(theme.palette.common.black, 0.8),
        },
        '&:active, &:focus, &.Mui-focusVisible': {
            backgroundColor: alpha(theme.palette.divider, 0.4),
            borderColor: alpha(theme.palette.divider, 0.6),
            borderWidth: '4px',
            color: alpha(theme.palette.common.black, 0.9),
        },
    }))
}

export default TodoDetailDrawerStyles;