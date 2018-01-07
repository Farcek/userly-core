
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

export async function varifyResetpass(app: IModel.IClient.IInstance, codeid: number, code: string) {

    let codeRow = await IModel.IResetpass.ResetPass.findById(codeid || 0);
    if (codeRow) {
        if (codeRow.appid === app.id) {
            let UserModel = await IModel.IClient.userModelByApp(app);
            let user = await UserModel.findById(codeRow.userid);
            if (user) {
                let rowCode = (codeRow.code || '').toLowerCase();
                let userCode = (code || '').trim().toLowerCase();
                if (rowCode === userCode) {
                    return {
                        codeRow, UserModel, user
                    }
                }
            }
        }
    }
    throw 'not mached code'

}