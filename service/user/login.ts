
import * as IModel from '../../model';
import * as ICommon from '../../common';
import * as errors from '../../errors';

export interface IParam {
    useridentity: string
    password: string
}

export async function findLoginUser(UserModel: IModel.IUser.IModel, appid: number, param: IParam) {

    let pass = ICommon.md5(param.password.trim());

    if (ICommon.isEmail(param.useridentity)) {
        let email = param.useridentity;
        var it = await IModel.IUser.findByEmail(UserModel, appid, email);
        if (it && it.password === pass) {
            return it;
        }
    } else if (ICommon.isPhone(param.useridentity)) {
        let phone = param.useridentity;
        var it = await IModel.IUser.findByPhone(UserModel, appid, phone);
        if (it && it.password === pass) {
            return it;
        }
    }

    throw new errors.OtherError("not found user && not password mached")
}

export async function doLogin(user:IModel.IUser.IInstance){
    user.login_at = new Date();
    user.beforelogin_at = user.login_at;
    await user.save();


    return {
        userid: user.id,
        name: user.name,
        confirmed: user.confirmed
    }
}