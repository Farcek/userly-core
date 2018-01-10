import * as ICommon from './common';
const jwt = require('jsonwebtoken');
// export class UserToken {
//     private static pass = 'jh32g4';
//     static gen(userid: string, appid: number) {
//         return ICommon.jwtEncryption({ u: userid, a: appid }, { pass: UserToken.pass, jwtid: 'user', expiresIn: '2h' });
//     }
//     static parse(token: string) {
//         var data = ICommon.jwtDecryption<{ u: string, a: number }>(token, { pass: UserToken.pass, jwtid: 'user' });
//         return {
//             userid: data.u, appid: data.a
//         }
//     }
// }

export interface IClientToken {
    appid: number
}

export class ClientToken {

    static gen(appid: number, pass: string): string {
        return ICommon.jwtEncryption({ a: appid }, { pass, jwtid: 'client', expiresIn: '1h' });
    }

    static parse(token: string): IClientToken | null {
        var decode = jwt.decode(token);
        if (decode && decode.a && decode.jti == 'client') {
            return { appid: decode.a };
        }
        return null;
    }

    static virify(token: string, pass: string) {
        var decode = jwt.verify(token, pass, { jwtid: 'client' });

        if (decode && decode.a) {
            return { appid: decode.a };
        }
        return null;
    }
}


export interface IConsoleUsertoken {
    userid: string

}

export class ConsoleToken {

    static gen(userid: string, pass: string): string {
        return ICommon.jwtEncryption({ u: userid, t: '' }, { pass, jwtid: 'userlyconsole', expiresIn: '1h' });
    }
    static parse(token: string, pass: string): IConsoleUsertoken {
        var data = ICommon.jwtDecryption<{ u: string, t: string }>(token, { pass, jwtid: 'userlyconsole' });
        //console.log('data', data)
        return {
            userid: data.u
        }
    }
}