import React, { useCallback, useContext, useMemo, useState, useEffect } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import { toDosApi } from "/imports/modules/toDos/api/toDosApi";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";
import ToDosListView from "./toDosListView";
import { IUserProfile } from "/imports/modules/userprofile/api/userProfileSch";
import { ModalProps } from "@mui/material/Modal";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";

const TODO_LIMIT = 4;

interface IInitialConfig {
	filter: Object;
	options: Object;
	tabValue: number;
	isAddTodoModalOpen: boolean;
}

// Interface que define o padrão do contexto a ser passado para o view
interface IToDosListContollerContext {
	pendingTodosList: (Partial<IToDos> & { username: string })[];
	completedTodosList: (Partial<IToDos> & { username: string })[];
	todosCount: number;
	user: IUserProfile | undefined;
	tabValue: number;
	isAddTodoModalOpen: boolean;
	loading: boolean;
	onSearchBarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
	onAddTodoClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onCloseModalClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onCloseModalHandler: (event: React.SyntheticEvent | {}, reason: "backdropClick" | "escapeKeyDown") => void;
	onAddTodoSubmit: ({ name, description, isPersonal }: { name: string; description: string; isPersonal: boolean }) => void;
}

// Criamos um contexto vazio inicialmente
export const ToDosListControllerContext = React.createContext<IToDosListContollerContext>(
	{} as IToDosListContollerContext
);

const InitialConfig = {
	options: { limit: TODO_LIMIT, sort: { 'createdat': -1 } },
	filter: {},
	tabValue: 0,
	isAddTodoModalOpen: false,
}

const ToDosListController = () => {
	
	const { user } = useContext<IAuthContext>(AuthContext);
	const { showNotification } = useContext(AppLayoutContext);
	
	const [config, setConfig] = useState<IInitialConfig>(InitialConfig);

	const { filter, options, tabValue, isAddTodoModalOpen } = config;

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

		const pendingTodosList = subHandle?.ready() ? toDosApi.find({ status: { $ne: 'Concluída' }}, options).fetch() : [];
		const completedTodosList = subHandle?.ready() ? toDosApi.find({ status: 'Concluída' }, options).fetch() : [];
		
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

	const onTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
		setConfig((prev) => ({
			...prev,
			tabValue: newValue
		}))
	}, []);
	
	const onAddTodoClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		setConfig((prev) => ({
			...prev,
			isAddTodoModalOpen: true
		}))
	}, []);

	const onCloseModalClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		setConfig((prev) => ({
			...prev,
			isAddTodoModalOpen: false
		}))
	}, []);

	const onCloseModalHandler = useCallback<NonNullable<ModalProps["onClose"]>>(
		(event: React.SyntheticEvent | {}, reason: "backdropClick" | "escapeKeyDown") => {
			if (reason === "backdropClick") {
				return;
			}
	}, []);

	const onAddTodoSubmit = useCallback(({ name, description, isPersonal }: { name: string; description: string; isPersonal: boolean }) => {
		
		const userId = user?._id;

		toDosApi.addTodo({ name, userId, description, isPersonal }, (error, result) => {

			setConfig((prev) => ({
				...prev,
				isAddTodoModalOpen: false
			}));

			if (error) {
				return showNotification({
					type: 'error',
					title: 'Erro na inserção',
					message: 'Não foi possível adicionar a tarefa.',
					showStartIcon: true,
				});
			} else {
				return showNotification({
					type: 'success',
					title: 'Tudo pronto',
					message: 'Sua tarefa foi adicionada com sucesso.',
					showStartIcon: true,
				});
			}
		});
	}, []);

	const providerValues: IToDosListContollerContext = useMemo(
		() => ({
            pendingTodosList,
			completedTodosList,
			todosCount,
			tabValue,
			isAddTodoModalOpen,
            user,
            loading,
			onSearchBarChange,
			onTabChange,
			onAddTodoClick,
			onCloseModalClick,
			onCloseModalHandler,
			onAddTodoSubmit,
        }), [pendingTodosList, completedTodosList, loading]
	);

	return (
		<ToDosListControllerContext.Provider value={providerValues}>
			<ToDosListView />
		</ToDosListControllerContext.Provider>
	);
};

export default ToDosListController;
