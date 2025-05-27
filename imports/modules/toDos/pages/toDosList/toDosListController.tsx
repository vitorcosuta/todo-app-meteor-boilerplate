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
	currentPendingPersonalPage: number;
	currentPendingTeamPage: number;
	currentCompletedPersonalPage: number;
	currentCompletedTeamPage: number;
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
	completedTeamTodosList: (Partial<IToDos> & { username: string })[];
	completedPersonalTodosList: (Partial<IToDos> & { username: string })[];
	pendingTeamTodosList: (Partial<IToDos> & { username: string })[];
	pendingPersonalTodosList: (Partial<IToDos> & { username: string })[];
	pendingTeamCount: number;
	pendingPersonalCount: number;
	completedTeamCount: number;
	completedPersonalCount: number;
	detailedTodo: Partial<IToDos> & { username: string };
	user: IUserProfile | undefined;

	// Variáveis de controle de componentes
	currentTabIndex: number;
	currentPendingPersonalPage: number;
	currentPendingTeamPage: number;
	currentCompletedPersonalPage: number;
	currentCompletedTeamPage: number;
	isAddTodoModalOpen: boolean;
	isEditTodoModalOpen: boolean;
	isDetailDrawerOpen: boolean;
	isCompletedCollapseOpen: boolean;
	isPendingCollapseOpen: boolean;
	loading: boolean;

	/** FUNÇÕES DE EVENTOS */

	// onClick
	onAddTodoClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onChangeTodoStatusClick: (todo: Partial<IToDos>) => void;
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
	onCompletedPersonalChange: (event: React.ChangeEvent<unknown>, newValue: number) => void;
	onCompletedTeamChange: (event: React.ChangeEvent<unknown>, newValue: number) => void;
	onPendingPersonalChange: (event: React.ChangeEvent<unknown>, newValue: number) => void;
	onPendingTeamChange: (event: React.ChangeEvent<unknown>, newValue: number) => void;

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
	options: { sort: { 'createdat': -1 } },
	filter: {},
	currentTabIndex: 0,
	currentPendingPersonalPage: 1,
	currentPendingTeamPage: 1,
	currentCompletedPersonalPage: 1,
	currentCompletedTeamPage: 1,
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
		currentCompletedPersonalPage,
		currentCompletedTeamPage,
		currentPendingPersonalPage,
		currentPendingTeamPage, 
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
					{ userId: user._id },
					{ isPersonal: false }
				]
			}
		}));
	}, [user?._id]);

	const {
		loading,
		pendingTeamTodosList,
		pendingPersonalTodosList,
		completedTeamTodosList,
		completedPersonalTodosList,
		pendingTeamCount,
		pendingPersonalCount,
		completedTeamCount,
		completedPersonalCount,
	} = useTracker(() => {
		const subHandle = toDosApi.subscribe('ToDos', filter, options);

		const ready = subHandle?.ready();

		const baseQuery = {
			pendingTeam: { status: { $ne: 'Concluída' }, isPersonal: false },
			pendingPersonal: { status: { $ne: 'Concluída' }, isPersonal: true },
			completedTeam: { status: 'Concluída', isPersonal: false },
			completedPersonal: { status: 'Concluída', isPersonal: true },
		};

		const pendingTeamSkip = (config.currentPendingTeamPage - 1) * TODO_LIMIT;
		const pendingPersonalSkip = (config.currentPendingPersonalPage - 1) * TODO_LIMIT;
		const completedTeamSkip = (config.currentCompletedTeamPage - 1) * TODO_LIMIT;
		const completedPersonalSkip = (config.currentCompletedPersonalPage - 1) * TODO_LIMIT;

		// Opções específicas por lista
		const getOptions = (skip: number) => ({
			sort: { createdAt: -1 },
			limit: TODO_LIMIT,
			skip,
		});

		// Counts ignoram skip/limit
		const pendingTeamCount = toDosApi.find(baseQuery.pendingTeam).count();
		const pendingPersonalCount = toDosApi.find(baseQuery.pendingPersonal).count();
		const completedTeamCount = toDosApi.find(baseQuery.completedTeam).count();
		const completedPersonalCount = toDosApi.find(baseQuery.completedPersonal).count();

		// Fetch com paginação individual
		const pendingTeamTodosList = ready
			? toDosApi.find(baseQuery.pendingTeam, getOptions(pendingTeamSkip)).fetch()
			: [];

		const pendingPersonalTodosList = ready
			? toDosApi.find(baseQuery.pendingPersonal, getOptions(pendingPersonalSkip)).fetch()
			: [];

		const completedTeamTodosList = ready
			? toDosApi.find(baseQuery.completedTeam, getOptions(completedTeamSkip)).fetch()
			: [];

		const completedPersonalTodosList = ready
			? toDosApi.find(baseQuery.completedPersonal, getOptions(completedPersonalSkip)).fetch()
			: [];

		return {
			loading: !!subHandle && !ready,
			pendingTeamTodosList,
			pendingPersonalTodosList,
			completedTeamTodosList,
			completedPersonalTodosList,
			pendingTeamCount,
			pendingPersonalCount,
			completedTeamCount,
			completedPersonalCount,
		};
	}, [config]);


	/** EVENTOS onClick */
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

	const onChangeTodoStatusClick = useCallback((todo: Partial<IToDos>) => {

		toDosApi.changeTodoStatus(todo, (error, result) => {
			
			if (error) {
				return showNotification({
					type: 'error',
					title: 'Erro na edição',
					message: 'Não foi possível alterar o status da tarefa.',
					showStartIcon: true,
				});
			} else {
				return showNotification({
					type: 'warning',
					title: 'Alteração concluída',
					message: 'O status da tarefa foi alterado.',
					showStartIcon: true,
				});
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

	/** EVENTOS onChange */
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

	const onCompletedPersonalChange = useCallback((event: React.ChangeEvent<unknown>, newValue: number) => {
		setConfig((prev) => ({
			...prev,
			currentCompletedPersonalPage: newValue
		}))
	}, []);

	const onCompletedTeamChange = useCallback((event: React.ChangeEvent<unknown>, newValue: number) => {
		setConfig((prev) => ({
			...prev,
			currentCompletedTeamPage: newValue
		}))
	}, []);

	const onPendingPersonalChange = useCallback((event: React.ChangeEvent<unknown>, newValue: number) => {
		setConfig((prev) => ({
			...prev,
			currentPendingPersonalPage: newValue
		}))
	}, []);

	const onPendingTeamChange = useCallback((event: React.ChangeEvent<unknown>, newValue: number) => {
		setConfig((prev) => ({
			...prev,
			currentPendingTeamPage: newValue
		}))
	}, []);

	
	/** EVENTOS onSubmit */
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

	/** EVENTOS onClose */
	const onModalClose = useCallback<NonNullable<ModalProps["onClose"]>>(
		(event: React.SyntheticEvent | {}, reason: "backdropClick" | "escapeKeyDown") => {
			if (reason === "backdropClick") {
				return;
			}
	}, []);

	const providerValues: IToDosListContollerContext = useMemo(
		() => ({
            pendingPersonalTodosList,
			pendingTeamTodosList,
			completedPersonalTodosList,
			completedTeamTodosList,
			pendingTeamCount,
			pendingPersonalCount,
			completedTeamCount,
			completedPersonalCount,
			detailedTodo,
			user,
			currentTabIndex,
			currentCompletedPersonalPage,
			currentCompletedTeamPage,
			currentPendingPersonalPage,
			currentPendingTeamPage,
			isAddTodoModalOpen,
			isEditTodoModalOpen,
			isDetailDrawerOpen,
			isCompletedCollapseOpen,
			isPendingCollapseOpen,
            loading,
			onSearchBarChange,
			onTabChange,
			onCompletedPersonalChange,
			onCompletedTeamChange,
			onPendingPersonalChange,
			onPendingTeamChange,
			onAddTodoClick,
			onChangeTodoStatusClick,
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
        }), [pendingPersonalTodosList, pendingTeamTodosList, completedPersonalTodosList, completedTeamTodosList, loading]
	);

	return (
		<ToDosListControllerContext.Provider value={providerValues}>
			<ToDosListView />
		</ToDosListControllerContext.Provider>
	);
};

export default ToDosListController;
