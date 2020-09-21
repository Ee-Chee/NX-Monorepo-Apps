import { Injectable, Inject } from '@nestjs/common';
import { CreateTodoDto } from '@leng2/api/utilities';
import { Todo } from '@leng2/api/features';

@Injectable()
export class TodosService {
    constructor(
        @Inject('TodosRepository') private readonly todosRepository: typeof Todo,
    ) { }

    async findAll(): Promise<Todo[]> {
        return await this.todosRepository.findAll<Todo>(
            { attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } }
        );
    }
    //https://medium.com/@bcostabatista/sequelize-exclude-fields-from-query-result-48043ea0d499

    async create(newUserTodos: CreateTodoDto): Promise<Todo> {
        return await this.todosRepository.create<Todo>(newUserTodos);
    }

    async update(id: string, newUserTodos: CreateTodoDto) {
        return await this.todosRepository.update(
            newUserTodos,
            { where: { userid: id }, returning: true }
        );
    }

    // async delete(id: string) {
    //     return await this.todosRepository.destroy({
    //         where: { userid: id }
    //     });
    // }
}