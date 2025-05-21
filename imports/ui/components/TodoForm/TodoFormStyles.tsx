import React from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

interface ITodoFormStyles {
    FormWrapper: React.ElementType<BoxProps>;
    FormInput: React.ElementType<BoxProps>;
}

const TodoFormStyles: ITodoFormStyles = {
    FormWrapper: styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(5),
        marginTop: theme.spacing(10),
    })),
    FormInput: styled(Box)(() => ({
        width: '100%', 
		display: 'flex', 
		margin: '0 auto', 
		maxWidth: '577px'
    })),
}

export default TodoFormStyles;