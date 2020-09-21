import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserTodos } from '@leng2/address-book/utilities';
import { userTodosAdapter, State } from './state';

export const getError = (state: State): string => state.error;

export const getIsLoading = (state: State): boolean => {
    // console.log("entity state", state);
    return state.isLoading;
}

export const selectUserTodosState: MemoizedSelector<object, State> = createFeatureSelector<State>('userTodos');

export const selectUsersTodos: (state: object) =>
    UserTodos[] = userTodosAdapter.getSelectors(selectUserTodosState).selectAll;

export const selectUserTodosById = (id: string) =>
    createSelector(selectUsersTodos, (usersTodos: UserTodos[]) => {
        let foundUserTodos: UserTodos = usersTodos.find(elem => elem.userid == id);
        //if id not found
        if (foundUserTodos === undefined) {
            return null; //register new user to database table
        } else {
            return foundUserTodos;
        }
    });

export const selectRequestError: MemoizedSelector<object, any> = createSelector(
    selectUserTodosState,
    getError
);

export const selectRequestIsLoading: MemoizedSelector<object, boolean> = createSelector(
    selectUserTodosState,
    getIsLoading
);