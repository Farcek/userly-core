var jwt = require('jsonwebtoken');
export interface IJwtEncryptionOption {
    pass: string
    jwtid: string
    expiresIn: string

}


export function jwtEncryption<T>(obj: T, option: IJwtEncryptionOption): string {
    return jwt.sign(obj, option.pass, {
        jwtid: option.jwtid,
        expiresIn: option.expiresIn
    });
}


export function jwtDecode<T>(tockenStr:string): T {
    return jwt.decode(tockenStr);
}

export interface IJwtDecryptionOption {
    pass: string
    jwtid: string
}
export function jwtDecryption<T>(tockenStr: string, option: IJwtDecryptionOption): T {
    try {
        return jwt.verify(tockenStr, option.pass, {
            jwtid: option.jwtid
        });
    } catch (error) {
        if (error && error.name === 'TokenExpiredError') {
            throw new JwtErrorExpired(error.expiredAt);
        }

        throw error;
    }

}

export class JwtErrorExpired {
    name: 'TokenExpiredError'
    message : 'token expired'
    constructor(private expiredAt: number) {

    }
}