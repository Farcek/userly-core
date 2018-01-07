
const email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


export function isEmail(value:string) {
    return value && email.test(value);
}

export function emailToHiddenText(email:string) {
    if (email) {
        var sectors = email.split('@');
        var name = sectors[0];

        var s = Math.round(name.length / 2);
        var l = name.length - s;

        return name.substr(0, s) + new Array(l + 1).join('*') + '@' + sectors[1];
    }
    return email;
}