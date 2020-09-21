import { Table, Column, Model, DataType } from 'sequelize-typescript';
//name of table is what being exported here plus 's'
@Table
export class Todo extends Model<Todo> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    userid: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true,
    })
    todos: string[];
}