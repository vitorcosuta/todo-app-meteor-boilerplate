import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Collapse,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface TodoCollapseProps {
    children: React.ReactNode;
}

export const TodoCollapse = (props: TodoCollapseProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent='flex-start'
                onClick={() => setOpen(!open)}
                sx={{ cursor: 'pointer', padding: 1 }}
            >
                <IconButton size="small">
                {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Typography fontWeight="bold">Tarefas</Typography>
            </Box>

            <Collapse in={open} timeout="auto" unmountOnExit>
                { props.children }
            </Collapse>
        </Box>
    );
}