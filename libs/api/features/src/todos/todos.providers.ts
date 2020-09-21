import { Todo } from './database/todo.entity';

export const todosProviders = [
    {
        provide: 'TodosRepository',
        useValue: Todo,
    }
];