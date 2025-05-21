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

	addTodo = (params: object, callback: (error: IMeteorError, result: void) => void) => 
		this.callMethod('addTodo', params, callback);
}

export const toDosApi = new ToDosApi();
