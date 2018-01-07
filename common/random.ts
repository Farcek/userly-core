const crypto = require('crypto');
export function randString(len: number, customCharSet?: string) {
    var charSet = customCharSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

export function md5(str: string) {
    if(str) {
        return crypto.createHash('md5').update(str).digest("hex");
    }
    throw "cannot md5 encryption. argument is null";
}