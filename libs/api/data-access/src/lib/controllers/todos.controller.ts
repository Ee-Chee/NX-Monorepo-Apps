import { Controller, Get, Post, Patch, Delete, Param, Body, Response, HttpStatus, HttpException } from '@nestjs/common';
import { TodosService } from '../services/todos.service';
//global prefix 'api' is defined in main.ts, api app
//prefix 'todos' defined here
@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Get('all-users-todos')
    public async getUsersTodos(@Response() res) {
        const todos = await this.todosService.findAll().catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        });
        return res.status(HttpStatus.OK).json(todos);
    }

    @Post()
    public async addUserTodos(@Response() res, @Body() body) {
        const todo = await this.todosService.create(body).catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        });
        return res.status(HttpStatus.OK).json(todo);
    }

    @Patch(':id')
    public async updateUserTodos(@Param('id') id: string, @Response() res, @Body() body) {
        const todo = await this.todosService.update(id, body).catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        });
        return res.status(HttpStatus.OK).json(todo);
    }

    // @Delete('/:id')
    // public async deleteTodo(@Param() param, @Response() res) {
    //     const todo = await this.todosService.delete(param.id);
    //     return res.status(HttpStatus.OK).json(todo);
    // }
}
