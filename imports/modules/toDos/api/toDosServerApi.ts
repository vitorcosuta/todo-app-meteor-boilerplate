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
					projection: { createdby: 1, name: 1, status: 1 },
					...options
				});
			},

			async (doc: Partial<IToDos>): Promise<Partial<IToDos> & {username: string}> => {
				
				const user: IUserProfile = await userprofileServerApi.getCollectionInstance().findOneAsync({
					_id: doc.createdby
				}, {
					fields: { username: 1 }
				});

				return { ...doc, username: user?.username };
			}
		);

		/** FIM -- REGISTRO DE PUBLICAÇÕES */


		/** INÍCIO -- REGISTRO DE MÉTODOS */

		this.registerMethod('addTodo', this.addTodo.bind(this));

		/** FIM -- REGISTRO DE MÉTODOS */
	}

	public async addTodo(
		params: {
			name: string;
			userId: string;
			status: string;
			isPersonal: false,
		}, 
		context: IContext
	): Promise<void>{

		const todo: IToDos = { ...params, status: 'Cadastrada' };
		
		this.serverInsert(todo, context);
	}
}

export const toDosServerApi = new ToDosServerApi();
