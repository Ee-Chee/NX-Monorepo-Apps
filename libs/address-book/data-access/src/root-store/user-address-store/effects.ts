import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserAddress } from '@leng2/address-book/utilities';
import { FirebaseService } from '../../services/firebase.service';
import * as userAddressActions from './actions';

@Injectable()
export class UserAddressesEffects {

    constructor(private firebaseService: FirebaseService, private actions$: Actions, private router: Router) { }

    @Effect()
    readDataEffect$: Observable<Action> = this.actions$.pipe(
        ofType<userAddressActions.ReadDataAction>(userAddressActions.ActionTypes.READ_DATA),
        switchMap(() =>
            this.firebaseService.getUserAddresses().pipe(
                map(metaDataCollection => {
                    // console.log(metaDataCollection);
                    const items: UserAddress[] = metaDataCollection.map(document => {
                        const data = document.payload.doc.data();
                        const id = document.payload.doc.id;
                        return { id, ...data as UserAddress };
                        //payload.doc.id; //id of collection's document
                        //as UserAddress because spread with a generic type isnt supported
                    });
                    return new userAddressActions.ReadSuccessAction({ items })
                }),
                catchError(
                    error => observableOf(new userAddressActions.RequestFailureAction({ error }))
                )
            )
        )
    );

    @Effect()
    updateInfoEffect$: Observable<Action> = this.actions$.pipe(
        ofType<userAddressActions.UpdateInfoAction>(userAddressActions.ActionTypes.UPDATE_INFO),
        switchMap(action =>
            this.firebaseService.updateUserInfo(action.payload.item).then(() => {
                this.router.navigate(['']);
                // throw new Error("error testing!");
                return new userAddressActions.UpdateSuccessAction({ item: action.payload.item })
            }).catch(
                error => new userAddressActions.RequestFailureAction({ error })
            )
        )
    );
    //unlike createUserEffect, action.payload.item contains already id (passed when user updates the form).

    @Effect()
    createUserEffect$: Observable<Action> = this.actions$.pipe(
        ofType<userAddressActions.CreateUserAction>(userAddressActions.ActionTypes.CREATE_USER),
        switchMap(action =>
            this.firebaseService.createUserAddress(action.payload.item).then(
                (docRef) => {
                    const item: UserAddress = { id: docRef.id, ...action.payload.item };
                    //console.log("item", item); //Entity state != firestore collection data.
                    //Must provide id before updating the entity state
                    this.router.navigate(['']);
                    return new userAddressActions.CreateSuccessAction({ item })
                }
            ).catch(
                error => new userAddressActions.RequestFailureAction({ error })
            )
        )
    );

    @Effect()
    deleteUserEffect$: Observable<Action> = this.actions$.pipe(
        ofType<userAddressActions.DeleteUserAction>(userAddressActions.ActionTypes.DELETE_USER),
        switchMap(action =>
            this.firebaseService.deleteUserAddress(action.payload.id).then(() => {
                this.router.navigate(['']);
                return new userAddressActions.DeleteSuccessAction({ id: action.payload.id });
            }).catch(
                error => new userAddressActions.RequestFailureAction({ error })
            )
        )
    );
}
// https://stackoverflow.com/questions/49120326/error-handling-when-getting-document-from-firestore