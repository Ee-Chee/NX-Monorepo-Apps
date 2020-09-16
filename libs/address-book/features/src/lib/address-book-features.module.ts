import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@leng2/shared';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateFormats } from '@leng2/address-book/utilities';
import { TransformAddressPipe } from '../pipes/transform-address';
import { UsersListComponent } from './user-list/users-list.component';
import { UserManagementComponent } from './user-management/user-management.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [TransformAddressPipe, UsersListComponent, UserManagementComponent],
    exports: [UsersListComponent, UserManagementComponent],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: DateFormats }
    ]
})
export class AddressBookFeaturesModule { }
//The alternative way would be declaring everything in core module instead and this module would be useless.
//Share module can be exported here so that it is needed to reimport again in core module (as this module is imported in core module).
//UsersList and UserManagement are exported here because they are used by routes in the core module and they are depending on shared module, pipes, services. 
//Root-module is not declared inside imports as it is imported directly in component later then.
