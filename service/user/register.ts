
import * as IModel from '../../model';
import * as ICommon from '../../common';
import * as errors from '../../errors';
const uuid = require('uuid');

export interface IParam {
    name: string
    useridentity: string
    password: string
}

export async function userRegister(UserModel: IModel.IUser.IModel, appid: number, param: IParam) {
    let email = '';
    let phone = '';

    if (ICommon.isEmail(param.useridentity)) {
        email = param.useridentity;

        var it = await IModel.IUser.findByEmail(UserModel, appid, email);
        if (it) {
            throw new errors.ValidationError("email is defined");
        }


    } else if (ICommon.isPhone(param.useridentity)) {
        phone = param.useridentity;

        var it = await IModel.IUser.findByPhone(UserModel, appid, phone);
        if (it) {
            throw new errors.ValidationError("phone is defined");
        }
    } else {
        throw new errors.ValidationError(" not found user or email");
    }


    let userid:string = uuid();

    await UserModel.create({
        id: userid,
        app: appid,
        name: param.name,
        password: ICommon.md5(param.password),
        confirmed: false,
        email, phone,

        create_at: new Date(),
        login_at: null,
        beforelogin_at: null,
        roles: ''
    });

    return { userid }
}