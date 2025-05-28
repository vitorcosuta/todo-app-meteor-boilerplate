// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import Typography from '@mui/material/Typography';
import { userprofileApi } from '../../../modules/userprofile/api/userProfileApi';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';
import SysLink from '/imports/ui/components/sysLink/sysLink';

import { SignUpStyles } from './signUpStyles';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';

interface ISignUp {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignUp = (props: ISignUp) => {
	
	const { showNotification } = props;

	const { Container, FormButton, FormInput, FormRouter } = SignUpStyles;

	const navigate = useNavigate();

	const handleSubmit = (doc: { email: string; password: string }) => {
		const { email, password } = doc;

		userprofileApi.insertNewUser({ email, username: email, password }, (err, r) => {
			if (err) {
				console.log('Login err', err);
				showNotification &&
					showNotification({
						type: 'warning',
						title: 'Problema na criação do usuário!',
						description: 'Erro ao fazer registro em nossa base de dados!'
					});
			} else {
				showNotification &&
					showNotification({
						type: 'sucess',
						title: 'Cadastrado com sucesso!',
						description: 'Registro de usuário realizado em nossa base de dados!'
					});
			}
		});
	};

	const handleGoToSignUp = () => navigate('/signin');

	return (
		<Container>
			
			<Typography variant='h2'>Cadastre-se agora!</Typography>
			<SimpleForm
				schema={{
					email: {
						type: String,
						label: 'Email',
						optional: false
					},
					password: {
						type: String,
						label: 'Senha',
						optional: false
					}
				}}
				onSubmit={handleSubmit}>

				<FormInput>
					<TextField id="Email" label="Email" fullWidth name="email" type="email" placeholder="Digite um email" />
				</FormInput>
				
				<FormInput>
					<TextField id="Senha" label="Senha" fullWidth name="password" placeholder="Digite uma senha" type="password" />
				</FormInput>
				
				<FormInput>
					<FormButton id='submit' type='submit'>
						Cadastrar
					</FormButton>
				</FormInput>
		
			</SimpleForm>
			<FormRouter>
				<Typography>Já tem uma conta?</Typography>
				<SysLink component='button' onClick={handleGoToSignUp}>Fazer login</SysLink>
			</FormRouter>
		</Container>
	);
};
