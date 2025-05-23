import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { userprofileServerApi } from '../modules/userprofile/api/userProfileServerApi';
import { toDosServerApi } from '../modules/toDos/api/toDosServerApi';

const SEED_EMAIL = 'admin@mrb.com';
const SEED_PASSWORD = 'admin@mrb.com';
const INITIAL_TODO_STATUS = 'Pendente';

const insertToDo = (todoName: string, user: Meteor.User | null | undefined) => {

	const doc = {
		name: todoName,
		userId: user?._id,
		status: INITIAL_TODO_STATUS,
		isPersonal: false,
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
		].forEach((todo: string) => insertToDo(todo, user));
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
