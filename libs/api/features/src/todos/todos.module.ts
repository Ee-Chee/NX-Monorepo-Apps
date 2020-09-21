import { Module } from '@nestjs/common';
import { TodosService, TodosController } from '@leng2/api/data-access';
import { DatabaseModule } from './database/database.module';
import { todosProviders } from './todos.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [TodosController],
    providers: [TodosService, ...todosProviders]
})
export class TodosModule { }
