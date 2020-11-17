import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserTodos, Todo } from '@leng2/address-book/utilities';
import { Store } from '@ngrx/store';
import { RootStoreState, UserTodosStoreActions, UserTodosStoreSelectors } from '@leng2/address-book/data-access';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit, OnDestroy {
    newTodo: string;
    userTodos: UserTodos | null;
    todos: Todo[] = [];
    private subscription: Subscription;

    constructor(private route: ActivatedRoute, private store$: Store<RootStoreState.RootState>) { }

    ngOnInit(): void {
        this.subscription = this.store$.select(
            UserTodosStoreSelectors.selectUserTodosById(this.route.snapshot.paramMap.get('id'))
        ).subscribe(result => {
            // If a user surfs directly the path /<person>/hisID/todos, initially result could be null(data not yet retrieved in store). 
            // As restored, angular will run again and rerender. Console log it, two results shall be obtained:
            // console.log("here", result);
            if (result === null) {
                this.userTodos = null;
            } else {
                // this.userTodos = result; 
                //Wrong! Data retrieved from store is immutable and readonly. Use this:
                this.userTodos = { ...result };
                this.userTodos.todos = [...result.todos]; //nested array or object too
                this.todos = this.userTodos.todos.map(elem => {
                    return { title: elem, disableUpdate: false }
                });
            }
        })
    }

    addTodo() {
        if (this.userTodos === null) {
            //userid not found, new user is being registered here
            this.userTodos = { userid: this.route.snapshot.paramMap.get('id'), todos: [this.newTodo] }
            this.store$.dispatch(
                new UserTodosStoreActions.AddUserAction({ item: this.userTodos })
            )
        } else {
            this.userTodos.todos.push(this.newTodo);
            this.store$.dispatch(
                new UserTodosStoreActions.UpdateTodosAction({ item: this.userTodos })
            )
            this.todos.push({ title: this.newTodo, disableUpdate: false });
        }
    }

    validateTodo(value: string, index: number) {
        if (value === "") {
            this.todos[index].disableUpdate = true;
        } else {
            this.todos[index].disableUpdate = false;
        }
    }

    updateTodo(value: string, index: number) {
        this.userTodos.todos[index] = value;
        this.store$.dispatch(
            new UserTodosStoreActions.UpdateTodosAction({ item: this.userTodos })
        )
        this.todos[index].title = value;
    }

    deleteTodo(index: number) {
        this.userTodos.todos = this.userTodos.todos.filter((elem, i) => i !== index);
        this.store$.dispatch(
            new UserTodosStoreActions.UpdateTodosAction({ item: this.userTodos })
        )
        this.todos = this.todos.filter((elem, i) => i !== index)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
//userTodos carries data for backend data exchange
//whereas todos is responsible for template update and rerendering