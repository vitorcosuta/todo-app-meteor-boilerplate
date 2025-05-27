import React, { useContext, Fragment, useMemo } from 'react';
import ToDosListStyles from './toDosListStyles';
import { TodoCollapse } from '/imports/ui/components/TodoCollapse/TodoCollapse';
import { CustomTabPanel } from '/imports/ui/components/sysTabs/CustomTabPanel/CustomTabPanel';
import { TabHeader } from '/imports/ui/components/sysTabs/TabHeader/TabHeader';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { ToDosListControllerContext } from './toDosListController';
import { TodoActionButton } from '/imports/ui/components/TodoActionButton/TodoActionButton';
import AddIcon from '@mui/icons-material/Add';
import { SysModal } from '/imports/ui/components/sysModal/SysModal';
import { TodoForm } from '/imports/ui/components/TodoForm/TodoForm';
import { TodoList } from '/imports/ui/components/TodoList/TodoList';
import { TodoDetailDrawer } from '/imports/ui/components/sysMenu/components/TodoDetailDrawer/TodoDetailDrawer';
import { Pagination } from '@mui/material';

const PAGE_SIZE = 4;

const ToDosListView = () => {

	const {
		TabSection,
		SearchInput,
		ModalHeader,
	} =  ToDosListStyles

	const controller = useContext(ToDosListControllerContext);

	// Coleções de dados e metadados
	const pendingPersonalTodos = controller.pendingPersonalTodosList;
	const pendingTeamTodos = controller.pendingTeamTodosList;
	const completedPersonalTodos = controller.completedPersonalTodosList;
	const completedTeamTodos = controller.completedTeamTodosList;
	const pendingPersonalCount = controller.pendingPersonalCount;
	const pendingTeamCount = controller.pendingTeamCount;
	const completedPersonalCount = controller.completedPersonalCount;
	const completedTeamCount = controller.completedTeamCount;

	// Variáveis de estado/controle
	const currentUserId = controller.user?._id;
	const currentTab = controller.currentTabIndex;
	const currentCompletedPersonalPage = controller.currentCompletedPersonalPage;
	const currentCompletedTeamPage = controller.currentCompletedTeamPage;
	const currentPendingPersonalPage = controller.currentPendingPersonalPage;
	const currentPendingTeamPage = controller.currentPendingTeamPage;
	const currentDetailedTodo = controller.detailedTodo;
	const isAddModalOpen = controller.isAddTodoModalOpen;
	const isEditModalOpen = controller.isEditTodoModalOpen;
	const isDrawerOpen = controller.isDetailDrawerOpen;
	const isPendingCollapseOpen = controller.isPendingCollapseOpen;
	const isCompletedCollapseOpen = controller.isCompletedCollapseOpen;

	// Eventos
	const handleOpenAddModal = controller.onAddTodoClick;
	const handleOpenEditModal = controller.onEditTodoClick;
	const handleClose = controller.onModalClose;
	const handleModalCloseClick = controller.onCloseModalClick;
	const handleDrawerCloseClick = controller.onCloseDrawerClick;
	const handleAddSubmit = controller.onAddTodoSubmit;
	const handleEditSubmit = controller.onEditTodoSubmit;
	const handlePendingCollapseClick = controller.onPendingCollapseClick;
	const handleCompletedCollapseClick = controller.onCompletedCollapseClick;
	const handleDetailTodoClick = controller.onDetailTodoClick;
	const handleDeleteTodoClick = controller.onDeleteTodoClick;
	const handleChangeStatusClick = controller.onChangeTodoStatusClick;
	const handleCompletedPersonalPageChange = controller.onCompletedPersonalChange;
	const handleCompletedTeamPageChange = controller.onCompletedTeamChange;
	const handlePendingPersonalPageChange = controller.onPendingPersonalChange;
	const handlePendingTeamPageChange = controller.onPendingTeamChange;

	const completedPersonalPages = useMemo(() => {
		return Math.ceil(completedPersonalCount / PAGE_SIZE);
	}, [completedPersonalCount]);

	const completedTeamPages = useMemo(() => {
		return Math.ceil(completedTeamCount / PAGE_SIZE);
	}, [completedTeamCount]);

	const pendingPersonalPages = useMemo(() => {
		return Math.ceil(pendingPersonalCount / PAGE_SIZE);
	}, [pendingPersonalCount]);

	const pendingTeamPages = useMemo(() => {
		return Math.ceil(pendingTeamCount / PAGE_SIZE);
	}, [pendingTeamCount]);

	return (
		<Fragment>
			<TabHeader value={currentTab} onChange={controller.onTabChange} />

			<TabSection id='tab-section'>

				<SearchInput>
					<SysTextField
						name='search-term'
						startAdornment={<SearchIcon />}
						placeholder='Procurar tarefa'
						onChange={controller.onSearchBarChange}
					/>
				</SearchInput>

				<CustomTabPanel value={currentTab} index={0}>
					<TodoCollapse
						title={`Não concluídas (${pendingPersonalCount})`}
						open={isPendingCollapseOpen}
						in={isPendingCollapseOpen} 
						timeout="auto" 
						unmountOnExit
						onClick={handlePendingCollapseClick}
					>
						<TodoList 
							todos={pendingPersonalTodos} 
							currentUser={currentUserId} 
							onDetailClick={handleDetailTodoClick} 
							onDeleteClick={handleDeleteTodoClick}
							onChangeStatusClick={handleChangeStatusClick}
						/>

						<Pagination
							count={pendingPersonalPages}
							page={currentPendingPersonalPage}
							onChange={handlePendingPersonalPageChange}
						/>
					</TodoCollapse>
					
					<TodoCollapse
						title={`Concluídas (${completedPersonalCount})`}
						open={isCompletedCollapseOpen}
						in={isCompletedCollapseOpen} 
						timeout="auto" 
						unmountOnExit
						onClick={handleCompletedCollapseClick}
					>
						<TodoList 
							todos={completedPersonalTodos} 
							currentUser={currentUserId} 
							onDetailClick={handleDetailTodoClick}
							onDeleteClick={handleDeleteTodoClick}
							onChangeStatusClick={handleChangeStatusClick}
						/>

						<Pagination 
							count={completedPersonalPages} 
							page={currentCompletedPersonalPage}
							onChange={handleCompletedPersonalPageChange}
						/>
					</TodoCollapse>
				</CustomTabPanel>

				<CustomTabPanel value={currentTab} index={1}>
					<TodoCollapse
						title={`Não concluídas (${pendingTeamCount})`}
						open={isPendingCollapseOpen}
						in={isPendingCollapseOpen} 
						timeout="auto" 
						unmountOnExit
						onClick={handlePendingCollapseClick}
					>
						<TodoList 
							todos={pendingTeamTodos} 
							currentUser={currentUserId} 
							onDetailClick={handleDetailTodoClick} 
							onDeleteClick={handleDeleteTodoClick}
							onChangeStatusClick={handleChangeStatusClick}
						/>

						<Pagination 
							count={pendingTeamPages}
							page={currentPendingTeamPage}
							onChange={handlePendingTeamPageChange}
						/>
					</TodoCollapse>
					
					<TodoCollapse
						title={`Concluídas (${completedTeamCount})`}
						open={isCompletedCollapseOpen}
						in={isCompletedCollapseOpen} 
						timeout="auto" 
						unmountOnExit
						onClick={handleCompletedCollapseClick}
					>
						<TodoList 
							todos={completedTeamTodos} 
							currentUser={currentUserId} 
							onDetailClick={handleDetailTodoClick}
							onDeleteClick={handleDeleteTodoClick}
							onChangeStatusClick={handleChangeStatusClick}
						/>

						<Pagination 
							count={completedTeamPages}
							page={currentCompletedTeamPage}
							onChange={handleCompletedTeamPageChange}
						/>
					</TodoCollapse>
				</CustomTabPanel>

				<TodoActionButton
					startIcon={<AddIcon />}
					onClick={handleOpenAddModal}
				>
					Adicionar Tarefa
				</TodoActionButton>

				<TodoDetailDrawer 
					open={isDrawerOpen} 
					currentUser={currentUserId}
					onCloseClick={handleDrawerCloseClick}
					onEditTodoClick={handleOpenEditModal}
					todo={currentDetailedTodo} 
					anchor='right' 
				/>
			</TabSection>

			<SysModal open={isAddModalOpen} onClose={handleClose}>
				<ModalHeader>
					<Typography variant='h2'>Adicionar Tarefa</Typography>
					<IconButton onClick={handleModalCloseClick} sx={{ width: '50px', height: '50px' }}>
						<CloseIcon />
					</IconButton>
				</ModalHeader>
				
				<TodoForm onSubmit={handleAddSubmit} />
			</SysModal>

			<SysModal open={isEditModalOpen} onClose={handleClose}>
				<ModalHeader>
					<Typography variant='h2'>Editar Tarefa</Typography>
					<IconButton onClick={handleModalCloseClick} sx={{ width: '50px', height: '50px' }}>
						<CloseIcon />
					</IconButton>
				</ModalHeader>
				
				<TodoForm onSubmit={handleEditSubmit} todo={currentDetailedTodo} />
			</SysModal>
		</Fragment>
	);
};

export default ToDosListView;
