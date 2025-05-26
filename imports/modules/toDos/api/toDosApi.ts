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

	deleteTodo = (id: string | undefined, callback: (error: IMeteorError, result: void) => void) =>
		this.callMethod('deleteTodo', id, callback);

	editTodo = (params: object, callback: (error: IMeteorError, result: void) => void) =>
		this.callMethod('editTodo', params, callback);

	findTodoById = (id: string | undefined, callback: (error: IMeteorError, result: Partial<IToDos> & { username: string }) => void) =>
		this.callMethod('findTodoById', id, callback);
}

export const toDosApi = new ToDosApi();
