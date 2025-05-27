import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { userprofileServerApi } from '../modules/userprofile/api/userProfileServerApi';
import { toDosServerApi } from '../modules/toDos/api/toDosServerApi';

const SEED_EMAIL = 'admin@mrb.com';
const SEED_PASSWORD = 'admin@mrb.com';

const insertPendingTeamToDo = (todoName: string, user: Meteor.User | null | undefined) => {

	const doc = {
		name: todoName,
		userId: user?._id,
		status: 'Pendente',
		isPersonal: false,
		createdat: new Date().toISOString(),
	};

	toDosServerApi.getCollectionInstance().insertAsync(doc);
}

const insertPendingPersonalToDo = (todoName: string, user: Meteor.User | null | undefined) => {

	const doc = {
		name: todoName,
		userId: user?._id,
		status: 'Pendente',
		isPersonal: true,
		createdat: new Date().toISOString(),
	};

	toDosServerApi.getCollectionInstance().insertAsync(doc);
}

const insertCompletedTeamToDo = (todoName: string, user: Meteor.User | null | undefined) => {

	const doc = {
		name: todoName,
		userId: user?._id,
		status: 'Concluída',
		isPersonal: false,
		createdat: new Date().toISOString(),
	};

	toDosServerApi.getCollectionInstance().insertAsync(doc);
}
	
const insertCompletedPersonalToDo = (todoName: string, user: Meteor.User | null | undefined) => {

	const doc = {
		name: todoName,
		userId: user?._id,
		status: 'Concluída',
		isPersonal: true,
		createdat: new Date().toISOString(),
	};

	toDosServerApi.getCollectionInstance().insertAsync(doc);
}	

async function createDefautUser() {
	
	const count = await Meteor.users.find({}).countAsync();

	if (count === 0) {

		let createdUserId = '';

		createdUserId = await Accounts.createUserAsync({
			username: 'Administrador',
			email: SEED_EMAIL,
			password: SEED_PASSWORD
		});


		await Meteor.users.upsertAsync(
			{ _id: createdUserId },
			{
				$set: {
					'emails.0.verified': true,
					profile: {
						name: 'Admin',
						email: SEED_EMAIL
					}
				}
			}
		);

		await userprofileServerApi.getCollectionInstance().insertAsync({
			_id: createdUserId,
			username: 'Administrador',
			email: SEED_EMAIL,
			roles: ['Administrador']
		});
	}
}

async function createDefaultToDos(user: Meteor.User | null | undefined) {

	const TodosCollection = toDosServerApi.getCollectionInstance();

	if ((await TodosCollection.find().countAsync() === 0)) {
		[
			"Elaborar roteiro do grupo focal",
			"Realizar atividade",
			"Fazer reunião de alinhamento",
			"Definir prazos",
			"Selecionar participantes para o primeiro grupo focal"
		].forEach((todo: string) => insertPendingPersonalToDo(todo, user));

		[
			"Organizar materiais de apoio",
			"Montar apresentação inicial",
			"Enviar convite aos participantes",
			"Reservar sala para o grupo focal",
			"Coletar dados preliminares"
		].forEach((todo: string) => insertCompletedPersonalToDo(todo, user));

		[
			"Analisar respostas dos participantes",
			"Consolidar feedbacks obtidos",
			"Revisar roteiro elaborado",
			"Validar metodologia aplicada",
			"Criar formulário de inscrição"
		].forEach((todo: string) => insertPendingTeamToDo(todo, user));

		[
			"Treinar facilitadores do grupo focal",
			"Distribuir tarefas entre a equipe",
			"Preparar relatório parcial",
			"Agendar próximos encontros",
			"Documentar principais aprendizados"
		].forEach((todo: string) => insertCompletedTeamToDo(todo, user));
	}
}

// if the database is empty on server start, create some sample data.
Meteor.startup(async () => {

	console.log('fixtures Meteor.startup');

	// Add default admin account
	await createDefautUser();

	const user = await Accounts.findUserByEmail(SEED_EMAIL);

	await createDefaultToDos(user);
});
