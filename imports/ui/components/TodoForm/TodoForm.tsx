import React from "react";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import SysForm from "../sysForm/sysForm";
import { toDosSch } from "/imports/modules/toDos/api/toDosSch";
import SysTextField from "../sysFormFields/sysTextField/sysTextField";
import SysFormButton from "../sysFormFields/sysFormButton/sysFormButton";
import SysSwitch from "../sysFormFields/sysSwitch/sysSwitch";
import TodoFormStyles from "./TodoFormStyles";

interface TodoFormProps {
    todo?: Partial<IToDos> & {username: string};
    onSubmit: (doc: any) => void;
}

export const TodoForm = (props: TodoFormProps) => {

    const {
        FormInput,
        FormWrapper,
    } = TodoFormStyles;

    const { todo, onSubmit } = props;
 
    return (
        <SysForm schema={toDosSch} onSubmit={onSubmit} debugAlerts={false} doc={todo}>
            <FormWrapper>
                <FormInput>
                    <SysTextField 
                        name="name" 
                        label="Título"
                        fullWidth 
                        placeholder="Dê um título para sua tarefa"
                    />
                </FormInput>

                <FormInput>
                    <SysTextField 
                        name="description" 
                        label="Descrição" 
                        fullWidth 
                        placeholder="Adicione aqui a descrição da tarefa"
                        multiline
                        rows={5}
                    />
                </FormInput>

                <FormInput>
                    <SysSwitch name='isPersonal' label="Pessoal?" />   
                </FormInput>
            
                <SysFormButton 
                    variant="contained"
                    disabled={false}
                    sx={{ 
                        bgcolor: theme => theme.palette.divider,
                        margin: '0 auto',
                    }}
                >
                    Salvar
                </SysFormButton>
                
            </FormWrapper>
        </SysForm>
    );
}