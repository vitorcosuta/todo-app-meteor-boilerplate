import React, { useContext, useEffect } from 'react';
import SignInStyles from './signInStyles';
import { useNavigate } from 'react-router-dom';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysLink from '/imports/ui/components/sysLink/sysLink';
import { signInSchema } from './signinsch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { sysSizing } from '/imports/ui/materialui/styles';

const SignInPage: React.FC = () => {
	const { showNotification } = useContext(AppLayoutContext);
	const { user, signIn } = useContext<IAuthContext>(AuthContext);
	const navigate = useNavigate();
	const { 
		Container,
		Content, 
		FormWrapper,
		FormInput,
		FormHelper,
		Title,
		CommonText,
	} = SignInStyles;

	const handleSubmit = ({ email, password }: { email: string; password: string }) => {
		signIn(email, password, (err) => {
			if (!err) navigate('/');
			showNotification({
				type: 'error',
				title: 'Erro ao tentar logar',
				message: 'Email ou senha inválidos',
			});
		});
;	};

	const handleForgotPassword = () => navigate('/password-recovery');

	useEffect(() => {
		if (user) navigate('/');
	}, [user]);

	return (
		<Container>
			<Content>

				<Title textAlign={'center'}>ToDo List</Title>

				<CommonText display={'block'} textAlign={'center'}>
					<Typography variant='inherit'>
						Boas-vindas à sua lista de tarefas.
					</Typography>

					<Typography variant='inherit'>
						Insira seu e-mail e senha para efetuar o login.
					</Typography>
				</CommonText>

				<SysForm schema={signInSchema} onSubmit={handleSubmit} debugAlerts={false}>
					<FormWrapper>
						<FormInput>
							<SysTextField 
								name="email" 
								label="Email" 
								fullWidth 
								placeholder="Digite seu email"
							/>
						</FormInput>
						
						<FormInput>
							<SysTextField 
								label="Senha" 
								fullWidth 
								name="password" 
								placeholder="Digite sua senha" 
								type="password"
							/>
						</FormInput>

						<SysFormButton 
							variant="contained"
							sx={{ 
								bgcolor: theme => theme.palette.divider,
						 	}}
						>
							Entrar
						</SysFormButton>
						
						<FormHelper>
							<Typography>Esqueceu sua senha?</Typography>
							<SysLink component='button' onClick={handleForgotPassword}>Clique aqui</SysLink>
						</FormHelper>

						<FormHelper>
							<Typography>Novo por aqui?</Typography>
							<SysLink component='button'>Cadastre-se</SysLink>
						</FormHelper>
					</FormWrapper>
				</SysForm>
			</Content>
		</Container>
	);
};

export default SignInPage;
