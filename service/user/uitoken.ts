import { ILoginResult } from './interface';
import { jwtEncryption, jwtDecryption, jwtDecode } from '../../common/jwt';

const tokenId = "ui-login"
export function gen(payload: ILoginResult, pass: string) {
    return jwtEncryption(payload, {
        expiresIn: '1m',
        jwtid: tokenId,
        pass: pass
    });
}

// export function parse(tokencode: string) {
//     let payload =  jwtDecode<any>(tokencode);

//     if(payload && payload.jti == tokenId && payload.userid){
//         return true;
//     }
//     return null;
// }

// parse('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyNDg1NDM3Mi0yYjA3LTRhODAtYWNkMC01MjlhYzFiNDMwYWEiLCJuYW1lIjoic2QiLCJjb25maXJtZWQiOmZhbHNlLCJpYXQiOjE1MTU0Mjc5OTEsImV4cCI6MTUxNTQyODA1MSwianRpIjoibG9naW5ScSJ9.8ct9Lqw3gKV4nwGDEUb-Ei0EZ1n5wdxuEo_uhk6mxeQ')
export function parseVarify(tokencode: string, pass: string) {
    return jwtDecryption<ILoginResult>(tokencode, {
        jwtid: tokenId,
        pass: pass
    });
}