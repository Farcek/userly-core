
import * as IModel from '../../model';
import * as ICommon from '../../common';
import * as errors from '../../errors';
const uuid = require('uuid');


export async function createResetpass(app: IModel.IClient.IInstance, UserModel: IModel.IUser.IModel, user: IModel.IUser.IInstance) {
    let code = ICommon.randString(4, 'ABCDEFGHJKMNPQRSTUVWXYZ123456789')
    let resetpass = await IModel.IResetpass.ResetPass.create({
        id: null,
        appid: app.id || 0,
        userid: user.id,
        create_at: new Date(),
        code
    });

    return {
        codeid: resetpass.id || 0,
        code,
    }
}

