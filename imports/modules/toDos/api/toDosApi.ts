// region Imports
import { ProductBase } from '../../../api/productBase';
import { toDosSch, IToDos } from './toDosSch';
import { IMeteorError } from '/imports/typings/IMeteorError';

class ToDosApi extends ProductBase<IToDos> {
	constructor() {
		super('toDos', toDosSch, {
			enableCallMethodObserver: true,
			enableSubscribeObserver: true
		});
	}

	recentToDos = (callback: (error: IMeteorError, result: Array<string>) => void) => 
		this.callMethod('recentToDos', callback);
}

export const toDosApi = new ToDosApi();
