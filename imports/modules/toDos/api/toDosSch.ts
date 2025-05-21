import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

export const toDosSch: ISchema<IToDos> = {
	name: {
		type: String,
		label: 'Name',
		defaultValue: '',
		optional: false,
	},
	description: {
		type: String,
		label: 'Description',
		defaultValue: '',
		optional: true,
	},
	userId: {
		type: String,
		label: 'User ID',
		defaultValue: '',
		optional: false,
	},
	status: {
		type: String,
		label: 'Status',
		defaultValue: 'Cadastrada',
		optional: false,
		options: () => [
			{ value: 'Cadastrada', label: 'Registered' },
			{ value: 'Em andamento', label: 'In Progress' },
			{ value: 'Concluída', label: 'Completed' }
		]
	},
	isPersonal: {
		type: Boolean,
		label: 'Is Personal',
		defaultValue: false,
		optional: false
	}
};

export interface IToDos extends IDoc {
	name?: string;
	description?: string;
	userId?: string;
	status: string;
	isPersonal: boolean;
}
