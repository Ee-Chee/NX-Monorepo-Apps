import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserAddressesModule } from './user-address-store';
import { UserTodosModule } from './todos-store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        UserAddressesModule,
        UserTodosModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
    ]
})

export class RootStoreModule { }
