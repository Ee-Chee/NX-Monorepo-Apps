import { Action } from '@ngrx/store';
import { UserAddress } from '@leng2/address-book/utilities';

export enum ActionTypes {
    READ_DATA = '[Firebase API] Read Data',
    READ_SUCCESS = '[Firebase API] Read Success',
    UPDATE_INFO = '[Firebase API] Update Info',
    UPDATE_SUCCESS = '[Firebase API] Update Success',
    CREATE_USER = '[Firebase API] Create User',
    CREATE_SUCCESS = '[Firebase API] Create Success',
    DELETE_USER = '[Firebase API] Delete User',
    DELETE_SUCCESS = '[Firebase API] Delete Success',
    REQUEST_FAILURE = '[Firebase API] Request Failure'
}

export class ReadDataAction implements Action {
    readonly type = ActionTypes.READ_DATA;
}

export class ReadSuccessAction implements Action {
    readonly type = ActionTypes.READ_SUCCESS;
    constructor(public payload: { items: UserAddress[] }) { }
}

export class UpdateInfoAction implements Action {
    readonly type = ActionTypes.UPDATE_INFO;
    constructor(public payload?: { item: UserAddress }) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;
    constructor(public payload: { item: UserAddress }) { }
}

export class CreateUserAction implements Action {
    readonly type = ActionTypes.CREATE_USER;
    constructor(public payload?: { item: UserAddress }) { }
}

export class CreateSuccessAction implements Action {
    readonly type = ActionTypes.CREATE_SUCCESS;
    constructor(public payload: { item: UserAddress }) { }
}

export class DeleteUserAction implements Action {
    readonly type = ActionTypes.DELETE_USER;
    constructor(public payload: { id: string }) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: { id: string }) { }
}

export class RequestFailureAction implements Action {
    readonly type = ActionTypes.REQUEST_FAILURE;
    constructor(public payload: { error: string }) { }
}

export type Actions =
    ReadDataAction | ReadSuccessAction | UpdateInfoAction | UpdateSuccessAction | CreateUserAction | CreateSuccessAction | DeleteUserAction | DeleteSuccessAction | RequestFailureAction;