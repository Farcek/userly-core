const moment = require("moment");
export function date2String(date: Date | null, format?: string) {
    if (date) {
        return moment(date).format(format || 'YYYY-MM-DD HH:mm');
    }
    return '';
}

export function dateFromNow(date: Date | null, suffix: boolean = false) {
    if (date) {
        return moment(date).fromNow(suffix);
    }
    return '';
}