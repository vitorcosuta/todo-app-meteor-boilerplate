import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import HomeStyles from './homeStyle';
import { HomeControllerContext } from './homeController';
import List from '@mui/material/List';
import { TodoListItem } from '/imports/ui/components/TodoListItem/TodoListItem';

const Home: React.FC = () => {
	
	const { Container, Header, } = HomeStyles;
	const controller = useContext(HomeControllerContext);

	const username = controller.user?.username;

	return (
		<Container>
      		<Header>
				<Typography variant="h1">Olá, {username} </Typography>
				<Typography variant="body1" textAlign={'justify'}>
					Seus projetos muito mais organizados. 
					Veja as tarefas adicionadas por seu time, por você e para você!
				</Typography>
				<Typography variant='h3'>
					Adicionadas recentemente
				</Typography>
				<List>
					{controller.todoList.map((todo) => (
						<TodoListItem 
							key={todo._id}
							currentUser={username}
							taskCreator={todo.username}
							taskName={todo.name}
						/>
					))}
				</List>
			</Header>
		</Container>
	);
};

export default Home;
