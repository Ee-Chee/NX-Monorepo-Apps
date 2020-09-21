import { Action } from '@ngrx/store';
import { UserTodos } from '@leng2/address-book/utilities';

export enum ActionTypes {
    READ_DATA = '[Nest Sequelize Pg API] Read Data',
    READ_SUCCESS = '[Nest Sequelize Pg API] Read Success',
    ADD_USER = '[Nest Sequelize Pg API] Add User',
    ADD_SUCCESS = '[Nest Sequelize Pg API] Add Success',
    UPDATE_TODOS = '[Nest Sequelize Pg API] Update Todos',
    UPDATE_SUCCESS = '[Nest Sequelize Pg API] Update Success',
    REQUEST_FAILURE = '[Nest Sequelize Pg API] Request Failure'
}

export class ReadDataAction implements Action {
    readonly type = ActionTypes.READ_DATA;
}

export class ReadSuccessAction implements Action {
    readonly type = ActionTypes.READ_SUCCESS;
    constructor(public payload: { items: UserTodos[] }) { }
}

export class AddUserAction implements Action {
    readonly type = ActionTypes.ADD_USER;
    constructor(public payload?: { item: UserTodos }) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;
    constructor(public payload: { item: UserTodos }) { }
}

export class UpdateTodosAction implements Action {
    readonly type = ActionTypes.UPDATE_TODOS;
    constructor(public payload?: { item: UserTodos }) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;
    constructor(public payload: { item: UserTodos }) { }
}

export class RequestFailureAction implements Action {
    readonly type = ActionTypes.REQUEST_FAILURE;
    constructor(public payload: { error: string }) { }
}

export type Actions =
    ReadDataAction | ReadSuccessAction | AddUserAction | AddSuccessAction | UpdateTodosAction | UpdateSuccessAction | RequestFailureAction;