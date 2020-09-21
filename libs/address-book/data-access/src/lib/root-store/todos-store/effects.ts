import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TodosService } from '../../services/todos.service';
import * as userTodosActions from './actions';

@Injectable()
export class UserTodosEffects {

    constructor(private todosService: TodosService, private actions$: Actions) { }

    @Effect()
    readDataEffect$: Observable<Action> = this.actions$.pipe(
        ofType<userTodosActions.ReadDataAction>(userTodosActions.ActionTypes.READ_DATA),
        switchMap(() =>
            this.todosService.getAllUsersTodos().pipe(
                map(items => new userTodosActions.ReadSuccessAction({ items })),
                catchError(
                    err => {
                        console.log("data reading error: ", err.error.message);
                        return observableOf(new userTodosActions.RequestFailureAction({ error: err.error.message }));
                    }

                )
            )
        )
    );

    @Effect()
    updateTodosEffect$: Observable<Action> = this.actions$.pipe(
        ofType<userTodosActions.UpdateTodosAction>(userTodosActions.ActionTypes.UPDATE_TODOS),
        switchMap(action =>
            this.todosService.updateUserTodos(action.payload.item).pipe(
                map(() => new userTodosActions.UpdateSuccessAction({ item: action.payload.item })),
                catchError(
                    err => {
                        console.log("update error: ", err.error.message);
                        return observableOf(new userTodosActions.RequestFailureAction({ error: err.error.message }));
                    }
                )
            )
        )
    );

    @Effect()
    addUserEffect$: Observable<Action> = this.actions$.pipe(
        ofType<userTodosActions.AddUserAction>(userTodosActions.ActionTypes.ADD_USER),
        switchMap(action =>
            this.todosService.addUserTodos(action.payload.item).pipe(
                map(() => new userTodosActions.AddSuccessAction({ item: action.payload.item })),
                catchError(
                    err => {
                        console.log("add error: ", err.error.message);
                        return observableOf(new userTodosActions.RequestFailureAction({ error: err.error.message }));
                    }
                )
            )
        )
    );
}
