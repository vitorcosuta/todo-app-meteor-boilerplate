import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import HomeStyles from './homeStyle';
import { HomeControllerContext } from './homeController';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { TodoActionButton } from '../../../ui/components/TodoActionButton/TodoActionButton';
import { useNavigate } from 'react-router-dom';
import { TodoList } from '/imports/ui/components/TodoList/TodoList';

const Home: React.FC = () => {
	const { Container, Header, } = HomeStyles;
	const controller = useContext(HomeControllerContext);
	const navigate = useNavigate();

	const username = controller.user?.username;

	const handleClick = () => navigate('/toDos');

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

				<TodoList todos={controller.todoList} currentUserName={username} />

				<TodoActionButton 
					endIcon={<KeyboardDoubleArrowRightIcon />}
					onClick={handleClick}
				>
					Ir para tarefas
				</TodoActionButton>
			</Header>
		</Container>
	);
};

export default Home;
