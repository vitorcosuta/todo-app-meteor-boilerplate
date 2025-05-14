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

				return { ...doc, username: user.username };
			}
		);
	}
}

export const toDosServerApi = new ToDosServerApi();
