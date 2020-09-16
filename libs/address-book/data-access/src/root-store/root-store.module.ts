import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserAddressesModule } from './user-address-store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        UserAddressesModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
    ]
})

export class RootStoreModule { }
