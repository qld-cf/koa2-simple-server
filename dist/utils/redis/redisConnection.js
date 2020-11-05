"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis = require("ioredis");
let clientCreate = (config, callback_) => {
    let redis = new ioredis(config);
    redis.on('connect', () => {
        callback_(null, redis); //链接成功， 返回 redis 连接对象
    });
    redis.on('error', (err) => {
        callback_(err, null); //捕捉异常， 返回 error
    });
};
let redisConn = (options) => {
    let config = options;
    return new Promise((resolve, reject) => {
        clientCreate(config, (err, conn) => {
            if (err) {
                reject(err);
            }
            resolve(conn); //返回连接的redis对象
        });
    });
};
exports.default = redisConn;
//# sourceMappingURL=redisConnection.js.map