import React, { useCallback, useContext, useMemo, useState, useEffect } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import { toDosApi } from "/imports/modules/toDos/api/toDosApi";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";
import ToDosListView from "./toDosListView";
import { IUserProfile } from "/imports/modules/userprofile/api/userProfileSch";

const TODO_LIMIT = 4;

interface IInitialConfig {
	filter: Object;
	options: Object;
	tabValue: number;
}

// Interface que define o padrão do contexto a ser passado para o view
interface IToDosListContollerContext {
	pendingTodosList: (Partial<IToDos> & { username: string })[];
	completedTodosList: (Partial<IToDos> & { username: string })[];
	todosCount: number;
	user: IUserProfile | undefined;
	tabValue: number;
	loading: boolean;
	onSearchBarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

// Criamos um contexto vazio inicialmente
export const ToDosListControllerContext = React.createContext<IToDosListContollerContext>(
	{} as IToDosListContollerContext
);

const InitialConfig = {
	options: { limit: TODO_LIMIT, sort: { 'createdat': 1 } },
	filter: {},
	tabValue: 0,
}

const ToDosListController = () => {
	
	const { user } = useContext<IAuthContext>(AuthContext);
	
	const [config, setConfig] = useState<IInitialConfig>(InitialConfig);

	const { filter, options, tabValue } = config;

	// Alterando o filtro inicial
	useEffect(() => {
		if (!user?._id) return;
	
		setConfig((prev) => ({
			...prev,
			filter: {
				...prev.filter,
				$or: [
					{ createdby: user._id },
					{ isPersonal: false }
				]
			}
		}));
	}, [user?._id]);

	const { loading, pendingTodosList, completedTodosList, todosCount } = useTracker(() => {
		const subHandle = toDosApi.subscribe('ToDos', filter, options);

		const pendingTodosList = subHandle?.ready() ? toDosApi.find({ status: { $ne: 'Concluída' } }).fetch() : [];
		const completedTodosList = subHandle?.ready() ? toDosApi.find({ status: 'Concluída' }).fetch() : [];
		
		return {
			pendingTodosList,
			completedTodosList,
			loading: !!subHandle && !subHandle.ready(),
			todosCount: subHandle ? subHandle.total : pendingTodosList.length
		};
	}, [config]);

	const onSearchBarChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, name: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 1000);

		return () => clearTimeout(delayedSearch);
	}, []);

	const onTabChange = useCallback(
		(event: React.SyntheticEvent, newValue: number) => {
			setConfig((prev) => ({
				...prev,
				tabValue: newValue
			}))
		}, []);

	const providerValues: IToDosListContollerContext = useMemo(
		() => ({
            pendingTodosList,
			completedTodosList,
			todosCount,
			tabValue,
            user,
            loading,
			onSearchBarChange,
			onTabChange
        }), [pendingTodosList, completedTodosList, loading]
	);

	return (
		<ToDosListControllerContext.Provider value={providerValues}>
			<ToDosListView />
		</ToDosListControllerContext.Provider>
	);
};

export default ToDosListController;
