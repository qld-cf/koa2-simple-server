"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis_db1 = exports.default_redis = void 0;
const redisConnection_1 = require("./redisConnection");
const index_1 = require("../../config/index");
const env = process.env.NODE_ENV;
let redisConfig = {
    port: index_1.default(env).port_redis,
    host: index_1.default(env).host_redis
};
class RedisTool {
    constructor(opt) {
        this.redis = null;
        if (opt) {
            this.config = Object.assign(redisConfig, opt);
        }
        else {
            this.config = redisConfig;
        }
        // this.connToRedis()
        this.connToRedis().then(res => {
            if (res) {
                console.log('redis connet success');
            }
        }).catch(e => {
            console.error('The Redis Can not Connect:' + e);
        });
    }
    /**连接redis */
    connToRedis() {
        return new Promise((resolve, reject) => {
            if (this.redis) {
                resolve(true); //已创建
            }
            else {
                redisConnection_1.default(this.config).then((resp) => {
                    this.redis = resp;
                    resolve(true);
                }).catch(err => { reject(err); });
            }
        });
    }
    /**存储string类型的key-value */
    async setString(key, value) {
        let val = typeof (value) !== 'string' ? JSON.stringify(value) : value;
        let k = typeof (value) !== 'string' ? JSON.stringify(key) : key;
        try {
            const res = await this.redis.set(k, val);
            return res;
        }
        catch (e) {
            console.error(e);
        }
    }
    /**获取string类型的key-value */
    async getString(key) {
        let id = typeof (key) !== 'string' ? JSON.stringify(key) : key;
        try {
            const res = await this.redis.get(id);
            return res;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }
    /**删除string类型的key-value */
    async delString(key) {
        let id = typeof (key) !== 'string' ? JSON.stringify(key) : key;
        try {
            const res = await this.redis.del(id);
            return res;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }
    /**获取当前数据库key的数量 */
    async getDbSize() {
        try {
            const res = await this.redis.dbsize();
            return res;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }
}
exports.default_redis = new RedisTool();
exports.redis_db1 = new RedisTool({ db: 1 });
// export const redis_db2 = new RedisTool({db:2})
// export const redis_db3 = new RedisTool({db:3})
// export const redis_db4 = new RedisTool({db:4})
exports.default = exports.default_redis;
//# sourceMappingURL=redisOperate.js.map