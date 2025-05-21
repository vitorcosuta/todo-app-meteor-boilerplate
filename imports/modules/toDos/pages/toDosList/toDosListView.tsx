import React, { useState, useContext, Fragment } from 'react';
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
import SysForm from '/imports/ui/components/sysForm/sysForm';
import { TodoForm } from '/imports/ui/components/TodoForm/TodoForm';


const ToDosListView = () => {

	const {
		TabSection,
		SearchInput,
		ModalHeader,
	} =  ToDosListStyles

	const controller = useContext(ToDosListControllerContext);
	const pendingTodos = controller.pendingTodosList;
	const completedTodos = controller.completedTodosList;
	const username = controller.user?.username;
	const currentTab = controller.tabValue;
	const isModalOpen = controller.isAddTodoModalOpen;
	const handleOpen = controller.onAddTodoClick;
	const handleClose = controller.onCloseModalHandler;
	const handleCloseClick = controller.onCloseModalClick;
	const handleAddSubmit = controller.onAddTodoSubmit;

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
						currentUserName={username}
						todos={pendingTodos}
						variant='pending'
					/>
					<TodoCollapse 
						currentUserName={username}
						todos={completedTodos}
						variant='completed'
					/>

					<TodoActionButton
						startIcon={<AddIcon />}
						onClick={handleOpen}
					>
						Adicionar Tarefa
					</TodoActionButton>
				</CustomTabPanel>
				<CustomTabPanel value={currentTab} index={1}>
					Não há nada para ver aqui.
				</CustomTabPanel>
			</TabSection>

			<SysModal open={isModalOpen} onClose={handleClose}>
				<ModalHeader>
					<Typography variant='h2'>Adicionar Tarefa</Typography>
					<IconButton onClick={handleCloseClick} sx={{ width: '50px', height: '50px' }}>
						<CloseIcon />
					</IconButton>
				</ModalHeader>
				
				<TodoForm onSubmit={handleAddSubmit} />
			</SysModal>
		</Fragment>
	);
};

export default ToDosListView;
