import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserTodos } from '@leng2/address-book/utilities';

@Injectable({
    providedIn: 'root'
})

export class TodosService {

    constructor(private http: HttpClient) { }

    getAllUsersTodos() {
        return this.http.get<UserTodos[]>('/api/todos/all-users-todos');
    }

    addUserTodos(data: UserTodos) {
        return this.http.post('/api/todos', data);
    }

    updateUserTodos(data: UserTodos) {
        return this.http.patch(`/api/todos/${data.userid}`, data);
    }//create, delete, update are done here

    // deleteUserTodos(id: string) {
    //     return this.http.delete(`/api/todos/${id}`);
    // }
    //local port can be configured: https://nx.dev/angular/tutorial/06-proxy
}
