// region Imports
import { Recurso } from '../config/recursos';
import { toDosSch, IToDos } from './toDosSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { IContext } from '/imports/typings/IContext';
import { IUserProfile } from '../../userprofile/api/userProfileSch';

// endregion

class ToDosServerApi extends ProductServerBase<IToDos> {
	constructor() {
		super('toDos', toDosSch, {
			resources: Recurso
		});

		const self = this;
		
		/** INÍCIO -- REGISTRO DE PUBLICAÇÕES */

		this.addTransformedPublication(
			'ToDos', 

			async (filter = {}, options = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { userId: 1, name: 1, status: 1 },
					...options
				});
			},

			async (doc: Partial<IToDos>): Promise<Partial<IToDos> & {username: string}> => {
				
				const user: IUserProfile = await userprofileServerApi.getCollectionInstance().findOneAsync({
					_id: doc.userId
				}, {
					fields: { username: 1 }
				});

				return { ...doc, username: user?.username };
			}
		);

		/** FIM -- REGISTRO DE PUBLICAÇÕES */


		/** INÍCIO -- REGISTRO DE MÉTODOS */

		this.registerMethod('addTodo', this.addTodo.bind(this));
		this.registerMethod('deleteTodo', this.deleteTodo.bind(this));
		this.registerMethod('editTodo', this.editTodo.bind(this));
		this.registerMethod('findTodoById', this.findTodoById.bind(this));

		/** FIM -- REGISTRO DE MÉTODOS */
	}

	public async addTodo(
		params: {
			name: string;
			userId: string;
			status: string;
			isPersonal: boolean,
		}, 
		context: IContext
	): Promise<void>{

		const todo: IToDos = { ...params, status: 'Pendente' };
		
		this.serverInsert(todo, context);
	}

	public async deleteTodo(id: string | undefined, context: IContext): Promise<void> {

		console.log(id);
		// this.serverRemove({ _id: id }, context);
	}

	public async editTodo(
		params: {
			_id: string;
			userId: string;
			name: string;
			status: string;
			isPersonal: boolean;
		},
		context: IContext
	): Promise<void>{
		
		const todo: IToDos = { ...params };
		
		this.serverUpdate(todo, context);
	}

	public async findTodoById(id: string | undefined, context: IContext): Promise<Partial<IToDos> & { username: string }> {
		const todo = await this.findOne(
			{ _id: id },
			{ projection: { name: 1, description: 1, isPersonal: 1, userId: 1 } }
		);

		if (!todo) {
			throw new Error("ToDo not found");
		}

		const user = await userprofileServerApi.getCollectionInstance().findOneAsync(
			{ _id: todo.userId },
			{ fields: { username: 1 } }
		);

		return {
			...todo,
			username: user?.username
		};
	}

}

export const toDosServerApi = new ToDosServerApi();
