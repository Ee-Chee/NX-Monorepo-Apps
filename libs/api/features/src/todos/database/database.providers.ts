import { Sequelize } from 'sequelize-typescript';
import { Todo } from './todo.entity';

export const databaseProviders = [
    {
        provide: 'SequelizeToken',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'address_todos',
            });
            sequelize.addModels([Todo]);
            await sequelize.sync();
            return sequelize;
        },
    },
];