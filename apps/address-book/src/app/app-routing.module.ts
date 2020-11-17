import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from '@leng2/address-book/features';

const routes: Routes = [
    { path: '', component: UsersListComponent, pathMatch: 'full' },
    { path: 'registration', loadChildren: () => import('../../../../libs/address-book/features/src/lazy-loaded-modules/registration/registration.module').then(m => m.RegistrationModule) },
    { path: 'person/:id', loadChildren: () => import('../../../../libs/address-book/features/src/lazy-loaded-modules/user-infos/user-infos.module').then(m => m.UserInfosModule) },
    { path: 'person/:id/todos', loadChildren: () => import('../../../../libs/address-book/features/src/lazy-loaded-modules/todos/todos.module').then(m => m.TodosModule) },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule { }
