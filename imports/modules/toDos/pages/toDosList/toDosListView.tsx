import React, { useContext, Fragment } from 'react';
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


const ToDosListView = () => {

	const {
		TabSection,
		SearchInput,
		ModalHeader,
	} =  ToDosListStyles

	const controller = useContext(ToDosListControllerContext);
	const pendingTodos = controller.pendingTodosList;
	const completedTodos = controller.completedTodosList;
	const currentUserId = controller.user?._id;
	const currentTab = controller.currentTabIndex;
	const currentDetailedTodo = controller.detailedTodo;
	const isAddModalOpen = controller.isAddTodoModalOpen;
	const isEditModalOpen = controller.isEditTodoModalOpen;
	const isDrawerOpen = controller.isDetailDrawerOpen;
	const isPendingCollapseOpen = controller.isPendingCollapseOpen;
	const isCompletedCollapseOpen = controller.isCompletedCollapseOpen;
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

	return (
		<Fragment>
			<TabHeader value={currentTab} onChange={controller.onTabChange} />

			<TabSection id='tab-section'>
				<CustomTabPanel value={currentTab} index={0}>
					<SearchInput>
						<SysTextField
							name='search-term'
							startAdornment={<SearchIcon />}
							placeholder='Procurar tarefa'
							onChange={controller.onSearchBarChange}
						/>
					</SearchInput>
					
					<TodoCollapse
						title='Não Concluídas'
						open={isPendingCollapseOpen}
						in={isPendingCollapseOpen} 
						timeout="auto" 
						unmountOnExit
						onClick={handlePendingCollapseClick}
					>
						<TodoList 
							todos={pendingTodos} 
							currentUser={currentUserId} 
							onDetailClick={handleDetailTodoClick} 
							onDeleteClick={handleDeleteTodoClick}
						/>
					</TodoCollapse>
					
					<TodoCollapse
						title='Concluídas'
						open={isCompletedCollapseOpen}
						in={isCompletedCollapseOpen} 
						timeout="auto" 
						unmountOnExit
						onClick={handleCompletedCollapseClick}
					>
						<TodoList 
							todos={completedTodos} 
							currentUser={currentUserId} 
							onDetailClick={handleDetailTodoClick}
							onDeleteClick={handleDeleteTodoClick}
						/>
					</TodoCollapse>

					<TodoActionButton
						startIcon={<AddIcon />}
						onClick={handleOpenAddModal}
					>
						Adicionar Tarefa
					</TodoActionButton>
				</CustomTabPanel>
				<CustomTabPanel value={currentTab} index={1}>
					Não há nada para ver aqui.
				</CustomTabPanel>

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
