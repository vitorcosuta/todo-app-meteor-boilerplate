import React from 'react';
import Collapse, { CollapseProps } from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import TodoCollapseStyles from './TodoCollapseStyles';

interface ITodoCollapseProps extends Omit<CollapseProps, 'onClick'>  {
    children: React.ReactNode;
    title: string;
    open: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const TodoCollapse = ({ title, children, open, onClick, ...collapseProps }: ITodoCollapseProps) => {

    const {
        Wrapper,
        DropdownBox
    } = TodoCollapseStyles;

    return (
        <Wrapper>
            <DropdownBox onClick={onClick}>
                <IconButton size="small">
                {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Typography fontWeight="bold">{ title }</Typography>
            </DropdownBox>

            <Collapse {...collapseProps}>
                { children }
            </Collapse>
        </Wrapper>
    );
}