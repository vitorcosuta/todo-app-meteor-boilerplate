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

		this.addTransformedPublication(
			'latestToDos', 

			async (params: { userId: string, limit: number }, sort = {}) => {
				
				console.log('User id: ', params.userId);

				const filter = {
					$or: [
						{ createdby: params.userId },      // Tarefas criadas pelo usuário logado
						{ isPersonal: false }          	   // Tarefas públicas
					]
				}

				const doc = await this.defaultListCollectionPublication(filter, {
					projection: { createdby: 1, name: 1, status: 1 }, // Selecionar quais campos devem ser incluídos no doc
					limit: params.limit,
					sort: sort
				});

				console.log('doc', await doc.fetch());

				return doc; 
			},

			async (doc: Partial<IToDos>): Promise<Partial<IToDos> & {username: string}> => {
				
				const user: IUserProfile = await userprofileServerApi.getCollectionInstance().findOneAsync({
					_id: doc.createdby
				}, {
					fields: { username: 1 }
				});

				return { ...doc, username: user.username };
			}
		);
	}
}

export const toDosServerApi = new ToDosServerApi();
