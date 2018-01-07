import * as Sequelize from 'sequelize';
import { connection } from './connection';
import * as IUser from './user';


export interface IAttributes {
    id: number | null;
    name: string;

    domain: string;
    usertable: string;

    /**
     * User token key
     */
    tokenkey: string

    /**
     * User id
     */
    ovner: string;

    /**
     * Application Roles 
     */
    roles: string;

    createAt: Date
}

export interface IInstance extends IAttributes, Sequelize.Instance<IAttributes> {

}

export interface IModel extends Sequelize.Model<IInstance, IAttributes> {

}

export interface IAccess {
    /**
     * ex : Standard User, Admin User, Guest
     */
    parents: string[]

    /**
     * ex: View Account list , Update Own User Account, Update Any User Account
     */
    permissions: string[]
}
export interface IAccessTable {
    [role: string]: IAccess
}


export const Client = (() => {

    var options: Sequelize.DefineOptions<IInstance> = {
        tableName: "client",
        timestamps: false,
        classMethods: {},
        instanceMethods: {}
    };

    return <IModel>connection.define<IInstance, IAttributes>('Client', {
        id: {
            type: Sequelize.INTEGER,
            field: "id",
            primaryKey: true,
            autoIncrement: true
        },
        domain: {
            type: Sequelize.STRING,
            field: "domain",
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            field: "name",
            allowNull: false
        },
        usertable: {
            type: Sequelize.STRING,
            field: "usertable",
            allowNull: false
        },
        ovner: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tokenkey: {
            type: Sequelize.STRING
        },
        roles: {
            type: Sequelize.TEXT
        },

        createAt: Sequelize.DATE
    }, options);
})();

export async function userModelByAppId(appid: number) {


    var app = await Client.findById(appid);
    if (app) {
        return await userModelByApp(app);
    }
    throw "not found client find by id : " + appid;
}

export async function userModelByApp(app: IInstance) {
    if (app && app.usertable) {
        return await IUser.Load(app.usertable);
    }
    throw "cannot load user model";
}
