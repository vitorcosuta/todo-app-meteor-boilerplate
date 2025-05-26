import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import HomeStyles from './homeStyle';
import { HomeControllerContext } from './homeController';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { TodoActionButton } from '../../../ui/components/TodoActionButton/TodoActionButton';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Home: React.FC = () => {
	const { Container, Header, } = HomeStyles;
	const controller = useContext(HomeControllerContext);
	const navigate = useNavigate();

	const currentUserId = controller.user?._id;
	const currentUserName = controller.user?.username;
	const latestTodos = controller.todoList;

	const handleClick = () => navigate('/toDos');

	return (
		<Container>
      		<Header>
				<Typography variant="h1">Olá, {currentUserName} </Typography>
				<Typography variant="body1" textAlign={'justify'}>
					Seus projetos muito mais organizados. 
					Veja as tarefas adicionadas por seu time, por você e para você!
				</Typography>
				<Typography variant='h3'>
					Adicionadas recentemente
				</Typography>

				<List sx={{ width: '100%' }}>
					{ latestTodos.map((todo) => (
						<ListItem id={todo._id} divider={true}>
							<ListItemIcon>
                            {todo.status === 'Concluída' ? <TaskAltIcon fontSize="large" /> : <PanoramaFishEyeIcon fontSize="large" />}
                        </ListItemIcon>
                        
                        <ListItemText
                            primary={todo.name}
                            secondary={`Criada por: ${currentUserId === todo.userId ? 'Você' : todo.username}`} 
                        />
						</ListItem>
					)) }
				</List>

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
