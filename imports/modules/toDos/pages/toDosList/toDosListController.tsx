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

// Interface que define os estados iniciais de diversas variáveis do controlador
interface IInitialConfig {

	// Configurações da publicação
	filter: Object;
	options: Object;

	// Variáveis de controle/estado de componentes
	currentTabIndex: number;
	detailedTodo: Partial<IToDos> & { username: string };
	isAddTodoModalOpen: boolean;
	isEditTodoModalOpen: boolean;
	isDetailDrawerOpen: boolean;
	isCompletedCollapseOpen: boolean;
	isPendingCollapseOpen: boolean;
}

// Interface que define o padrão do contexto a ser passado para o view
interface IToDosListContollerContext {
	
	// Coleções de dados e metadados
	completedTodosList: (Partial<IToDos> & { username: string })[];
	pendingTodosList: (Partial<IToDos> & { username: string })[];
	detailedTodo: Partial<IToDos> & { username: string };
	todosCount: number;
	user: IUserProfile | undefined;

	// Variáveis de controle de componentes
	currentTabIndex: number;
	isAddTodoModalOpen: boolean;
	isEditTodoModalOpen: boolean;
	isDetailDrawerOpen: boolean;
	isCompletedCollapseOpen: boolean;
	isPendingCollapseOpen: boolean;
	loading: boolean;

	/** FUNÇÕES DE EVENTOS */

	// onClick
	onAddTodoClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onCloseModalClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onCloseDrawerClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onCompletedCollapseClick: (event: React.MouseEvent<HTMLDivElement>) => void;
	onDeleteTodoClick: (id: string | undefined) => void;
	onDetailTodoClick: (id: string | undefined) => void;
	onEditTodoClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onPendingCollapseClick: (event: React.MouseEvent<HTMLDivElement>) => void;
	

	// onChange
	onSearchBarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onTabChange: (event: React.SyntheticEvent, newValue: number) => void;

	// onSubmit
	onAddTodoSubmit: ({ name, description, isPersonal }: { name: string; description: string; isPersonal: boolean }) => void;
	onEditTodoSubmit: ({ _id, name, description, isPersonal }: { _id: string, name: string; description: string; isPersonal: boolean }) => void;
	
	// onClose
	onModalClose: (event: React.SyntheticEvent | {}, reason: "backdropClick" | "escapeKeyDown") => void;
	
}

// Criamos um contexto vazio inicialmente
export const ToDosListControllerContext = React.createContext<IToDosListContollerContext>(
	{} as IToDosListContollerContext
);

const InitialConfig = {
	options: { limit: TODO_LIMIT, sort: { 'createdat': -1 } },
	filter: {},
	currentTabIndex: 0,
	detailedTodo: { username: '' },
	isAddTodoModalOpen: false,
	isEditTodoModalOpen: false,
	isDetailDrawerOpen: false,
	isCompletedCollapseOpen: true,
	isPendingCollapseOpen: true,
}

const ToDosListController = () => {
	
	const { user } = useContext<IAuthContext>(AuthContext);
	const { showNotification } = useContext(AppLayoutContext);
	
	const [config, setConfig] = useState<IInitialConfig>(InitialConfig);

	const { 
		filter, 
		options, 
		currentTabIndex,  
		detailedTodo,
		isAddTodoModalOpen,
		isEditTodoModalOpen,
		isDetailDrawerOpen,
		isCompletedCollapseOpen,
		isPendingCollapseOpen,
	} = config;

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
			currentTabIndex: newValue
		}))
	}, []);
	
	const onAddTodoClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		setConfig((prev) => ({
			...prev,
			isAddTodoModalOpen: true
		}))
	}, []);

	const onDeleteTodoClick = useCallback((id: string | undefined) => {

		toDosApi.deleteTodo(id, (error, result) => {
			
			if (error) {
				return showNotification({
					type: 'error',
					title: 'Erro na remoção',
					message: 'Não foi possível deletar a tarefa.',
					showStartIcon: true,
				});
			} else {
				return showNotification({
					type: 'success',
					title: 'Tudo pronto.',
					message: 'Sua tarefa foi deletada com sucesso.',
					showStartIcon: true,
				});
			}
		});
	}, [])

	const onEditTodoClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		setConfig((prev) => ({
			...prev,
			isEditTodoModalOpen: true
		}))
	}, []);

	const onCloseModalClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		setConfig((prev) => ({
			...prev,
			isAddTodoModalOpen: false,
			isEditTodoModalOpen: false
		}))
	}, []);

	const onCloseDrawerClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		setConfig((prev) => ({
			...prev,
			isDetailDrawerOpen: false
		}))
	}, []);

	const onModalClose = useCallback<NonNullable<ModalProps["onClose"]>>(
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

	const onEditTodoSubmit = useCallback(({ _id, name, description, isPersonal }: { _id: string, name: string; description: string; isPersonal: boolean }) => {

		const userId = user?._id;
		
		toDosApi.editTodo({ _id, userId, name, description, isPersonal }, (error, result) => {

			setConfig((prev) => ({
				...prev,
				isEditTodoModalOpen: false,
				isDetailDrawerOpen: false
			}));

			if (error) {
				return showNotification({
					type: 'error',
					title: 'Erro na edição',
					message: 'Não foi possível editar a tarefa.',
					showStartIcon: true,
				});
			} else {
				return showNotification({
					type: 'success',
					title: 'Alteração concluída',
					message: 'Sua tarefa foi editada com sucesso.',
					showStartIcon: true,
				});
			}
		});
	}, []);

	const onDetailTodoClick = useCallback((id: string | undefined) => {

		toDosApi.findTodoById(id, (error, result) => {
			if (error) {
				return showNotification({
					type: 'error',
					title: 'Erro na busca',
					message: `A tarefa selecionada não foi encontrada. ${error}`,
					showStartIcon: true,
				});
			} else {
				setConfig((prev) => ({
					...prev,
					isDetailDrawerOpen: true,
					detailedTodo: result,
				}));
			}
		});
	}, []);

	const onPendingCollapseClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		setConfig((prev) => ({
			...prev,
			isPendingCollapseOpen: !prev.isPendingCollapseOpen,
		}))
	}, []);

	const onCompletedCollapseClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		setConfig((prev) => ({
			...prev,
			isCompletedCollapseOpen: !prev.isCompletedCollapseOpen,
		}))
	}, []);

	const providerValues: IToDosListContollerContext = useMemo(
		() => ({
            pendingTodosList,
			completedTodosList,
			detailedTodo,
			user,
			todosCount,
			currentTabIndex,
			isAddTodoModalOpen,
			isEditTodoModalOpen,
			isDetailDrawerOpen,
			isCompletedCollapseOpen,
			isPendingCollapseOpen,
            loading,
			onSearchBarChange,
			onTabChange,
			onAddTodoClick,
			onDeleteTodoClick,
			onEditTodoClick,
			onCloseModalClick,
			onCloseDrawerClick,
			onDetailTodoClick,
			onPendingCollapseClick,
			onCompletedCollapseClick,
			onModalClose,
			onAddTodoSubmit,
			onEditTodoSubmit,
        }), [pendingTodosList, completedTodosList, loading]
	);

	return (
		<ToDosListControllerContext.Provider value={providerValues}>
			<ToDosListView />
		</ToDosListControllerContext.Provider>
	);
};

export default ToDosListController;
