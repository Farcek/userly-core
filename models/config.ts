export interface IConfig {
    // auth
    database: string;
    username: string;
    password: string;

    //
    // hosing
    host: string;
    port: number;

    //
    dialect: string;
    pool: any;
    timezone: string
    debug: boolean
}

const $ = <{ conf: IConfig }>{};

export function loadConfig() {
    if ($.conf) {
        return $.conf;
    }
    throw "not defined configration";
}

export function setConfig(conf: IConfig) {
    return $.conf = conf;
}
