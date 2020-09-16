import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserAddressesEffects } from './effects';
import { userAddressesReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('userAddresses', userAddressesReducer),
        EffectsModule.forFeature([UserAddressesEffects])
    ]
})
export class UserAddressesModule { }
