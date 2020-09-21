import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserTodosEffects } from './effects';
import { userTodosReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('userTodos', userTodosReducer),
        EffectsModule.forFeature([UserTodosEffects])
    ]
})
export class UserTodosModule { }
