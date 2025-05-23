import React from "react";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Typography from "@mui/material/Typography";
import TodoDetailDrawerStyles from "./TodoDetailDrawerStyles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

interface ITodoDetailDrawerProps extends DrawerProps {
    todo: Partial<IToDos> & { username: string };
    currentUser: string | undefined;
    onCloseClick: React.MouseEventHandler<HTMLButtonElement>;
    onEditTodoClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const TodoDetailDrawer = ({ todo, currentUser, onCloseClick, onEditTodoClick, ...drawerProps}: ITodoDetailDrawerProps) => {

    const {
        DrawerContainer,
        DrawerHeader,
        DrawerOptions,
        FieldTitle,
        FieldText,
        CreatorInfo,
        EditButton,
    } = TodoDetailDrawerStyles;

    return (
        <Drawer {...drawerProps}>
            <DrawerContainer>
                <DrawerOptions>
                    <IconButton onClick={onCloseClick}>
                        <CloseIcon />
                    </IconButton>
                </DrawerOptions>

                <DrawerHeader>
                    { todo.status === 'Concluída' ? <TaskAltIcon fontSize="large" /> : <PanoramaFishEyeIcon fontSize="large" /> }
                    <Typography variant='h4'>{ todo.name }</Typography>
                </DrawerHeader>
                
                <FieldTitle>Descrição</FieldTitle>
                <FieldText>{ todo.description?.trim() || 'Sem descrição' }</FieldText>

                <FieldTitle>Tipo</FieldTitle>
                <FieldText>{ todo.isPersonal ? 'Pessoal' : 'Pública' }</FieldText>

                <EditButton variant="outlined" onClick={onEditTodoClick}>Editar</EditButton>

                <DrawerOptions>
                    <CreatorInfo>Criado por: { currentUser === todo.userId ? 'Você' : todo.username }</CreatorInfo>
                </DrawerOptions>
            </DrawerContainer>
        </Drawer>
    );
};