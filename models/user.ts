import * as Sequelize from 'sequelize';
import { connection } from './connection';

import * as until from 'util';


export interface IAttributes {
    id: string;
    app: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    roles: string;
    confirmed: boolean;
    create_at: Date | null;
    login_at: Date | null;
    beforelogin_at: Date | null;
}

export interface IInstance extends IAttributes, Sequelize.Instance<IAttributes> {

}

export interface IModel extends Sequelize.Model<IInstance, IAttributes> {

}

interface Coll {
    [key: string]: IModel
}
interface Coll1 {
    [key: string]: Promise<IModel>
}
const $list: Coll = {};
const $process: Coll1 = {};



function tableName(key: string) {
    return `user-${key}`;
}

function modelName(key: string) {
    return `User${key}`;
}


function define(key: string) {
    var options: Sequelize.DefineOptions<IInstance> = {
        tableName: tableName(key),
        timestamps: false
    };

    var UserModel = connection.define<IInstance, IAttributes>(modelName(key), {
        id: {
            type: Sequelize.STRING,
            field: "id",
            primaryKey: true
        },
        app: {
            type: Sequelize.INTEGER,
            field: "app",
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            field: "name",
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        roles: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        confirmed: {
            type: Sequelize.BOOLEAN
        },
        create_at: {
            type: Sequelize.DATE
        },
        login_at: {
            type: Sequelize.DATE
        },
        beforelogin_at: {
            type: Sequelize.DATE
        },
    }, options);



    return UserModel;
}



export async function Load(key: string) {
    if (key in $list) {
        return $list[key];
    }

    if (key in $process) {
        return $process[key];
    }

    var resp = $process[key] = (async () => {
        return define(key).sync();
    })();

    return resp
        .then(UserModel => {
            $list[key] = UserModel;
            delete $process[key]

            return UserModel;
        });
}



export async function findByEmail(UserModel: IModel, appid: number, email: string) {
    return await UserModel.findOne({
        where: {
            app: appid, email
        }
    });
}

export async function findByPhone(UserModel: IModel, appid: number, phone: string) {
    return await UserModel.findOne({
        where: {
            app: appid, phone
        }
    });
}

export function parseRoles(user: IInstance) {
    return (user && user.roles || '')
        .split(';')
        .map(it => it && it.trim())
        .filter((it, index, self) => {
            if (it) {
                return self.indexOf(it) === index;
            }
            return false;
        });
}

export function changeRoles(user: IInstance, role: string) {
    let roles = parseRoles(user);

    let add = (r: string) => {
        let i = roles.indexOf(r);
        if (i === -1) {
            roles.push(r);
        }
    };

    let remove = (r: string) => {
        let i = roles.indexOf(r);
        if (i > -1) {
            roles.splice(i, 1);
        }
    };


    if (role.startsWith('+')) {
        let _role = role.substring(1).trim();
        if (_role) add(_role);
    } else if (role.startsWith('-')) {
        let _role = role.substring(1).trim();
        if (_role) remove(_role);
    } else {
        let _role = role.trim();
        if (_role) add(_role);
    }

    return roles;
}