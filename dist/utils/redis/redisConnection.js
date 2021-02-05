"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = __importDefault(require("ioredis"));
var clientCreate = function (config, callback_) {
    var redis = new ioredis_1.default(config);
    redis.on("connect", function () {
        //根据 connect 事件判断连接成功
        callback_(null, redis); //链接成功， 返回 redis 连接对象
    });
    redis.on("error", function (err) {
        //根据 error 事件判断连接失败
        callback_(err, null); //捕捉异常， 返回 error
    });
};
var redisConn = function (options) {
    var config = options;
    return new Promise(function (resolve, reject) {
        //返回API调用方 一个 promise 对象
        clientCreate(config, function (err, conn) {
            if (err) {
                reject(err);
            }
            resolve(conn); //返回连接的redis对象
        });
    });
};
exports.default = redisConn;
//# sourceMappingURL=redisConnection.js.map