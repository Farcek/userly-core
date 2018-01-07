import * as Sequelize from 'sequelize';
import { connection } from './connection';


export interface IAttributes {
    id: number | null;
    appid: number;

    userid: string;
    code: string

    create_at: Date
}

export interface IInstance extends IAttributes, Sequelize.Instance<IAttributes> {

}

export interface IModel extends Sequelize.Model<IInstance, IAttributes> {

}

export const ResetPass = (() => {

    var options: Sequelize.DefineOptions<IInstance> = {
        tableName: "reset_pass",
        timestamps: false,
        classMethods: {},
        instanceMethods: {}
    };

    return <IModel>connection.define<IInstance, IAttributes>('ResetPass', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        appid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userid: {
            type: Sequelize.STRING,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        create_at: Sequelize.DATE
    }, options);
})();

