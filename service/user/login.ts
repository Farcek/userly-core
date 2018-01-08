import {ILoginResult} from './interface';
import * as IModel from '../../model';
import * as ICommon from '../../common';
import * as errors from '../../errors';

export interface IParam {
    useridentity: string
    password: string
}

export async function findLockupUser(UserModel: IModel.IUser.IModel, appid: number, useridentity: string) {
    if (ICommon.isEmail(useridentity)) {
        let email = useridentity;
        var it = await IModel.IUser.findByEmail(UserModel, appid, email);
        if (it) {
            return it;
        }
    } else if (ICommon.isPhone(useridentity)) {
        let phone = useridentity;
        var it = await IModel.IUser.findByPhone(UserModel, appid, phone);
        if (it) {
            return it;
        }
    }

    throw new errors.OtherError("not found user")
}

export async function testPassword(user: IModel.IUser.IInstance, pass: string) {
    let _pass = (pass || '').trim()

    if (_pass === '') {
        throw new errors.OtherError("not support empty password")
    }


    if (user.password === ICommon.md5(_pass)) {
        return;
    }
    throw new errors.OtherError("not mached password")
}

/**
 * @deprecated use findLockupUser, testPassword
 * @param UserModel 
 * @param appid 
 * @param param 
 */
export async function findLoginUser(UserModel: IModel.IUser.IModel, appid: number, param: IParam) {

    let pass = ICommon.md5(param.password.trim());

    let user = await findLockupUser(UserModel, appid, param.useridentity);


    if (user.password === pass) {
        return user;
    }

    throw new errors.OtherError("not mached password")
}

export async function doLogin(user: IModel.IUser.IInstance): Promise<ILoginResult> {
    user.login_at = new Date();
    user.beforelogin_at = user.login_at;
    await user.save();


    return {
        userid: user.id,
        //appid:user.app,
        name: user.name,
        confirmed: user.confirmed
    }
}