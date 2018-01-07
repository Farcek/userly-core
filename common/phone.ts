
const phone = /^\d{8}$/i;



export function isPhone(value:string) {
    return value && phone.test(value);
}



export function phoneToHiddenText(phone:string) {
    if (phone && phone.length > 4) {
        return phone.substr(0, 1) + new Array(phone.length - 3).join('*') + phone.substr(phone.length - 3, 3);
    }
    return phone;
}
