import React from "react";
import { ListItem, ListItemProps } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

/** Interface para representar um item de lista de tarefas */
interface ITodoListItem extends ListItemProps {
    key: string | undefined;
    currentUser: string | undefined;
    divider?: boolean;
    selected?: boolean;
    taskCompleted?: boolean;
    taskCreator: string;
    taskName: string | undefined;
    onClick?: () => void;
}

export const TodoListItem: React.FC<ITodoListItem> = ({
    key,
    currentUser,
    divider = true,
    selected = false,
    taskCompleted,
    taskCreator,
    taskName,
    onClick
}) => {

    return (
        <ListItem 
            divider={divider} 
            sx={{ bgcolor: 
                    selected ? (theme) => theme.palette.divider 
                    : (theme) => theme.palette.common.white
                }}
            onClick={onClick}
        >
            <ListItemIcon>
                {taskCompleted ? <TaskAltIcon fontSize="large" /> : <PanoramaFishEyeIcon fontSize="large" />}
            </ListItemIcon>
            
            <ListItemText
                primary={taskName}
                secondary={`Criada por: ${currentUser === taskCreator ? 'Você' : taskCreator}`} 
            />
        </ListItem>
    );
}