import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementComponent } from '../../lib/user-management/user-management.component';
import { TodosComponent } from '../../lib/todos/todos.component';

const routes: Routes = [
    { path: '', component: UserManagementComponent },
    { path: 'todos', component: TodosComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class UserInfosRoutingModule { }
