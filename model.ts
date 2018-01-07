import * as Sequelize from 'sequelize';
import { connection } from "./models/connection";

import * as IClient from "./models/client";
import * as IUser from "./models/user";

export {
    IClient, IUser
}

export async function check() {    
    try {
        await connection.authenticate();
        console.log('db connection success')
    } catch (error) {
        console.log('db connection loss', error) 
    }
}


export function associate() {
    var models: any = connection.models;
    Object.keys(models).forEach((modelName) => {
        var assoc = models[modelName]['associate'];
        if (assoc && typeof assoc == 'function') {
            assoc(models);
        }
    });
}