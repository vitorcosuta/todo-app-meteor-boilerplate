import React, { useContext, useMemo, useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import { toDosApi } from "/imports/modules/toDos/api/toDosApi";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";
import Home from "./home";
import { IUserProfile } from "/imports/modules/userprofile/api/userProfileSch";

const TODO_LIMIT = 5;

// Interface que define o padrão do contexto a ser passado para o view
interface IHomeControllerContext {
    todoList: (Partial<IToDos> & { username: string })[];
    user: IUserProfile | undefined;
    loading: boolean;
}

// Criamos um contexto vazio inicialmente
export const HomeControllerContext = React.createContext<IHomeControllerContext>(
    {} as IHomeControllerContext
);

const HomeController = () => {

    const { user } = useContext<IAuthContext>(AuthContext);

    const queryParams = {
        $or: [
            { createdby: user?._id },      // Tarefas criadas pelo usuário logado
            { isPersonal: false }          	   // Tarefas públicas
        ]
    }

    const options = {
        limit: 5,
        sort: { 'createdat': 1 }
    };

    const { loading, latestTodos } = useTracker(() => {
        const subHandle = toDosApi.subscribe('ToDos', {...queryParams}, options);

        const latestTodos = subHandle?.ready() ? toDosApi.find().fetch() : [];
        
        return {
            latestTodos,
            loading: !!subHandle && !subHandle.ready(),
            total: subHandle ? subHandle.total : latestTodos.length
        };
    }, []);

    const providerValues: IHomeControllerContext = useMemo(
        () => ({
            todoList: latestTodos,
            user: user,
            loading
        }), [latestTodos, loading]
    );

    return (
        <HomeControllerContext.Provider value={providerValues}>
            <Home />
        </HomeControllerContext.Provider>
    );
};

export default HomeController;