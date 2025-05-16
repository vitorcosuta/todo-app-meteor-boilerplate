import React, { useState, useContext } from 'react';
import ToDosListStyles from './toDosListStyles';
import { TodoCollapse } from '/imports/ui/components/TodoCollapse/TodoCollapse';
import { CustomTabPanel } from '/imports/ui/components/sysTabs/CustomTabPanel/CustomTabPanel';
import { TabHeader } from '/imports/ui/components/sysTabs/TabHeader/TabHeader';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SearchIcon from '@mui/icons-material/Search';
import { ToDosListControllerContext } from './toDosListController';
import { TodoList } from '/imports/ui/components/TodoList/TodoList';

const ToDosListView = () => {
	
	const [tabValue, setTabValue] = useState(0);

	const {
		Container,
		TabSection
	} =  ToDosListStyles

	const controller = useContext(ToDosListControllerContext);
	const todos = controller.todoList;
	const username = controller.user?.username;
	const currentTab = controller.tabValue;

	return (
		<Container>
			<TabHeader value={currentTab} onChange={controller.onTabChange} />

			<TabSection>
				<CustomTabPanel value={currentTab} index={0}>
					<SysTextField
						name='search-term'
						startAdornment={<SearchIcon />}
						placeholder='Procurar tarefa'
						onChange={controller.onSearchBarChange}
					/>
					<TodoCollapse>
						<TodoList todos={todos} currentUserName={username} />
					</TodoCollapse>
				</CustomTabPanel>
				<CustomTabPanel value={currentTab} index={1}>
					Não há nada para ver aqui.
				</CustomTabPanel>
			</TabSection>
		</Container>
	);
};

export default ToDosListView;
