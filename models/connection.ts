import * as Sequelize from 'sequelize';
import { loadConfig } from './config';

const confDatabase = loadConfig();
const winston = require('winston');
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'sql.log' })
    ]
})




export const connection: Sequelize.Sequelize = new Sequelize(confDatabase.database, confDatabase.username, confDatabase.password, <any>{
    //operatorsAliases : false,
    host: confDatabase.host,
    dialect: confDatabase.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00',
    logging: confDatabase.debug ? (msg: string) => logger.info(msg) : false
});